import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Galkulator',
  description: 'calculate gk'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' className={`${notoSansJP.className}`}>
      <body>{children}</body>
    </html>
  )
}
