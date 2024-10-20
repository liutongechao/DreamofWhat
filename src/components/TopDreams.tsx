import React from 'react'
import { Container } from './Container'
import { FadeIn, FadeInStagger } from './FadeIn'
import { loadTopDreams } from '@/lib/loadData'
import Link from 'next/link'
import { DREAM_URL_PREFIX } from '@/lib/constants'

export const TopDreams: React.FC = async () => {
  let dreams = await loadTopDreams()

  if (!dreams || dreams.length === 0) {
    return (
      <Container className="mt-8 flex justify-center sm:mt-16 md:mt-36">
        <p className="text-lg text-neutral-950">Loading dreams...</p>
      </Container>
    )
  }

  return (
    <>
      <Container className="mt-8 flex justify-center sm:mt-16 md:mt-36">
        <FadeIn className="max-w-3xl text-right">
          <h1 className="text-center font-display text-5xl font-semibold tracking-wider text-gray-800 sm:text-left">
            Top Dreams
          </h1>
        </FadeIn>
      </Container>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {dreams.map((dream) => (
            <FadeIn key={dream.id} className="flex">
              <Link href={DREAM_URL_PREFIX + dream.url}>
                <article className="relative flex w-full flex-col rounded-3xl border border-neutral-200 p-6 shadow-lg ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                  <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    {dream.title}
                  </p>
                  <p className="mt-4 text-base text-neutral-600">
                    {dream.description}
                  </p>
                </article>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}
