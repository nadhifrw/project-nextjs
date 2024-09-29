import DisplayDataDepartment from "@/components/department/DisplayDataDepartment";
import DisplayTableDepartment from "@/components/department/DisplayTableDepartment";
import prisma from "@/lib/prisma";
import Link from "next/link";



export default async function DepartmentDetailPage({params} : { params: { nama: string }}){
    // const department = await prisma.department.findUnique({
    //     where: { nama: params.nama },
    //   });
    return(
        <div className="container mx-auto">
            <Link href={'/dashboard'}>
                <button className='flex flex-row'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <div className='font-bold pl-4'>
                        {/* {dosen.nama} */}
                    </div>
                </button>
            </Link>
        <div className='border'>
            <div>
                <DisplayDataDepartment/>
            </div>
            <div>
                <DisplayTableDepartment/>
            </div>
        </div>
        
    </div>
    )
}