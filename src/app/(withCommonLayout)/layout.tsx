import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </main>
    </div>
  );
}
