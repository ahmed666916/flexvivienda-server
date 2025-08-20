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
