"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Ticket,
  Landmark,
  LogOut,
  LayoutGrid,
  ClipboardList,
  Wallet,
  CheckCircle,
  ScanLine,
  BarChart2
} from "lucide-react";
import Image from "next/image";

const menu = [
  { label: "Dashboard", key: "dashboard", icon: <LayoutGrid className="w-5 h-5" />, path: "/admin2/dashboard" },
  {
    label: "Setup Data",
    key: "setup",
    icon: <ClipboardList className="w-5 h-5" />,
    dropdown: [
      { label: "Setup Event", key: "setup-event", path: "/admin2/dashboard/setup-event" },
      { label: "Setup Form Pemesanan", key: "setup-form", path: "/admin2/dashboard/setup-form-pemesanan" },
      { label: "Setup Guest Star", key: "setup-gueststar", path: "/admin2/dashboard/setup-gueststar" },
      { label: "Setup Jenis Tiket & Harga", key: "jenis-tiket", path: "/admin2/dashboard/setup-jenis-tiket" },
      { label: "Setup Periode Sale", key: "periode-sale", path: "/admin2/dashboard/setup-periode-tiket" },
    ],
  },
  { label: "Pemesanan Tiket", key: "pemesanan-tiket", icon: <Ticket className="w-5 h-5" />, path: "/admin2/dashboard/pemesanan-tiket" },
  {
    label: "Data Tiket",
    key: "data-tiket",
    icon: <Ticket className="w-5 h-5" />,
    dropdown: [
      { label: "Daftar Tiket", key: "daftar-tiket", path: "/admin2/dashboard/daftar-tiket" },
      { label: "Penjualan Offline", key: "penjualan-offline", path: "/admin2/dashboard/penjualan-offline" },
      { label: "Penukaran Tiket dan Gelang", key: "penukaran-tiket", path: "/admin2/dashboard/penukaran-tiket" },
    ],
  },
  { label: "Scan Tiket", key: "scan", icon: <ScanLine className="w-5 h-5" />, path: "/admin2/dashboard/scan-tiket" },
  { label: "Laporan", key: "Laporan", icon: <BarChart2 className="w-5 h-5" />, path: "/admin2/dashboard/laporan" },
  { label: "Withdraw", key: "withdraw", icon: <Wallet className="w-5 h-5" />, path: "/admin2/dashboard/withdraw" },
];

export default function Sidebar2({ adminName = "Panitia" }: { adminName?: string }) {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const activeParent = menu.find(item => item.dropdown?.some(sub => sub.path === pathname));
    if (activeParent) {
      setOpenDropdown(activeParent.key);
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin2LoggedIn");
      // Tambahkan penghapusan isAdmin1LoggedIn juga untuk memastikan semua sesi logout
      localStorage.removeItem("isAdmin1LoggedIn");
    }
    router.push("/login"); // Pastikan redirect ke halaman login utama
  };

  const handleMenuClick = (item: any) => {
    if (item.dropdown) {
      setOpenDropdown(openDropdown === item.key ? null : item.key);
    } else if (item.path) {
      router.push(item.path);
    }
  };

  const handleDropdownClick = (sub: any) => {
    router.push(sub.path);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-white border-r shadow-md flex flex-col z-20 transition-all duration-500 ease-in-out font-sans ${open ? "w-64" : "w-16"}`}>
      {/* Header */}
      <div className={`flex items-center gap-2 p-4 border-b border-gray-200 transition-all duration-500 ease-in-out ${open ? "justify-start" : "justify-center"}`}>
        <Image
          src="/gam1.jpeg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full bg-white transition-all duration-500 ease-in-out"
        />
        {open && (
          <div className="flex flex-col ml-2 transition-opacity duration-500 ease-in-out opacity-100">
            <span className="font-bold text-lg text-black">Admin2</span>
            <span className="text-xs text-gray-500">{adminName}</span>
          </div>
        )}
        <button
          className={`${open ? "ml-auto" : "mx-auto"} text-gray-500 hover:text-black transition-all duration-500 ease-in-out`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {open ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
      {/* Menu */}
      <nav className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out">
        <ul className="mt-4 space-y-1">
          {menu.map((item) => {
            const isParentOfActive = item.dropdown?.some(sub => sub.path === pathname);
            const isActive = item.path === pathname || isParentOfActive;

            return (
              <li key={item.key}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-left transition group rounded-md font-medium text-base ${open ? "" : "justify-center"} ${
                    isActive
                      ? "text-blue-800 border-r-4 border-blue-800"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className={`mr-3`}>{item.icon}</span>
                  {open && <span className="flex-1">{item.label}</span>}
                  {item.dropdown && open && (
                    <ChevronDown
                      className={`ml-auto transition-transform ${openDropdown === item.key ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {/* Dropdown */}
                <ul
                  className={`
                    ml-8 mt-1 space-y-1
                    transition-all duration-300 ease-in-out origin-top
                    ${
                      item.dropdown && openDropdown === item.key && open
                        ? "max-h-40 opacity-100 scale-y-100"
                        : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                    }
                    overflow-hidden
                  `}
                >
                  {item.dropdown?.map((sub: any) => {
                    const isSubActive = sub.path === pathname;
                    return (
                      <li key={sub.key}>
                        <button
                          className={`flex items-center w-full px-2 py-1 text-left rounded-md text-base ${ // text-base for dropdown items
                            isSubActive
                              ? "text-blue-800"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                          onClick={() => handleDropdownClick(sub)}
                        >
                          <span className="text-sm">{sub.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded gap-2 justify-center font-medium text-base"
        >
          <span className="flex items-center justify-center">
            <LogOut className="w-5 h-5 mr-3" />
          </span>
          {open && "Logout"}
        </button>
      </div>
    </aside>
  );
}