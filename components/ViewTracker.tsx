'use client'

import { useEffect, useRef } from 'react'
import { incrementViewAction } from '@/app/actions/search'

export default function ViewTracker({ documentId, slug }: { documentId: string; slug?: string }) {
  const hasTracked = useRef(false)

  useEffect(() => {
    if (!documentId || hasTracked.current) return
    hasTracked.current = true

    console.log(`[ViewTracker] Triggering view increment for: ${documentId}`)

    incrementViewAction(documentId, slug)
      .then(res => {
        if (res.success) {
          console.log(`[ViewTracker] Server Action success for ${documentId}`)
        } else {
          console.error(`[ViewTracker] Server Action failed for ${documentId}:`, res)
        }
      })
      .catch(err => {
        console.error(`[ViewTracker] Error calling Server Action:`, err)
      })
  }, [documentId, slug])

  return null
}
