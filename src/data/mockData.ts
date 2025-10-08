// Mock data for development and testing

// Menu items with branchId linking
export const mockMenuItems = [
  // Downtown Branch (id: '1') menu
  {
    id: '1',
    branchId: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    price: 24.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '2',
    branchId: '1',
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan and croutons',
    price: 12.99,
    category: 'Salad',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '3',
    branchId: '1',
    name: 'Beef Burger',
    description: 'Angus beef patty with cheese, lettuce, and tomato',
    price: 16.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
    customizations: [
      {
        id: 'burger-cheese',
        name: 'Extra Cheese',
        options: [
          { name: 'Cheddar', price: 1.50 },
          { name: 'Swiss', price: 1.50 },
          { name: 'Blue Cheese', price: 2.00 },
        ],
      },
      {
        id: 'burger-extras',
        name: 'Add-ons',
        options: [
          { name: 'Bacon', price: 2.50 },
          { name: 'Avocado', price: 2.00 },
          { name: 'Fried Egg', price: 1.50 },
        ],
      },
    ],
  },
  {
    id: '4',
    branchId: '1',
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta with bacon and parmesan',
    price: 18.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '5',
    branchId: '1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato sauce',
    price: 14.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '6',
    branchId: '1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with vanilla ice cream',
    price: 8.99,
    category: 'Dessert',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '7',
    branchId: '1',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert',
    price: 9.99,
    category: 'Dessert',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '8',
    branchId: '1',
    name: 'Classic Milk Tea',
    description: 'Traditional milk tea with black tea base',
    price: 5.99,
    category: 'Milk Tea',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
    customizations: [
      {
        id: 'milk-tea-sweetness',
        name: 'Sweetness Level',
        options: [
          { name: '0%', price: 0 },
          { name: '25%', price: 0 },
          { name: '50%', price: 0 },
          { name: '75%', price: 0 },
          { name: '100%', price: 0 },
        ],
      },
      {
        id: 'milk-tea-toppings',
        name: 'Add Toppings',
        options: [
          { name: 'Pearls (Boba)', price: 0.75 },
          { name: 'Pudding', price: 0.75 },
          { name: 'Jelly', price: 0.75 },
          { name: 'Red Bean', price: 1.00 },
          { name: 'Grass Jelly', price: 0.75 },
        ],
      },
      {
        id: 'milk-tea-ice',
        name: 'Ice Level',
        options: [
          { name: 'No Ice', price: 0 },
          { name: 'Less Ice', price: 0 },
          { name: 'Regular Ice', price: 0 },
          { name: 'Extra Ice', price: 0 },
        ],
      },
    ],
  },
  {
    id: '9',
    branchId: '1',
    name: 'Taro Milk Tea',
    description: 'Creamy taro-flavored milk tea',
    price: 6.49,
    category: 'Milk Tea',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
    customizations: [
      {
        id: 'milk-tea-sweetness',
        name: 'Sweetness Level',
        options: [
          { name: '0%', price: 0 },
          { name: '25%', price: 0 },
          { name: '50%', price: 0 },
          { name: '75%', price: 0 },
          { name: '100%', price: 0 },
        ],
      },
      {
        id: 'milk-tea-toppings',
        name: 'Add Toppings',
        options: [
          { name: 'Pearls (Boba)', price: 0.75 },
          { name: 'Pudding', price: 0.75 },
          { name: 'Jelly', price: 0.75 },
          { name: 'Red Bean', price: 1.00 },
          { name: 'Grass Jelly', price: 0.75 },
        ],
      },
      {
        id: 'milk-tea-ice',
        name: 'Ice Level',
        options: [
          { name: 'No Ice', price: 0 },
          { name: 'Less Ice', price: 0 },
          { name: 'Regular Ice', price: 0 },
          { name: 'Extra Ice', price: 0 },
        ],
      },
    ],
  },
  // Westside Branch (id: '2') menu - slightly different
  {
    id: '11',
    branchId: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    price: 24.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '12',
    branchId: '2',
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese and olives',
    price: 11.99,
    category: 'Salad',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '13',
    branchId: '2',
    name: 'BBQ Ribs',
    description: 'Slow-cooked pork ribs with BBQ sauce',
    price: 22.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '14',
    branchId: '2',
    name: 'Seafood Pasta',
    description: 'Mixed seafood with garlic cream sauce',
    price: 21.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '15',
    branchId: '2',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella',
    price: 15.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '16',
    branchId: '2',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 8.99,
    category: 'Dessert',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
];

// Tables with branchId linking - with reservation data
export const mockTables = [
  // Downtown Branch tables
  { 
    id: '1', 
    branchId: '1', 
    number: 1, 
    capacity: 2, 
    floor: 1,
    status: 'available', 
    qrCode: 'QR001',
    createdAt: new Date().toISOString()
  },
  { 
    id: '2', 
    branchId: '1', 
    number: 2, 
    capacity: 4, 
    floor: 1,
    status: 'occupied', 
    qrCode: 'QR002',
    reservationStart: new Date(Date.now() + 3600000).toISOString(),
    reservationEnd: new Date(Date.now() + 7200000).toISOString(),
    reservationName: 'John Smith',
    createdAt: new Date().toISOString()
  },
  { 
    id: '3', 
    branchId: '1', 
    number: 3, 
    capacity: 4, 
    floor: 1,
    status: 'available', 
    qrCode: 'QR003',
    createdAt: new Date().toISOString()
  },
  { 
    id: '4', 
    branchId: '1', 
    number: 4, 
    capacity: 6, 
    floor: 2,
    status: 'available', 
    qrCode: 'QR004',
    createdAt: new Date().toISOString()
  },
  { 
    id: '5', 
    branchId: '1', 
    number: 5, 
    capacity: 2, 
    floor: 2,
    status: 'available', 
    qrCode: 'QR005',
    createdAt: new Date().toISOString()
  },
  { 
    id: '6', 
    branchId: '1', 
    number: 6, 
    capacity: 8, 
    floor: 2,
    status: 'occupied', 
    qrCode: 'QR006',
    reservationStart: new Date(Date.now() - 1800000).toISOString(),
    reservationEnd: new Date(Date.now() + 5400000).toISOString(),
    reservationName: 'Sarah Johnson',
    createdAt: new Date().toISOString()
  },
  // Westside Branch tables
  { 
    id: '11', 
    branchId: '2', 
    number: 1, 
    capacity: 4, 
    floor: 1,
    status: 'available', 
    qrCode: 'QR011',
    createdAt: new Date().toISOString()
  },
  { 
    id: '12', 
    branchId: '2', 
    number: 2, 
    capacity: 4, 
    floor: 1,
    status: 'available', 
    qrCode: 'QR012',
    createdAt: new Date().toISOString()
  },
  { 
    id: '13', 
    branchId: '2', 
    number: 3, 
    capacity: 6, 
    floor: 1,
    status: 'occupied', 
    qrCode: 'QR013',
    reservationStart: new Date(Date.now() + 1800000).toISOString(),
    reservationEnd: new Date(Date.now() + 9000000).toISOString(),
    reservationName: 'David Brown',
    createdAt: new Date().toISOString()
  },
  { 
    id: '14', 
    branchId: '2', 
    number: 4, 
    capacity: 2, 
    floor: 2,
    status: 'available', 
    qrCode: 'QR014',
    createdAt: new Date().toISOString()
  },
  { 
    id: '15', 
    branchId: '2', 
    number: 5, 
    capacity: 8, 
    floor: 2,
    status: 'available', 
    qrCode: 'QR015',
    createdAt: new Date().toISOString()
  },
];

// Orders with branchId linking
export const mockOrders = [
  // Downtown Branch orders
  {
    id: '1001',
    branchId: '1',
    tableNumber: 3,
    items: [
      { name: 'Grilled Salmon', quantity: 2, price: 24.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 },
    ],
    total: 62.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '1002',
    branchId: '1',
    tableNumber: 6,
    items: [
      { name: 'Beef Burger', quantity: 3, price: 16.99 },
      { name: 'Pasta Carbonara', quantity: 2, price: 18.99 },
    ],
    total: 88.95,
    status: 'preparing',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '1003',
    branchId: '1',
    tableNumber: 9,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { name: 'Chocolate Lava Cake', quantity: 2, price: 8.99 },
    ],
    total: 32.97,
    status: 'ready',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: '1004',
    branchId: '1',
    tableNumber: 12,
    items: [
      { name: 'Grilled Salmon', quantity: 1, price: 24.99 },
    ],
    total: 24.99,
    status: 'completed',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  // Westside Branch orders
  {
    id: '1011',
    branchId: '2',
    tableNumber: 3,
    items: [
      { name: 'BBQ Ribs', quantity: 2, price: 22.99 },
      { name: 'Greek Salad', quantity: 1, price: 11.99 },
    ],
    total: 57.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: '1012',
    branchId: '2',
    tableNumber: 1,
    items: [
      { name: 'Seafood Pasta', quantity: 2, price: 21.99 },
    ],
    total: 43.98,
    status: 'preparing',
    createdAt: new Date(Date.now() - 240000).toISOString(),
  },
];

// Staff with branchId linking
export const mockStaff = [
  // Downtown Branch staff
  {
    id: '3',
    name: 'Michael Brown',
    username: 'michael',
    email: 'michael.brown@restaurant.com',
    role: 'branch_manager',
    branchId: '1',
    status: 'active',
  },
  // Westside Branch staff
  {
    id: '13',
    name: 'Lisa Chen',
    username: 'lisa',
    email: 'lisa.chen@restaurant.com',
    role: 'branch_manager',
    branchId: '2',
    status: 'active',
  },
  // Waiters
  {
    id: '201',
    name: 'Jane Williams',
    username: 'jane',
    email: 'waiter.jane@restaurant.com',
    role: 'waiter',
    branchId: '1',
    status: 'active',
  },
  {
    id: '202',
    name: 'Tom Anderson',
    username: 'tom',
    email: 'waiter.tom@restaurant.com',
    role: 'waiter',
    branchId: '1',
    status: 'active',
  },
  // Receptionists
  {
    id: '301',
    name: 'Mary Johnson',
    username: 'mary',
    email: 'receptionist.mary@restaurant.com',
    role: 'receptionist',
    branchId: '1',
    status: 'active',
  },
  {
    id: '302',
    name: 'Peter Davis',
    username: 'peter',
    email: 'receptionist.peter@restaurant.com',
    role: 'receptionist',
    branchId: '1',
    status: 'active',
  },
];

export const mockBranches = [
  {
    id: '1',
    name: 'Downtown Branch',
    shortCode: 'downtown',
    address: '123 Main Street, City Center',
    phone: '+1 234 567 8900',
    email: 'downtown@restaurant.com',
    status: 'active',
    managerId: '3',
    brandName: 'The Gourmet Kitchen',
    tagline: 'Fine dining at its best',
    description: 'Experience culinary excellence in the heart of downtown',
    logoUrl: null,
    bannerUrl: null,
    ownerId: '100', // owned by owner.multi
  },
  {
    id: '2',
    name: 'Westside Branch',
    shortCode: 'westside',
    address: '456 West Avenue, Westside',
    phone: '+1 234 567 8901',
    email: 'westside@restaurant.com',
    status: 'active',
    managerId: '13',
    brandName: 'The Gourmet Kitchen',
    tagline: 'Fresh flavors, west side style',
    description: 'Your neighborhood favorite for exceptional dining',
    logoUrl: null,
    bannerUrl: null,
    ownerId: '100', // owned by owner.multi
  },
];

export const mockPromotions = [
  {
    id: '1',
    name: 'Happy Hour Special',
    description: '20% off all appetizers between 3-6 PM',
    discountPercent: 20,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
  {
    id: '2',
    name: 'Weekend Brunch Deal',
    description: 'Buy 2 main courses, get 1 dessert free',
    discountPercent: 0,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
];

export const mockMembers = [
  {
    id: '1',
    name: 'Alice Williams',
    email: 'alice.w@email.com',
    phone: '+1 234 567 8910',
    points: 1250,
    membershipTier: 'Gold',
    joinDate: '2024-03-15',
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob.m@email.com',
    phone: '+1 234 567 8911',
    points: 580,
    membershipTier: 'Silver',
    joinDate: '2024-06-20',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.d@email.com',
    phone: '+1 234 567 8912',
    points: 2340,
    membershipTier: 'Platinum',
    joinDate: '2023-11-10',
  },
];

// Mock brands for restaurant chains
export const mockBrands = [
  {
    id: '1',
    name: 'The Gourmet Kitchen',
    description: 'Fine dining experience with international cuisine',
    totalBranches: 5,
    status: 'active',
    established: '2015',
  },
  {
    id: '2',
    name: 'Quick Bites Express',
    description: 'Fast casual dining with fresh ingredients',
    totalBranches: 12,
    status: 'active',
    established: '2018',
  },
  {
    id: '3',
    name: 'Seafood Paradise',
    description: 'Premium seafood and coastal cuisine',
    totalBranches: 3,
    status: 'active',
    established: '2020',
  },
];

// Mock owner statistics
export const mockOwnerStats = {
  totalRevenue: 487650,
  revenueGrowth: 12.5,
  totalOrders: 8943,
  ordersGrowth: 8.2,
  activeCustomers: 2847,
  customerGrowth: 15.3,
  avgOrderValue: 54.50,
  branchPerformance: [
    { name: 'Downtown Branch', revenue: 185000, percentage: 38 },
    { name: 'Westside Branch', revenue: 145000, percentage: 30 },
    { name: 'Eastside Branch', revenue: 97000, percentage: 20 },
    { name: 'Northside Branch', revenue: 60650, percentage: 12 },
  ],
};

// Add mock users for authentication
export const mockUsers = [
  {
    id: '1',
    email: 'customer@gmail.com',
    password: 'customerpass',
    name: 'Customer User',
    role: 'customer',
    avatar: undefined,
  },
  {
    id: '3',
    email: 'admin@gmail.com',
    password: 'adminpass',
    name: 'Admin User',
    role: 'admin',
    avatar: undefined,
  },
  // Branch managers
  {
    id: '13',
    email: 'lisa.chen@restaurant.com',
    password: 'managerpass',
    name: 'Lisa Chen',
    role: 'branch_manager',
    branchId: '2',
    avatar: undefined,
  },
  // Demo manager for Downtown Branch (if needed)
  {
    id: '2',
    email: 'manager@restaurant.com',
    password: 'managerpass',
    name: 'Manager User',
    role: 'branch_manager',
    branchId: '1',
    avatar: undefined,
  },
  // Owner
  {
    id: '100',
    email: 'owner.multi@example.com',
    name: 'Multi Branch Owner',
    role: 'owner',
    avatar: undefined,
    password: 'owner123',
  },
  // Waiters - Downtown Branch
  {
    id: '201',
    email: 'waiter.jane@restaurant.com',
    password: 'waiterpass',
    name: 'Jane Williams',
    role: 'waiter',
    branchId: '1',
    avatar: undefined,
  },
  {
    id: '202',
    email: 'waiter.tom@restaurant.com',
    password: 'waiterpass',
    name: 'Tom Anderson',
    role: 'waiter',
    branchId: '1',
    avatar: undefined,
  },
  // Receptionists - Downtown Branch
  {
    id: '301',
    email: 'receptionist.mary@restaurant.com',
    password: 'receptionistpass',
    name: 'Mary Johnson',
    role: 'receptionist',
    branchId: '1',
    avatar: undefined,
  },
  {
    id: '302',
    email: 'receptionist.peter@restaurant.com',
    password: 'receptionistpass',
    name: 'Peter Davis',
    role: 'receptionist',
    branchId: '1',
    avatar: undefined,
  },
  // Waiters - Westside Branch
  {
    id: '211',
    email: 'waiter.alex@restaurant.com',
    password: 'waiterpass',
    name: 'Alex Martinez',
    role: 'waiter',
    branchId: '2',
    avatar: undefined,
  },
  // Receptionists - Westside Branch
  {
    id: '311',
    email: 'receptionist.sophie@restaurant.com',
    password: 'receptionistpass',
    name: 'Sophie Taylor',
    role: 'receptionist',
    branchId: '2',
    avatar: undefined,
  },
];



// Valid user roles
export const userRoles = ['owner', 'admin', 'branch_manager', 'waiter', 'receptionist', 'customer', 'guest'] as const;
export type UserRole = typeof userRoles[number];