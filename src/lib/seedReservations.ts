import { Booking } from '@/store/bookingStore';

export function seedReservations(branchId: string): void {
  const STORAGE_KEY = 'mock_bookings';
  const existing = localStorage.getItem(STORAGE_KEY);
  
  if (existing) {
    const bookings = JSON.parse(existing);
    // Check if this branch already has bookings
    if (bookings.some((b: Booking) => b.branchId === branchId)) {
      return; // Already seeded
    }
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const mockReservations: Booking[] = [
    {
      id: `${branchId}-booking-1`,
      branchId,
      branchName: 'Current Branch',
      guestName: 'Alice Johnson',
      guestEmail: 'alice.j@email.com',
      guestPhone: '+1 234 567 8901',
      bookingDate: formatDate(today),
      bookingTime: '18:00',
      numberOfGuests: 4,
      items: [],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      status: 'pending',
    },
    {
      id: `${branchId}-booking-2`,
      branchId,
      branchName: 'Current Branch',
      guestName: 'Bob Smith',
      guestEmail: 'bob.smith@email.com',
      guestPhone: '+1 234 567 8902',
      bookingDate: formatDate(today),
      bookingTime: '19:30',
      numberOfGuests: 2,
      items: [],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      status: 'pending',
    },
    {
      id: `${branchId}-booking-3`,
      branchId,
      branchName: 'Current Branch',
      guestName: 'Carol Williams',
      guestEmail: 'carol.w@email.com',
      guestPhone: '+1 234 567 8903',
      bookingDate: formatDate(tomorrow),
      bookingTime: '20:00',
      numberOfGuests: 6,
      items: [],
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      status: 'approved',
    },
    {
      id: `${branchId}-booking-4`,
      branchId,
      branchName: 'Current Branch',
      guestName: 'David Brown',
      guestEmail: 'david.b@email.com',
      guestPhone: '+1 234 567 8904',
      bookingDate: formatDate(dayAfter),
      bookingTime: '18:30',
      numberOfGuests: 8,
      items: [],
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      status: 'confirmed',
    },
    {
      id: `${branchId}-booking-5`,
      branchId,
      branchName: 'Current Branch',
      guestName: 'Emma Davis',
      guestEmail: 'emma.d@email.com',
      guestPhone: '+1 234 567 8905',
      bookingDate: formatDate(dayAfter),
      bookingTime: '19:00',
      numberOfGuests: 3,
      items: [],
      createdAt: new Date(Date.now() - 18000000).toISOString(),
      status: 'confirmed',
    },
  ];

  const allBookings = existing ? JSON.parse(existing) : [];
  const updated = [...allBookings, ...mockReservations];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
