import { getTopDreams, getCategoryDreams, getAllDreams } from './cache'

import { PAGE_SIZE, Dream } from './constants'

export async function searchDreams(query: string): Promise<Dream[]> {
  const allDreams = await getAllDreams()

  return allDreams.filter((dream) =>
    dream.title.toLowerCase().includes(query.toLowerCase()),
  )
}

export interface PagedDreams {
  dreams: Dream[]
  totalPages: number
}

export async function loadDreamsByCategoryPaged(
  category: string,
  page: number = 1,
): Promise<PagedDreams> {
  const categoryDreams = await getCategoryDreams(category)

  const totalDreams = categoryDreams.length
  const totalPages = Math.ceil(totalDreams / PAGE_SIZE)

  const startIndex = (page - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE

  const dreams = categoryDreams.slice(startIndex, endIndex)

  return {
    dreams,
    totalPages,
  }
}

export async function loadTopDreams(): Promise<Dream[]> {
  return await getTopDreams()
}
