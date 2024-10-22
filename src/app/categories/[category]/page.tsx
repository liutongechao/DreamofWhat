import { Metadata } from 'next'
import Link from 'next/link'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { notFound, redirect } from 'next/navigation'
import { dreamTypes } from '@/lib/constants'
import { loadDreamsByCategoryPaged } from '@/lib/loadData'
import { formatDate } from '@/lib/formatDate'

export const runtime = 'edge';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { page?: string }
}): Promise<Metadata> {
  const { category } = params
  const currentPage = parseInt(searchParams.page || '1', 10)

  const dreamCategory = dreamTypes.find((item) => item.typeName === category)

  if (!dreamCategory) {
    return {
      title: 'Category Not Found',
      description:
        'The category you are looking for does not exist. Explore other dreams and interpretations on DreamofWhat.',
    }
  }

  const pageTitle = `${dreamCategory.label} Dreams - Page ${currentPage}`

  const pageDescription = `Explore ${dreamCategory.label} dreams on page ${currentPage}. Learn about common dream interpretations and discover more insights.`

  return {
    title: pageTitle,
    description: pageDescription,
  }
}

export default async function Category({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { page?: string }
}) {
  const { category } = params
  let currentPage = parseInt(searchParams.page || '1', 10)

  // If no page parameter is provided or if it's invalid, redirect to page 1
  if (!searchParams.page || isNaN(currentPage) || currentPage < 1) {
    return redirect(`/categories/${category}?page=1`)
  }

  // Find the category data
  const categoryData = dreamTypes.find((item) => item.typeName === category)

  // If category is invalid, show 404
  if (!category || !categoryData) {
    return notFound()
  }

  // Load the dreams and total pages
  const { dreams, totalPages } = await loadDreamsByCategoryPaged(
    category,
    currentPage,
  )

  // If the currentPage exceeds totalPages, redirect to the last valid page
  if (currentPage > totalPages) {
    return redirect(`/categories/${category}?page=${totalPages}`)
  }

  return (
    <>
      <PageIntro title={`${categoryData.label} Dreams`}>
        <p>
          Find the latest dreams and tips on{' '}
          <span className="font-display">{category}</span>.
        </p>
      </PageIntro>

      <Container className="mb-10 mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {dreams.map((dream) => (
            <FadeIn key={dream.id}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/dreams/${dream.url}`}>{dream.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={dream.date}>
                            {formatDate(dream.date)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex items-center gap-x-4">
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {dream.author.name}
                            </div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {dream.description}
                      </p>
                      <Button
                        href={`/dreams/${dream.url}`}
                        aria-label={`Read more: ${dream.title}`}
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

        <FadeIn>
          <div className="mt-32 flex items-center justify-between pt-32">
            <Button
              href={`/categories/${category}?page=${currentPage - 1}`}
              aria-label="Previous Page"
              disabled={currentPage === 1} // Since `currentPage` is a number, direct comparison works
            >
              Previous
            </Button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <Button
              href={`/categories/${category}?page=${currentPage + 1}`}
              aria-label="Next Page"
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}