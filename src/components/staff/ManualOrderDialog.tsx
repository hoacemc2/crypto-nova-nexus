import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useTableStore } from '@/store/tableStore';
import { useMenuStore } from '@/store/menuStore';
import { useOrderStore, OrderItem, OrderItemCustomization } from '@/store/orderStore';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ManualOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId: string;
}

interface OrderLineItem {
  menuItemId: string;
  quantity: number;
  selectedCustomizations: Map<string, { optionName: string; price: number }>;
}

export const ManualOrderDialog = ({ open, onOpenChange, branchId }: ManualOrderDialogProps) => {
  const allTables = useTableStore((state) => state.tables);
  const tables = allTables.filter(t => t.branchId === branchId);
  const allMenuItems = useMenuStore((state) => state.items);
  const menuItems = allMenuItems.filter(item => item.branchId === branchId && item.available);
  const { addOrder, addOrderLine, getActiveOrderByTable } = useOrderStore();

  const [selectedTable, setSelectedTable] = useState('');
  const [orderLines, setOrderLines] = useState<OrderLineItem[]>([{ 
    menuItemId: '', 
    quantity: 1,
    selectedCustomizations: new Map()
  }]);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddOrderLine = () => {
    setOrderLines([...orderLines, { 
      menuItemId: '', 
      quantity: 1,
      selectedCustomizations: new Map()
    }]);
  };

  const handleRemoveOrderLine = (index: number) => {
    setOrderLines(orderLines.filter((_, i) => i !== index));
  };

  const handleOrderLineChange = (index: number, field: keyof OrderLineItem, value: string | number) => {
    const updated = [...orderLines];
    if (field === 'menuItemId') {
      updated[index] = { 
        ...updated[index], 
        menuItemId: value as string,
        selectedCustomizations: new Map() // Reset customizations when item changes
      };
    } else if (field === 'quantity') {
      updated[index] = { ...updated[index], quantity: value as number };
    }
    setOrderLines(updated);
  };

  const handleCustomizationChange = (
    lineIndex: number, 
    customizationId: string, 
    customizationName: string,
    optionName: string, 
    price: number, 
    checked: boolean
  ) => {
    const updated = [...orderLines];
    const customizations = new Map(updated[lineIndex].selectedCustomizations);
    
    if (checked) {
      customizations.set(customizationId, { optionName, price });
    } else {
      customizations.delete(customizationId);
    }
    
    updated[lineIndex].selectedCustomizations = customizations;
    setOrderLines(updated);
  };

  const calculateLineTotal = (line: OrderLineItem): number => {
    const menuItem = menuItems.find(m => m.id === line.menuItemId);
    if (!menuItem) return 0;
    
    let itemPrice = menuItem.price;
    line.selectedCustomizations.forEach(custom => {
      itemPrice += custom.price;
    });
    
    return itemPrice * line.quantity;
  };

  const calculateTotal = (): number => {
    return orderLines.reduce((sum, line) => sum + calculateLineTotal(line), 0);
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
      const customizations: OrderItemCustomization[] = Array.from(line.selectedCustomizations.entries()).map(([id, data]) => {
        const customization = menuItem.customizations?.find(c => c.id === id);
        return {
          customizationId: id,
          customizationName: customization?.name || '',
          optionName: data.optionName,
          price: data.price,
        };
      });

      let itemPrice = menuItem.price;
      customizations.forEach(c => itemPrice += c.price);

      return {
        menuItemId: menuItem.id,
        name: menuItem.name,
        quantity: line.quantity,
        price: itemPrice,
        customizations: customizations.length > 0 ? customizations : undefined,
      };
    });

    const lineTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Check if there's an active order for this table
    const existingOrder = getActiveOrderByTable(branchId, selectedTable);

    if (existingOrder) {
      // Add as a new order line to the existing order
      addOrderLine(existingOrder.id, {
        items,
        total: lineTotal,
        notes,
      });

      toast({
        title: 'Order Line Added',
        description: `New items added to Table ${selectedTable}'s order`,
      });
    } else {
      // Create a new order with the first order line
      addOrder({
        branchId,
        branchName: 'Staff Order',
        guestName: guestName || 'Walk-in Customer',
        guestPhone: guestPhone || 'N/A',
        tableNumber: selectedTable,
        orderLines: [{
          id: '', // Will be generated
          items,
          total: lineTotal,
          createdAt: '', // Will be generated
          notes,
        }],
      });

      toast({
        title: 'Order Created',
        description: `New order created for Table ${selectedTable}`,
      });
    }

    // Reset form
    setSelectedTable('');
    setOrderLines([{ menuItemId: '', quantity: 1, selectedCustomizations: new Map() }]);
    setGuestName('');
    setGuestPhone('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Order / Add Order Line</DialogTitle>
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

            <div className="space-y-4">
              {orderLines.map((line, index) => {
                const menuItem = menuItems.find(m => m.id === line.menuItemId);
                const lineTotal = calculateLineTotal(line);

                return (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex gap-2 items-end">
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
                                {item.category && <Badge variant="outline" className="ml-2">{item.category}</Badge>}
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

                    {menuItem && menuItem.customizations && menuItem.customizations.length > 0 && (
                      <div className="space-y-3 pl-2 border-l-2 border-primary/20">
                        <p className="text-sm font-semibold text-muted-foreground">Customizations:</p>
                        {menuItem.customizations.map(customization => (
                          <div key={customization.id} className="space-y-2">
                            <Label className="text-sm">{customization.name}</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {customization.options.map(option => {
                                const isSelected = line.selectedCustomizations.has(customization.id) && 
                                  line.selectedCustomizations.get(customization.id)?.optionName === option.name;
                                
                                return (
                                  <div key={option.name} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${index}-${customization.id}-${option.name}`}
                                      checked={isSelected}
                                      onCheckedChange={(checked) => 
                                        handleCustomizationChange(
                                          index, 
                                          customization.id, 
                                          customization.name,
                                          option.name, 
                                          option.price, 
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`${index}-${customization.id}-${option.name}`}
                                      className="text-sm cursor-pointer"
                                    >
                                      {option.name} {option.price > 0 && `(+$${option.price.toFixed(2)})`}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {menuItem && (
                      <div className="flex justify-end pt-2 border-t">
                        <span className="text-sm font-semibold">
                          Line Total: ${lineTotal.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
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

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-lg font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Create Order
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
