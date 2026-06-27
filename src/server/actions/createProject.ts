import { extractWebsite } from '../../lib/extractor'
import type { ProjectResult } from '../../types/project'

export async function createProjectFromUrl(
  sourceUrl: string,
): Promise<ProjectResult> {
  const extracted = await extractWebsite(sourceUrl)

  return {
    id: crypto.randomUUID(),
    sourceUrl,
    brandProfile: {
      whatClientDoes: extracted.title || 'not found',
      targetAudience: 'not found',
      valueProposition: extracted.description || 'not found',
      toneOfVoice: 'not found',
      colorPalette: extracted.colors,
      candidateImages: extracted.images,
      confidenceNotes: [extracted.message],
    },
    ads: [],
    extractionStatus: extracted.status,
    extractionMessage: extracted.message,
    createdAt: new Date().toISOString(),
  }
}