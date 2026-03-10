import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: "noindex, nofollow",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children
}
