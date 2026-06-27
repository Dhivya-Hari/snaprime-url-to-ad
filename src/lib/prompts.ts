import type { ExtractedWebsite } from './extractor'

export function brandProfilePrompt(extracted: ExtractedWebsite) {
  return `
You are creating a brand profile from website content.

Rules:
- Use only the website content provided.
- Do not invent facts.
- If something is not clearly stated, return "not found".
- Return only valid JSON. No markdown.

Website title:
${extracted.title}

Website description:
${extracted.description}

Website text:
${extracted.text}

Candidate colors:
${extracted.colors.join(', ') || 'not found'}

Return JSON:
{
  "whatClientDoes": "string",
  "targetAudience": "string",
  "valueProposition": "string",
  "toneOfVoice": "string",
  "colorPalette": ["string"],
  "confidenceNotes": ["string"]
}
`
}