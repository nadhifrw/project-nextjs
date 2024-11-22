import Sidebar from "@/components/sidebar";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Redirect if the user is not authenticated
  if (!session?.user) {
    redirect('/');
  }
  
  return (
  <div className="flex h-screen">
    <div className="w-full flex-none md:w-64">
      <Sidebar />
    </div>
    <div className="hidden md:flex flex-col flex-grow">
      <div className="h-10 shadow-md flex items-center px-4">
        {/* Top bar content goes here */}
        Top Bar
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-8">
        {children}
      </div>
    </div>
  </div>
  );
}