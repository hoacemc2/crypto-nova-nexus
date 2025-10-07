import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Table2, 
  Tag,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { mockStaff, mockTables, mockPromotions, mockBranches } from '@/data/mockData';
import { BookingNotification } from '@/components/BookingNotification';
import { OrderNotification } from '@/components/OrderNotification';
import { TableManagementFull } from '@/components/manager/TableManagementFull';
import { StaffManagementDialog } from '@/components/manager/StaffManagementDialog';
import { useAuthStore } from '@/store/authStore';
import { useStaffStore } from '@/store/staffStore';

const ManagerDashboard = () => {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '1';
  const activeBranch = mockBranches.find(b => b.id === branchId) || mockBranches[0];
  const { getStaffByBranch } = useStaffStore();
  const branchStaff = getStaffByBranch(branchId);
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              {activeBranch.name} - Branch Operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OrderNotification branchId={activeBranch.id} />
            <BookingNotification branchId={activeBranch.id} />
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Table Management</TabsTrigger>
            <TabsTrigger value="staff">Staff & Promotions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">

        {/* Branch Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,847</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+12.5%</span> vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branchStaff.filter(s => s.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {branchStaff.length} total staff
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Table Status</CardTitle>
              <Table2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTables.filter(t => t.status === 'occupied').length}/{mockTables.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tables occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promos</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPromotions.filter(p => p.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Running promotions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Staff Management */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>Manage your branch staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branchStaff.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={staff.status === 'active' ? 'default' : 'secondary'}>
                        {staff.status}
                      </Badge>
                      <Badge variant="outline">{staff.role}</Badge>
                    </div>
                  </div>
                 ))}
                 <Button variant="outline" className="w-full" onClick={() => setIsStaffDialogOpen(true)}>
                   <Users className="mr-2 h-4 w-4" />
                   Add New Staff
                 </Button>
               </div>
             </CardContent>
           </Card>

          {/* Tables Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Table Status</CardTitle>
              <CardDescription>Current table availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {mockTables.map((table) => (
                  <Card 
                    key={table.id} 
                    className={`border-2 ${
                      table.status === 'available' 
                        ? 'border-green-500 bg-green-500/10' 
                        : table.status === 'occupied'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-yellow-500 bg-yellow-500/10'
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="font-bold text-lg">#{table.number}</div>
                      <div className="text-xs text-muted-foreground">{table.capacity} seats</div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {table.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
          </TabsContent>

          <TabsContent value="tables" className="mt-6">
            <TableManagementFull branchId={activeBranch.id} />
          </TabsContent>

          <TabsContent value="staff" className="mt-6">
        {/* Active Promotions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Promotions</CardTitle>
                <CardDescription>Current promotional campaigns</CardDescription>
              </div>
              <Button variant="outline">
                <Tag className="mr-2 h-4 w-4" />
                Create Promotion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPromotions.map((promo) => (
                <Card key={promo.id} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{promo.name}</h4>
                          <Badge>{promo.discountPercent}% OFF</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {promo.startDate} - {promo.endDate}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {promo.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>

        <StaffManagementDialog
          open={isStaffDialogOpen}
          onOpenChange={setIsStaffDialogOpen}
          branchId={branchId}
        />
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
