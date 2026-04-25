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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9321516887651426"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col p-0">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
