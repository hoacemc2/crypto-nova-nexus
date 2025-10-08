import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Check, Upload, X, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { PREDEFINED_THEMES, getDarkThemes, getLightThemes } from '@/lib/themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BranchCustomizationProps {
  branch: any;
}

export const BranchCustomization = ({ branch }: BranchCustomizationProps) => {
  // Get user's package from localStorage
  const userPackage = localStorage.getItem('user_package') || 'basic';
  
  const [avatarUrl, setAvatarUrl] = useState(branch.logoUrl || '');
  const [bannerUrl, setBannerUrl] = useState(branch.bannerUrl || '');
  const [selectedTheme, setSelectedTheme] = useState(branch.selectedThemeId || 'midnight');
  const [avatarPreview, setAvatarPreview] = useState(branch.logoUrl || '');
  const [bannerPreview, setBannerPreview] = useState(branch.bannerUrl || '');
  const [layout, setLayout] = useState(branch.layout || 'default');
  const [galleryImages, setGalleryImages] = useState<string[]>(branch.galleryImages || []);
  const [sliderImages, setSliderImages] = useState<string[]>(branch.sliderImages || []);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = PREDEFINED_THEMES.find(t => t.id === themeId);
    toast({
      title: 'Theme Preview',
      description: `Previewing ${theme?.name} theme. Click Save to apply.`,
    });
  };

  const handleSave = () => {
    const branches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    const theme = PREDEFINED_THEMES.find(t => t.id === selectedTheme);
    
    const updatedBranches = branches.map((b: any) =>
      b.id === branch.id
        ? {
            ...b,
            logoUrl: avatarPreview || avatarUrl,
            bannerUrl: bannerPreview || bannerUrl,
            selectedThemeId: selectedTheme,
            themeColors: theme?.colors,
            layout,
            galleryImages,
            sliderImages,
          }
        : b
    );
    localStorage.setItem('mock_branches', JSON.stringify(updatedBranches));

    toast({
      title: 'Customization Saved',
      description: 'Your branch customization has been updated successfully.',
    });
  };

  const handleImageUpload = (type: 'avatar' | 'banner' | 'gallery' | 'slider', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an image file.',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    // Create a data URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (type === 'avatar') {
        setAvatarPreview(dataUrl);
        setAvatarUrl(dataUrl);
      } else if (type === 'banner') {
        setBannerPreview(dataUrl);
        setBannerUrl(dataUrl);
      } else if (type === 'gallery') {
        setGalleryImages(prev => [...prev, dataUrl]);
      } else if (type === 'slider') {
        setSliderImages(prev => [...prev, dataUrl]);
      }
    };
    reader.readAsDataURL(file);

    toast({
      title: 'Image Uploaded',
      description: `Image uploaded successfully. Click Save to apply.`,
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeSliderImage = (index: number) => {
    setSliderImages(prev => prev.filter((_, i) => i !== index));
  };

  const canCustomizeTheme = userPackage !== 'basic';
  const canCustomizeLayout = userPackage === 'pro' || userPackage === 'enterprise';
  const canUseSlider = userPackage === 'enterprise';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Branch Images</CardTitle>
          <CardDescription>Customize your branch logo and banner image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Restaurant Logo</Label>
              <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No logo uploaded</p>
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('avatar', e)}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <Label>Banner Image</Label>
              <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No banner uploaded</p>
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('banner', e)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Selection</CardTitle>
          <CardDescription>
            {canCustomizeTheme 
              ? 'Choose from pre-made themes with different color schemes and backgrounds'
              : 'Upgrade to Pro or Enterprise to unlock theme customization'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!canCustomizeTheme ? (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground mb-4">Theme customization is available in Pro and Enterprise packages</p>
              <Button variant="outline" disabled>Upgrade to Unlock</Button>
            </div>
          ) : (
            <Tabs defaultValue="dark" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark Themes
                </TabsTrigger>
                <TabsTrigger value="light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Light Themes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dark" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {getDarkThemes().map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedTheme === theme.id
                          ? 'border-primary shadow-medium'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {selectedTheme === theme.id && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-left">{theme.name}</h3>
                        <div className="h-20 rounded-md border overflow-hidden" style={{ backgroundColor: `hsl(${theme.colors.pageBackground})` }}>
                          <div className="h-1/2" style={{ backgroundColor: `hsl(${theme.colors.heroBackground})` }}></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.heroAccent})` }} />
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.buttonPrimary})` }} />
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.cardBackground})` }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="light" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {getLightThemes().map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedTheme === theme.id
                          ? 'border-primary shadow-medium'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {selectedTheme === theme.id && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-left">{theme.name}</h3>
                        <div className="h-20 rounded-md border overflow-hidden" style={{ backgroundColor: `hsl(${theme.colors.pageBackground})` }}>
                          <div className="h-1/2" style={{ backgroundColor: `hsl(${theme.colors.heroBackground})` }}></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.heroAccent})` }} />
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.buttonPrimary})` }} />
                          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: `hsl(${theme.colors.cardBackground})` }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {canCustomizeLayout && (
        <Card>
          <CardHeader>
            <CardTitle>Layout Options</CardTitle>
            <CardDescription>Choose how your landing page is displayed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout">Page Layout</Label>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (Hero + Menu Grid)</SelectItem>
                    <SelectItem value="centered">Centered Content</SelectItem>
                    <SelectItem value="sidebar">Sidebar Menu</SelectItem>
                    <SelectItem value="masonry">Masonry Gallery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Gallery Images</Label>
                <p className="text-sm text-muted-foreground">Add multiple images to create a beautiful gallery showcase</p>
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Label htmlFor="gallery-upload" className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-6 w-6 mb-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add Image</span>
                    <Input
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload('gallery', e)}
                    />
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {canUseSlider && (
        <Card>
          <CardHeader>
            <CardTitle>Image Slider</CardTitle>
            <CardDescription>Create a continuously scrolling horizontal image slider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-3">
                {sliderImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Slider ${index + 1}`} className="w-full h-20 object-cover rounded-lg border" />
                    <button
                      onClick={() => removeSliderImage(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Label htmlFor="slider-upload" className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <ImageIcon className="h-6 w-6 mb-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add</span>
                  <Input
                    id="slider-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload('slider', e)}
                  />
                </Label>
              </div>
              {sliderImages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  The slider will continuously scroll these images horizontally across the page
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
