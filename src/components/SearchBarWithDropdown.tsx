'use client'

import React from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useRouter } from 'next/navigation'
import { Dream } from '@/lib/constants'

export const SearchBarWithDropdown = () => {
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
    <div className="relative">
      <input
        type="text"
        placeholder="Interprate Now"
        value={query}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="mt-10 block h-14 w-full rounded-md border-0 bg-white p-4 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black sm:text-lg sm:leading-relaxed"
      />

      {isDropdownVisible && filteredDreams.length > 0 && (
        <ul
          className="absolute z-10 max-h-60 w-full divide-y divide-gray-200 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
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
    </div>
  )
}
