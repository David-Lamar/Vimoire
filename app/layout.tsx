import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vimoire',
  description: 'Learn VIM through this open-source game.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{width: "100%", height: "100%", padding: 0, margin: 0}}>
      <body style={{width: "100%", height: "100%", padding: 0, margin: 0}}>{children}</body>
    </html>
  )
}
