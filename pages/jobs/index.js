"use client";
import { Quicksand } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navbar from "@/components/navbar";
import Pagination from "@/components/pagination";
import LowonganCard from "@/components/lowonganPekerja-card";
import { BASE_API_URL } from "@/config";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function DashboardCandidate() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { query } = useRouter();
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const page = query.page || 1;
  const limit = query.limit || 10;
  const token = Cookies.get("token");
  const loginRole = Cookies.get("role");

  useEffect(() => {
    if (!token) {
      Cookies.remove("role");
      router.push("/");
      return;
    }

    if (loginRole !== "candidate") {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/");
      return;
    }

    setUser({ role: loginRole });
  }, [token, loginRole, router]);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    fetch(`${BASE_API_URL}/jobs?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJobsData(data.data.jobs);
        setTotalPages(data.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page, limit, token]);

  return (
    <main
      className={`flex flex-col gap-12 bg-white ${quicksand.className} pb-6`}
    >
      <Navbar />
      <div className="bg-black min-h-screen mt-14">
        <div className="bg-black bg-[url(/wayfinder.png)] bg-center bg-cover flex flex-col gap-10 py-28 px-20 ">
          <div className="max-w-[40%] h-full flex items-center">
            <p className="text-white text-4xl font-semibold leading-snug">
              Temukan lowongan yang cocok untuk kamu
            </p>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl py-10">
          <div className="flex flex-col gap-16 rounded-2xl mx-20 items-center py-10">
            <p className="font-bold text-mainColor text-2xl">
              DAFTAR LOWONGAN PEKERJAAN
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-300 p-8 rounded-lg"
                    >
                      <div className="flex items-center space-x-8">
                        <div className="w-[100px] h-[100px] bg-gray-300 rounded-lg"></div>
                        <div className="flex flex-col">
                          <div className="w-36 h-6 bg-gray-300 rounded-lg"></div>
                          <div className="w-40 h-4 mt-2 bg-gray-300 rounded-lg"></div>
                          <div className="w-48 h-4 mt-2 bg-gray-300 rounded-lg"></div>
                          <div className="w-28 h-4 mt-2 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="w-[100px] h-8 bg-gray-300 rounded-lg"></div>
                      </div>
                    </div>
                  ))
                : jobsData.map((job, idx) => (
                    <LowonganCard
                      key={idx + 1}
                      id={job.id}
                      name={job.name}
                      companyName={job.company.user.fullname}
                      companyLocation={job.company.location}
                      companyPicture={job.company.user.photo_path}
                      candidateNeeded={job.candidate_needed}
                    />
                  ))}
            </div>
            <Pagination
              navigateEndpoint={"jobs"}
              totalPages={totalPages}
            ></Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
