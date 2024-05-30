"use client";
import { Quicksand } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Navbar from "@/components/navbar";
import Pagination from "@/components/pagination";
import LowonganCard from "@/components/lowonganPekerja-card";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function CandidatesRank() {
    const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const loginRole = Cookies.get('role');

    if (!token) {
      Cookies.remove('role');
      router.push('/');
      return;
    }

    try {
      if (loginRole !== 'candidate') {
        Cookies.remove('token'); 
      Cookies.remove('role');
        router.push('/');
        return;
      }
      setUser({role: loginRole });
    } catch (error) {
      Cookies.remove('token'); 
      Cookies.remove('role');
      router.push('/');
    }
  }, []);

  const jobsData = [
    {
      name: "Software Engineer",
      companyName: "Tech Innovators Inc.",
      companyLocation: "Jakarta",
      candidateNeeded: 5,
    },
    {
      name: "Graphic Designer",
      companyName: "Creative Minds Studio",
      companyLocation: "Bandung",
      candidateNeeded: 2,
    },
    {
      name: "Marketing Specialist",
      companyName: "Market Masters",
      companyLocation: "Surabaya",
      candidateNeeded: 3,
    },
    {
      name: "Data Analyst",
      companyName: "Data Insights Co.",
      companyLocation: "Yogyakarta",
      candidateNeeded: 4,
    },
    {
      name: "Sales Executive",
      companyName: "Sales Solutions Ltd.",
      companyLocation: "Medan",
      candidateNeeded: 6,
    },
    {
      name: "Project Manager",
      companyName: "Project Pros",
      companyLocation: "Jakarta",
      candidateNeeded: 1,
    },
    {
      name: "HR Manager",
      companyName: "People First HR",
      companyLocation: "Semarang",
      candidateNeeded: 2,
    },
    {
      name: "Web Developer",
      companyName: "Web Wonders",
      companyLocation: "Bali",
      candidateNeeded: 3,
    },
    {
      name: "Accountant",
      companyName: "Finance Gurus",
      companyLocation: "Makassar",
      candidateNeeded: 2,
    },
    {
      name: "Customer Support Representative",
      companyName: "Support Heroes",
      companyLocation: "Bandung",
      candidateNeeded: 5,
    },
  ];

  return (
    <main
      className={`flex flex-col gap-12 bg-white ${quicksand.className} pb-6`}
    >
      <Navbar />
      <div className="bg-black min-h-screen mt-14">
        <div className="bg-black bg-[url(/wayfinder.png)] bg-center bg-cover flex flex-col gap-10 py-28 px-20 ">
          <div className="max-w-[50%] h-full flex items-center">
            <p className="text-white text-5xl font-semibold leading-snug">
              Temukan lowongan yang cocok untuk kamu
            </p>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl py-10">
          <div className="flex flex-col gap-16 rounded-2xl mx-20 items-center py-10">
            <p className="font-bold text-mainColor text-4xl">
              DAFTAR LOWONGAN PEKERJAAN
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-6">
              {jobsData.map((job, idx) => (
                <LowonganCard
                  key={idx + 1}
                  name={job.name}
                  companyName={job.companyName}
                  companyLocation={job.companyLocation}
                  candidateNeeded={job.candidateNeeded}
                />
              ))}
            </div>
            <Pagination
              navigateEndpoint={"dashboard-pekerja"}
              totalPages={10}
            ></Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
