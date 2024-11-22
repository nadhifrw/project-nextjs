// app/dashboard/page.tsx
import prisma from '@/lib/prisma'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {

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