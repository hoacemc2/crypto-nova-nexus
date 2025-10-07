import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2 } from 'lucide-react';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: any) => void;
}

export const RestaurantList = ({ onSelectRestaurant }: RestaurantListProps) => {
  const [branches, setBranches] = useState<any[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBranches();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = branches.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBranches(filtered);
    } else {
      setFilteredBranches(branches);
    }
  }, [searchQuery, branches]);

  const loadBranches = () => {
    try {
      const storedBranches = localStorage.getItem('mock_branches');
      const allBranches = storedBranches ? JSON.parse(storedBranches) : [];
      setBranches(allBranches);
      setFilteredBranches(allBranches);
    } catch (error) {
      console.error('Failed to load branches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading branches...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by branch name, brand, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No branches found
          </div>
        ) : (
          filteredBranches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => onSelectRestaurant(branch)}
              className="w-full p-4 text-left border rounded-lg hover:border-primary hover:bg-muted/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{branch.name}</h3>
                  </div>
                  {branch.brandName && (
                    <p className="text-sm font-medium text-primary">{branch.brandName}</p>
                  )}
                  {branch.address && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{branch.address}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm">Select</Button>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
