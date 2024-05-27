"use client";
import { Quicksand } from "@next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function LoginCompany() {
  return (
    <div className={quicksand.className}>
      <div className="bg-mainColor min-w-screen min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-white text-sm font-medium">
              Login untuk Melanjutkan ke:
            </p>
            <h1 className="text-white text-3xl font-bold">Dicoding Jobs</h1>
          </div>
          <div className="bg-white flex flex-col gap-20 pb-8 rounded-lg">
            <div className="flex flex-col gap-5 pt-10 px-10">
              <div className="flex flex-col gap-2">
                <p className="text-mainColor font-semibold">Username:</p>
                <input
                  type="username"
                  placeholder="Masukkan Username"
                  className="bg-lightGrey w-96 px-5 py-2 border border-logoGrey"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-mainColor font-semibold">Password:</p>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  className="bg-lightGrey w-92 px-5 py-2 border border-logoGrey"
                  required
                />
              </div>
              <Link href={"/dashboard-perusahaan"}>
                <button className="bg-mainColor text-white w-full text-lg py-2 mt-7 rounded-md">
                  Masuk
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2 mx-10">
              <Link href={"/"}>
                <button className="text-grey text-md font-medium">
                  Masuk Sebagai Pekerja
                </button>
              </Link>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9.5 7L14.5 12L9.5 17"
                    stroke="#898989"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
