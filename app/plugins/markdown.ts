// plugins/markdown.ts
import MarkdownIt from 'markdown-it'

export default defineNuxtPlugin(() => {
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: false,
	})

	const parseMarkdown = (markdown?: string | null): string => {
		if (!markdown) return ''
		return md.render(markdown)
	}

	return {
		provide: {
			markdown: parseMarkdown,
		},
	}
})
