import { Metadata } from 'next'
import { getBeginnerGuides } from '@/lib/api/beginnerGuide'
import BeginnerGuideClient from './BeginnerGuideClient'

export const metadata: Metadata = {
  title: 'Hướng Dẫn Sơ Học — Pháp Môn Tâm Linh',
  description: 'Hướng dẫn các bước ban đầu để bắt đầu tu học Pháp Môn Tâm Linh và sử dụng Tam Đại Pháp Bảo.',
}

export const revalidate = 60 // 1 minute

export default async function BeginnerGuideServerPage() {
  const guides = await getBeginnerGuides()

  return <BeginnerGuideClient initialGuides={guides} />
}
