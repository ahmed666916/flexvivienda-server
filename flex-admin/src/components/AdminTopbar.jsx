export default function AdminTopbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="font-semibold text-lg">Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-gray-900">Switch to traveling</button>
        <img
          src="https://i.pravatar.cc/40" // replace with user avatar
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
