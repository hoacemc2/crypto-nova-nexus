import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, MessageSquare } from 'lucide-react';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const currentTab = lastSegment === 'receptionist' ? 'reservations' : lastSegment;

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/receptionist/${value}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Receptionist Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage reservations and customer communications
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Communications
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;
