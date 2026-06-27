import type { GeneratedAd } from '../types/ad'
import { EditableField } from './EditableField'

type Props = {
  ad: GeneratedAd
  candidateImages: string[]
  onChange: (updatedAd: GeneratedAd) => void
  onRegenerate: () => void
}

export function AdCard({
  ad,
  candidateImages,
  onChange,
  onRegenerate,
}: Props) {
  function updateField(field: keyof GeneratedAd, value: string) {
    onChange({
      ...ad,
      [field]: value,
    })
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <h3 className="mb-2 text-xl font-bold">Ad Preview</h3>

      <p className="mb-4 text-sm text-gray-500">{ad.creativeIdea}</p>

      {ad.imageUrl && (
        <img
          src={ad.imageUrl}
          alt="Ad creative"
          className="mb-4 h-56 w-full rounded-xl object-cover"
        />
      )}

      {candidateImages.length > 0 && (
        <select
          value={ad.imageUrl}
          onChange={(e) => updateField('imageUrl', e.target.value)}
          className="mb-4 w-full rounded-lg border px-3 py-2"
        >
          {candidateImages.map((image) => (
            <option key={image} value={image}>
              {image.slice(0, 80)}
            </option>
          ))}
        </select>
      )}

      <div className="space-y-4">
        <EditableField
          label="Primary Text"
          value={ad.primaryText}
          onChange={(value) => updateField('primaryText', value)}
          multiline
        />

        <EditableField
          label="Headline"
          value={ad.headline}
          onChange={(value) => updateField('headline', value)}
        />

        <EditableField
          label="Description"
          value={ad.description}
          onChange={(value) => updateField('description', value)}
          multiline
        />

        <EditableField
          label="CTA"
          value={ad.cta}
          onChange={(value) => updateField('cta', value)}
        />

        <button
          type="button"
          onClick={onRegenerate}
          className="w-full rounded-lg border py-2 font-medium hover:bg-gray-100"
        >
          Regenerate this ad
        </button>
      </div>
    </div>
  )
}