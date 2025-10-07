import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/store/orderStore';
import { useState } from 'react';

interface OrderBillDialogProps {
  trigger: React.ReactNode;
  items: OrderItem[];
  total: number;
  onClose?: () => void;
  title?: string;
}

export function OrderBillDialog({ trigger, items, total, onClose, title }: OrderBillDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v && onClose) onClose(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title || 'Order Bill'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-2">
          {items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
