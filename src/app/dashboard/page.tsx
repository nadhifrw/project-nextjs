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
        <div>
             <DisplayData />
             <DisplayTable/>
             <div>
                
             </div>
        </div>

    </main>
    )
}