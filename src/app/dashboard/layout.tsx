import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  </div>
  );
}