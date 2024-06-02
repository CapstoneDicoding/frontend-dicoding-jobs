import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import { useRouter } from "next/router";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Cookies from 'js-cookie'; 

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});


function Navbar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();

  const photo_path = Cookies.get("photo_path")

  const handleProfileClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token'); 
    Cookies.remove('role');
    Cookies.remove('photo_path');
    router.push('/');
  };

  return (
    <nav
      className={`drop-shadow-lg bg-white ${quicksand.className} text-mainColor fixed top-0 left-0 right-0 z-50`}
    >
      <div className="flex justify-between mx-10">
        <div className="flex items-center my-3 space-x-4">
          <Image src="/logo.png" alt="logo" width={70} height={0} />
          <Image src="/line1.png" alt="line1" width={3} height={0} />
          <p>Lowongan Kerja</p>
        </div>
        <div className="flex items-center space-x-10 relative me-4">
          <p>Dashboard</p>
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleProfileClick}
            >
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-gray-300 relative">
                    <Image
                      src={photo_path}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
              {isPopoverOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isPopoverOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-2">
                  <div className="flex items-center justify-center hover:bg-gray-100" onClick={handleLogout}>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="me-2"
                    >
                      <path
                        d="M2.5 1.668a.833.833 0 0 0-.833.833v15c0 .46.373.834.833.834H10c.46 0 .833-.373.833-.834v-4.166a.833.833 0 0 0-1.666 0v3.333H3.333V3.335h5.834v3.333a.833.833 0 1 0 1.666 0V2.501A.833.833 0 0 0 10 1.668H2.5Z"
                        fill="#E11D48"
                      ></path>
                      <path
                        d="M14.756 6.079a.833.833 0 1 0-1.179 1.178l1.911 1.911H6.667a.833.833 0 1 0 0 1.667h8.821l-1.91 1.91a.833.833 0 1 0 1.178 1.179l3.333-3.333a.833.833 0 0 0 0-1.179L14.756 6.08Z"
                        fill="#E11D48"
                      ></path>
                    </svg>
                    <p className="block p-1 text-left text-lg text-redColor">
                      Keluar
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
