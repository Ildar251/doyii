export interface Service {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	title: string
	shortText?: string
	icon?: Media | null
	content: any
	image?: Media | null
}

export interface Media {
	id: number
	name: string
	alternativeText: string
	caption: string
	width: number
	height: number
	formats: {
		thumbnail: MediaFormat
		small: MediaFormat
		medium: MediaFormat
		large: MediaFormat
	}
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl: string
	provider: string
	createdAt: Date
	updatedAt: Date
}

export interface MediaFormat {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path: string
	url: string
}

export interface Sections {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	section?: Section
	poster?: Media | null
	video?: Media | null
	image?: Media | null
	about_items?: AboutItem[]
	advantages_items?: AdvantageItem[]
	clients?: Media[] | null
}

export interface Section {
	header?: Header
	button?: Button
}

export interface Header {
	title?: string
	description?: string
}

export interface Button {
	text?: string
	link?: string
}

export interface Project {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	title?: string
	text?: string
	slug?: string
	image?: Media
	projects_tags: ProjectsTag[]
	about?: string
	what_done?: string
	result?: string
}

export interface ProjectsTag {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	text?: string
}

export interface AboutItem {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	text?: string
	num?: string
}

export interface AdvantageItem {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	title: string
	icon?: Media
}

export interface Team {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	fio?: string
	info?: string
	image?: Media
}

export interface Review {
	id: number
	createdAt: Date
	updatedAt: Date
	publishedAt?: Date
	image?: Media
}
