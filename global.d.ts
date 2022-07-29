type ArchiveHeader = {
	id?: string;
	desc: string,
	code: string,
	checked: boolean,
	categories?: ArchiveHeader[]
}

type ArchiveResult = {
	comment?: string,
	codes?: string[],
	author: string[],
	id: string,
	link: string[],
	published: string,
	summary: string,
	title: string,
	updated: string,
}

type CategorySelection = {
	[key: string]: string[]
}

type CategoryForm = {
	categories: ArchiveHeader[]
	datepicker: Date
}