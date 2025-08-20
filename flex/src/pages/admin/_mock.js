// flex/src/pages/admin/_mock.js
export const mockStats = {
  pending: 7,
  published: 23,
  owners: 12,
  bookings: 154,
};

export const mockSubmissions = [
  { id: 101, title: 'Sea View 2+1 in Kaş', owner: 'Kenan Y.', city: 'Antalya', submitted: '2025-08-18', status: 'pending' },
  { id: 102, title: 'Modern Flat in Cihangir', owner: 'Ece T.', city: 'Istanbul', submitted: '2025-08-19', status: 'pending' },
  { id: 103, title: 'Garden Duplex Ortaköy', owner: 'Murat A.', city: 'Istanbul', submitted: '2025-08-19', status: 'pending' },
];

export const mockProperties = [
  { id: 1, title:'Cihangir Modern Flat', city:'Istanbul', status:'published', cover:'/Images/gallery1.jpg', owner:'Flex Team' },
  { id: 2, title:'Kaş Sea View 2+1', city:'Antalya', status:'pending_review', cover:'/Images/gallery2.jpg', owner:'Kenan Y.' },
  { id: 3, title:'Kadıköy Studio', city:'Istanbul', status:'draft', cover:'/Images/gallery3.jpg', owner:'Ece T.' },
];

export const mockOwners = [
  { id: 1, name: 'Kenan Yılmaz', email: 'kenan@example.com', phone: '+90 530 000 00 01', city: 'Antalya', properties: 4, verified: true, status: 'active', joined: '2025-06-03' },
  { id: 2, name: 'Ece Tok',      email: 'ece@example.com',   phone: '+90 533 000 00 02', city: 'Istanbul', properties: 2, verified: false, status: 'active', joined: '2025-07-12' },
  { id: 3, name: 'Murat Aksoy',  email: 'murat@example.com', phone: '+90 555 000 00 03', city: 'Istanbul', properties: 1, verified: true, status: 'disabled', joined: '2025-05-22' },
  { id: 4, name: 'Zeynep Kara',  email: 'zeynep@example.com',phone: '+90 532 000 00 04', city: 'Izmir',   properties: 3, verified: false, status: 'active', joined: '2025-08-01' },
];

export const mockBookings = [
  { id: 901, ref: 'BK-240815-001', property: 'Cihangir Modern Flat',   city:'Istanbul',  guest:'Ali Demir',    guestEmail:'ali@example.com',   start:'2025-08-25', end:'2025-09-02', nights:8, guests:2, amount: 840, currency:'EUR', status:'pending',   payment:'unpaid' },
  { id: 902, ref: 'BK-240816-002', property: 'Kaş Sea View 2+1',       city:'Antalya',   guest:'Sara Kaya',    guestEmail:'sara@example.com',  start:'2025-09-10', end:'2025-10-10', nights:30,guests:3, amount:2400, currency:'EUR', status:'confirmed', payment:'paid'   },
  { id: 903, ref: 'BK-240817-003', property: 'Kadıköy Studio',         city:'Istanbul',  guest:'Mert Can',     guestEmail:'mert@example.com',  start:'2025-08-28', end:'2025-09-03', nights:6, guests:1, amount: 510, currency:'EUR', status:'cancelled', payment:'refunded' },
  { id: 904, ref: 'BK-240818-004', property: 'Garden Duplex Ortaköy',  city:'Istanbul',  guest:'Leyla Aydın',  guestEmail:'leyla@example.com', start:'2025-09-01', end:'2025-09-08', nights:7, guests:4, amount: 980, currency:'EUR', status:'pending',   payment:'unpaid' },
];
