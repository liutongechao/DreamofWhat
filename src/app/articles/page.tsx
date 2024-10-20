import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/cache'

export const metadata: Metadata = {
  title: 'Latest Articles',
  description:
    'Browse the latest articles on dream interpretations and stay updated with insights into dreams.',
}

export default async function ArticleList() {
  const articles = await getAllArticles()

  return (
    <>
      <PageIntro title={`Articles`}>
        <p>Find the latest articles.</p>
      </PageIntro>

      <Container className="mb-10 mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {articles.map((article) => (
            <FadeIn key={article.id}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/articles/${article.url}`}>
                          {article.title}
                        </Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex items-center gap-x-4">
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {article.author.name}
                            </div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <Button
                        href={`/articles/${article.url}`}
                        aria-label={`Read more: ${article.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </>
  )
}
