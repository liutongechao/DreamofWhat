import { Metadata } from 'next'
import { Categories } from '@/components/Categories'

export const metadata: Metadata = {
  title: 'Explore Dream Categories',
  description:
    'Discover the top dream categories and explore dream meanings, symbols, and insights across a wide range of topics.',
}

export default function Cate() {
  return (
    <>
      <Categories />
    </>
  )
}
