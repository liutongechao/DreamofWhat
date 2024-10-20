import { Article, Dream } from './constants'

const TTL = 24 * 60 * 60 * 1000

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL

const DATA_URL_PREFIX = CDN_URL + '/data'
const DREAMS_URL_PREFIX = `${DATA_URL_PREFIX}/dream/`
const ALL_DREAMS_JSON_URL = `${DATA_URL_PREFIX}/dream/all.json`
const ALL_ARTICLES_JSON_URL = `${DATA_URL_PREFIX}/article/all.json`

const DREAM_MDX_URL_PREFIX = CDN_URL + '/dream/'
export const DREAM_MDX_IMG_URL_PREFIX = CDN_URL + '/image/dream/'

const ARTICLE_MDX_URL_PREFIX = CDN_URL + '/article/'
export const ARTICLE_MDX_IMG_URL_PREFIX = CDN_URL + '/image/article/'

const CATEGORY_JSON_URLS: { [key: string]: string } = {
  people: `${DREAMS_URL_PREFIX}people.json`,
  animals: `${DREAMS_URL_PREFIX}animals.json`,
  plants: `${DREAMS_URL_PREFIX}plants.json`,
  objects: `${DREAMS_URL_PREFIX}objects.json`,
  activities: `${DREAMS_URL_PREFIX}activities.json`,
  'daily-life': `${DREAMS_URL_PREFIX}daily-life.json`,
  nature: `${DREAMS_URL_PREFIX}nature.json`,
  super: `${DREAMS_URL_PREFIX}super.json`,
  buildings: `${DREAMS_URL_PREFIX}buildings.json`,
  others: `${DREAMS_URL_PREFIX}others.json`,
}

const TOP_DREAM_JSON_URL = `${DATA_URL_PREFIX}/dream/top_dreams.json`

interface Cache {
  allDreams: Dream[] | null
  allArticles: Article[] | null
  categoryDreams: { [key: string]: string }
  topDreams: Dream[] | null
  lastModified: {
    allDreams: string | null
    allArticles: string | null
    categories: { [key: string]: string | null }
    topDreams: string | null
  }
  expiration: {
    allDreams: number | null
    allArticles: number | null
    categories: { [key: string]: number | null }
    topDreams: number | null
  }
}

let cache: Cache = {
  allDreams: null,
  allArticles: null,
  categoryDreams: {},
  topDreams: null,
  lastModified: {
    allDreams: null,
    allArticles: null,
    categories: {},
    topDreams: null,
  },
  expiration: {
    allDreams: null,
    allArticles: null,
    categories: {},
    topDreams: null,
  },
}

function getCurrentTimestamp(): number {
  return new Date().getTime()
}

function isCacheExpired(
  type: 'allDreams' | 'allArticles' | 'topDreams' | string,
): boolean {
  const currentTimestamp = getCurrentTimestamp()
  if (type === 'allDreams') {
    return (
      !cache.expiration.allDreams ||
      currentTimestamp > cache.expiration.allDreams
    )
  } else if (type === 'allArticles') {
    return (
      !cache.expiration.allArticles ||
      currentTimestamp > cache.expiration.allArticles
    )
  } else if (type === 'topDreams') {
    return (
      !cache.expiration.topDreams ||
      currentTimestamp > cache.expiration.topDreams
    )
  } else {
    return (
      !cache.expiration.categories[type] ||
      currentTimestamp > cache.expiration.categories[type]
    )
  }
}

function setCacheExpiration(
  type: 'allDreams' | 'allArticles' | 'topDreams' | string,
): void {
  const expirationTime = getCurrentTimestamp() + TTL
  if (type === 'allDreams') {
    cache.expiration.allDreams = expirationTime
  } else if (type === 'allArticles') {
    cache.expiration.allArticles = expirationTime
  } else if (type === 'topDreams') {
    cache.expiration.topDreams = expirationTime
  } else {
    cache.expiration.categories[type] = expirationTime
  }
}

async function fetchAndCacheDreamJson(
  url: string,
  type: 'allDreams' | 'topDreams' | string,
): Promise<Dream[]> {
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    return []
  }

  const dreams = (await response.json()) as Dream[]
  const lastModified = response.headers.get('Last-Modified') || ''

  if (type === 'allDreams') {
    cache.allDreams = dreams
    cache.lastModified.allDreams = lastModified
  } else if (type === 'topDreams') {
    cache.topDreams = dreams
    cache.lastModified.topDreams = lastModified
  } else {
    cache.categoryDreams[type] = JSON.stringify(dreams)
    cache.lastModified.categories[type] = lastModified
  }

  setCacheExpiration(type)

  return dreams
}

async function fetchAndCacheArticleJson(): Promise<Article[]> {
  const response = await fetch(ALL_ARTICLES_JSON_URL, { cache: 'no-store' })

  if (!response.ok) {
    return []
  }

  const articles = (await response.json()) as Article[]
  const lastModified = response.headers.get('Last-Modified') || ''

  cache.allArticles = articles
  cache.lastModified.allArticles = lastModified

  setCacheExpiration('allArticles')

  return articles
}

export async function getDreamMdxContent(
  folderName: string,
): Promise<string | null> {
  const url = `${DREAM_MDX_URL_PREFIX}${folderName}/page.mdx`

  const response = await fetch(url)

  if (!response.ok) {
    return null
  }

  const content = await response.text()

  return content
}

export async function getArticleMdxContent(
  folderName: string,
): Promise<string | null> {
  const url = `${ARTICLE_MDX_URL_PREFIX}${folderName}/page.mdx`

  const response = await fetch(url)

  if (!response.ok) {
    return null
  }

  const content = await response.text()

  return content
}

export async function getAllDreams(): Promise<Dream[]> {
  if (!cache.allDreams || isCacheExpired('all')) {
    return fetchAndCacheDreamJson(ALL_DREAMS_JSON_URL, 'all')
  }
  return cache.allDreams
}

export async function getCategoryDreams(category: string): Promise<Dream[]> {
  const url = CATEGORY_JSON_URLS[category]
  if (!cache.categoryDreams[category] || isCacheExpired(category)) {
    return fetchAndCacheDreamJson(url, category)
  }
  return JSON.parse(cache.categoryDreams[category])
}

export async function getTopDreams(): Promise<Dream[]> {
  if (!cache.topDreams || isCacheExpired('topDreams')) {
    return fetchAndCacheDreamJson(TOP_DREAM_JSON_URL, 'topDreams')
  }
  return cache.topDreams
}

export async function getDreamBySlug(
  slug: string,
): Promise<{ current: Dream | undefined; previous?: Dream; next?: Dream }> {
  const allDreams = await getAllDreams()

  const currentIndex = allDreams.findIndex((dream) => dream.url === slug)

  if (currentIndex === -1) {
    return { current: undefined }
  }

  const currentDream = allDreams[currentIndex]
  const previousDream =
    currentIndex > 0 ? allDreams[currentIndex - 1] : undefined
  const nextDream =
    currentIndex < allDreams.length - 1
      ? allDreams[currentIndex + 1]
      : undefined

  return {
    current: currentDream,
    previous: previousDream,
    next: nextDream,
  }
}

export async function getAllArticles(): Promise<Article[]> {
  if (!cache.allArticles || isCacheExpired('all')) {
    return fetchAndCacheArticleJson()
  }
  return cache.allArticles
}

export async function getArticleBySlug(slug: string): Promise<{
  current: Article | undefined
  previous?: Article
  next?: Article
}> {
  const allArticles = await getAllArticles()

  const currentIndex = allArticles.findIndex((article) => article.url === slug)

  if (currentIndex === -1) {
    return { current: undefined }
  }

  const currentArticle = allArticles[currentIndex]
  const previousArticle =
    currentIndex > 0 ? allArticles[currentIndex - 1] : undefined
  const nextArticle =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : undefined

  return {
    current: currentArticle,
    previous: previousArticle,
    next: nextArticle,
  }
}
