'use client'

import { useState } from 'react'
import { Modal } from './Modal'
import Link from 'next/link'
import clsx from 'clsx'
import SidebarMenu from './SidebarMenu'

import { Container } from '@/components/Container'
import { Logo, Logomark } from '@/components/Logo'
import DropdownMenu from './DropdownMenu'
import { Article, Dream, dreamTypes } from '@/lib/constants'

export function Header({
  invert = false,
  topDreams,
  articles,
}: {
  invert?: boolean
  topDreams: Dream[]
  articles: Article[]
}) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)!

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Home"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <Logomark
              className="h-8 sm:hidden"
              invert={invert}
              filled={isLogoHovered}
            />
            <Logo
              className="hidden h-8 sm:block"
              invert={invert}
              filled={isLogoHovered}
            />
          </Link>

          <div className="relative flex items-center gap-x-8">
            <div className="hidden gap-x-8 lg:flex">
              <DropdownMenu
                label="Top Dreams"
                items={topDreams.map((dream) => ({
                  href: `/dreams/${dream.url}`,
                  label: dream.title,
                }))}
              />
              <DropdownMenu
                label="Categories"
                items={dreamTypes.map((type) => ({
                  href: `/categories/${type.typeName}`,
                  label: type.label,
                }))}
              />
              <DropdownMenu
                label="Articles"
                items={articles.map((article) => ({
                  href: `/articles/${article.url}`,
                  label: article.title,
                }))}
              />
            </div>

            {/* Search Icon */}
            <button
              type="button"
              onClick={openSearchModal}
              className={clsx(
                'group -m-2.5 rounded-full p-2.5 transition hover:bg-neutral-950/10',
              )}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-neutral-950 group-hover:fill-neutral-700"
              >
                <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z" />
              </svg>
            </button>

            {/* Mobile and sm Menu Icon */}
            <button
              type="button"
              onClick={openSidebar}
              className="group -m-2.5 rounded-full p-2.5 transition hover:bg-neutral-950/10 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-neutral-950 group-hover:fill-neutral-700"
              >
                <path d="M2 6h20v2H2zM2 16h20v2H2z" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <Modal isOpen={isSearchModalOpen} closeModal={closeSearchModal} />
      <SidebarMenu
        isOpen={isSidebarOpen}
        closeModal={closeSidebar}
        topDreams={topDreams}
        articles={articles}
      />
    </>
  )
}
