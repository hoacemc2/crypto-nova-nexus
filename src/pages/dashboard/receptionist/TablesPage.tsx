import { useAuthStore } from '@/store/authStore';
import { useTableStore } from '@/store/tableStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const TablesPage = () => {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '';
  const { tables } = useTableStore();

  const branchTables = tables.filter(t => t.branchId === branchId && t.status !== 'out_of_service');
  const availableTables = branchTables.filter(t => t.status === 'available');
  const occupiedTables = branchTables.filter(t => t.status === 'occupied');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'occupied':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'occupied':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Table Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTables.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready for guests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedTables.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in use
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branchTables.map((table) => (
          <Card key={table.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getStatusIcon(table.status)}
                  <CardTitle className="text-lg">Table {table.number}</CardTitle>
                </div>
                <Badge variant={getStatusColor(table.status)}>
                  {table.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Capacity: {table.capacity} guests</span>
              </div>

              {table.reservationName && table.reservationStart && (
                <div className="p-3 bg-muted rounded-lg space-y-1">
                  <div className="text-sm font-semibold">
                    Reservation: {table.reservationName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(table.reservationStart).toLocaleString()}
                  </div>
                </div>
              )}

              {table.status === 'occupied' && (
                <div className="p-3 bg-muted rounded-lg space-y-1">
                  <div className="text-sm font-semibold">
                    Currently occupied
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TablesPage;
