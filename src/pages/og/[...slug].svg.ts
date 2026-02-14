import { getCollection } from 'astro:content';

const SITE_NAME = '01123.xyz';
const SITE_TAGLINE = 'Cuaderno de Nia';

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export async function getStaticPaths() {
	const posts = await getCollection('blog');

	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			title: post.data.title,
			description: post.data.description,
		},
	}));
}

export async function GET({ props }: { props: { title: string; description: string } }) {
	const title = escapeXml(props.title);
	const description = escapeXml(props.description);

	const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${description}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B1020"/>
      <stop offset="1" stop-color="#1C2748"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1020" cy="120" r="170" fill="#7AA2FF" fill-opacity="0.16"/>
  <circle cx="170" cy="540" r="220" fill="#7AA2FF" fill-opacity="0.10"/>
  <text x="88" y="108" fill="#9FB0D9" font-family="Atkinson, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="28">${SITE_NAME}</text>
  <text x="88" y="164" fill="#B9C5E6" font-family="Atkinson, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="36">${SITE_TAGLINE}</text>
  <foreignObject x="88" y="210" width="1020" height="290">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Atkinson, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #EAF0FF; font-size: 66px; font-weight: 700; line-height: 1.08; letter-spacing: -0.02em;">
      ${title}
    </div>
  </foreignObject>
  <foreignObject x="88" y="528" width="980" height="70">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Atkinson, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #9FB0D9; font-size: 28px; line-height: 1.3;">
      ${description}
    </div>
  </foreignObject>
</svg>`;

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
