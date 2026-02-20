import { getCollection } from 'astro:content';
import { DEFAULT_OG_IMAGE, generateOgImagePng } from '../../lib/og-image';

export const prerender = true;

const cacheHeaders = {
	'Content-Type': 'image/png',
	'Cache-Control': 'public, max-age=31536000, immutable',
};

type OgProps = {
	title: string;
	description?: string;
};

export async function getStaticPaths() {
	const posts = await getCollection('blog');

	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			title: post.data.title,
			description: post.data.description,
		} satisfies OgProps,
	}));
}

export async function GET({ props }: { props: OgProps }) {
	try {
		const image = await generateOgImagePng({
			title: props.title,
			description: props.description,
		});

		return new Response(image, { headers: cacheHeaders });
	} catch (error) {
		console.error('Failed to generate post OG image, using default fallback.', error);

		const fallbackImage = await generateOgImagePng(DEFAULT_OG_IMAGE);
		return new Response(fallbackImage, { headers: cacheHeaders });
	}
}
