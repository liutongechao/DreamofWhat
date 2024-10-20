import { type Metadata } from 'next'

import { TopDreams } from '@/components/TopDreams'
import { SearchBarWithDropdown } from '@/components/SearchBarWithDropdown'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import imageSleeping from '@/images/sleeping.jpg'
import { Categories } from '@/components/Categories'

export const metadata: Metadata = {
  description:
    'We are a development DreamofWhat working at the intersection of design and technology.',
}

function AboutDreams() {
  return (
    <>
      <SectionIntro
        title="About Dreams"
        className="mt-24 sm:mt-32 lg:mt-40"
      ></SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageSleeping}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="The Science Behind Dreams">
              Dreams occur during the REM (Rapid Eye Movement) stage of sleep, a
              phase when brain activity resembles that of wakefulness. Many
              scientists believe that dreams serve several functions, including
              memory consolidation, emotional regulation, and neural repair.
              During REM sleep, the brain processes daily experiences and
              emotions, creating vivid and sometimes strange dreams.
            </ListItem>
            <ListItem title="The Interpretation of Dreams Across Cultures">
              Dream interpretation has played a significant role in cultures
              throughout history. Ancient civilizations like Egypt, Greece, and
              China believed that dreams held prophetic meanings or messages
              from the divine. In modern psychology, figures like Sigmund Freud
              viewed dreams as reflections of the subconscious mind, offering
              insight into suppressed desires and unresolved conflicts.
            </ListItem>
            <ListItem title="Common Dreams and Their Meanings">
              Certain types of dreams are shared by many people across the
              world. Dreams of flying, falling, or being chased are often
              interpreted symbolically. For instance, flying dreams may indicate
              a desire for freedom or control, while falling dreams are often
              linked to feelings of insecurity or fear. Analyzing these common
              dreams can offer deeper insights into an individual’s emotional
              state.
            </ListItem>
            <ListItem title="The Connection Between Dreams and Mental Health">
              Dreams are closely tied to mental health, with stress, anxiety,
              and depression often manifesting through dreams. Nightmares, in
              particular, can reflect unresolved fears or heightened stress
              levels. Studies show that analyzing one’s dreams may help in
              identifying emotional disturbances and can be a therapeutic tool
              in managing mental well-being.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 flex items-center justify-center sm:mt-32 md:mt-56">
        <FadeIn className="min-[600px] max-w-3xl text-right">
          <h1 className="text-center font-display text-5xl font-semibold tracking-wider text-gray-800 sm:text-left">
            What do you dream of
          </h1>
          <SearchBarWithDropdown />
        </FadeIn>
      </Container>

      <TopDreams />

      <Categories />

      <AboutDreams />
    </>
  )
}
