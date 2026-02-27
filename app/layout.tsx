import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Pháp Môn Tâm Linh | Hộ Trì Phật Pháp',
    template: '%s | Pháp Môn Tâm Linh',
  },
  description:
    'Pháp Môn Tâm Linh - Hộ trì Phật pháp, tu học tâm linh. Niệm kinh, phóng sinh, bạch thoại Phật pháp.',
  keywords: [
    'Pháp Môn Tâm Linh',
    'Phật pháp',
    'Niệm kinh',
    'Tu tập',
    'Quán Âm Đường',
  ],
  openGraph: {
    title: 'Pháp Môn Tâm Linh',
    description: 'Hộ trì Phật pháp, tu học tâm linh',
    type: 'website',
    locale: 'vi_VN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
