import { db } from '../db/client'
import { ads, projects } from '../db/schema'
import type { BrandProfile } from '../../types/brand'
import type { GeneratedAd } from '../../types/ad'

export async function createProjectRecord(params: {
  sourceUrl: string
  brandProfile: BrandProfile
  generatedAds: GeneratedAd[]
  extractionStatus: 'success' | 'partial' | 'failed'
  extractionMessage: string
}) {
  const projectId = crypto.randomUUID()

  await db.insert(projects).values({
    id: projectId,
    sourceUrl: params.sourceUrl,
    brandProfile: params.brandProfile,
    extractionStatus: params.extractionStatus,
    extractionMessage: params.extractionMessage,
  })

  if (params.generatedAds.length > 0) {
    await db.insert(ads).values(
      params.generatedAds.map((ad) => ({
        id: ad.id,
        projectId,
        creativeIdea: ad.creativeIdea,
        primaryText: ad.primaryText,
        headline: ad.headline,
        description: ad.description,
        cta: ad.cta,
        imageUrl: ad.imageUrl,
      })),
    )
  }

  return projectId
}