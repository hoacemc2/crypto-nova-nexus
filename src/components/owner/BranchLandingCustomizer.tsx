import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink, Save, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BranchLandingCustomizerProps {
  branch: any;
}

export const BranchLandingCustomizer = ({ branch }: BranchLandingCustomizerProps) => {
  const [landingData, setLandingData] = useState({
    brandName: branch.brandName || '',
    description: branch.description || 'Welcome to our restaurant',
    phone: branch.phone || '',
    email: branch.email || '',
    address: branch.address || '',
  });

  const handleSave = () => {
    // Save to localStorage or backend
    const branches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    const updatedBranches = branches.map((b: any) =>
      b.id === branch.id ? { ...b, ...landingData } : b
    );
    localStorage.setItem('mock_branches', JSON.stringify(updatedBranches));
    
    toast({
      title: 'Saved',
      description: 'Landing page settings updated successfully.',
    });
  };

  const branchUrl = `${window.location.origin}/branch/${branch.shortCode}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Landing Page Customization</CardTitle>
            <CardDescription>Customize your branch's public landing page</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(branchUrl, '_blank')}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              navigator.clipboard.writeText(branchUrl);
              toast({ title: 'Copied', description: 'Branch URL copied to clipboard' });
            }}>
              <ExternalLink className="mr-2 h-4 w-4" />
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={landingData.description}
            onChange={(e) => setLandingData({ ...landingData, description: e.target.value })}
            placeholder="Brief description of your restaurant"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={landingData.phone}
              onChange={(e) => setLandingData({ ...landingData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
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
            placeholder="123 Main St, City, State 12345"
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Public URL:</p>
          <code className="text-sm text-primary break-all">{branchUrl}</code>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
