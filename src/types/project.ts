import type { BrandProfile } from './brand'
import type { GeneratedAd } from './ad'

export type ProjectResult = {
  id: string
  sourceUrl: string
  brandProfile: BrandProfile
  ads: GeneratedAd[]
  extractionStatus: 'success' | 'partial' | 'failed'
  extractionMessage: string
  createdAt: string
}