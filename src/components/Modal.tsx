import React from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useRouter } from 'next/navigation'
import { Dream } from '@/lib/constants'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

export function Modal({ isOpen, closeModal }: ModalProps) {
  const {
    query,
    isDropdownVisible,
    filteredDreams,
    setQuery,
    setDropdownVisible,
    handleInputChange,
    handleBlur,
    handleFocus,
  } = useSearch()

  const router = useRouter()

  const handleSelectDream = (dream: Dream) => {
    setQuery(dream.url)
    setDropdownVisible(false)
    router.push(`/dreams/${dream.url}`)
  }

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
          <div className="fixed inset-0 bg-slate-900/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-start justify-center pt-16 sm:pt-24">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative w-full max-w-lg transform px-4 transition-all">
              <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                    aria-label="Search components"
                  />

                  {isDropdownVisible && filteredDreams.length > 0 && (
                    <ul
                      className="max-h-60 w-full divide-y divide-gray-200 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
                      role="list"
                    >
                      {filteredDreams.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSelectDream(item)}
                          className="flex cursor-pointer justify-between px-4 py-2 hover:bg-gray-100"
                        >
                          <div className="font-display">{item.title}</div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <svg
                    className="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                  </svg>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
