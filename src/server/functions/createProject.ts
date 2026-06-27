import { createServerFn } from '@tanstack/react-start'
import { extractWebsite } from '../../lib/extractor'
import { generateAds, generateBrandProfile } from '../../lib/ai'
import type { ProjectResult } from '../../types/project'

export const createProjectServerFn = createServerFn({ method: 'POST' })
  .validator((sourceUrl: string) => sourceUrl)
  .handler(async ({ data: sourceUrl }): Promise<ProjectResult> => {
    const extracted = await extractWebsite(sourceUrl)

    const brandProfile = await generateBrandProfile(extracted)
    const ads = await generateAds(brandProfile)

    return {
      id: crypto.randomUUID(),
      sourceUrl,
      brandProfile,
      ads,
      extractionStatus: extracted.status,
      extractionMessage: extracted.message,
      createdAt: new Date().toISOString(),
    }
  })