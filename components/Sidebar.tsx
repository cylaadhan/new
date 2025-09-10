"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Ticket, Landmark, LogOut, LayoutGrid, ClipboardList, Wallet, CheckCircle, DollarSign, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const menu = [
  { label: "Dashboard", key: "dashboard", icon: <LayoutGrid className="w-5 h-5" />, path: "/admin/dashboard" },
  {
    label: "Setup Data",
    key: "setup",
    icon: <ClipboardList className="w-5 h-5" />,
    dropdown: [
      { label: "Setup Jenis Tiket & Harga", key: "jenis-tiket", path: "/admin/dashboard/setup-jenis-tiket" },
      { label: "Setup Periode Sale", key: "periode-sale", path: "/admin/dashboard/setup-periode-sale" },
      { label: "Setup Fee Tiket", key: "fee-tiket", path: "/admin/dashboard/setup-fee-tiket" },
    ],
  },
  { label: "Verifikasi Pembayaran", key: "verifikasi", icon: <DollarSign className="w-5 h-5" />, path: "/admin/dashboard/verifikasi" },
  { label: "Daftar Tiket", key: "daftar-tiket", icon: <Ticket className="w-5 h-5" />, path: "/admin/dashboard/daftar-tiket" },
  { label: "Data Penukaran Tiket", key: "offline", icon: <CheckCircle className="w-5 h-5" />, path: "/admin/dashboard/penukaran-offline" },
  { label: "Laporan", key: "statistik", icon: <BarChart2 className="w-5 h-5" />, path: "/admin/dashboard/statistik" },
  { label: "Withdraw", key: "widraw", icon: <Wallet className="w-5 h-5" />, path: "/admin/dashboard/widraw" },
];

interface SidebarProps {
  adminName?: string;
  showMobileSidebar?: boolean;
  setShowMobileSidebar?: (show: boolean) => void;
}

export default function Sidebar({ 
  adminName = "Pemilik Event", 
  showMobileSidebar, 
  setShowMobileSidebar 
}: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // State untuk mengontrol sidebar yang diperkecil (hanya untuk desktop)
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Gunakan state internal hanya jika props tidak disediakan
  const [internalShowMobileSidebar, setInternalShowMobileSidebar] = useState(false);
  
  // Gunakan props jika disediakan, jika tidak gunakan state internal
  const isShowMobileSidebar = showMobileSidebar !== undefined ? showMobileSidebar : internalShowMobileSidebar;
  const handleSetShowMobileSidebar = setShowMobileSidebar || setInternalShowMobileSidebar;
  
  const router = useRouter();
  const pathname = usePathname();

  // Deteksi ukuran layar untuk mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px adalah breakpoint untuk tampilan mobile
    };

    // Cek saat komponen dimuat
    checkIsMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const activeParent = menu.find(item => item.dropdown?.some(sub => sub.path === pathname));
    if (activeParent) {
      setOpenDropdown(activeParent.key);
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin1LoggedIn");
      // Tambahkan penghapusan isAdmin2LoggedIn juga untuk memastikan semua sesi logout
      localStorage.removeItem("isAdmin2LoggedIn");
    }
    router.push("/login");
  };

  const handleMenuClick = (item: any) => {
    if (item.dropdown) {
      setOpenDropdown(openDropdown === item.key ? null : item.key);
    } else if (item.path) {
      router.push(item.path);
      if (isMobile) {
        handleSetShowMobileSidebar(false); 
      }
    }
  };

  const handleDropdownClick = (sub: any) => {
    router.push(sub.path);
    if (isMobile) {
      handleSetShowMobileSidebar(false); 
    }
  };

  // Toggle sidebar collapse (hanya untuk desktop)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {isMobile && isShowMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => handleSetShowMobileSidebar(false)}
        />
      )}

      <aside
        className={`${isMobile ? 'fixed' : 'sticky'} top-0 h-screen bg-white border-r shadow-md flex flex-col z-30 transition-all duration-500 ease-in-out font-sans ${
          isMobile ? "w-64" : isCollapsed ? "w-20" : "w-64"
        } ${
          isMobile ? (isShowMobileSidebar ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 transition-all duration-500 ease-in-out justify-between">
          <div className="flex items-center">
            <Image
              src="/gam1.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full bg-white transition-all duration-500 ease-in-out"
            />
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col ml-2 transition-opacity duration-500 ease-in-out opacity-100">
                <span className="font-bold text-lg text-black">Admin</span>
                <span className="text-xs text-gray-500">{adminName}</span>
              </div>
            )}
          </div>
          {/* Tombol toggle sidebar (hanya untuk desktop) */}
          {!isMobile && (
            <button 
              onClick={toggleCollapse}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          )}
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
                    className={`flex items-center w-full px-4 py-2 text-left transition group rounded-md font-medium text-base ${
                      isActive
                        ? "text-blue-800 border-r-4 border-blue-800"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => handleMenuClick(item)}
                    title={isCollapsed && !isMobile ? item.label : ""}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {(!isCollapsed || isMobile) && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.dropdown && (
                          <ChevronDown
                            className={`ml-auto transition-transform ${openDropdown === item.key ? "rotate-180" : ""}`}
                          />
                        )}
                      </>
                    )}
                  </button>
                  
                  {/* Dropdown (hanya tampilkan jika sidebar tidak diperkecil atau di mobile) */}
                  {(!isCollapsed || isMobile) && (
                    <ul
                      className={`
                        ml-8 mt-1 space-y-1
                        transition-all duration-300 ease-in-out origin-top
                        ${
                          item.dropdown && openDropdown === item.key
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
                              className={`flex items-center w-full px-2 py-1 text-left rounded-md text-base ${
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
                  )}
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
            title={isCollapsed && !isMobile ? "Logout" : ""}
          >
            <span className="flex items-center justify-center">
              <LogOut className="w-5 h-5 mr-3" />
            </span>
            {(!isCollapsed || isMobile) && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
