import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ManualOrderDialog } from '@/components/staff/ManualOrderDialog';

const OrdersPage = () => {
  const { user } = useAuthStore();
  const branchId = user?.branchId;
  const { orders, updateOrderStatus } = useOrderStore();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const branchOrders = orders.filter(o => o.branchId === branchId);
  const pendingOrders = branchOrders.filter(o => o.status === 'pending');
  const activeOrders = branchOrders.filter(o => ['preparing', 'ready'].includes(o.status));

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing');
    toast({ title: 'Order accepted', description: 'Order is now being prepared.' });
  };

  const handleRejectOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    toast({ title: 'Order rejected', description: 'Order has been cancelled.' });
  };

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(orderId, 'ready');
    toast({ title: 'Order ready', description: 'Order is ready for serving.' });
  };

  const handleComplete = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
    toast({ title: 'Order completed', description: 'Order has been served.' });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'secondary',
      preparing: 'default',
      ready: 'default',
      completed: 'default',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Order Management</h2>
        <Button onClick={() => setOrderDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pending Orders ({pendingOrders.length})</h3>
          {pendingOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    Order #{order.id} - Table {order.tableNumber}
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleRejectOrder(order.id)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {pendingOrders.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pending orders
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Orders ({activeOrders.length})</h3>
          {activeOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    Order #{order.id} - Table {order.tableNumber}
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {order.status === 'preparing' && (
                    <Button 
                      className="flex-1"
                      onClick={() => handleMarkReady(order.id)}
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button 
                      className="flex-1"
                      onClick={() => handleComplete(order.id)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {activeOrders.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No active orders
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ManualOrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
        branchId={branchId || ''}
      />
    </div>
  );
};

export default OrdersPage;
