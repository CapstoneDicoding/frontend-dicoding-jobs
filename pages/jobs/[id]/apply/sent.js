"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function Sent() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { query } = useRouter();
  const { id } = query;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    } else {
      if (role !== "candidate") {
        Cookies.remove("token");
        Cookies.remove("role");
        router.push("/");
        return;
      }
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/");
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log({ res });

        if (res.ok) {
          const result = await res.json();
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    async function fetchUserData() {
      try {
        const res = await fetch(
          `http://localhost:3000/candidates/${decodedToken.candidate_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const result = await res.json();
          setUserData(result);
        }
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    }

    fetchData();
    fetchUserData();
  }, []);

  if (!data || !userData) {
    return <div>Memuat data...</div>;
  }

  return (
    <div className={quicksand.className}>
      <Navbar />
      <div className="bg-mainColor min-h-screen">
        <div>
          <div className="pt-[56px] my-3 mx-10">
            <div className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
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
                    d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                </g>
              </svg>
              <Link href="/dashboard-pekerja">
                <p className="text-white text-base">Kembali</p>
              </Link>
            </div>
            <div className="flex gap-10 items-center mx-[105px] my-12">
              <Image
                src={data.data.job.company.user.photo_path}
                alt="Profile Picture"
                width={100}
                height={100}
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-white font-bold text-2xl">
                  {data.data.job.name}
                </h1>
                <h3 className="text-subColor font-bold text-xl">
                  Sektor Bisnis: {data.data.job.business_sector}
                </h3>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <svg
                      fill="#FFFFFF"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="none"
                      className="w-4"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M22,7H13V2a1,1,0,0,0-1-1H2A1,1,0,0,0,1,2V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM11,13H3V11h8Zm0-5V9H3V7h8ZM3,15h8v2H3ZM11,3V5H3V3ZM3,19h8v2H3Zm18,2H13V9h8Zm-5-5H14V14h2Zm0,4H14V18h2Zm4-4H18V14h2Zm-4-4H14V10h2Zm4,0H18V10h2Zm0,8H18V18h2Z"></path>
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.company.user.fullname}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4"
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
                          d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                          stroke="#FFFFFF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                          stroke="#FFFFFF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.company.location}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <svg
                      className="w-4"
                      fill="#FFFFFF"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#FFFFFF"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g data-name="Layer 2">
                          {" "}
                          <g data-name="people">
                            {" "}
                            <rect
                              width="24"
                              height="24"
                              opacity="0"
                            ></rect>{" "}
                            <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path>{" "}
                            <path d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path>{" "}
                            <path d="M17 14a5 5 0 0 0-3.06 1.05A7 7 0 0 0 2 20a1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 6.9 6.9 0 0 0-.86-3.35A3 3 0 0 1 20 19a1 1 0 0 0 2 0 5 5 0 0 0-5-5z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.candidate_needed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl py-20 mt-16">
          <div className=" flex flex-col justify-center mx-72 gap-20">
            <div className="flex gap-5">
              <div className="w-24 h-24 overflow-hidden rounded-full border-2 border-gray-300 relative">
                <Image
                  src={userData.user.photo_path}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-mainColor text-xl font-bold">
                  {userData.user.fullname}
                </p>
                <p className="text-mainColor text-md font-medium">
                  {userData.skills.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-mainColor font-bold">Lamaran Terkirim</p>
              <p>
                Terima kasih telah mengirimkan lamaran Anda. Untuk pengumuman
                selanjutnya dimohon untuk mengecek Email Anda secara berkala
              </p>
            </div>
          </div>
          <Link
            href="/jobs"
            className="flex flex-row gap-3 mx-48 my-12 justify-end"
          >
            <button className="bg-logoGrey font-semibold text-mainColor px-12 py-2 rounded-sm">
              Kembali ke Menu Utama
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
