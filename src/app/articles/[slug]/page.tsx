import {
  ARTICLE_MDX_IMG_URL_PREFIX,
  getArticleBySlug,
  getArticleMdxContent,
} from '@/lib/cache'
import { formatDate } from '@/lib/formatDate'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageLinks } from '@/components/PageLinks'
import { CustomMDXRenderer } from '@/components/CustomMDXRenderer'
import { notFound } from 'next/navigation'
import { Page } from '@/lib/constants'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export const runtime = 'edge';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const { current: article } = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${article.title}`,
    description: article.description,
  }
}

export default async function Article({ params }: Props) {
  const slug = params.slug

  const {
    current: article,
    previous: previousArticle,
    next: nextArticle,
  } = await getArticleBySlug(slug)
  const mdxContent = await getArticleMdxContent(slug)

  if (!article || !mdxContent) {
    notFound()
  }

  const processedContent = mdxContent.replace(
    /!\[.*?\]\((.*?)\.jpg\)/g,
    (match, filename) =>
      `![image](${ARTICLE_MDX_IMG_URL_PREFIX}${filename.trim()}.jpg)`,
  )

  const pages = [
    previousArticle && {
      href: `/articles/${previousArticle.url}`,
      title: previousArticle.title,
      date: previousArticle.date,
      description: previousArticle.description,
    },
    nextArticle && {
      href: `/articles/${nextArticle.url}`,
      title: nextArticle.title,
      date: nextArticle.date,
      description: nextArticle.description,
    },
  ].filter(Boolean) as Page[]

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {article.author.name}
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
        title="More articles"
        pages={pages}
      />
    </>
  )
}
