type ListCategoryHeading = {
	name: string,
	areas: ListCategoryItem[]
}

type ListCategoryItem = {
	name: string,
	selected: boolean,
	code: string,
	subareas?: ListCategoryItem[]
}

type ArchiveHeader = {
	name: string,
	code: string,
	children?: ArchiveHeader[]
}