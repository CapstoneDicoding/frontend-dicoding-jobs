"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Quicksand } from "@next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      Cookies.set("token", data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV !== "development",
      });
      Cookies.set("role", data.role, {
        expires: 1,
        secure: process.env.NODE_ENV !== "development",
      });
      router.push("/company-jobs");
    } else if (res.status === 401) {
      setError("Username/password salah");
    } else {
      setError(data.message);
    }
  };

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
            <form
              className="flex flex-col gap-5 pt-10 px-10"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <p className="text-mainColor font-semibold">Username:</p>
                <input
                  type="text"
                  placeholder="Masukkan Username"
                  className="bg-lightGrey w-96 px-5 py-2 border border-logoGrey"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-mainColor font-semibold">Password:</p>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  className="bg-lightGrey w-96 px-5 py-2 border border-logoGrey"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="bg-mainColor text-white w-full text-lg py-2 mt-7 rounded-md"
                type="submit"
              >
                Masuk
              </button>
            </form>
            <div className="flex justify-center items-center gap-2 mx-10">
              <Link href={"/"}>
                <button className="text-grey text-md font-medium">
                  Masuk Sebagai Pelamar
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
                  <path
                    d="M9.5 7L14.5 12L9.5 17"
                    stroke="#898989"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
