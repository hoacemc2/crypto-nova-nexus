import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTableStore } from '@/store/tableStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Eye } from 'lucide-react';
import { TableStatusDialog } from '@/components/staff/TableStatusDialog';
import { TableDetailsDialog } from '@/components/staff/TableDetailsDialog';

const TablesPage = () => {
  const { user } = useAuthStore();
  const branchId = user?.branchId || '';
  const { tables } = useTableStore();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const branchTables = tables.filter(t => t.branchId === branchId);

  const handleViewDetails = (tableId: string) => {
    setSelectedTable(tableId);
    setDetailsDialogOpen(true);
  };

  const handleChangeStatus = (tableId: string) => {
    setSelectedTable(tableId);
    setStatusDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'occupied':
        return 'destructive';
      case 'reserved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Table Management</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branchTables.map((table) => (
          <Card key={table.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Table {table.number}</CardTitle>
                <Badge variant={getStatusColor(table.status)}>
                  {table.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Capacity: {table.capacity} guests</span>
              </div>
              
              {table.status === 'occupied' && (
                <div className="space-y-2 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Currently occupied</span>
                  </div>
                </div>
              )}

              {table.status === 'reserved' && table.reservationName && (
                <div className="space-y-2 p-3 bg-muted rounded-lg">
                  <div className="text-sm font-semibold">
                    Reserved for {table.reservationName}
                  </div>
                  {table.reservationStart && (
                    <div className="text-sm text-muted-foreground">
                      {new Date(table.reservationStart).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewDetails(table.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Details
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => handleChangeStatus(table.id)}
                >
                  Change Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTable && (
        <>
          <TableStatusDialog
            tableId={selectedTable}
            open={statusDialogOpen}
            onOpenChange={setStatusDialogOpen}
          />
          <TableDetailsDialog
            tableId={selectedTable}
            branchId={branchId}
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
          />
        </>
      )}
    </div>
  );
};

export default TablesPage;
