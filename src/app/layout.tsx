import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - DreamofWhat',
    default: 'DreamofWhat',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full text-base antialiased">
      <body className="flex min-h-full flex-col p-0">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
