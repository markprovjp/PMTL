'use client'
// ─────────────────────────────────────────────────────────────
//  components/CategoryNav.tsx
//  Dynamic category tree navigation — fetches from Strapi client-side
// ─────────────────────────────────────────────────────────────
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CategoryTree } from '@/types/strapi'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

// Build tree from flat list client-side
function buildTree(flat: CategoryTree[]): CategoryTree[] {
  const map = new Map<number, CategoryTree>()
  for (const cat of flat) map.set(cat.id, { ...cat, children: [], depth: 0 })
  const roots: CategoryTree[] = []
  for (const node of Array.from(map.values())) {
    const parentId = (node.parent as { id: number } | null)?.id
    if (parentId && map.has(parentId)) {
      const p = map.get(parentId)!
      node.depth = p.depth + 1
      p.children.push(node)
    } else {
      roots.push(node)
    }
  }
  const sort = (arr: CategoryTree[]) => {
    arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    arr.forEach((n) => sort(n.children))
  }
  sort(roots)
  return roots
}

// ─── Recursive tree node ──────────────────────────────────────
const TreeNode = ({
  node,
  depth = 0,
  onNavigate,
}: {
  node: CategoryTree
  depth?: number
  onNavigate: () => void
}) => {
  const [open, setOpen] = useState(false)
  const hasChildren = node.children.length > 0

  return (
    <div>
      <div className={`flex items-center justify-between group rounded-lg transition-colors ${depth === 0 ? '' : 'ml-3 pl-3 border-l border-border'}`}>
        <Link
          href={`/category/${node.slug}`}
          onClick={onNavigate}
          className={`flex items-center gap-2 flex-1 py-2.5 px-2 text-sm rounded-lg hover:bg-secondary hover:text-gold transition-all group ${depth === 0 ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {node.icon && <span className="text-base w-5 text-center">{node.icon}</span>}
          <span>{node.name}</span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 mr-1 text-muted-foreground hover:text-foreground rounded transition-colors"
          >
            <motion.svg
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"/>
            </motion.svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main mega-panel ─────────────────────────────────────────
export default function CategoryNav({ onClose }: { onClose?: () => void }) {
  const [tree, setTree] = useState<CategoryTree[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `${STRAPI_URL}/api/categories?filters[is_active][$eq]=true&sort=order:asc&populate=parent&pagination[pageSize]=200`
    )
      .then((r) => r.json())
      .then((json) => {
        if (json.data) setTree(buildTree(json.data))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleNavigate = () => onClose?.()

  if (loading) return (
    <div className="p-8 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (tree.length === 0) return (
    <div className="p-8 text-center text-sm text-muted-foreground">
      Chua co chu de nao duoc cau hinh
    </div>
  )

  // Render columns: root categories in a grid
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tree.map((root) => (
          <div key={root.id} className="space-y-0.5">
            <TreeNode node={root} depth={0} onNavigate={handleNavigate} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile flat list ─────────────────────────────────────────
export function CategoryNavMobile({ onClose }: { onClose: () => void }) {
  const [tree, setTree] = useState<CategoryTree[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `${STRAPI_URL}/api/categories?filters[is_active][$eq]=true&sort=order:asc&populate=parent&pagination[pageSize]=200`
    )
      .then((r) => r.json())
      .then((json) => { if (json.data) setTree(buildTree(json.data)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="py-6 flex justify-center"><div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-0.5">
      {tree.map((root) => (
        <TreeNode key={root.id} node={root} depth={0} onNavigate={onClose} />
      ))}
    </div>
  )
}
