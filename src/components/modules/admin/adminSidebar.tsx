import Link from "next/link";

const AdminSideBar = () => {
  return (
    <div className="w-64 bg-[#D93900] text-white flex flex-col">
      <div className="p-4 font-bold text-xl">Admin Dashboard</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/users"
              className="block p-2 rounded hover:bg-orange-600 hover:bg-opacity-80 transition duration-200"
            >
              Manage Users
            </Link>
          </li>
      <li>
          <Link
              href="/admin"
              className="block p-2 rounded hover:bg-orange-600 hover:bg-opacity-80 transition duration-200"
            >
              Manage Recipe
            </Link>
          </li>

          <li>
            <Link
              href="/"
              className="block p-2 rounded hover:bg-orange-600 hover:bg-opacity-80 transition duration-200"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideBar;
