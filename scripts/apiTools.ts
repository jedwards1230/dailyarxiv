import xml2js from 'xml2js'

export async function fetchArchive(url: string) {
	const parser = new xml2js.Parser();

	try {
		// fethch the xml from the url and parse the list of papers
		const response = await fetch(url);
		const xml = await response.text();
		const json = await parser.parseStringPromise(xml);
		/* const papers: ArchiveResult[] = json.feed.entry.map((entry: any) => {
			return cleanData(entry);
		}); */
		const papers: ArchiveResult[] = json.feed.entry.map((e: any) => cleanData(e));

		return papers
	} catch (e) {
		console.log({ e })
	}
}

function cleanData(entry: any) {
	//console.log(entry)
	const paper: ArchiveResult = {
		author: entry.author,
		category: entry.category,
		id: entry.id[0],
		link: entry.link,
		published: entry.published[0],
		summary: entry.summary[0],
		title: entry.title[0],
		updated: entry.updated[0]
	}

	if (entry["arxiv:comment"]) paper.comment = entry["arxiv:comment"][0];
	if (entry["arxiv:primary_category"]) paper.primaryCategory = entry["arxiv:primary_category"][0].$.term;
	return paper
}

export function queryToUrl(query: string, date: Date) {
	const base = '//export.arxiv.org/api/query';
	const to: Date = previousArxivDay(date);
	const from: Date = previousArxivDay(to);
	return base + '?search_query=(' + query + ')+AND+lastUpdatedDate:['
		+ dateToArxivDate(from, true) + '+TO+'
		+ dateToArxivDate(to, false)
		+ ']&max_results=5';
}

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

export const ArxivCategories: ArchiveHeader[] = [
	{
		name: 'Computer Science',
		code: 'cs',
		children: [
			{
				code: 'cs.AI',
				name: 'Artificial Intelligence',
			},
			{
				code: 'cs.AR',
				name: 'Hardware Architecture',
			},
			{
				code: 'cs.CC',
				name: 'Computational Complexity',
			},
			{
				code: 'cs.CE',
				name: 'Computation Engineering, Finance and Science',
			},
			{
				code: 'cs.CG',
				name: 'Computational Geometry',
			},
			{
				code: 'cs.CL',
				name: 'Computation and Language',
			},
			{
				code: 'cs.CR',
				name: 'Cryptography and Security',
			},
			{
				code: 'cs.CV',
				name: 'Computer Vision and Pattern Recognition',
			},
			{
				code: 'cs.CY',
				name: 'Computers and Society',
			},
			{
				code: 'cs.DB',
				name: 'Databases',
			},
			{
				code: 'cs.DC',
				name: 'Distributed, Parallel, and Cluster Computing',
			},
			{
				code: 'cs.DL',
				name: 'Digital Libraries',
			},
			{
				code: 'cs.DM',
				name: 'Discrete Mathematics',
			},
			{
				code: 'cs.DS',
				name: 'Data Structures and Algorithms',
			},
			{
				code: 'cs.ET',
				name: 'Emerging Technologies',
			},
			{
				code: 'cs.FL',
				name: 'Formal Languages and Automata Theory',
			},
			{
				code: 'cs.GL',
				name: 'General Literature',
			},
			{
				code: 'cs.GR',
				name: 'Graphics',
			},
			{
				code: 'cs.GT',
				name: 'Computer Science and Game Theory',
			},
			{
				code: 'cs.HC',
				name: 'Human-Computer Interaction'
			},
			{
				code: 'cs.IR',
				name: 'Information Retrieval'
			},
			{
				code: 'cs.IT',
				name: 'Information Theory'
			},
			{
				code: 'cs.LG',
				name: 'Machine Learning'
			},
			{
				code: 'cs.LO',
				name: 'Logic in Computer Science'
			},
			{
				code: 'cs.MA',
				name: 'Multiagent Systems'
			},
			{
				code: 'cs.MM',
				name: 'Multimedia'
			},
			{
				code: 'cs.MS',
				name: 'Mathematical Software'
			},
			{
				code: 'cs.NA',
				name: 'Numerical Analysis'
			},
			{
				code: 'cs.NE',
				name: 'Neural and Evolutionary Computing'
			},
			{
				code: 'cs.NI',
				name: 'Networking and Internet Architecture'
			},
			{
				code: 'cs.OH',
				name: 'Other Computer Science'
			},
			{
				code: 'cs.OS',
				name: 'Operating System'
			},
			{
				code: 'cs.PF',
				name: 'Performance'
			},
			{
				code: 'cs.PL',
				name: 'Programming Languages'
			},
			{
				code: 'cs.RO',
				name: 'Robotics'
			},
			{
				code: 'cs.SC',
				name: 'Symbolic Computation'
			},
			{
				code: 'cs.SD',
				name: 'Sound'
			},
			{
				code: 'cs.SE',
				name: 'Software Engineering'
			},
			{
				code: 'cs.SI',
				name: 'Social and Information Networks'
			},
			{
				code: 'cs.SY',
				name: 'Systems and Control'
			}
		]
	},
	{
		name: 'Economics',
		code: 'econ',
		children: [
			{
				code: 'econ.EM',
				name: 'Econometrics'
			},
			{
				code: 'econ.GN',
				name: 'General Economics'
			},
			{
				code: 'econ.TH',
				name: 'Theoretical Economics'
			}
		]
	},
	{
		name: 'Electrical Engineering and Systems Scicence',
		code: 'eess',
		children: [
			{
				code: 'eess.AS',
				name: 'Audio and Speech Processing'
			},
			{
				code: 'eess.IV',
				name: 'Image and Video Processing'
			},
			{
				code: 'eess.SP',
				name: 'Signal Processing'
			},
			{
				code: 'eess.SY',
				name: 'Systems and Control'
			}
		]
	},
	{
		name: 'Mathematics',
		code: 'math',
		children: [
			{
				code: 'math.AC',
				name: 'Commutative Algebra'
			},
			{
				code: 'math.AG',
				name: 'Algebraic Geometry'
			},
			{
				code: 'math.AP',
				name: 'Analysis of PDEs'
			},
			{
				code: 'math.AT',
				name: 'Algebraic Topology'
			},
			{
				code: 'math.CA',
				name: 'Classical Analysis and ODEs'
			},
			{
				code: 'math.CO',
				name: 'Combinatorics'
			},
			{
				code: 'math.CT',
				name: 'Category Theory'
			},
			{
				code: 'math.CV',
				name: 'Complex Variables'
			},
			{
				code: 'math.DG',
				name: 'Differential Geometry'
			},
			{
				code: 'math.DS',
				name: 'Dynamical Systems'
			},
			{
				code: 'math.FA',
				name: 'Functional Analysis'
			},
			{
				code: 'math.GM',
				name: 'General Mathematics'
			},
			{
				code: 'math.GN',
				name: 'General Topology'
			},
			{
				code: 'math.GR',
				name: 'Group Theory'
			},
			{
				code: 'math.GT',
				name: 'Geometric Topology'
			},
			{
				code: 'math.HO',
				name: 'History and Overview'
			},
			{
				code: 'math.IT',
				name: 'Information Theory'
			},
			{
				code: 'math.KT',
				name: 'K-Theory and Homology'
			},
			{
				code: 'math.LO',
				name: 'Logic'
			},
			{
				code: 'math.MG',
				name: 'Metric Geometry'
			},
			{
				code: 'math.MP',
				name: 'Mathematical Physics'
			},
			{
				code: 'math.NA',
				name: 'Numerical Analysis'
			},
			{
				code: 'math.NT',
				name: 'Number Theory'
			},
			{
				code: 'math.OA',
				name: 'Operator Algebras'
			},
			{
				code: 'math.OC',
				name: 'Optimization and Control'
			},
			{
				code: 'math.PR',
				name: 'Probability'
			},
			{
				code: 'math.QA',
				name: 'Quantum Algebra'
			},
			{
				code: 'math.RA',
				name: 'Rings and Algebras'
			},
			{
				code: 'math.RT',
				name: 'Representation Theory'
			},
			{
				code: 'math.SG',
				name: 'Symplectic Geometry'
			},
			{
				code: 'math.SP',
				name: 'Spectral Theory'
			},
			{
				code: 'math.ST',
				name: 'Statistics Theory'
			}
		]
	},
	{
		name: 'Physics',
		code: '',
		children: [
			{
				name: 'Astrophysics',
				code: 'astro-ph',
				children: [
					{
						code: 'astro-ph.CO',
						name: 'Cosmology and Nongalactic Astrophysics'
					},
					{
						code: 'astro-ph.EP',
						name: 'Earth and Planetary Astrophysics'
					},
					{
						code: 'astro-ph.GA',
						name: 'Galactic Astrophysics'
					},
					{
						code: 'astro-ph.HE',
						name: 'High Energy Astrophysical Phenomena'
					},
					{
						code: 'astro-ph.IM',
						name: 'Instrumentation and Methods for Astrophysics'
					},
					{
						code: 'astro-ph.SR',
						name: 'Solar and Stellar Astrophysics'
					}
				]
			},
			{
				name: 'Condensed Matter',
				code: 'cond-mat',
				children: [
					{
						code: 'cond-mat.dis-nn',
						name: 'Disordered Systems and Neural Networks'
					},
					{
						code: 'cond-mat.mes-hall',
						name: 'Mesoscale and Nanoscale Physics'
					},
					{
						code: 'cond-mat.mtrl-sci',
						name: 'Materials Science'
					},
					{
						code: 'cond-mat.other',
						name: 'Other Condensed Matter'
					},
					{
						code: 'cond-mat.quant-gas',
						name: 'Quantum Gases'
					},
					{
						code: 'cond-mat.soft',
						name: 'Soft Condensed Matter'
					},
					{
						code: 'cond-mat.stat-mech',
						name: 'Statistical Mechanics'
					},
					{
						code: 'cond-mat.str-el',
						name: 'Strongly Correlated Electrons'
					},
					{
						code: 'cond-mat.supr-con',
						name: 'Superconductivity'
					}
				]
			},
			{
				code: 'gr-qc',
				name: 'General Relativity and Quantum Cosmology'
			},
			{
				code: 'hep-ex',
				name: 'High Energy Physics - Experiment'
			},
			{
				code: 'hep-lat',
				name: 'High Energy Physics - Lattice'
			},
			{
				code: 'hep-ph',
				name: 'High Energy Physics - Phenomenology'
			},
			{
				code: 'hep-th',
				name: 'High Energy Physics - Theory'
			},
			{
				code: 'math-ph',
				name: 'Mathematical Physics'
			},
			{
				name: 'Nonlinear Sciences',
				code: 'nlin',
				children: [
					{
						code: 'nlin.AO',
						name: 'Adaptation and Self-Organizing Systems'
					},
					{
						code: 'nlin.CD',
						name: 'Chaotic Dynamics'
					},
					{
						code: 'nlin.CG',
						name: 'Cellular Automata and Lattice Gases'
					},
					{
						code: 'nlin.PS',
						name: 'Pattern Formation and Solitons'
					},
					{
						code: 'nlin.SI',
						name: 'Statistics and Informatics'
					}
				]
			},
			{
				code: 'nucl-ex',
				name: 'Nuclear Experiment'
			},
			{
				code: 'nucl-th',
				name: 'Nuclear Theory'
			},
			{
				name: 'Physics',
				code: 'physics',
				children: [
					{
						code: 'physics.acc-ph',
						name: 'Accelerator Physics'
					},
					{
						code: 'physics.ao-ph',
						name: 'Atmospheric and Oceanic Physics'
					},
					{
						code: 'physics.app-ph',
						name: 'Applied Physics'
					},
					{
						code: 'physics.atm-clus',
						name: 'Atomic and Molecular Clusters'
					},
					{
						code: 'physics.atom-ph',
						name: 'Atomic Physics'
					},
					{
						code: 'physics.bio-ph',
						name: 'Biological Physics'
					},
					{
						code: 'physics.chem-ph',
						name: 'Chemical Physics'
					},
					{
						code: 'physics.class-ph',
						name: 'Classical Physics'
					},
					{
						code: 'physics.comp-ph',
						name: 'Computational Physics'
					},
					{
						code: 'physics.data-an',
						name: 'Data Analysis, Statistics and Probability'
					},
					{
						code: 'physics.ed-ph',
						name: 'Physics Education'
					},
					{
						code: 'physics.flu-dyn',
						name: 'Fluid Dynamics'
					},
					{
						code: 'physics.gen-ph',
						name: 'General Physics'
					},
					{
						code: 'physics.geo-ph',
						name: 'Geophysics'
					},
					{
						code: 'physics.hist-ph',
						name: 'History of Physics'
					},
					{
						code: 'physics.ins-det',
						name: 'Instrumentation and Detectors'
					},
					{
						code: 'physics.med-ph',
						name: 'Medical Physics'
					},
					{
						code: 'physics.optics',
						name: 'Optics'
					},
					{
						code: 'physics.plasm-ph',
						name: 'Plasma Physics'
					},
					{
						code: 'physics.pop-ph',
						name: 'Popular Physics'
					},
					{
						code: 'physics.soc-ph',
						name: 'Physics and Society'
					},
					{
						code: 'physics.space-ph',
						name: 'Space Physics'
					}
				]
			},
			{
				code: 'quant-ph',
				name: 'Quantum Physics'
			}
		]
	},
	{
		name: 'Quantitative Biology',
		code: 'q-bio',
		children: [
			{
				code: 'q-bio.BM',
				name: 'Biomolecules'
			},
			{
				code: 'q-bio.CB',
				name: 'Cell Behavior'
			},
			{
				code: 'q-bio.GN',
				name: 'Genomics'
			},
			{
				code: 'q-bio.MN',
				name: 'Molecular Networks'
			},
			{
				code: 'q-bio.NC',
				name: 'Neurons and Cognition'
			},
			{
				code: 'q-bio.OT',
				name: 'Other Quantitative Biology'
			},
			{
				code: 'q-bio.PE',
				name: 'Populations and Evolution'
			},
			{
				code: 'q-bio.QM',
				name: 'Quantitative Methods'
			},
			{
				code: 'q-bio.SC',
				name: 'Subcellular Processes'
			},
			{
				code: 'q-bio.TO',
				name: 'Tissues and Organs'
			}
		]
	},
	{
		name: 'Quantitative Finance',
		code: 'q-fin',
		children: [
			{
				code: 'q-fin.CP',
				name: 'Computational Finance'
			},
			{
				code: 'q-fin.EC',
				name: 'Economics'
			},
			{
				code: 'q-fin.GN',
				name: 'General Finance'
			},
			{
				code: 'q-fin.MF',
				name: 'Mathematical Finance'
			},
			{
				code: 'q-fin.PM',
				name: 'Portfolio Management'
			},
			{
				code: 'q-fin.PR',
				name: 'Pricing of Securities'
			},
			{
				code: 'q-fin.RM',
				name: 'Risk Management'
			},
			{
				code: 'q-fin.ST',
				name: 'Statistical Finance'
			},
			{
				code: 'q-fin.TR',
				name: 'Trading and Market Microstructure'
			}
		]
	},
	{
		name: 'Statistics',
		code: 'stat',
		children: [
			{
				code: 'stat.AP',
				name: 'Applications'
			},
			{
				code: 'stat.CO',
				name: 'Computation'
			},
			{
				code: 'stat.ME',
				name: 'Methodology'
			},
			{
				code: 'stat.ML',
				name: 'Machine Learning'
			},
			{
				code: 'stat.OT',
				name: 'Other Statistics'
			},
			{
				code: 'stat.TH',
				name: 'Statistics Theory'
			}
		]
	}
]