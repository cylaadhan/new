"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaTicketAlt, FaMoneyCheckAlt, FaSignOutAlt, FaChartBar, FaClipboardList, FaWallet, FaCheckCircle, FaCog } from "react-icons/fa";
import Image from "next/image";

const menu = [
  { label: "Dashboard", key: "dashboard", icon: <FaChartBar />, path: "/admin/dashboard" },
  {
    label: "Setup Data",
    key: "setup",
    icon: <FaClipboardList />,
    dropdown: [
      { label: "Setup Jenis Tiket & Harga", key: "jenis-tiket", path: "/admin/dashboard/setup-jenis-tiket" },
      { label: "Setup Periode Sale", key: "periode-sale", path: "/admin/dashboard/setup-periode-sale" },
      { label: "Setup Fee Tiket", key: "fee-tiket", path: "/admin/dashboard/setup-fee-tiket" },
    ],
  },
  { label: "Verifikasi Pembayaran", key: "verifikasi", icon: <FaMoneyCheckAlt />, path: "/admin/dashboard/verifikasi" },
  { label: "Daftar Tiket", key: "daftar-tiket", icon: <FaTicketAlt />, path: "/admin/dashboard/daftar-tiket" },
  {
    label: "Penukaran Tiket",
    key: "penukaran",
    icon: <FaCheckCircle />,
    dropdown: [
      { label: "Penukaran Tiket & Gelang", key: "offline", path: "/admin/dashboard/penukaran-offline" },
      { label: "Laporan", key: "statistik", path: "/admin/dashboard/statistik" },
    ],
  },
  { label: "Withdraw", key: "widraw", icon: <FaWallet />, path: "/admin/dashboard/widraw" },
  { label: "Pengaturan", key: "pengaturan", icon: <FaCog />, path: "/admin/dashboard/pengaturan" },
];

export default function Sidebar({ adminName = "Pemilik Event" }: { adminName?: string }) {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin1LoggedIn");
    }
    router.push("/admin/login");
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
      className={`sticky top-0 h-screen bg-white border-r shadow-md flex flex-col z-20 transition-all duration-500 ease-in-out ${open ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 p-4 border-b transition-all duration-500 ease-in-out ${open ? "justify-start" : "justify-center"}`}>
        <Image
          src="/gam1.jpeg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full bg-white transition-all duration-500 ease-in-out"
        />
        {open && (
          <div className="flex flex-col ml-2 transition-opacity duration-500 ease-in-out opacity-100">
            <span className="font-bold text-lg text-gray-800">Eventku</span>
            <span className="text-xs text-gray-600">{adminName}</span>
          </div>
        )}
        <button
          className={`${open ? "ml-auto" : "mx-auto"} text-gray-500 hover:text-blue-600 transition-all duration-500 ease-in-out`}
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
                className={`flex items-center w-full px-4 py-2 text-left hover:bg-blue-50 transition group ${open ? "" : "justify-center"}`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="text-blue-600 text-lg mr-3">{item.icon}</span>
                {open && <span className="font-medium flex-1 text-gray-800">{item.label}</span>}
                {item.dropdown && open && (
                  <FaChevronDown
                    className={`ml-auto transition-transform text-lg ${openDropdown === item.key ? "rotate-180 text-blue-600" : "text-gray-600"}`}
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
                      className="flex items-center w-full px-2 py-1 text-left hover:bg-blue-100 rounded"
                      onClick={() => handleDropdownClick(sub)}
                    >
                      <span className="text-sm text-gray-800">{sub.label}</span>
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
          className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded font-semibold gap-2 justify-center"
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
