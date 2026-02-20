import { DEFAULT_OG_IMAGE, generateOgImagePng } from '../lib/og-image';

export const prerender = true;

export async function GET() {
	const image = await generateOgImagePng(DEFAULT_OG_IMAGE);

	return new Response(image, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
