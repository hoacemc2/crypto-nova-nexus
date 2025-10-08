import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { branchApi, menuApi } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, MapPin, Phone, Mail, Clock, Plus, Minus, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { OrderDialog } from '@/components/OrderDialog';
import { BookingDialog } from '@/components/BookingDialog';
import { motion } from 'framer-motion';
import { getThemeById } from '@/lib/themes';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderItem } from '@/store/orderStore';
import { BookingItem } from '@/store/bookingStore';

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

        const branchResponse = await branchApi.getByShortCode(shortCode);
        setBranch(branchResponse.data);

        if (tableId) {
          const tables = JSON.parse(localStorage.getItem('mock_tables') || '[]');
          const table = tables.find((t: any) => t.id === tableId);
          if (table) {
            setTableNumber(table.number);
          }
        }

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
  }, [shortCode, tableId]);

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

  const menuCategories = [...new Set(menuItems.map((item) => item.category))];

  // Get theme configuration
  const selectedTheme = branch.selectedThemeId ? getThemeById(branch.selectedThemeId) : null;
  const themeColors = branch.themeColors || selectedTheme?.colors;
  
  const layout = branch.layout || 'default';
  const galleryImages = branch.galleryImages || [];
  const sliderImages = branch.sliderImages || [];

  const themeStyles = themeColors ? {
    '--page-bg': `hsl(${themeColors.pageBackground})`,
    '--hero-bg': `hsl(${themeColors.heroBackground})`,
    '--hero-text': `hsl(${themeColors.heroText})`,
    '--hero-accent': `hsl(${themeColors.heroAccent})`,
    '--card-bg': `hsl(${themeColors.cardBackground})`,
    '--card-border': `hsl(${themeColors.cardBorder})`,
    '--btn-primary': `hsl(${themeColors.buttonPrimary})`,
    '--btn-primary-text': `hsl(${themeColors.buttonPrimaryText})`,
    '--btn-secondary': `hsl(${themeColors.buttonSecondary})`,
    '--btn-secondary-text': `hsl(${themeColors.buttonSecondaryText})`,
    '--heading': `hsl(${themeColors.headingColor})`,
    '--body-text': `hsl(${themeColors.bodyTextColor})`,
  } as React.CSSProperties : {};

  const renderDefaultLayout = () => (
    <>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
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
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <img 
                src={branch.logoUrl} 
                alt={branch.brandName}
                className="h-28 w-28 object-contain mx-auto rounded-2xl shadow-large bg-card/80 p-4 backdrop-blur-sm"
              />
            </motion.div>
          )}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              color: themeColors ? `hsl(${themeColors.heroText})` : 'hsl(0 0% 100%)',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            {branch.brandName}
          </motion.h1>
          {tableNumber && (
            <Badge className="mb-4 text-lg px-6 py-2 shadow-soft">Table {tableNumber}</Badge>
          )}
          {branch.tagline && (
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl font-medium mb-4"
              style={{ color: themeColors ? `hsl(${themeColors.heroText})` : 'hsl(0 0% 100%)' }}
            >
              {branch.tagline}
            </motion.p>
          )}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90"
            style={{ color: themeColors ? `hsl(${themeColors.heroText})` : 'hsl(0 0% 100%)' }}
          >
            {branch.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Branch Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="mb-8" style={{ backgroundColor: themeColors ? `hsl(${themeColors.cardBackground})` : undefined }}>
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
        </motion.div>

        {/* Menu Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: themeColors ? `hsl(${themeColors.headingColor})` : 'inherit' }}
              >
                Our Menu
              </h2>
              <p 
                className="mt-1"
                style={{ color: themeColors ? `hsl(${themeColors.bodyTextColor})` : 'inherit' }}
              >
                Browse our delicious offerings
              </p>
            </div>
          </div>

          {menuCategories.map((category, catIndex) => (
            <motion.div 
              key={category} 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <h3 
                  className="text-2xl font-semibold"
                  style={{ color: themeColors ? `hsl(${themeColors.headingColor})` : 'inherit' }}
                >
                  {category}
                </h3>
                <Separator className="flex-1" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item, itemIndex) => {
                    const itemQuantity = getItemQuantity(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: itemIndex * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Card 
                          className="overflow-hidden hover:shadow-medium transition-smooth"
                          style={{
                            backgroundColor: themeColors ? `hsl(${themeColors.cardBackground})` : undefined,
                            borderColor: themeColors ? `hsl(${themeColors.cardBorder})` : undefined,
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
                              <span style={{ color: themeColors ? `hsl(${themeColors.headingColor})` : 'inherit' }}>
                                {item.name}
                              </span>
                              <span style={{ color: themeColors ? `hsl(${themeColors.heroAccent})` : 'inherit' }}>
                                ${item.price}
                              </span>
                            </CardTitle>
                            <CardDescription style={{ color: themeColors ? `hsl(${themeColors.bodyTextColor})` : 'inherit' }}>
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
                                    backgroundColor: themeColors ? `hsl(${themeColors.buttonPrimary})` : undefined,
                                    color: themeColors ? `hsl(${themeColors.buttonPrimaryText})` : undefined,
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
                                  backgroundColor: themeColors ? `hsl(${themeColors.buttonPrimary})` : undefined,
                                  color: themeColors ? `hsl(${themeColors.buttonPrimaryText})` : undefined,
                                }}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Order
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center" style={{ color: themeColors ? `hsl(${themeColors.bodyTextColor})` : 'inherit' }}>
        <p className="text-sm">© 2024 {branch.brandName}. All rights reserved.</p>
      </footer>
    </>
  );

  const renderMasonryLayout = () => (
    <>
      {galleryImages.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: themeColors ? `hsl(${themeColors.headingColor})` : 'inherit' }}>
            Gallery
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="break-inside-avoid"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full rounded-lg shadow-medium hover:shadow-large transition-smooth"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {renderDefaultLayout()}
    </>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'masonry':
        return renderMasonryLayout();
      default:
        return renderDefaultLayout();
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: themeColors ? `hsl(${themeColors.pageBackground})` : 'hsl(0 0% 98%)',
        ...themeStyles
      }}
    >
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

      {/* Continuous Horizontal Slider */}
      {sliderImages.length > 0 && (
        <div className="overflow-hidden py-8 border-b" style={{ borderColor: themeColors ? `hsl(${themeColors.cardBorder})` : 'inherit' }}>
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -(sliderImages.length * 320)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: sliderImages.length * 5,
                ease: "linear",
              },
            }}
          >
            {[...sliderImages, ...sliderImages, ...sliderImages].map((img, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-48">
                <img 
                  src={img} 
                  alt={`Slider ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg shadow-medium"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {renderLayout()}
    </div>
  );
};

export default GuestLanding;
