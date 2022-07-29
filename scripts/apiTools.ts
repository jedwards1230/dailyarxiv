import { MathJax } from 'better-react-mathjax';
import xml2js from 'xml2js'
import { ArxivCategories } from '../constants'

/** Attempt to pull and clean ArXiv results */
export async function fetchArchive(url: string) {
	const parser = new xml2js.Parser();
	try {
		// fethch the xml from the url and parse the list of papers
		const response = await fetch(url);
		const xml = await response.text();
		const json = await parser.parseStringPromise(xml);
		const papers: ArchiveResult[] = json.feed.entry.map((e: any) => cleanData(e));

		return papers
	} catch (e) {
		console.log({ e })
	}
}

/** Clean data fetched from ArXiv */
function cleanData(entry: any) {
	const paper: ArchiveResult = {
		author: entry.author.map((a: any) => a.name[0]),
		id: entry.id[0],
		link: entry.link,
		published: entry.published[0],
		summary: entry.summary[0],
		title: entry.title[0],
		updated: entry.updated[0]
	}

	if (entry["arxiv:comment"]) paper.comment = entry["arxiv:comment"][0];
	if (entry["arxiv:primary_category"]) {
		const codes = entry["arxiv:primary_category"][0].$.term.split('.')
		if (codes.length > 1) {
			const parent = checkCategory(ArxivCategories, codes[0]);
			const child = checkCategory(ArxivCategories, entry["arxiv:primary_category"][0].$.term);
			paper.codes = [parent, child];
		} else {
			const code = checkCategory(ArxivCategories, entry["arxiv:primary_category"][0].$.term);
			paper.codes = [code];
		}
	}
	return paper
}

// recursively check ArxivCategories for the object with the given code
function checkCategory(dataTree: ArchiveHeader[], code: string): string {
	for (let i = 0; i < dataTree.length; i++) {
		if (dataTree[i].code === code) {
			return dataTree[i].desc;
		}
		if (dataTree[i].categories) {
			const result = checkCategory(dataTree[i].categories!, code);
			if (result) return result;
		}
	}
	return '';
}

/** Build query based on category selections */
export function buildQuery(data: ArchiveHeader[]): string {
	const selections: CategorySelection = filterResults(data);
	const selectionsArr = Object.keys(selections);

	const query = selectionsArr.map(key => {
		const values = selections[key];
		return values.map((value: string) => `cat:${key}.${value}`).join('+OR+');
	}).join('+OR+');
	return query === '' ? 'all' : query;
}

/** 
	* Recursive function to find which section per code was selected 
	* Returns object in the format of: {
		'astro-ph': [GA, GP, ...],
		'stat': [ST, ...],
	}
*/
function filterResults(results: ArchiveHeader[]): CategorySelection {
	const selections: CategorySelection = {};

	results.forEach(result => {
		const codes = result.code.split('.');
		if (result.categories) {
			// pull child selections and sort into selections 
			const selection = filterResults(result.categories);
			Object.keys(selection).forEach(key => {
				if (!selections[key]) selections[key] = [];
				selections[key] = selections[key].concat(selection[key]);
			});
			if (selections[codes[0]] && result.categories.length === selections[codes[0]].length) {
				selections[codes[0]] = ['*']
			}
		} else if (result.checked) {
			if (codes[1]) {
				if (!selections[codes[0]]) selections[codes[0]] = [];
				selections[codes[0]].push(codes[1]);
			}
		}
	})

	return selections;
}

/** Convert query and data to API url */
export function queryToUrl(query: string, date: Date, maxResults = 100) {
	const base = '//export.arxiv.org/api/query';
	const to: Date = previousArxivDay(date);
	const from: Date = previousArxivDay(to);
	return base + '?search_query=(' + query + ')+AND+lastUpdatedDate:['
		+ dateToArxivDate(from, true) + '+TO+'
		+ dateToArxivDate(to, false)
		+ ']&max_results=' + maxResults;
}

/** Find previous day for API request */
function previousArxivDay(date: Date) {
	var delta = [
		-3, // Sunday -> Thursday
		-3, // Monday -> Friday
		-1, // Tuesday -> Monday
		-1, // Wednesday -> Tuesday
		-1, // Thursday -> Wednesday
		-1, // Friday -> Thursday
		-2 // Saturday -> Thursday
	];
	var new_date = new Date(date.getTime());
	new_date.setDate(date.getDate() + delta[date.getDay()]);
	return new_date;
}

/** Find next day for API request */
function nextArxivDay(date: Date) {
	var delta = [
		+1, // Sunday -> Monday
		+1, // Monday -> Tuesday
		+1, // Tuesday -> Wednesday
		+1, // Wednesday -> Thursday
		+1, // Thursday -> Friday
		+3, // Friday -> Monday
		+2 // Saturday -> Monday
	];
	var new_date = new Date(date.getTime());
	new_date.setDate(date.getDate() + delta[date.getDay()]);
	return new_date;
}

/** Transform Data object for API request */
function dateToArxivDate(date: Date, from: boolean): string {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var text = '' + year;
	if (month < 10) text += '0';
	text += month;
	if (day < 10) text += '0';
	text += day;
	if (from)
		text += '2000';
	else
		text += '1959';
	return text;
}
