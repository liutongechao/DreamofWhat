import { Metadata } from 'next'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'DreamofWhat offers expert interpretations to help you uncover the meaning behind your dreams and gain deeper self-understanding.',
}

export default function About() {
  return (
    <>
      <PageIntro title="Our strength is understanding dreams">
        <p>
          At <span className="font-display">DreamofWhat</span>, we believe that
          dreams hold the key to understanding ourselves and the world around
          us. Our mission is to provide comprehensive interpretations that guide
          you through your dream journey.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            <span className="font-display">DreamofWhat</span> was founded with a
            passion for exploring the hidden meanings behind dreams. Our team of
            experts has dedicated themselves to helping people around the world
            uncover the messages in their dreams and understand their
            significance.
          </p>
          <p>
            We believe that dreams are powerful and personal experiences that
            can provide insight into our subconscious mind. Through years of
            research and collaboration with dream enthusiasts, we have created a
            rich database of dream interpretations that cover a wide range of
            topics, from common symbols to unique dream scenarios.
          </p>
          <p>
            Whether you're curious about a recurring dream or want to explore
            the symbolism behind a recent one,{' '}
            <span className="font-display">DreamofWhat</span> is here to help.
            Our community is built on a foundation of curiosity, collaboration,
            and respect for the mysteries of the human mind. We invite you to
            join us on this journey of self-discovery and enlightenment.
          </p>
        </div>
      </PageIntro>
    </>
  )
}
