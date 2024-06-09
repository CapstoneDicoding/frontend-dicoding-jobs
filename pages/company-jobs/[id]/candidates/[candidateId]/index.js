"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BASE_API_URL } from '@/config';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

const Detail = ({ initialId }) => {
  const [data, setData] = useState(null);
  const [idCv, setIdCv] = useState(initialId);
  const router = useRouter();
  const id = router.query.id;
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    if (router.isReady) {
      const { candidateId } = router.query;
      setIdCv(candidateId || "No id provided");
    }
  }, [router.isReady, router.query]);

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

    async function fetchData() {
      try {
        const res = await fetch(`${BASE_API_URL}/cvs/${idCv}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, [router.query]);

  if (!data) {
    return <div>Memuat data...</div>;
  }

  const getColorAccuracy = (accuracy) => {
    if (accuracy > 80) {
      return "text-greenColor";
    } else if (accuracy > 50) {
      return "text-yellowColor";
    } else {
      return "text-redColor";
    }
  };

  return (
    <main className="bg-white">
      <Navbar />
      <section className={`grid grid-cols-[30%_70%] ${quicksand.className}`}>
        <div className="bg-mainColor text-white space-y-4 max-h-dvh sticky top-0 pt-[56px]">
          <Link
            href={`/company-jobs/${id}/candidates`}
            className="flex items-center mx-10 my-3 space-x-4"
          >
            <button>
              <Image src="/back_icon.png" alt="back" width={9} height={0} />
            </button>
            <p className="text-lg">Kembali</p>
          </Link>
          <div className="mx-10 flex flex-col items-center space-y-5">
            <p className=" text-lg">Profil Pelamar</p>
            <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-gray-300 relative">
              <Image
                src={data.candidate.user.photo_path}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="mx-10 space-y-3">
            <div>
              <p>Nama Lengkap</p>
              <p className="font-light">{data.candidate.user.fullname}</p>
            </div>
            <div>
              <p>Email</p>
              <p className="font-light">{data.candidate.email}</p>
            </div>
            <div>
              <p>Kontak</p>
              <p className="font-light">{data.candidate.notelp}</p>
            </div>
            <div>
              <p>Skills</p>
              <p className="font-light">{data.candidate.skills.join(", ")}</p>
            </div>
          </div>
          <div className="mx-10 flex h-8 justify-between">
            <button className="bg-redColor w-32 rounded">Tolak</button>
            <button className="bg-greenColor w-32 rounded">Terima</button>
          </div>
        </div>
        <div className="flex flex-col text-mainColor my-3 pt-[56px]">
          <div className="mx-5">
            <p className="font-semibold text-xl uppercase">{data.job.name}</p>
          </div>
          <div className="mx-10 my-3 space-y-5">
            <div className="grid grid-cols-[75%_25%]">
              <div className="mr-3">
                <p className="font-semibold text-lg">Persyaratan Pekerjaan</p>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: data.job.requirements }}
                ></div>
              </div>
              <div>
                <div className="flex flex-col place-items-center border-solid border-4 border-mainColor rounded-2xl p-5 space-y-3 sticky top-[70px]">
                  <p className="font-semibold">Tingkat Kesesuaian</p>
                  <p className={`${getColorAccuracy(data.accuracy)} text-6xl`}>
                    {data.accuracy}%
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-lg">Ringkasan CV</p>
              <embed
                src={data.summarized_cv_path}
                type="application/pdf"
                className="w-full h-screen"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { candidateId } = context.query;
  return {
    props: {
      initialId: candidateId || null,
    },
  };
}

export default Detail;
