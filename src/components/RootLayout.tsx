'use client'

import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { getTopDreams, getAllArticles } from '@/lib/cache'

import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Header } from './Header'
import { Dream, Article } from '@/lib/constants'

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  let shouldReduceMotion = useReducedMotion()

  const [topDreams, setTopDreams] = useState<Dream[]>([])
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchTopDreams = async () => {
      const dreams = await getTopDreams()
      setTopDreams(dreams)
    }

    const fetchArticles = async () => {
      const articles = await getAllArticles()
      setArticles(articles)
    }

    fetchTopDreams()
    fetchArticles()
  }, [])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div className="absolute left-0 right-0 top-2 z-40 pt-14">
          <Header topDreams={topDreams} articles={articles} />
        </div>
      </header>

      <motion.div
        layout
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer topDreams={topDreams} articles={articles} />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  return <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
}
