// app/(dashboard)/dashboard/page.tsx
export const dynamic = 'force-dynamic'
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
      <p className="text-slate-400">Welcome to Billing Soft.</p>
    </div>
  )
}