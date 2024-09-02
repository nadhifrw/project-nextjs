import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import Navbar from "@/components/navbar";
import Types from '@/components/types';

export default async function Page() {
    const session = await auth();
    console.log(session)
    if (!session?.user) {
        redirect('/')
    }

    return (
    <main className='bg-white text-black'>
        <Navbar />
        <div className='flex flex-col'>
            <Types />
            <div className=''>
    
                <div>
                    <div>

                    </div>
                </div>
            </div>
            <div>
                asu
            </div>
        </div>
    </main>
    )
}