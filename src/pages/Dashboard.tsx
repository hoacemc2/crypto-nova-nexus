import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Building2, Package, User } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && user) {
      // Only redirect non-customer roles
      if (user.role !== 'customer') {
        switch (user.role) {
          case 'owner':
            navigate('/brand-selection', { replace: true });
            break;
          case 'branch_manager':
            navigate('/dashboard/manager', { replace: true });
            break;
          case 'waiter':
            navigate('/dashboard/waiter', { replace: true });
            break;
          case 'receptionist':
            navigate('/dashboard/receptionist', { replace: true });
            break;
          case 'admin':
            navigate('/dashboard/admin', { replace: true });
            break;
        }
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // SaaS Customer Dashboard
  if (user?.role === 'customer') {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">
              Manage your restaurant SaaS subscription
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => navigate('/register/package')}>
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Create New Restaurant</CardTitle>
                <CardDescription>
                  Set up a new restaurant with our SaaS platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Manage Package</CardTitle>
                <CardDescription>
                  View and update your subscription package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Package</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Restaurants</CardTitle>
              <CardDescription>
                All restaurants you've created with our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8">
                No restaurants yet. Create your first one to get started!
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return null;
};

export default Dashboard;
