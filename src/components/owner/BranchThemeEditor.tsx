import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImagePlus, Save, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface BranchCustomizationProps {
  branch: any;
}

const COLOR_THEMES = [
  {
    id: 'elegant-dark',
    name: 'Elegant Dark',
    colors: {
      primary: '240 5% 15%',
      secondary: '240 5% 25%',
      accent: '43 74% 66%',
    },
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    colors: {
      primary: '203 89% 53%',
      secondary: '203 89% 43%',
      accent: '173 58% 39%',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: {
      primary: '24 95% 53%',
      secondary: '31 100% 71%',
      accent: '340 82% 52%',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '142 71% 45%',
      secondary: '142 76% 36%',
      accent: '160 84% 39%',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      primary: '271 81% 56%',
      secondary: '271 91% 65%',
      accent: '291 47% 51%',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    colors: {
      primary: '340 82% 52%',
      secondary: '24 95% 53%',
      accent: '43 74% 66%',
    },
  },
];

export const BranchCustomization = ({ branch }: BranchCustomizationProps) => {
  const [avatarUrl, setAvatarUrl] = useState(branch.logoUrl || '');
  const [bannerUrl, setBannerUrl] = useState(branch.bannerUrl || '');
  const [selectedTheme, setSelectedTheme] = useState(branch.colorTheme || 'elegant-dark');
  const [avatarPreview, setAvatarPreview] = useState(branch.logoUrl || '');
  const [bannerPreview, setBannerPreview] = useState(branch.bannerUrl || '');

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = COLOR_THEMES.find(t => t.id === themeId);
    if (theme) {
      toast({
        title: 'Theme Preview',
        description: 'Colors will be applied when you save changes.',
      });
    }
  };

  const handleSave = () => {
    const branches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    const theme = COLOR_THEMES.find(t => t.id === selectedTheme);
    
    const updatedBranches = branches.map((b: any) =>
      b.id === branch.id 
        ? { 
            ...b, 
            logoUrl: avatarUrl, 
            bannerUrl: bannerUrl, 
            colorTheme: selectedTheme,
            // Apply theme colors to branch
            heroBackground: theme?.colors.primary,
            heroAccent: theme?.colors.accent,
            buttonPrimary: theme?.colors.accent,
            cardBorder: theme?.colors.secondary,
          } 
        : b
    );
    localStorage.setItem('mock_branches', JSON.stringify(updatedBranches));
    
    toast({
      title: 'Customization Saved',
      description: 'Branch appearance settings and theme have been updated.',
    });
  };

  const handleImageUpload = (type: 'avatar' | 'banner', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Image must be less than 5MB.',
      });
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (type === 'avatar') {
        setAvatarPreview(dataUrl);
        setAvatarUrl(dataUrl);
      } else {
        setBannerPreview(dataUrl);
        setBannerUrl(dataUrl);
      }
      toast({
        title: 'Image Uploaded',
        description: `${type === 'avatar' ? 'Logo' : 'Banner'} image has been uploaded.`,
      });
    };
    reader.readAsDataURL(file);
  };

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
                    <ImagePlus className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No logo uploaded</p>
                  </div>
                )}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload('avatar', e)}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => document.getElementById('avatar-upload')?.click()}
                type="button"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Banner Image</Label>
              <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImagePlus className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No banner uploaded</p>
                  </div>
                )}
              </div>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload('banner', e)}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => document.getElementById('banner-upload')?.click()}
                type="button"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload Banner
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Theme
          </CardTitle>
          <CardDescription>
            Choose a color theme for your branch menu and landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{theme.name}</span>
                    {selectedTheme === theme.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="h-12 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                      title="Primary"
                    />
                    <div
                      className="h-12 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                      title="Secondary"
                    />
                    <div
                      className="h-12 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                      title="Accent"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Applies to hero, buttons & accents
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
