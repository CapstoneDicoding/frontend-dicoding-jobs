"use client";
import React from "react";
import Image from "next/image";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

function Navbar() {
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
        <div className="flex items-center space-x-10">
          <p>Dashboard</p>
          <Image src="/profil.png" alt="icon-profil" width={30} height={0} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
