import { getAllArticles, getAllDreams } from '@/lib/cache'
import { dreamTypes } from '@/lib/constants'

export const runtime = 'edge';

export async function GET() {
  const baseUrl = process.env.SITE_URL

  const staticPaths = [
    { path: '', priority: '1.0' },  
    { path: '/about', priority: '0.5' },
    { path: '/contact', priority: '0.5' },
    { path: '/privacy-policy', priority: '0.5' },
    { path: '/terms-of-service', priority: '0.5' },
    { path: '/categories', priority: '0.6' },  
    { path: '/dreams', priority: '0.9' },  
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    priority,
  }))

  const articles = await getAllArticles()
  const articlePaths = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.url}`,
    priority: '0.8'
  }))

  const dreams = await getAllDreams()
  const dreamPaths = dreams.map((dream) => ({
    url: `${baseUrl}/dreams/${dream.url}`,
    priority: '0.8'
  }))

  const categoryPaths = dreamTypes.map((category) => ({
    url: `${baseUrl}/categories/${category.typeName}`,
    priority: '0.7'
  }))

  const allPaths = [...staticPaths, ...articlePaths, ...categoryPaths, ...dreamPaths]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(({ url, priority }) => {
          return `
            <url>
              <loc>${url}</loc>
              <priority>${priority}</priority>
            </url>
          `
        })
        .join('')}
    </urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}