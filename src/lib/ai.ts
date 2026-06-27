import type { ExtractedWebsite } from './extractor'
import type { BrandProfile } from '../types/brand'
import type { GeneratedAd } from '../types/ad'

export async function generateBrandProfile(
  extracted: ExtractedWebsite,
): Promise<BrandProfile> {
  return {
    whatClientDoes: extracted.title || 'not found',
    targetAudience: 'Website visitors and potential customers',
    valueProposition: extracted.description || 'not found',
    toneOfVoice: 'Clear, confident, and brand-led',
    colorPalette: extracted.colors.length > 0 ? extracted.colors : ['#000000'],
    candidateImages: extracted.images,
    confidenceNotes: [
      'Mock AI mode is enabled because live AI quota was unavailable during development.',
      extracted.message,
    ],
  }
}

export async function generateAds(
  brandProfile: BrandProfile,
): Promise<GeneratedAd[]> {
  const image = brandProfile.candidateImages[0] || ''

  return [
    {
      id: crypto.randomUUID(),
      creativeIdea: 'Introduce the brand with a clear benefit-led message.',
      primaryText: brandProfile.valueProposition,
      headline: brandProfile.whatClientDoes,
      description: 'Discover more from the brand today.',
      cta: 'Learn More',
      imageUrl: image,
    },
    {
      id: crypto.randomUUID(),
      creativeIdea: 'Highlight the brand promise in a simple direct ad.',
      primaryText: `Looking for something made for you? ${brandProfile.whatClientDoes}`,
      headline: 'Explore the brand',
      description: brandProfile.valueProposition,
      cta: 'Shop Now',
      imageUrl: image,
    },
  ]
}

export async function regenerateAd(
  brandProfile: BrandProfile,
): Promise<GeneratedAd> {
  const image =
    brandProfile.candidateImages[1] || brandProfile.candidateImages[0] || ''

  return {
    id: crypto.randomUUID(),
    creativeIdea: 'Fresh variation focused on action and urgency.',
    primaryText: brandProfile.valueProposition,
    headline: 'Ready to explore?',
    description: `A simple way to discover what ${brandProfile.whatClientDoes} offers.`,
    cta: 'Get Started',
    imageUrl: image,
  }
}