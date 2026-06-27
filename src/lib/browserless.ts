export async function fetchRenderedHtml(url: string): Promise<string> {
  const token = process.env.BROWSERLESS_TOKEN

  if (!token) {
    throw new Error('BROWSERLESS_TOKEN is missing')
  }

  const response = await fetch(
    `https://production-sfo.browserless.io/content?token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        waitForTimeout: 3000,
        rejectResourceTypes: ['font', 'media'],
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Browserless failed with status ${response.status}`)
  }

  return response.text()
}