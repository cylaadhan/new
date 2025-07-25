"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaTicketAlt, FaMoneyCheckAlt, FaSignOutAlt, FaChartBar, FaClipboardList, FaWallet, FaCheckCircle, FaCog } from "react-icons/fa";
import Image from "next/image";

const menu = [
  { label: "Dashboard", key: "dashboard", icon: <FaChartBar />, path: "/admin2/dashboard" },
  {
    label: "Setup Data",
    key: "setup",
    icon: <FaClipboardList />,
    dropdown: [
      { label: "Setup Jenis Tiket & Harga", key: "jenis-tiket", path: "/admin2/dashboard/setup-jenis-tiket" },
      { label: "Setup Periode Sale", key: "periode-sale", path: "/admin2/dashboard/setup-periode-tiket" },
    ],
  },
  { label: "Daftar Tiket", key: "daftar-tiket", icon: <FaTicketAlt />, path: "/admin2/dashboard/daftar-tiket" },
  { label: "Penjualan Offline", key: "penjualan-offline", icon: <FaMoneyCheckAlt />, path: "/admin2/dashboard/penjualan-offline" },
  {
    label: "Penukaran Tiket / Gelang",
    key: "penukaran",
    icon: <FaCheckCircle />,
    dropdown: [
      { label: "Penukaran Tiket dan Gelang", key: "offline", path: "/admin2/dashboard/penukaran-tiket" },
      { label: "Laporan", key: "Laporan", path: "/admin2/dashboard/laporan" },
    ],
  },
  { label: "Scan Tiket", key: "scan", icon: <FaTicketAlt />, path: "/admin2/dashboard/scan-tiket" },
  { label: "Withdraw", key: "withdraw", icon: <FaWallet />, path: "/admin2/dashboard/withdraw" },
  { label: "Pengaturan", key: "pengaturan", icon: <FaCog />, path: "/admin2/dashboard/pengaturan" },
];

export default function Sidebar2({ adminName = "Panitia" }: { adminName?: string }) {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin2LoggedIn");
    }
    router.push("/login"); // Ubah dari /admin2/login menjadi /login
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
    setOpenDropdown(null);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-[#5D1A1D] border-r shadow-md flex flex-col z-20 transition-all duration-500 ease-in-out ${open ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 p-4 border-b border-[#6D2A2D] transition-all duration-500 ease-in-out ${open ? "justify-start" : "justify-center"}`}>
        <Image
          src="/gam1.jpeg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full bg-white transition-all duration-500 ease-in-out"
        />
        {open && (
          <div className="flex flex-col ml-2 transition-opacity duration-500 ease-in-out opacity-100">
            <span className="font-bold text-lg text-white">Admin2</span>
            <span className="text-xs text-gray-300">{adminName}</span>
          </div>
        )}
        <button
          className={`${open ? "ml-auto" : "mx-auto"} text-gray-300 hover:text-white transition-all duration-500 ease-in-out`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      {/* Menu */}
      <nav className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out">
        <ul className="mt-4 space-y-1">
          {menu.map((item) => (
            <li key={item.key}>
              <button
                className={`flex items-center w-full px-4 py-2 text-left hover:bg-[#6D2A2D] transition group ${open ? "" : "justify-center"}`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="text-white text-lg mr-3">{item.icon}</span>
                {open && <span className="font-medium flex-1 text-white">{item.label}</span>}
                {item.dropdown && open && (
                  <FaChevronDown
                    className={`ml-auto transition-transform text-lg ${openDropdown === item.key ? "rotate-180 text-white" : "text-gray-300"}`}
                  />
                )}
              </button>
              {/* Dropdown */}
              <ul
                className={`
                  ml-8 mt-1 space-y-1
                  transition-all duration-300 ease-in-out origin-top
                  ${item.dropdown && openDropdown === item.key && open
                    ? "max-h-40 opacity-100 scale-y-100"
                    : "max-h-0 opacity-0 scale-y-95 pointer-events-none"}
                  overflow-hidden
                `}
              >
                {item.dropdown && item.dropdown.map((sub: any) => (
                  <li key={sub.key}>
                    <button
                      className="flex items-center w-full px-2 py-1 text-left hover:bg-[#6D2A2D] rounded"
                      onClick={() => handleDropdownClick(sub)}
                    >
                      <span className="text-sm text-white">{sub.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-white hover:bg-[#6D2A2D] rounded font-semibold gap-2 justify-center"
        >
          <span className="flex items-center justify-center w-10 h-10">
            <FaSignOutAlt className="text-lg" />
          </span>
          {open && "Logout"}
        </button>
      </div>
    </aside>
  );
}