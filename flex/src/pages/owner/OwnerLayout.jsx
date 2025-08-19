// src/pages/owner/OwnerLayout.jsx
export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-4 border-r bg-white">
        <div className="text-xl font-semibold mb-6">Owner Portal</div>
        <nav className="space-y-2">
          <a href="/owner" className="block">Dashboard</a>
          <a href="/owner/properties" className="block">My Properties</a>
          <a href="/owner/submit" className="block">Submit Property</a>
          <a href="/owner/bookings" className="block">Bookings</a>
          <a href="/owner/payouts" className="block">Payouts</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
