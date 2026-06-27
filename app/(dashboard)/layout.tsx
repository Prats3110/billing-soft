// app/(dashboard)/layout.tsx
export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex-col z-40">
        <Sidebar user={user} />
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav - hidden on desktop */}
      <MobileNav />
    </div>
  )
}