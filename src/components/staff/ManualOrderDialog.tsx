import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTableStore } from '@/store/tableStore';
import { useMenuStore } from '@/store/menuStore';
import { useOrderStore, OrderItem } from '@/store/orderStore';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

interface ManualOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId: string;
}

interface OrderLineItem {
  menuItemId: string;
  quantity: number;
}

export const ManualOrderDialog = ({ open, onOpenChange, branchId }: ManualOrderDialogProps) => {
  const allTables = useTableStore((state) => state.tables);
  const tables = allTables.filter(t => t.branchId === branchId);
  const allMenuItems = useMenuStore((state) => state.items);
  const menuItems = allMenuItems.filter(item => item.branchId === branchId && item.available);
  const addOrder = useOrderStore((state) => state.addOrder);

  const [selectedTable, setSelectedTable] = useState('');
  const [orderLines, setOrderLines] = useState<OrderLineItem[]>([{ menuItemId: '', quantity: 1 }]);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddOrderLine = () => {
    setOrderLines([...orderLines, { menuItemId: '', quantity: 1 }]);
  };

  const handleRemoveOrderLine = (index: number) => {
    setOrderLines(orderLines.filter((_, i) => i !== index));
  };

  const handleOrderLineChange = (index: number, field: keyof OrderLineItem, value: string | number) => {
    const updated = [...orderLines];
    updated[index] = { ...updated[index], [field]: value };
    setOrderLines(updated);
  };

  const handleSubmit = () => {
    if (!selectedTable) {
      toast({
        title: 'Error',
        description: 'Please select a table',
        variant: 'destructive',
      });
      return;
    }

    const validOrderLines = orderLines.filter(line => line.menuItemId && line.quantity > 0);
    if (validOrderLines.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one menu item',
        variant: 'destructive',
      });
      return;
    }

    const items: OrderItem[] = validOrderLines.map(line => {
      const menuItem = menuItems.find(m => m.id === line.menuItemId)!;
      return {
        menuItemId: menuItem.id,
        name: menuItem.name,
        quantity: line.quantity,
        price: menuItem.price,
      };
    });

    addOrder({
      branchId,
      branchName: 'Staff Order',
      guestName: guestName || 'Walk-in Customer',
      guestPhone: guestPhone || 'N/A',
      tableNumber: selectedTable,
      items,
      notes,
    });

    toast({
      title: 'Order Created',
      description: `Manual order created for Table ${selectedTable}`,
    });

    // Reset form
    setSelectedTable('');
    setOrderLines([{ menuItemId: '', quantity: 1 }]);
    setGuestName('');
    setGuestPhone('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Manual Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Table *</Label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map(table => (
                    <SelectItem key={table.id} value={table.number.toString()}>
                      Table {table.number} (Capacity: {table.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Guest Name (Optional)</Label>
              <Input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter guest name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Guest Phone (Optional)</Label>
            <Input
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="Enter guest phone"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Order Items *</Label>
              <Button size="sm" variant="outline" onClick={handleAddOrderLine}>
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {orderLines.map((line, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Select
                      value={line.menuItemId}
                      onValueChange={(value) => handleOrderLineChange(index, 'menuItemId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select menu item" />
                      </SelectTrigger>
                      <SelectContent>
                        {menuItems.map(item => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name} - ${item.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24 space-y-2">
                    <Input
                      type="number"
                      min="1"
                      value={line.quantity}
                      onChange={(e) => handleOrderLineChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      placeholder="Qty"
                    />
                  </div>

                  {orderLines.length > 1 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveOrderLine(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions or notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Create Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
