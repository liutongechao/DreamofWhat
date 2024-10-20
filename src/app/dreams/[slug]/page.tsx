import {
  DREAM_MDX_IMG_URL_PREFIX,
  getDreamBySlug,
  getDreamMdxContent,
  getTopDreams,
} from '@/lib/cache'
import { formatDate } from '@/lib/formatDate'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageLinks } from '@/components/PageLinks'
import { notFound } from 'next/navigation'
import { Page } from '@/lib/constants'
import { CustomMDXRenderer } from '@/components/CustomMDXRenderer'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const dreams = await getTopDreams()

  return dreams.map((dream) => ({
    slug: dream.url,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const { current: dream } = await getDreamBySlug(slug)

  if (!dream) {
    return {
      title: 'Dream not found',
      description: 'The requested dream could not be found.',
    }
  }

  return {
    title: `${dream.title}`,
    description: dream.description,
  }
}

export default async function Dream({ params }: Props) {
  const slug = params.slug

  const {
    current: dream,
    previous: previousDream,
    next: nextDream,
  } = await getDreamBySlug(slug)
  const mdxContent = await getDreamMdxContent(slug)

  if (!dream || !mdxContent) {
    notFound()
  }

  const processedContent = mdxContent.replace(
    /!\[.*?\]\((.*?)\.jpg\)/g,
    (match, filename) =>
      `![image](${DREAM_MDX_IMG_URL_PREFIX}${filename.trim()}.jpg)`,
  )

  const pages = [
    previousDream && {
      href: `/dreams/${previousDream.url}`,
      title: previousDream.title,
      date: previousDream.date,
      description: previousDream.description,
    },
    nextDream && {
      href: `/dreams/${nextDream.url}`,
      title: nextDream.title,
      date: nextDream.date,
      description: nextDream.description,
    },
  ].filter(Boolean) as Page[]

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
              {dream.title}
            </h1>
            <time
              dateTime={dream.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(dream.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {dream.author.name}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <div
            className={
              'mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0'
            }
          >
            <CustomMDXRenderer content={processedContent} />
          </div>
        </FadeIn>
      </Container>

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="More dreams"
        pages={pages}
      />
    </>
  )
}
