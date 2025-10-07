import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2 } from 'lucide-react';
import { restaurantApi } from '@/lib/api';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: any) => void;
}

export const RestaurantList = ({ onSelectRestaurant }: RestaurantListProps) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchQuery, restaurants]);

  const loadRestaurants = async () => {
    try {
      const response = await restaurantApi.getAll();
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by restaurant name, brand, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No restaurants found
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => onSelectRestaurant(restaurant)}
              className="w-full p-4 text-left border rounded-lg hover:border-primary hover:bg-muted/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{restaurant.name}</h3>
                  </div>
                  {restaurant.brandName && (
                    <p className="text-sm text-muted-foreground">{restaurant.brandName}</p>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{restaurant.address}</span>
                  </div>
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
