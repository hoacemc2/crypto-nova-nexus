import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { branchApi, menuApi } from '@/lib/api';
import { Phone, Mail, MapPin, Clock, ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BookingDialog } from '@/components/BookingDialog';
import { OrderDialog } from '@/components/OrderDialog';
import { OrderBillDialog } from '@/components/OrderBillDialog';
import { BookingItem } from '@/store/bookingStore';
import { OrderItem } from '@/store/orderStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const getThemeColors = (themeId: string) => {
  const themes: Record<string, any> = {
    'elegant-dark': { primary: '240 5% 15%', secondary: '240 5% 25%', accent: '43 74% 66%' },
    'ocean-blue': { primary: '203 89% 53%', secondary: '203 89% 43%', accent: '173 58% 39%' },
    'sunset-orange': { primary: '24 95% 53%', secondary: '31 100% 71%', accent: '340 82% 52%' },
    'forest-green': { primary: '142 71% 45%', secondary: '142 76% 36%', accent: '160 84% 39%' },
    'royal-purple': { primary: '271 81% 56%', secondary: '271 91% 65%', accent: '291 47% 51%' },
    'rose-gold': { primary: '340 82% 52%', secondary: '24 95% 53%', accent: '43 74% 66%' },
  };
  return themes[themeId] || themes['elegant-dark'];
};

const GuestLanding = () => {
  const { shortCode, tableId } = useParams<{ shortCode: string; tableId?: string }>();
  const [branch, setBranch] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<'now' | 'booking'>('now');
  const [tableNumber, setTableNumber] = useState<string>('');

  useEffect(() => {
    const loadBranchData = async () => {
      try {
        setLoading(true);
        if (!shortCode) throw new Error('Branch code not provided');

        // Fetch branch data
        const branchResponse = await branchApi.getByShortCode(shortCode);
        setBranch(branchResponse.data);

        // If tableId is provided, fetch table details
        if (tableId) {
          const tables = JSON.parse(localStorage.getItem('mock_tables') || '[]');
          const table = tables.find((t: any) => t.id === tableId);
          if (table) {
            setTableNumber(table.number);
          }
        }

        // Fetch menu items
        const menuResponse = await menuApi.getAll(branchResponse.data.id);
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error('Error loading branch:', error);
        toast({
          variant: 'destructive',
          title: 'Branch not found',
          description: 'The requested branch could not be found.',
        });
      } finally {
        setLoading(false);
      }
    };

    loadBranchData();
  }, [shortCode]);

  const addToCart = (item: any) => {
    const existingItem = selectedItems.find((i) => i.menuItemId === item.id);
    
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          menuItemId: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
        },
      ]);
    }

    toast({
      title: 'Added to Cart',
      description: `${item.name} added to your order.`,
    });
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setSelectedItems((items) =>
      items
        .map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getItemQuantity = (menuItemId: string) => {
    return selectedItems.find((i) => i.menuItemId === menuItemId)?.quantity || 0;
  };

  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Branch Not Found</CardTitle>
            <CardDescription>
              The branch you're looking for doesn't exist or is no longer available.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const menuCategories = [...new Set(menuItems.map(item => item.category))];

  // Apply custom color theme if set
  const colorTheme = branch?.colorTheme;
  const customColors = branch?.heroBackground ? {
    '--hero-bg': branch.heroBackground,
    '--hero-text': branch.heroText,
    '--hero-accent': branch.heroAccent,
    '--card-bg': branch.cardBackground,
    '--card-border': branch.cardBorder,
    '--btn-primary': branch.buttonPrimary,
    '--btn-primary-text': branch.buttonPrimaryText,
    '--btn-secondary': branch.buttonSecondary,
    '--btn-secondary-text': branch.buttonSecondaryText,
    '--heading-color': branch.headingColor,
    '--body-text': branch.bodyTextColor,
    '--page-bg': branch.pageBackground,
  } : colorTheme ? {
    '--hero-bg': getThemeColors(colorTheme).primary,
    '--hero-text': '0 0% 100%',
    '--hero-accent': getThemeColors(colorTheme).accent,
    '--card-bg': '0 0% 100%',
    '--card-border': '240 5% 90%',
    '--btn-primary': getThemeColors(colorTheme).accent,
    '--btn-primary-text': '240 5% 15%',
    '--btn-secondary': getThemeColors(colorTheme).secondary,
    '--btn-secondary-text': '0 0% 100%',
    '--heading-color': '240 5% 15%',
    '--body-text': '240 5% 40%',
    '--page-bg': '0 0% 98%',
  } : {};
  
  const themeStyles = {
    style: customColors as React.CSSProperties
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: `hsl(var(--page-bg, 0 0% 98%))`, ...customColors }}>
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px]">
          <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'now' | 'booking')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="now">Order Now</TabsTrigger>
              <TabsTrigger value="booking">Pre-Order</TabsTrigger>
            </TabsList>
            <TabsContent value="now">
              <OrderDialog
                branchId={branch.id}
                branchName={branch.brandName || branch.name}
                selectedItems={selectedItems}
                onOrderComplete={() => setSelectedItems([])}
              />
            </TabsContent>
            <TabsContent value="booking">
              <BookingDialog
                branchId={branch.id}
                branchName={branch.brandName || branch.name}
                selectedItems={selectedItems as BookingItem[]}
                onBookingComplete={() => setSelectedItems([])}
              />
            </TabsContent>
          </Tabs>
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-sm font-bold shadow-lg">
            {totalItems}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
        style={{ 
          background: branch.bannerUrl 
            ? 'transparent' 
            : `linear-gradient(135deg, hsl(var(--hero-bg, 240 5% 15%)), hsl(var(--hero-accent, 43 74% 66%)) 100%)`
        }}
      >
        {branch.bannerUrl && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${branch.bannerUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90 backdrop-blur-[2px]" />
          </>
        )}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          {branch.logoUrl && (
            <div className="mb-8">
              <img 
                src={branch.logoUrl} 
                alt={branch.brandName}
                className="h-28 w-28 object-contain mx-auto rounded-2xl shadow-elegant bg-card/80 p-4 backdrop-blur-sm"
              />
            </div>
          )}
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              color: `hsl(var(--hero-text, 0 0% 100%))`,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            {branch.brandName}
          </h1>
          {tableNumber && (
            <Badge className="mb-4 text-lg px-6 py-2 shadow-soft">Table {tableNumber}</Badge>
          )}
          {branch.tagline && (
            <p 
              className="text-2xl md:text-3xl font-medium mb-4"
              style={{ color: `hsl(var(--hero-text, 0 0% 100%))` }}
            >
              {branch.tagline}
            </p>
          )}
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90"
            style={{ color: `hsl(var(--hero-text, 0 0% 100%))` }}
          >
            {branch.description}
          </p>
        </div>
      </div>

      {/* Branch Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{branch.name}</CardTitle>
            <CardDescription>Branch Information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{branch.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{branch.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{branch.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Sun: 10am - 10pm</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: `hsl(var(--heading-color, 240 5% 15%))` }}
              >
                Our Menu
              </h2>
              <p 
                className="mt-1"
                style={{ color: `hsl(var(--body-text, 240 5% 40%))` }}
              >
                Browse our delicious offerings
              </p>
            </div>
          </div>

          {menuCategories.map(category => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 
                  className="text-2xl font-semibold"
                  style={{ color: `hsl(var(--heading-color, 240 5% 15%))` }}
                >
                  {category}
                </h3>
                <Separator className="flex-1" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => {
                    const itemQuantity = getItemQuantity(item.id);
                    return (
                      <Card 
                        key={item.id} 
                        className="overflow-hidden hover:shadow-medium transition-smooth"
                        style={{
                          backgroundColor: `hsl(var(--card-bg, 0 0% 100%))`,
                          borderColor: `hsl(var(--card-border, 240 5% 90%))`
                        }}
                      >
                        <div className="aspect-video bg-muted relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {item.bestSeller && (
                            <Badge className="absolute top-2 right-2">
                              Best Seller
                            </Badge>
                          )}
                          {!item.available && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <Badge variant="destructive">Unavailable</Badge>
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-start justify-between">
                            <span style={{ color: `hsl(var(--heading-color, 240 5% 15%))` }}>
                              {item.name}
                            </span>
                            <span style={{ color: `hsl(var(--hero-accent, 43 74% 66%))` }}>
                              ${item.price}
                            </span>
                          </CardTitle>
                          <CardDescription style={{ color: `hsl(var(--body-text, 240 5% 40%))` }}>
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {itemQuantity > 0 ? (
                            <div className="flex items-center gap-2 w-full">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-10 w-10"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="flex-1 text-center font-semibold text-lg">
                                {itemQuantity}
                              </span>
                              <Button
                                size="icon"
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={!item.available}
                                className="h-10 w-10"
                                style={{
                                  backgroundColor: `hsl(var(--btn-primary, 43 74% 66%))`,
                                  color: `hsl(var(--btn-primary-text, 240 5% 15%))`
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              className="w-full" 
                              onClick={() => addToCart(item)}
                              disabled={!item.available}
                              style={{
                                backgroundColor: `hsl(var(--btn-primary, 43 74% 66%))`,
                                color: `hsl(var(--btn-primary-text, 240 5% 15%))`
                              }}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Order
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 {branch.brandName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GuestLanding;
