import type { BrandProfile as BrandProfileType } from '../types/brand'

type Props = {
  brandProfile: BrandProfileType
}

export function BrandProfile({ brandProfile }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">Brand Profile</h2>

      <p><strong>What client does:</strong> {brandProfile.whatClientDoes}</p>
      <p><strong>Target audience:</strong> {brandProfile.targetAudience}</p>
      <p><strong>Value proposition:</strong> {brandProfile.valueProposition}</p>
      <p><strong>Tone:</strong> {brandProfile.toneOfVoice}</p>
    </div>
  )
}