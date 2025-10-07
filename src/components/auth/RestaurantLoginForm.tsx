import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface RestaurantLoginFormProps {
  restaurant: any;
  onBack: () => void;
}

export const RestaurantLoginForm = ({ restaurant, onBack }: RestaurantLoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginStaff = useAuthStore((state) => state.loginStaff);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginStaff(restaurant.id, username, password);
      
      // Get the logged in user to determine redirect
      const user = useAuthStore.getState().user;
      
      if (user?.role === 'branch_manager') {
        navigate('/dashboard/manager');
      } else if (user?.role === 'waiter') {
        navigate('/dashboard/waiter');
      } else if (user?.role === 'receptionist') {
        navigate('/dashboard/receptionist');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      // Error is handled in auth store
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 border">
        <p className="text-sm font-medium">{restaurant.name}</p>
        <p className="text-xs text-muted-foreground">{restaurant.address}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};
