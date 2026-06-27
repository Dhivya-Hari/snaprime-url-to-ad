import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { createProjectServerFn } from '../server/functions/createProject'
import { regenerateAdServerFn } from '../server/functions/regenerateAd'
import { BrandProfile } from '../components/BrandProfile'
import { AdCard } from '../components/AdCard'
import type { ProjectResult } from '../types/project'
import type { GeneratedAd } from '../types/ad'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ProjectResult | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    setError('')
    setResult(null)

    if (!url.trim()) {
      setError('Please enter a website URL.')
      return
    }

    setIsLoading(true)

    try {
      const data = await createProjectServerFn({ data: url.trim() })
      setResult(data)
    } catch (err) {
      console.error('Create ads error:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while creating ads.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const updateAd = (updatedAd: GeneratedAd) => {
    if (!result) return

    setResult({
      ...result,
      ads: result.ads.map((ad) =>
        ad.id === updatedAd.id ? updatedAd : ad,
      ),
    })
  }

  const regenerateSingleAd = async (adId: string) => {
    if (!result) return

    const freshAd = await regenerateAdServerFn({
      data: result.brandProfile,
    })

    setResult({
      ...result,
      ads: result.ads.map((ad) =>
        ad.id === adId ? { ...freshAd, id: adId } : ad,
      ),
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-10 shadow-xl">
          <h1 className="mb-3 text-center text-4xl font-bold">Snaprime</h1>

          <p className="mb-8 text-center text-gray-500">
            Turn any website into ready-to-edit advertisements.
          </p>

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mb-4 w-full rounded-lg border px-4 py-3"
          />

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? 'Creating ads...' : 'Create Ads'}
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-8">
            <BrandProfile brandProfile={result.brandProfile} />

            <div>
              <h2 className="mb-4 text-2xl font-bold">Generated Ads</h2>

              <div className="grid gap-6 md:grid-cols-2">
                {result.ads.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onChange={updateAd}
                    onRegenerate={() => regenerateSingleAd(ad.id)}
                    candidateImages={result.brandProfile.candidateImages}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}