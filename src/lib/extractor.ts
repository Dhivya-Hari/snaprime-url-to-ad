import * as cheerio from 'cheerio'
import { fetchRenderedHtml } from './browserless'

export type ExtractedWebsite = {
  title: string
  description: string
  text: string
  images: string[]
  colors: string[]
  status: 'success' | 'partial' | 'failed'
  message: string
  extractionMs: number
}

function normalizeUrl(input: string): string | null {
  try {
    const url = new URL(input)
    if (!['http:', 'https:'].includes(url.protocol)) {
      return null
    }
    return url.toString()
  } catch {
    return null
  }
}

function absoluteUrl(src: string, baseUrl: string): string | null {
  try {
    return new URL(src, baseUrl).toString()
  } catch {
    return null
  }
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

export async function extractWebsite(inputUrl: string): Promise<ExtractedWebsite> {
  const startedAt = Date.now()
  const normalizedUrl = normalizeUrl(inputUrl)

  if (!normalizedUrl) {
    return {
      title: 'not found',
      description: 'not found',
      text: '',
      images: [],
      colors: [],
      status: 'failed',
      message: 'Invalid URL. Please enter a valid http or https website URL.',
      extractionMs: Date.now() - startedAt,
    }
  }

  try {
    const html = await fetchRenderedHtml(normalizedUrl)
    const $ = cheerio.load(html)

    $('script, style, noscript, iframe, svg').remove()

    const title =
      cleanText($('title').first().text()) ||
      cleanText($('meta[property="og:title"]').attr('content') || '') ||
      'not found'

    const description =
      cleanText($('meta[name="description"]').attr('content') || '') ||
      cleanText($('meta[property="og:description"]').attr('content') || '') ||
      'not found'

    const text = cleanText($('body').text()).slice(0, 12000)

    const images = Array.from(
      new Set(
        $('img')
          .map((_, img) => {
            const src =
              $(img).attr('src') ||
              $(img).attr('data-src') ||
              $(img).attr('data-original') ||
              $(img).attr('srcset')?.split(',')[0]?.trim().split(' ')[0]

            if (!src) return null
            return absoluteUrl(src, normalizedUrl)
          })
          .get()
          .filter((image): image is string => Boolean(image)),
      ),
    ).slice(0, 12)

    const colors = Array.from(
      new Set(html.match(/#[0-9a-fA-F]{6}/g) ?? []),
    ).slice(0, 6)

    const isPartial = text.length < 200

    return {
      title,
      description,
      text,
      images,
      colors,
      status: isPartial ? 'partial' : 'success',
      message: isPartial
        ? 'Rendered page loaded, but only limited readable content was found.'
        : 'Rendered website content extracted successfully.',
      extractionMs: Date.now() - startedAt,
    }
  } catch (error) {
    return {
      title: 'not found',
      description: 'not found',
      text: '',
      images: [],
      colors: [],
      status: 'failed',
      message:
        error instanceof Error
          ? `Website extraction failed: ${error.message}`
          : 'Website extraction failed due to an unexpected error.',
      extractionMs: Date.now() - startedAt,
    }
  }
}