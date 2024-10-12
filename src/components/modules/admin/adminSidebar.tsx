// /components/Sidebar.tsx

import Link from "next/link";

const AdminSideBar = () => {
  return (
    <div className="w-64 bg-primary text-white flex flex-col">
      <div className="p-4 font-bold text-xl">Admin Dashboard</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/users"
              className="block p-2 rounded hover:bg-orange-600"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/recipes"
              className="block p-2 rounded hover:bg-orange-600"
            >
              Manage Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="block p-2 rounded hover:bg-orange-600"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideBar;
