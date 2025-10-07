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

  const handleSave = () => {
    const branches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    const updatedBranches = branches.map((b: any) =>
      b.id === branch.id 
        ? { ...b, logoUrl: avatarUrl, bannerUrl: bannerUrl, colorTheme: selectedTheme } 
        : b
    );
    localStorage.setItem('mock_branches', JSON.stringify(updatedBranches));
    
    toast({
      title: 'Customization Saved',
      description: 'Branch appearance settings have been updated.',
    });
  };

  const handleImageUpload = (type: 'avatar' | 'banner') => {
    // Mock image upload - in production, this would handle actual file uploads
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&q=80`;
    if (type === 'avatar') {
      setAvatarUrl(mockUrl);
    } else {
      setBannerUrl(mockUrl);
    }
    toast({
      title: 'Image Uploaded',
      description: `${type === 'avatar' ? 'Logo' : 'Banner'} image has been uploaded.`,
    });
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
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImagePlus className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No logo uploaded</p>
                  </div>
                )}
              </div>
              <Input
                placeholder="Image URL"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleImageUpload('avatar')}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Banner Image</Label>
              <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                {bannerUrl ? (
                  <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImagePlus className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">No banner uploaded</p>
                  </div>
                )}
              </div>
              <Input
                placeholder="Image URL"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleImageUpload('banner')}
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
                onClick={() => setSelectedTheme(theme.id)}
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
                    />
                    <div
                      className="h-12 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                    />
                    <div
                      className="h-12 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                    />
                  </div>
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
