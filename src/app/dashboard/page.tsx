// app/dashboard/page.tsx
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }

  const departments = await prisma.department.findMany({
    include: { 
      dosen: true,
      _count: {
        select: {
          dosen: true,
          pengabdian: true,
          penelitian: true,
        }
      }
    },
  })

  const totalDosen = await prisma.dosen.count()
  return <DashboardClient initialDepartments={departments} />
}