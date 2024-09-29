import AddDataButton from '@/components/AddDataButton';
import DisplayData from '@/components/DisplayData';
import DisplayTable from '@/components/DisplayTable';
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await auth();
    console.log(session)
    if (!session?.user) {
        redirect('/')
    }

    return (
    <main>
        <div className='border '>
            <div>
                <AddDataButton/>
            </div>
            <div className='flex items-center justify-center'>
                <DisplayData />
            </div>
             
            <div className='shadow-xl m-4 p-4 border border-solid rounded-md'>
                {/* <div className='text-xl font-bold pb-4'>
                    Departmen
                </div> */}
                <DisplayTable/>
            </div>
             
            <div>
                
            </div>
        </div>

    </main>
    )
}