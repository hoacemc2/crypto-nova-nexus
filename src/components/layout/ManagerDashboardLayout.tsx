import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ManagerSidebar } from './ManagerSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export const ManagerDashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 w-full">
          <ManagerSidebar />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
