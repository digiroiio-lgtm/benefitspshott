import fs from 'fs'
import path from 'path'
import Head from 'next/head'

export default function Home({ title, description, canonical, headExtras, bodyContent }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <div dangerouslySetInnerHTML={{ __html: headExtras }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  )
}

export async function getStaticProps() {
  const htmlPath = path.join(process.cwd(), 'index.html')
  const html = fs.readFileSync(htmlPath, 'utf8')

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'P-Shot Benefits'

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/)
  const description = descMatch ? descMatch[1] : ''

  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/)
  const canonical = canonicalMatch ? canonicalMatch[1] : ''

  // Extract JSON-LD and og/twitter meta tags from head (excluding title, description, canonical, viewport, stylesheet)
  const headExtrasMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  let headExtras = ''
  if (headExtrasMatch) {
    headExtras = headExtrasMatch[1]
      .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
      .replace(/<meta\s+name=["']viewport["'][^>]*>/gi, '')
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
      .replace(/<link\s+rel=["']stylesheet["'][^>]*>/gi, '')
      .replace(/<meta\s+charset[^>]*>/gi, '')
      .trim()
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : ''

  return {
    props: { title, description, canonical, headExtras, bodyContent },
  }
}
