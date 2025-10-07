import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTableStore } from '@/store/tableStore';
import { useOrderStore, Order } from '@/store/orderStore';
import { Receipt } from 'lucide-react';
import { BillCreationDialog } from './BillCreationDialog';

interface TableDetailsDialogProps {
  tableId: string | null;
  branchId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TableDetailsDialog = ({ tableId, branchId, open, onOpenChange }: TableDetailsDialogProps) => {
  const table = useTableStore((state) => state.getTableById(tableId || ''));
  const getOrdersByTable = useOrderStore((state) => state.getOrdersByTable);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [billDialogOpen, setBillDialogOpen] = useState(false);

  if (!table) return null;

  const allOrders = getOrdersByTable(branchId, table.number.toString());
  const currentOrders = allOrders.filter(o => !o.billed && ['pending', 'preparing', 'ready', 'completed'].includes(o.status));
  const pastOrders = allOrders.filter(o => o.billed);

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'default',
      preparing: 'secondary',
      ready: 'default',
      completed: 'default',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const completedUnbilledOrders = currentOrders.filter(o => o.status === 'completed');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Table {table.number} - Details</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Orders</TabsTrigger>
              <TabsTrigger value="history">Past Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {currentOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No current orders</p>
              ) : (
                <>
                  {currentOrders.map((order) => (
                    <Card key={order.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold">Order #{order.id}</h4>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="text-muted-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <p className="text-sm text-muted-foreground mt-3 italic">
                            Note: {order.notes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {completedUnbilledOrders.length > 0 && (
                    <div className="pt-4 border-t">
                      <Button
                        onClick={() => {
                          setSelectedOrders(completedUnbilledOrders.map(o => o.id));
                          setBillDialogOpen(true);
                        }}
                        className="w-full"
                      >
                        <Receipt className="mr-2 h-4 w-4" />
                        Create Bill for Completed Orders
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {pastOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No past orders</p>
              ) : (
                pastOrders.map((order) => (
                  <Card key={order.id} className="border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold">Order #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          {order.billedAt && (
                            <p className="text-xs text-muted-foreground">
                              Billed: {new Date(order.billedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-muted-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <BillCreationDialog
        open={billDialogOpen}
        onOpenChange={setBillDialogOpen}
        orderIds={selectedOrders}
        tableNumber={table.number}
        onBillCreated={() => {
          setSelectedOrders([]);
          setBillDialogOpen(false);
        }}
      />
    </>
  );
};
