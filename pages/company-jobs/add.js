"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { BASE_API_URL } from "@/config";
import Navbar from "@/components/navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddJob() {
  const [name, setName] = useState(null);
  const [sector, setSector] = useState(null);
  const [req, setReq] = useState(null);
  const [needed, setNeeded] = useState(null);
  const router = useRouter();
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const handleEditorChange = (req) => {
    setReq(req);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login-company");
      return;
    } else {
      if (role !== "recruiter") {
        Cookies.remove("token");
        Cookies.remove("role");
        router.push("/login-company");
        return;
      }
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/login-company");
      return;
    }
  });

  const handleSubmit = async () => {
    const response = await fetch(`${BASE_API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        business_sector: sector,
        requirements: req,
        candidate_needed: +needed,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/company-jobs/${data.data.job_id}/candidates`);
      return;
    } else {
      alert("Failed");
    }
  };

  return (
    <main className="bg-white">
      <Navbar />
      <section
        className={`mx-10 pt-[56px] ${quicksand.className} text-mainColor`}
      >
        <Link href="/company-jobs" className="flex items-center my-3 space-x-4">
          <button>
            <Image src="/back_blue_icon.png" alt="back" width={9} height={0} />
          </button>
          <p className="text-lg">Kembali</p>
        </Link>
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-5 mx-10">
            <div className="flex flex-col space-y-1.5">
              <p>Nama Pekerjaan</p>
              <input
                className="border-solid border-2 border-mainColor rounded-md p-2"
                type="text"
                placeholder="Back-end Dev..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <p>Sektor Bisnis</p>
              <input
                className="border-solid border-2 border-mainColor rounded-md p-2"
                type="text"
                placeholder="Technology..."
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <p>Jumlah Kandidat yang Dibutuhkan</p>
              <div>
                <input
                  className="border-solid border-2 border-mainColor rounded-md p-2 w-16"
                  type="number"
                  min="0"
                  defaultValue="0"
                  value={needed}
                  onChange={(e) => setNeeded(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between mx-10">
            <div className="flex flex-col space-y-1.5">
              <p>Persyaratan Pekerjaan</p>
              <ReactQuill
                value={req}
                onChange={handleEditorChange}
                theme="snow"
                className="custom-quill"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-mainColor border rounded-md py-2 px-6 text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Tambah Pekerjaan
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
