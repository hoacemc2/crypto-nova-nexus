import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Table2, Tag, DollarSign } from 'lucide-react';
import { mockBranches, mockTables, mockPromotions } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import { useStaffStore } from '@/store/staffStore';
import { BookingNotification } from '@/components/BookingNotification';
import { OrderNotification } from '@/components/OrderNotification';

export default function OverviewPage() {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '1';
  const activeBranch = mockBranches.find(b => b.id === branchId) || mockBranches[0];
  const { getStaffByBranch } = useStaffStore();
  const branchStaff = getStaffByBranch(branchId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manager Overview</h1>
          <p className="text-muted-foreground mt-2">
            {activeBranch.name} - Branch Operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <OrderNotification branchId={activeBranch.id} />
          <BookingNotification branchId={activeBranch.id} />
        </div>
      </div>

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
            <div className="text-2xl font-bold">
              {branchStaff.filter(s => s.status === 'active').length}
            </div>
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
            <p className="text-xs text-muted-foreground mt-1">Tables occupied</p>
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
            <p className="text-xs text-muted-foreground mt-1">Running promotions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Today's performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Total Orders</span>
              <span className="text-lg font-bold">42</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Average Order Value</span>
              <span className="text-lg font-bold">$67.88</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-lg font-bold">4.8/5.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
