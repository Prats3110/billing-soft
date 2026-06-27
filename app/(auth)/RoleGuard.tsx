// // components/auth/RoleGuard.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase/client'
// import { Loader2 } from 'lucide-react'

// interface RoleGuardProps {
//   children: React.ReactNode
//   allowedRole: 'admin' | 'cashier'
//   fallback?: React.ReactNode
// }

// export default function RoleGuard({ 
//   children, 
//   allowedRole, 
//   fallback = <AccessDenied /> 
// }: RoleGuardProps) {
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()

//   useEffect(() => {
//     async function checkRole() {
//       const { data: { session } } = await supabase.auth.getSession()
      
//       if (!session) {
//         setLoading(false)
//         return
//       }

//       const { data, error } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', session.user.id)
//         .single()

//       if (!error && data) {
//         setUserRole(data.role)
//       }
//       setLoading(false)
//     }

//     checkRole()

//     // Listen for auth state changes (login/logout)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: unknown, session: unknown) => {
//       if (!session) {
//         setUserRole(null)
//         setLoading(false)
//       } else {
//         checkRole()
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [supabase])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-32">
//         <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
//       </div>
//     )
//   }

//   if (userRole !== allowedRole) {
//     return <>{fallback}</>
//   }

//   return <>{children}</>
// }

// function AccessDenied() {
//   return (
//     <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg text-center">
//       <p className="text-red-400 font-medium">Access Denied</p>
//       <p className="text-slate-500 text-sm mt-1">You don&apos;t have permission to view this.</p>
//     </div>
//   )
// }