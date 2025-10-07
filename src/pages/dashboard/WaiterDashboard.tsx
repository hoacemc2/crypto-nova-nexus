import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ClipboardList, Receipt, Menu } from 'lucide-react';

const WaiterDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const currentTab = lastSegment === 'waiter' ? 'orders' : lastSegment;

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/waiter/${value}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Waiter Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage orders, tables, and payments
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default WaiterDashboard;
