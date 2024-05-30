"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddJob() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <main className="bg-white">
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

      <section
        className={`mx-10 pt-[56px] ${quicksand.className} text-mainColor`}
      >
        <div className="flex items-center my-3 space-x-4">
          <button>
            <Image src="/back_blue_icon.png" alt="back" width={9} height={0} />
          </button>
          <p className="text-lg">Kembali</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-5 mx-10">
            <div className="flex flex-col space-y-1.5">
              <p>Nama Pekerjaan</p>
              <input
                className="border-solid border-2 border-mainColor rounded-md p-2"
                type="text"
                name="name"
                placeholder="Back-end Dev..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <p>Sektor Bisnis</p>
              <input
                className="border-solid border-2 border-mainColor rounded-md p-2"
                type="text"
                name="business_sector"
                placeholder="Technology..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <p>Jumlah Kandidat yang Dibutuhkan</p>
              <div>
                <input
                  className="border-solid border-2 border-mainColor rounded-md p-2 w-16"
                  type="number"
                  name="needed"
                  min="0"
                  defaultValue="0"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between mx-10">
            <div className="flex flex-col space-y-1.5">
              <p>Persyaratan Pekerjaan</p>
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                theme="snow"
                className="custom-quill"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-mainColor border rounded-md py-2 px-6">
                <p className="text-white">Tambah Pekerjaan</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
