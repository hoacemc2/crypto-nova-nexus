import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useMenuStore, MenuItem } from '@/store/menuStore';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(2, 'Category is required'),
  imageUrl: z.string().optional(),
  available: z.boolean().default(true),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface MenuItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId: string;
  item?: MenuItem;
}

export const MenuItemDialog = ({
  open,
  onOpenChange,
  branchId,
  item,
}: MenuItemDialogProps) => {
  const addItem = useMenuStore((state) => state.addItem);
  const updateItem = useMenuStore((state) => state.updateItem);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      available: true,
    },
  });

  const available = watch('available');

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl || '',
        available: item.available,
      });
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        available: true,
      });
    }
  }, [item, reset]);

  const onSubmit = (data: MenuItemFormData) => {
    if (item) {
      updateItem(item.id, data);
      toast({
        title: 'Menu Item Updated',
        description: 'The menu item has been updated successfully.',
      });
    } else {
      addItem({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        available: data.available,
        branchId,
      });
      toast({
        title: 'Menu Item Added',
        description: 'The menu item has been added successfully.',
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogDescription>
            {item ? 'Update the menu item details' : 'Add a new item to your menu'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name *</Label>
            <Input {...register('name')} id="name" placeholder="e.g., Grilled Salmon" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              {...register('category')}
              id="category"
              placeholder="e.g., Main Course, Appetizer, Dessert"
            />
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              {...register('description')}
              id="description"
              placeholder="Describe the dish..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              {...register('price')}
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              {...register('imageUrl')}
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={available}
              onCheckedChange={(checked) => setValue('available', checked)}
            />
            <Label htmlFor="available" className="cursor-pointer">
              Available for order
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{item ? 'Update' : 'Add'} Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
