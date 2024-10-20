import { CATEGORY_URL_PREFIX, dreamTypes } from '@/lib/constants'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/Container'
import Image from 'next/image'
import Link from 'next/link'

export function Categories() {
  return (
    <div className="mt-24 rounded-4xl py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex justify-center gap-x-8">
          <h1 className="text-center font-display text-5xl font-semibold tracking-wider text-gray-800 sm:text-left">
            Common Dreams
          </h1>
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-5"
          >
            {dreamTypes.map((dreamType) => (
              <li
                key={dreamType.id}
                className="space-y-2 rounded-lg bg-white p-4 text-center shadow-md ring-1 ring-neutral-950/5 transition hover:bg-neutral-50"
              >
                <Link href={`${CATEGORY_URL_PREFIX + dreamType.typeName}`}>
                  <FadeIn className="flex flex-col items-center justify-center">
                    <Image
                      src={dreamType.logo}
                      alt={dreamType.label}
                      unoptimized
                      className="h-12 w-12 object-contain"
                    />
                    <span className="font-display font-medium text-gray-800">
                      {dreamType.label}
                    </span>
                  </FadeIn>
                </Link>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
