/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * A single content block of a blog post. Posts are authored as an ordered
 * list of blocks so an article can mix headings, paragraphs and call-to-action
 * links while staying easy to render.
 */
export type BlogBlock =
	| {
			/** A section heading. */
			type: 'heading';
			/** The heading text. */
			text: string;
	  }
	| {
			/** A body paragraph. */
			type: 'paragraph';
			/** The paragraph text. */
			text: string;
	  }
	| {
			/** An inline image. */
			type: 'image';
			/** The image source (public path or URL). */
			src: string;
			/** The image's alternative text. */
			alt: string;
			/** An optional caption shown beneath the image. */
			caption?: string;
	  }
	| {
			/** A row of smaller images shown side by side. */
			type: 'gallery';
			/** The images to display in the row. */
			images: {
				/** The image source (public path or URL). */
				src: string;
				/** The image's alternative text. */
				alt: string;
				/** An optional caption shown beneath the image. */
				caption?: string;
			}[];
	  }
	| {
			/** A call-to-action button link. */
			type: 'cta';
			/** The button label. */
			text: string;
			/** The hyperlink reference. */
			href: string;
			/** The FontAwesome icon name. */
			icon?: string;
			/** The FontAwesome icon prefix. Defaults to 'fas' (solid icons). */
			iconPrefix?: string;
	  }
	| {
			/** An official app store badge link. */
			type: 'store-badge';
			/** Which store's official badge artwork to render. */
			store: 'google-play' | 'app-store';
			/** The store listing to link to. */
			href: string;
	  };

/**
 * Represents a blog post / article.
 */
export type BlogPost = {
	/**
	 * The id (slug) of the blog post, used in the URL.
	 */
	id: string;

	/**
	 * The title of the blog post.
	 */
	title: string;

	/**
	 * The publication date in ISO format (YYYY-MM-DD).
	 */
	date: string;

	/**
	 * The estimated reading time in minutes.
	 */
	readingMinutes: number;

	/**
	 * A short teaser shown in the blog overview.
	 */
	excerpt: string;

	/**
	 * Topical tags for the post.
	 */
	tags: string[];

	/**
	 * The FontAwesome icon representing the post.
	 */
	icon: string;

	/**
	 * The FontAwesome icon prefix. Defaults to 'fas' (solid icons).
	 */
	iconPrefix?: string;

	/**
	 * The gradient used for the post tile / header.
	 */
	tileGradient: string;

	/**
	 * The id of a related project. When set, the post is surfaced on that
	 * project's page and links back to it.
	 */
	projectId?: string;

	/**
	 * The body of the article as an ordered list of content blocks.
	 */
	content: BlogBlock[];
};
