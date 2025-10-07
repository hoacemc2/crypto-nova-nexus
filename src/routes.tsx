import { RouteObject } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPackage from './pages/auth/RegisterPackage';
import RegisterConfirm from './pages/auth/RegisterConfirm';
import BrandSelection from './pages/auth/BrandSelection';
import Dashboard from './pages/Dashboard';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import WaiterDashboard from './pages/dashboard/WaiterDashboard';
import ReceptionistDashboard from './pages/dashboard/ReceptionistDashboard';
import GuestLanding from './pages/GuestLanding';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import StaffManagerLoginPage from './pages/auth/StaffManagerLogin';

// Owner nested pages
import OwnerOverviewPage from './pages/dashboard/owner/OverviewPage';
import OwnerMenuPage from './pages/dashboard/owner/MenuPage';
import OwnerTablesPage from './pages/dashboard/owner/TablesPage';
import OwnerStaffPage from './pages/dashboard/owner/StaffPage';
import OwnerReportsPage from './pages/dashboard/owner/ReportsPage';
import OwnerCustomizationPage from './pages/dashboard/owner/CustomizationPage';

// Waiter nested pages
import WaiterOrdersPage from './pages/dashboard/waiter/OrdersPage';
import WaiterTablesPage from './pages/dashboard/waiter/TablesPage';
import WaiterMenuPage from './pages/dashboard/waiter/MenuPage';
import WaiterBillingPage from './pages/dashboard/waiter/BillingPage';

// Receptionist nested pages
import ReceptionistReservationsPage from './pages/dashboard/receptionist/ReservationsPage';
import ReceptionistTablesPage from './pages/dashboard/receptionist/TablesPage';
import ReceptionistCommunicationsPage from './pages/dashboard/receptionist/CommunicationsPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/register/package',
    element: <RegisterPackage />,
  },
  {
    path: '/register/confirm',
    element: <RegisterConfirm />,
  },
  {
    path: '/branch/:shortCode',
    element: <GuestLanding />,
  },
  {
    path: '/branch/:shortCode/table/:tableId',
    element: <GuestLanding />,
  },
  {
    path: '/brand-selection',
    element: (
      <ProtectedRoute>
        <BrandSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/owner',
    element: (
      <ProtectedRoute>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OwnerOverviewPage />,
      },
      {
        path: 'overview',
        element: <OwnerOverviewPage />,
      },
      {
        path: 'menu',
        element: <OwnerMenuPage />,
      },
      {
        path: 'tables',
        element: <OwnerTablesPage />,
      },
      {
        path: 'staff',
        element: <OwnerStaffPage />,
      },
      {
        path: 'reports',
        element: <OwnerReportsPage />,
      },
      {
        path: 'customization',
        element: <OwnerCustomizationPage />,
      },
    ],
  },
  {
    path: '/dashboard/staff',
    element: (
      <ProtectedRoute>
        <StaffDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/manager',
    element: (
      <ProtectedRoute>
        <ManagerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/waiter',
    element: (
      <ProtectedRoute allowedRoles={['waiter']}>
        <WaiterDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <WaiterOrdersPage />,
      },
      {
        path: 'orders',
        element: <WaiterOrdersPage />,
      },
      {
        path: 'tables',
        element: <WaiterTablesPage />,
      },
      {
        path: 'menu',
        element: <WaiterMenuPage />,
      },
      {
        path: 'billing',
        element: <WaiterBillingPage />,
      },
    ],
  },
  {
    path: '/dashboard/receptionist',
    element: (
      <ProtectedRoute allowedRoles={['receptionist']}>
        <ReceptionistDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ReceptionistReservationsPage />,
      },
      {
        path: 'reservations',
        element: <ReceptionistReservationsPage />,
      },
      {
        path: 'tables',
        element: <ReceptionistTablesPage />,
      },
      {
        path: 'communications',
        element: <ReceptionistCommunicationsPage />,
      },
    ],
  },
  {
    path: '/auth/staff-manager-login',
    element: <StaffManagerLoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
