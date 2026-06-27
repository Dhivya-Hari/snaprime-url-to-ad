import { createServerFn } from '@tanstack/react-start'
import { regenerateAd } from '../../lib/ai'
import type { BrandProfile } from '../../types/brand'
import type { GeneratedAd } from '../../types/ad'

export const regenerateAdServerFn = createServerFn({ method: 'POST' })
  .validator((brandProfile: BrandProfile) => brandProfile)
  .handler(async ({ data: brandProfile }): Promise<GeneratedAd> => {
    return regenerateAd(brandProfile)
  })