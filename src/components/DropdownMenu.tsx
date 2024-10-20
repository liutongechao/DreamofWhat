import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Fragment } from 'react'

interface DropdownMenuProps {
  label: string
  items: { href: string; label: string }[]
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center justify-center font-display text-sm text-gray-700 hover:text-gray-900">
        {label}
        <ChevronDownIcon className="ml-2 h-4 w-4" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <MenuItem key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      index < items.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
