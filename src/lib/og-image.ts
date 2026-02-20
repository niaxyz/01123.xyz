import sharp from 'sharp';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const BRAND_NAME = '01123.xyz';
const BRAND_TAGLINE = 'Cuaderno de Nia';

const FALLBACK_TITLE = `${BRAND_NAME} · ${BRAND_TAGLINE}`;
const FALLBACK_DESCRIPTION = 'Ideas sobre IA, sistemas y criterio tecnico.';

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

const wrapText = (value: string, maxCharsPerLine: number, maxLines: number): string[] => {
	const normalized = normalizeWhitespace(value);
	if (!normalized) {
		return [];
	}

	const lines: string[] = [];
	let remaining = normalized;

	while (remaining.length > 0 && lines.length < maxLines) {
		if (remaining.length <= maxCharsPerLine) {
			lines.push(remaining);
			remaining = '';
			break;
		}

		let breakpoint = remaining.lastIndexOf(' ', maxCharsPerLine);
		if (breakpoint <= 0) {
			breakpoint = maxCharsPerLine;
		}

		lines.push(remaining.slice(0, breakpoint).trimEnd());
		remaining = remaining.slice(breakpoint).trimStart();
	}

	if (remaining.length > 0 && lines.length > 0) {
		lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, Math.max(0, maxCharsPerLine - 1)).trimEnd()}…`;
	}

	return lines;
};

const toTitleLines = (title: string) =>
	wrapText(title, 30, 4).map((line, index) => `<tspan x="84" dy="${index === 0 ? 0 : 74}">${escapeXml(line)}</tspan>`).join('');

const toDescriptionLines = (description: string) =>
	wrapText(description, 66, 2)
		.map((line, index) => `<tspan x="84" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`)
		.join('');

const buildSvg = ({ title, description }: { title: string; description?: string }) => {
	const normalizedTitle = normalizeWhitespace(title || FALLBACK_TITLE);
	const normalizedDescription = normalizeWhitespace(description || FALLBACK_DESCRIPTION);

	const titleLines = toTitleLines(normalizedTitle);
	const descriptionLines = toDescriptionLines(normalizedDescription);

	return `<svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(normalizedTitle)}</title>
  <desc id="desc">${escapeXml(normalizedDescription)}</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0A1326" />
      <stop offset="1" stop-color="#12284A" />
    </linearGradient>
    <linearGradient id="accent" x1="760" y1="80" x2="1090" y2="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7CCBFF" stop-opacity="0.35" />
      <stop offset="1" stop-color="#7CCBFF" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#background)" />
  <circle cx="980" cy="150" r="220" fill="url(#accent)" />
  <circle cx="176" cy="540" r="170" fill="#7CCBFF" fill-opacity="0.09" />
  <rect x="84" y="84" width="210" height="46" rx="23" fill="#7CCBFF" fill-opacity="0.2" />
  <text x="104" y="114" fill="#D9EEFF" font-family="ui-sans-serif, system-ui, sans-serif" font-size="24" font-weight="600">${BRAND_NAME}</text>
  <text x="84" y="184" fill="#A8BFE1" font-family="ui-sans-serif, system-ui, sans-serif" font-size="30" font-weight="500">${BRAND_TAGLINE}</text>
  <text x="84" y="262" fill="#F4F8FF" font-family="ui-sans-serif, system-ui, sans-serif" font-size="64" font-weight="700">${titleLines}</text>
  <text x="84" y="544" fill="#C4D6F2" font-family="ui-sans-serif, system-ui, sans-serif" font-size="30" font-weight="500">${descriptionLines}</text>
</svg>`;
};

export const DEFAULT_OG_IMAGE = {
	title: FALLBACK_TITLE,
	description: FALLBACK_DESCRIPTION,
};

export const generateOgImagePng = async ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => {
	const svg = buildSvg({ title, description });
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9, effort: 10 }).toBuffer();
};
