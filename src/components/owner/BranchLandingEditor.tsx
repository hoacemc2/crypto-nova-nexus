import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Eye, Copy, Save, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BranchLandingCustomizerProps {
  branch: any;
}

export const BranchLandingCustomizer = ({ branch }: BranchLandingCustomizerProps) => {
  const [landingData, setLandingData] = useState({
    brandName: branch.brandName || '',
    description: branch.description || '',
    phone: branch.phone || '',
    email: branch.email || '',
    address: branch.address || '',
    tagline: branch.tagline || '',
    // Hero section colors
    heroBackground: branch.heroBackground || '240 5% 15%',
    heroText: branch.heroText || '0 0% 100%',
    heroAccent: branch.heroAccent || '43 74% 66%',
    // Card colors
    cardBackground: branch.cardBackground || '0 0% 100%',
    cardBorder: branch.cardBorder || '240 5% 90%',
    // Button colors
    buttonPrimary: branch.buttonPrimary || '43 74% 66%',
    buttonPrimaryText: branch.buttonPrimaryText || '240 5% 15%',
    buttonSecondary: branch.buttonSecondary || '240 5% 25%',
    buttonSecondaryText: branch.buttonSecondaryText || '0 0% 100%',
    // Text colors
    headingColor: branch.headingColor || '240 5% 15%',
    bodyTextColor: branch.bodyTextColor || '240 5% 40%',
    // Page background
    pageBackground: branch.pageBackground || '0 0% 98%',
  });

  const handleSave = () => {
    const branches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    const updatedBranches = branches.map((b: any) =>
      b.id === branch.id ? { ...b, ...landingData } : b
    );
    localStorage.setItem('mock_branches', JSON.stringify(updatedBranches));
    
    toast({
      title: 'Landing Page Updated',
      description: 'Your landing page content and theme have been updated.',
    });
  };

  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;

    const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal;
    const x = c * (1 - Math.abs((hDecimal * 6) % 2 - 1));
    const m = lDecimal - c / 2;
    let r = 0, g = 0, b = 0;

    if (hDecimal < 1/6) { r = c; g = x; b = 0; }
    else if (hDecimal < 2/6) { r = x; g = c; b = 0; }
    else if (hDecimal < 3/6) { r = 0; g = c; b = x; }
    else if (hDecimal < 4/6) { r = 0; g = x; b = c; }
    else if (hDecimal < 5/6) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Landing Page Content</CardTitle>
              <CardDescription>
                Customize what guests see when they visit your landing page
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.open(`/branch/${branch.shortCode}`, '_blank')}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/g/${branch.shortCode}`);
                  toast({
                    title: 'Link Copied',
                    description: 'Landing page URL copied to clipboard.',
                  });
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input
              id="brandName"
              value={landingData.brandName}
              onChange={(e) => setLandingData({ ...landingData, brandName: e.target.value })}
              placeholder="Your Restaurant Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={landingData.tagline}
              onChange={(e) => setLandingData({ ...landingData, tagline: e.target.value })}
              placeholder="Where Every Meal is a Celebration"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={landingData.description}
              onChange={(e) => setLandingData({ ...landingData, description: e.target.value })}
              placeholder="Tell guests about your restaurant..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={landingData.phone}
                onChange={(e) => setLandingData({ ...landingData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={landingData.email}
                onChange={(e) => setLandingData({ ...landingData, email: e.target.value })}
                placeholder="contact@restaurant.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={landingData.address}
              onChange={(e) => setLandingData({ ...landingData, address: e.target.value })}
              placeholder="123 Main Street, City, State"
            />
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
            Customize colors for specific elements on your landing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hero Section Colors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Hero Section</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroBackground">Hero Background</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroBackground"
                    type="color"
                    value={hslToHex(landingData.heroBackground)}
                    onChange={(e) => setLandingData({ ...landingData, heroBackground: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.heroBackground}
                    onChange={(e) => setLandingData({ ...landingData, heroBackground: e.target.value })}
                    placeholder="240 5% 15%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Top banner area</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroText">Hero Text</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroText"
                    type="color"
                    value={hslToHex(landingData.heroText)}
                    onChange={(e) => setLandingData({ ...landingData, heroText: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.heroText}
                    onChange={(e) => setLandingData({ ...landingData, heroText: e.target.value })}
                    placeholder="0 0% 100%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Restaurant name & tagline</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroAccent">Hero Accent</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroAccent"
                    type="color"
                    value={hslToHex(landingData.heroAccent)}
                    onChange={(e) => setLandingData({ ...landingData, heroAccent: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.heroAccent}
                    onChange={(e) => setLandingData({ ...landingData, heroAccent: e.target.value })}
                    placeholder="43 74% 66%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Highlights & gradient</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Card Colors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Menu Cards</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardBackground">Card Background</Label>
                <div className="flex gap-2">
                  <Input
                    id="cardBackground"
                    type="color"
                    value={hslToHex(landingData.cardBackground)}
                    onChange={(e) => setLandingData({ ...landingData, cardBackground: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.cardBackground}
                    onChange={(e) => setLandingData({ ...landingData, cardBackground: e.target.value })}
                    placeholder="0 0% 100%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Menu item cards</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardBorder">Card Border</Label>
                <div className="flex gap-2">
                  <Input
                    id="cardBorder"
                    type="color"
                    value={hslToHex(landingData.cardBorder)}
                    onChange={(e) => setLandingData({ ...landingData, cardBorder: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.cardBorder}
                    onChange={(e) => setLandingData({ ...landingData, cardBorder: e.target.value })}
                    placeholder="240 5% 90%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Card outline color</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Button Colors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Buttons</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <p className="text-sm font-medium">Primary Button</p>
                <div className="space-y-2">
                  <Label htmlFor="buttonPrimary">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="buttonPrimary"
                      type="color"
                      value={hslToHex(landingData.buttonPrimary)}
                      onChange={(e) => setLandingData({ ...landingData, buttonPrimary: hexToHsl(e.target.value) })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={landingData.buttonPrimary}
                      onChange={(e) => setLandingData({ ...landingData, buttonPrimary: e.target.value })}
                      placeholder="43 74% 66%"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonPrimaryText">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="buttonPrimaryText"
                      type="color"
                      value={hslToHex(landingData.buttonPrimaryText)}
                      onChange={(e) => setLandingData({ ...landingData, buttonPrimaryText: hexToHsl(e.target.value) })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={landingData.buttonPrimaryText}
                      onChange={(e) => setLandingData({ ...landingData, buttonPrimaryText: e.target.value })}
                      placeholder="240 5% 15%"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium">Secondary Button</p>
                <div className="space-y-2">
                  <Label htmlFor="buttonSecondary">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="buttonSecondary"
                      type="color"
                      value={hslToHex(landingData.buttonSecondary)}
                      onChange={(e) => setLandingData({ ...landingData, buttonSecondary: hexToHsl(e.target.value) })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={landingData.buttonSecondary}
                      onChange={(e) => setLandingData({ ...landingData, buttonSecondary: e.target.value })}
                      placeholder="240 5% 25%"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonSecondaryText">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="buttonSecondaryText"
                      type="color"
                      value={hslToHex(landingData.buttonSecondaryText)}
                      onChange={(e) => setLandingData({ ...landingData, buttonSecondaryText: hexToHsl(e.target.value) })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={landingData.buttonSecondaryText}
                      onChange={(e) => setLandingData({ ...landingData, buttonSecondaryText: e.target.value })}
                      placeholder="0 0% 100%"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Text Colors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Typography</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="headingColor">Heading Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="headingColor"
                    type="color"
                    value={hslToHex(landingData.headingColor)}
                    onChange={(e) => setLandingData({ ...landingData, headingColor: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.headingColor}
                    onChange={(e) => setLandingData({ ...landingData, headingColor: e.target.value })}
                    placeholder="240 5% 15%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Menu titles & headings</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyTextColor">Body Text</Label>
                <div className="flex gap-2">
                  <Input
                    id="bodyTextColor"
                    type="color"
                    value={hslToHex(landingData.bodyTextColor)}
                    onChange={(e) => setLandingData({ ...landingData, bodyTextColor: hexToHsl(e.target.value) })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={landingData.bodyTextColor}
                    onChange={(e) => setLandingData({ ...landingData, bodyTextColor: e.target.value })}
                    placeholder="240 5% 40%"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Descriptions & content</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Page Background */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Page Background</h4>
            <div className="space-y-2">
              <Label htmlFor="pageBackground">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="pageBackground"
                  type="color"
                  value={hslToHex(landingData.pageBackground)}
                  onChange={(e) => setLandingData({ ...landingData, pageBackground: hexToHsl(e.target.value) })}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={landingData.pageBackground}
                  onChange={(e) => setLandingData({ ...landingData, pageBackground: e.target.value })}
                  placeholder="0 0% 98%"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Overall page background</p>
            </div>
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
