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

export function buildQuery(data: ArchiveHeader[]): string {
	//console.log(data);
	return 'cat:astro-ph.GA+OR+cat:math.AT+OR+cat:math.CT'
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
		desc: 'Computer Science',
		code: 'cs',
		checked: false,
		categories: [
			{
				code: 'cs.AI',
				desc: 'Artificial Intelligence',
				checked: false,
			},
			{
				code: 'cs.AR',
				desc: 'Hardware Architecture',
				checked: false,
			},
			{
				code: 'cs.CC',
				desc: 'Computational Complexity',
				checked: false,
			},
			{
				code: 'cs.CE',
				desc: 'Computation Engineering, Finance and Science',
				checked: false,
			},
			{
				code: 'cs.CG',
				desc: 'Computational Geometry',
				checked: false,
			},
			{
				code: 'cs.CL',
				desc: 'Computation and Language',
				checked: false,
			},
			{
				code: 'cs.CR',
				desc: 'Cryptography and Security',
				checked: false,
			},
			{
				code: 'cs.CV',
				desc: 'Computer Vision and Pattern Recognition',
				checked: false,
			},
			{
				code: 'cs.CY',
				desc: 'Computers and Society',
				checked: false,
			},
			{
				code: 'cs.DB',
				desc: 'Databases',
				checked: false,
			},
			{
				code: 'cs.DC',
				desc: 'Distributed, Parallel, and Cluster Computing',
				checked: false,
			},
			{
				code: 'cs.DL',
				desc: 'Digital Libraries',
				checked: false,
			},
			{
				code: 'cs.DM',
				desc: 'Discrete Mathematics',
				checked: false,
			},
			{
				code: 'cs.DS',
				desc: 'Data Structures and Algorithms',
				checked: false,
			},
			{
				code: 'cs.ET',
				desc: 'Emerging Technologies',
				checked: false,
			},
			{
				code: 'cs.FL',
				desc: 'Formal Languages and Automata Theory',
				checked: false,
			},
			{
				code: 'cs.GL',
				desc: 'General Literature',
				checked: false,
			},
			{
				code: 'cs.GR',
				desc: 'Graphics',
				checked: false,
			},
			{
				code: 'cs.GT',
				desc: 'Computer Science and Game Theory',
				checked: false,
			},
			{
				code: 'cs.HC',
				desc: 'Human-Computer Interaction',
				checked: false,
			},
			{
				code: 'cs.IR',
				desc: 'Information Retrieval',
				checked: false,
			},
			{
				code: 'cs.IT',
				desc: 'Information Theory',
				checked: false,
			},
			{
				code: 'cs.LG',
				desc: 'Machine Learning',
				checked: false,
			},
			{
				code: 'cs.LO',
				desc: 'Logic in Computer Science',
				checked: false,
			},
			{
				code: 'cs.MA',
				desc: 'Multiagent Systems',
				checked: false,
			},
			{
				code: 'cs.MM',
				desc: 'Multimedia',
				checked: false,
			},
			{
				code: 'cs.MS',
				desc: 'Mathematical Software',
				checked: false,
			},
			{
				code: 'cs.NA',
				desc: 'Numerical Analysis',
				checked: false,
			},
			{
				code: 'cs.NE',
				desc: 'Neural and Evolutionary Computing',
				checked: false,
			},
			{
				code: 'cs.NI',
				desc: 'Networking and Internet Architecture',
				checked: false,
			},
			{
				code: 'cs.OH',
				desc: 'Other Computer Science',
				checked: false,
			},
			{
				code: 'cs.OS',
				desc: 'Operating System',
				checked: false,
			},
			{
				code: 'cs.PF',
				desc: 'Performance',
				checked: false,
			},
			{
				code: 'cs.PL',
				desc: 'Programming Languages',
				checked: false,
			},
			{
				code: 'cs.RO',
				desc: 'Robotics',
				checked: false,
			},
			{
				code: 'cs.SC',
				desc: 'Symbolic Computation',
				checked: false,
			},
			{
				code: 'cs.SD',
				desc: 'Sound',
				checked: false,
			},
			{
				code: 'cs.SE',
				desc: 'Software Engineering',
				checked: false,
			},
			{
				code: 'cs.SI',
				desc: 'Social and Information Networks',
				checked: false,
			},
			{
				code: 'cs.SY',
				desc: 'Systems and Control',
				checked: false,
			}
		]
	},
	{
		desc: 'Economics',
		code: 'econ',
		checked: false,
		categories: [
			{
				code: 'econ.EM',
				desc: 'Econometrics',
				checked: false,
			},
			{
				code: 'econ.GN',
				desc: 'General Economics',
				checked: false,
			},
			{
				code: 'econ.TH',
				desc: 'Theoretical Economics',
				checked: false,
			}
		]
	},
	{
		desc: 'Electrical Engineering and Systems Scicence',
		code: 'eess',
		checked: false,
		categories: [
			{
				code: 'eess.AS',
				desc: 'Audio and Speech Processing',
				checked: false,
			},
			{
				code: 'eess.IV',
				desc: 'Image and Video Processing',
				checked: false,
			},
			{
				code: 'eess.SP',
				desc: 'Signal Processing',
				checked: false,
			},
			{
				code: 'eess.SY',
				desc: 'Systems and Control',
				checked: false,
			}
		]
	},
	{
		desc: 'Mathematics',
		code: 'math',
		checked: false,
		categories: [
			{
				code: 'math.AC',
				desc: 'Commutative Algebra',
				checked: false,
			},
			{
				code: 'math.AG',
				desc: 'Algebraic Geometry',
				checked: false,
			},
			{
				code: 'math.AP',
				desc: 'Analysis of PDEs',
				checked: false,
			},
			{
				code: 'math.AT',
				desc: 'Algebraic Topology',
				checked: false,
			},
			{
				code: 'math.CA',
				desc: 'Classical Analysis and ODEs',
				checked: false,
			},
			{
				code: 'math.CO',
				desc: 'Combinatorics',
				checked: false,
			},
			{
				code: 'math.CT',
				desc: 'Category Theory',
				checked: false,
			},
			{
				code: 'math.CV',
				desc: 'Complex Variables',
				checked: false,
			},
			{
				code: 'math.DG',
				desc: 'Differential Geometry',
				checked: false,
			},
			{
				code: 'math.DS',
				desc: 'Dynamical Systems',
				checked: false,
			},
			{
				code: 'math.FA',
				desc: 'Functional Analysis',
				checked: false,
			},
			{
				code: 'math.GM',
				desc: 'General Mathematics',
				checked: false,
			},
			{
				code: 'math.GN',
				desc: 'General Topology',
				checked: false,
			},
			{
				code: 'math.GR',
				desc: 'Group Theory',
				checked: false,
			},
			{
				code: 'math.GT',
				desc: 'Geometric Topology',
				checked: false,
			},
			{
				code: 'math.HO',
				desc: 'History and Overview',
				checked: false,
			},
			{
				code: 'math.IT',
				desc: 'Information Theory',
				checked: false,
			},
			{
				code: 'math.KT',
				desc: 'K-Theory and Homology',
				checked: false,
			},
			{
				code: 'math.LO',
				desc: 'Logic',
				checked: false,
			},
			{
				code: 'math.MG',
				desc: 'Metric Geometry',
				checked: false,
			},
			{
				code: 'math.MP',
				desc: 'Mathematical Physics',
				checked: false,
			},
			{
				code: 'math.NA',
				desc: 'Numerical Analysis',
				checked: false,
			},
			{
				code: 'math.NT',
				desc: 'Number Theory',
				checked: false,
			},
			{
				code: 'math.OA',
				desc: 'Operator Algebras',
				checked: false,
			},
			{
				code: 'math.OC',
				desc: 'Optimization and Control',
				checked: false,
			},
			{
				code: 'math.PR',
				desc: 'Probability',
				checked: false,
			},
			{
				code: 'math.QA',
				desc: 'Quantum Algebra',
				checked: false,
			},
			{
				code: 'math.RA',
				desc: 'Rings and Algebras',
				checked: false,
			},
			{
				code: 'math.RT',
				desc: 'Representation Theory',
				checked: false,
			},
			{
				code: 'math.SG',
				desc: 'Symplectic Geometry',
				checked: false,
			},
			{
				code: 'math.SP',
				desc: 'Spectral Theory',
				checked: false,
			},
			{
				code: 'math.ST',
				desc: 'Statistics Theory',
				checked: false,
			}
		]
	},
	{
		desc: 'Physics',
		code: '',
		checked: false,
		categories: [
			{
				desc: 'Astrophysics',
				code: 'astro-ph',
				checked: false,
				categories: [
					{
						code: 'astro-ph.CO',
						desc: 'Cosmology and Nongalactic Astrophysics',
						checked: false,
					},
					{
						code: 'astro-ph.EP',
						desc: 'Earth and Planetary Astrophysics',
						checked: false,
					},
					{
						code: 'astro-ph.GA',
						desc: 'Galactic Astrophysics',
						checked: false,
					},
					{
						code: 'astro-ph.HE',
						desc: 'High Energy Astrophysical Phenomena',
						checked: false,
					},
					{
						code: 'astro-ph.IM',
						desc: 'Instrumentation and Methods for Astrophysics',
						checked: false,
					},
					{
						code: 'astro-ph.SR',
						desc: 'Solar and Stellar Astrophysics',
						checked: false,
					}
				]
			},
			{
				desc: 'Condensed Matter',
				code: 'cond-mat',
				checked: false,
				categories: [
					{
						code: 'cond-mat.dis-nn',
						desc: 'Disordered Systems and Neural Networks',
						checked: false,
					},
					{
						code: 'cond-mat.mes-hall',
						desc: 'Mesoscale and Nanoscale Physics',
						checked: false,
					},
					{
						code: 'cond-mat.mtrl-sci',
						desc: 'Materials Science',
						checked: false,
					},
					{
						code: 'cond-mat.other',
						desc: 'Other Condensed Matter',
						checked: false,
					},
					{
						code: 'cond-mat.quant-gas',
						desc: 'Quantum Gases',
						checked: false,
					},
					{
						code: 'cond-mat.soft',
						desc: 'Soft Condensed Matter',
						checked: false,
					},
					{
						code: 'cond-mat.stat-mech',
						desc: 'Statistical Mechanics',
						checked: false,
					},
					{
						code: 'cond-mat.str-el',
						desc: 'Strongly Correlated Electrons',
						checked: false,
					},
					{
						code: 'cond-mat.supr-con',
						desc: 'Superconductivity',
						checked: false,
					}
				]
			},
			{
				code: 'gr-qc',
				desc: 'General Relativity and Quantum Cosmology',
				checked: false,
			},
			{
				code: 'hep-ex',
				desc: 'High Energy Physics - Experiment',
				checked: false,
			},
			{
				code: 'hep-lat',
				desc: 'High Energy Physics - Lattice',
				checked: false,
			},
			{
				code: 'hep-ph',
				desc: 'High Energy Physics - Phenomenology',
				checked: false,
			},
			{
				code: 'hep-th',
				desc: 'High Energy Physics - Theory',
				checked: false,
			},
			{
				code: 'math-ph',
				desc: 'Mathematical Physics',
				checked: false,
			},
			{
				desc: 'Nonlinear Sciences',
				code: 'nlin',
				checked: false,
				categories: [
					{
						code: 'nlin.AO',
						desc: 'Adaptation and Self-Organizing Systems',
						checked: false,
					},
					{
						code: 'nlin.CD',
						desc: 'Chaotic Dynamics',
						checked: false,
					},
					{
						code: 'nlin.CG',
						desc: 'Cellular Automata and Lattice Gases',
						checked: false,
					},
					{
						code: 'nlin.PS',
						desc: 'Pattern Formation and Solitons',
						checked: false,
					},
					{
						code: 'nlin.SI',
						desc: 'Statistics and Informatics',
						checked: false,
					}
				]
			},
			{
				code: 'nucl-ex',
				desc: 'Nuclear Experiment',
				checked: false,
			},
			{
				code: 'nucl-th',
				desc: 'Nuclear Theory',
				checked: false,
			},
			{
				desc: 'Physics',
				code: 'physics',
				checked: false,
				categories: [
					{
						code: 'physics.acc-ph',
						desc: 'Accelerator Physics',
						checked: false,
					},
					{
						code: 'physics.ao-ph',
						desc: 'Atmospheric and Oceanic Physics',
						checked: false,
					},
					{
						code: 'physics.app-ph',
						desc: 'Applied Physics',
						checked: false,
					},
					{
						code: 'physics.atm-clus',
						desc: 'Atomic and Molecular Clusters',
						checked: false,
					},
					{
						code: 'physics.atom-ph',
						desc: 'Atomic Physics',
						checked: false,
					},
					{
						code: 'physics.bio-ph',
						desc: 'Biological Physics',
						checked: false,
					},
					{
						code: 'physics.chem-ph',
						desc: 'Chemical Physics',
						checked: false,
					},
					{
						code: 'physics.class-ph',
						desc: 'Classical Physics',
						checked: false,
					},
					{
						code: 'physics.comp-ph',
						desc: 'Computational Physics',
						checked: false,
					},
					{
						code: 'physics.data-an',
						desc: 'Data Analysis, Statistics and Probability',
						checked: false,
					},
					{
						code: 'physics.ed-ph',
						desc: 'Physics Education',
						checked: false,
					},
					{
						code: 'physics.flu-dyn',
						desc: 'Fluid Dynamics',
						checked: false,
					},
					{
						code: 'physics.gen-ph',
						desc: 'General Physics',
						checked: false,
					},
					{
						code: 'physics.geo-ph',
						desc: 'Geophysics',
						checked: false,
					},
					{
						code: 'physics.hist-ph',
						desc: 'History of Physics',
						checked: false,
					},
					{
						code: 'physics.ins-det',
						desc: 'Instrumentation and Detectors',
						checked: false,
					},
					{
						code: 'physics.med-ph',
						desc: 'Medical Physics',
						checked: false,
					},
					{
						code: 'physics.optics',
						desc: 'Optics',
						checked: false,
					},
					{
						code: 'physics.plasm-ph',
						desc: 'Plasma Physics',
						checked: false,
					},
					{
						code: 'physics.pop-ph',
						desc: 'Popular Physics',
						checked: false,
					},
					{
						code: 'physics.soc-ph',
						desc: 'Physics and Society',
						checked: false,
					},
					{
						code: 'physics.space-ph',
						desc: 'Space Physics',
						checked: false,
					}
				]
			},
			{
				code: 'quant-ph',
				desc: 'Quantum Physics',
				checked: false,
			}
		]
	},
	{
		desc: 'Quantitative Biology',
		code: 'q-bio',
		checked: false,
		categories: [
			{
				code: 'q-bio.BM',
				desc: 'Biomolecules',
				checked: false,
			},
			{
				code: 'q-bio.CB',
				desc: 'Cell Behavior',
				checked: false,
			},
			{
				code: 'q-bio.GN',
				desc: 'Genomics',
				checked: false,
			},
			{
				code: 'q-bio.MN',
				desc: 'Molecular Networks',
				checked: false,
			},
			{
				code: 'q-bio.NC',
				desc: 'Neurons and Cognition',
				checked: false,
			},
			{
				code: 'q-bio.OT',
				desc: 'Other Quantitative Biology',
				checked: false,
			},
			{
				code: 'q-bio.PE',
				desc: 'Populations and Evolution',
				checked: false,
			},
			{
				code: 'q-bio.QM',
				desc: 'Quantitative Methods',
				checked: false,
			},
			{
				code: 'q-bio.SC',
				desc: 'Subcellular Processes',
				checked: false,
			},
			{
				code: 'q-bio.TO',
				desc: 'Tissues and Organs',
				checked: false,
			}
		]
	},
	{
		desc: 'Quantitative Finance',
		code: 'q-fin',
		checked: false,
		categories: [
			{
				code: 'q-fin.CP',
				desc: 'Computational Finance',
				checked: false,
			},
			{
				code: 'q-fin.EC',
				desc: 'Economics',
				checked: false,
			},
			{
				code: 'q-fin.GN',
				desc: 'General Finance',
				checked: false,
			},
			{
				code: 'q-fin.MF',
				desc: 'Mathematical Finance',
				checked: false,
			},
			{
				code: 'q-fin.PM',
				desc: 'Portfolio Management',
				checked: false,
			},
			{
				code: 'q-fin.PR',
				desc: 'Pricing of Securities',
				checked: false,
			},
			{
				code: 'q-fin.RM',
				desc: 'Risk Management',
				checked: false,
			},
			{
				code: 'q-fin.ST',
				desc: 'Statistical Finance',
				checked: false,
			},
			{
				code: 'q-fin.TR',
				desc: 'Trading and Market Microstructure',
				checked: false,
			}
		]
	},
	{
		desc: 'Statistics',
		code: 'stat',
		checked: false,
		categories: [
			{
				code: 'stat.AP',
				desc: 'Applications',
				checked: false,
			},
			{
				code: 'stat.CO',
				desc: 'Computation',
				checked: false,
			},
			{
				code: 'stat.ME',
				desc: 'Methodology',
				checked: false,
			},
			{
				code: 'stat.ML',
				desc: 'Machine Learning',
				checked: false,
			},
			{
				code: 'stat.OT',
				desc: 'Other Statistics',
				checked: false,
			},
			{
				code: 'stat.TH',
				desc: 'Statistics Theory',
				checked: false,
			}
		]
	}
]
