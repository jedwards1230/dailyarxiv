type ArchiveHeader = {
	name: string,
	code: string,
	children?: ArchiveHeader[]
}

type ArchiveResult = {
	comment?: string,
	primaryCategory?: string,
	author: { name: string }[],
	category: string[],
	id: string,
	link: string[],
	published: string,
	summary: string,
	title: string,
	updated: string,
}