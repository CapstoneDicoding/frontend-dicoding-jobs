"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import Navbar from "@/components/navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function Detail() {
  return (
    <main className="bg-white">
      <Navbar />
      <section className={`grid grid-cols-[30%_70%] ${quicksand.className}`}>
        <div className="bg-mainColor text-white space-y-4 max-h-dvh sticky top-0 pt-[56px]">
          <div className="flex items-center mx-10 my-3 space-x-4">
            <button>
              <Image src="/back_icon.png" alt="back" width={9} height={0} />
            </button>
            <p className="text-lg">Kembali</p>
          </div>
          <div className="mx-10 flex flex-col items-center space-y-5">
            <p className=" text-lg">Profil Pelamar</p>
            <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-gray-300 relative">
              <Image
                src="/asahi.jpeg"
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="mx-10 space-y-3">
            <div>
              <p>Nama Lengkap</p>
              <p className="font-light">Faysa Ryestitha Etsuko</p>
            </div>
            <div>
              <p>Email</p>
              <p className="font-light">faysarystitha@gmail.com</p>
            </div>
            <div>
              <p>Kontak</p>
              <p className="font-light">0811223345</p>
            </div>
            <div>
              <p>Skills</p>
              <p className="font-light">Back-End, Cloud Computing</p>
            </div>
          </div>
          <div className="mx-10 flex h-8 justify-between">
            <button className="bg-redColor w-28 rounded">Tolak</button>
            <button className="bg-greenColor w-28 rounded">Terima</button>
          </div>
        </div>
        <div className="flex flex-col text-mainColor my-3 pt-[56px]">
          <div className="mx-5">
            <p className="font-semibold text-xl">LEARNING DESIGNER</p>
          </div>
          <div className="mx-10 my-3 space-y-5">
            <div className="grid grid-cols-[75%_25%]">
              <div className="mr-3">
                <p className="font-semibold text-lg">Persyaratan Pekerjaan</p>
                <ul className="list-disc ml-6">
                  <li>
                    Memiliki latar belakang S1 yang relevan dengan bidang desain
                    pembelajaran, lebih diutamakan dari jurusan Psikologi,
                    dengan bidang minat salah satu dari kelompok keahlian
                    berikut:
                  </li>
                  <ul className="list-disc ml-6">
                    <li>Psikologi Perkembangan</li>
                    <li>Psikologi Pendidikan</li>
                    <li>Psikologi Industri dan Organisasi</li>
                    <li>Psikologi Sosial</li>
                  </ul>
                  <li>
                    Memiliki pengalaman dalam merancang program pembelajaran.
                  </li>
                </ul>
                <ul className="list-disc ml-6">
                  <li>
                    Memiliki latar belakang S1 yang relevan dengan bidang desain
                    pembelajaran, lebih diutamakan dari jurusan Psikologi,
                    dengan bidang minat salah satu dari kelompok keahlian
                    berikut:
                  </li>
                  <ul className="list-disc ml-6">
                    <li>Psikologi Perkembangan</li>
                    <li>Psikologi Pendidikan</li>
                    <li>Psikologi Industri dan Organisasi</li>
                    <li>Psikologi Sosial</li>
                  </ul>
                  <li>
                    Memiliki pengalaman dalam merancang program pembelajaran.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-col place-items-center border-solid border-4 border-mainColor rounded-2xl p-5 space-y-3 sticky top-[70px]">
                  <p className="font-semibold">Tingkat Kesesuaian</p>
                  <p className="text-greenColor text-6xl">90%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-lg">Ringkasan CV</p>
              <embed
                src="/cv_fay.pdf"
                type="application/pdf"
                className="w-full h-screen"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
