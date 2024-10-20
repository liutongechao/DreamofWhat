import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import { Dream, Article, dreamTypes } from '@/lib/constants'

interface SidebarMenuProps {
  isOpen: boolean
  closeModal: () => void
  topDreams: Dream[]
  articles: Article[]
}

export default function SidebarMenu({
  isOpen,
  closeModal,
  topDreams,
  articles,
}: SidebarMenuProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-start justify-end">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] overflow-y-auto bg-white shadow-xl">
              <div className="p-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-6 top-5 flex h-8 w-8 items-center justify-center"
                >
                  <span className="sr-only">Close navigation</span>
                  <svg
                    className="h-3.5 w-3.5 stroke-black"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L14 14M14 0L0 14" />
                  </svg>
                </button>

                <nav className="divide-y divide-gray-200 text-base leading-7">
                  <div className="px-8 py-6">
                    <h2 className="font-display">Top Dreams</h2>
                    <ul className="mt-2 space-y-2">
                      {topDreams.map((dream) => (
                        <li key={dream.id}>
                          <Link
                            href={`/dreams/${dream.url}`}
                            className="hover:underline"
                          >
                            {dream.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-8 py-6">
                    <h2 className="font-display">Categories</h2>
                    <ul className="mt-2 space-y-2">
                      {dreamTypes.map((category) => (
                        <li key={category.typeName}>
                          <Link
                            href={`/categories/${category.typeName}`}
                            className="hover:underline"
                          >
                            {category.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-8 py-6">
                    <h2 className="font-display">Related Articles</h2>
                    <ul className="mt-2 space-y-2">
                      {articles.map((article) => (
                        <li key={article.id}>
                          <Link
                            href={`/articles/${article.url}`}
                            className="hover:underline"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
