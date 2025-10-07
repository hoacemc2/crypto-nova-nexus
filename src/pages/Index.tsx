import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import {
  Users,
  ChefHat,
  BarChart3,
  QrCode,
  CreditCard,
  Store,
  UserCog,
  ShieldCheck,
  UtensilsCrossed,
  Building2,
  Check
} from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const roles = [
  {
    title: 'Customer',
    description: 'Scan QR codes, browse menus, place orders, and manage your bills seamlessly.',
    icon: QrCode,
    color: 'text-primary',
  },
  {
    title: 'Staff',
    description: 'Handle orders, process payments, manage memberships, and serve customers efficiently.',
    icon: ChefHat,
    color: 'text-secondary',
  },
  {
    title: 'Branch Manager',
    description: 'Oversee operations, manage promotions, track orders, and optimize table arrangements.',
    icon: UserCog,
    color: 'text-accent',
  },
  {
    title: 'Restaurant Owner',
    description: 'Control multiple branches, manage staff, analyze reports, and configure system-wide settings.',
    icon: Store,
    color: 'text-primary',
  },
];

const features = [
  { icon: QrCode, title: 'QR Code Ordering', description: 'Contactless menu access and ordering' },
  { icon: CreditCard, title: 'Smart Billing', description: 'Automated payment processing & discounts' },
  { icon: Users, title: 'Membership System', description: 'Reward loyal customers with points' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time insights and reports' },
];

const prBrands = [
  {
    name: 'The Gourmet Kitchen',
    logo: '/placeholder.svg',
    description: 'Fine dining experience with international cuisine. Proudly powered by HillDevilOS.'
  },
  {
    name: 'Quick Bites Express',
    logo: '/placeholder.svg',
    description: 'Fast casual dining with fresh ingredients. HillDevilOS partner.'
  },
  {
    name: 'Seafood Paradise',
    logo: '/placeholder.svg',
    description: 'Premium seafood and coastal cuisine. HillDevilOS client.'
  },
];

const packagesData = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$49/month',
    icon: Store,
    features: ['1-3 Branches', 'Basic Analytics', 'Email Support', 'QR Ordering'],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$99/month',
    icon: Building2,
    features: ['Up to 10 Branches', 'Advanced Analytics', 'Priority Support', 'Custom Branding'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    icon: Building2,
    features: ['Unlimited Branches', 'Real-time Analytics', '24/7 Support', 'White Label', 'API Access'],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedPackage = params.get('selectedPackage');
    if (selectedPackage && user) {
      navigate(`/register/package?packageId=${selectedPackage}`);
    }
  }, [location.search, user, navigate]);

  const handleRegisterPackage = (packageId: string) => {
    if (!user) {
      // Redirect guests to signup first. After signup, return them to the landing
      // page and include the selected package so the landing can highlight it.
      const returnUrl = `/?selectedPackage=${packageId}`;
      navigate(`/register?returnUrl=${encodeURIComponent(returnUrl)}`);
    } else {
      navigate(`/register/package?packageId=${packageId}`);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Manage Your Restaurant
                <span className="block text-primary mt-2">Like Never Before</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Complete restaurant management solution for chains. Handle orders, staff, menus, analytics, and more from a single powerful platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in relative">
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img 
                  src={heroImage} 
                  alt="Modern restaurant interior" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed for modern restaurant operations
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="transition-smooth hover:shadow-medium border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Built for Every Role</h2>
            <p className="text-lg text-muted-foreground">
              From customers to owners, everyone gets the tools they need
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, index) => (
              <Card key={index} className="transition-smooth hover:shadow-medium border-border/50">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                    <role.icon className={`h-8 w-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">
              Select the perfect package for your restaurant business
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {packagesData.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative transition-smooth hover:shadow-large flex flex-col ${
                  pkg.popular ? 'border-primary shadow-medium ring-2 ring-primary' : 'border-border/50'
                }`}
                style={{ minHeight: 360 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <pkg.icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-foreground text-center">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Button
                      className="w-full"
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={() => handleRegisterPackage(pkg.id)}
                    >
                      Register Restaurant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PR Brands Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Our Featured Restaurant Brands</h2>
            <p className="text-lg text-muted-foreground">
              These brands trust HillDevilOS to power their operations
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {prBrands.map((brand, idx) => (
              <Card key={idx} className="transition-smooth hover:shadow-medium border-border/50">
                <CardHeader className="flex flex-col items-center">
                  <img src={brand.logo} alt={brand.name} className="h-16 w-16 rounded-full mb-4 object-cover border" />
                  <CardTitle className="text-xl text-center">{brand.name}</CardTitle>
                  <CardDescription className="text-base text-center">{brand.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to Transform Your Restaurant?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of restaurant chains already using HillDevilOS
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="shadow-large">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">HilldevilOS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HillDevilOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
