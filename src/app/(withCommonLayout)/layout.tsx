import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      {/* Navbar */}

      <Navbar />

      {/* Main layout */}
      <main className="container max-w-7xl mx-auto pt-16 px-6 flex-grow">
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-64 h-full  p-4 overflow-hidden">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <section
            className="flex-grow  shadow-md rounded-lg p-6 mt-12"
            style={{ marginLeft: "17rem", marginTop: "6rem" }} // Adjust the margin to account for the fixed sidebar width
          >
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
