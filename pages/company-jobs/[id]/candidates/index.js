"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import CandidatesRankCard from "@/components/candidate-rank-card";
import Navbar from "@/components/navbar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@/components/pagination";
import Link from 'next/link';
import Cookies from 'js-cookie';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function CandidatesRank() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const [jobsData, setJobsData] = useState({});
  const [jobsCandidateRankData, setJobsCandidateRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const page = query.page || 1;
  const limit = query.limit || 10;
  const jobId = query.id;
  const token = Cookies.get("token");
  const loginRole = Cookies.get("role");

  useEffect(() => {
    if (!token) {
      Cookies.remove("role");
      router.push("/");
      return;
    }

    try {
      if (loginRole !== "recruiter") {
        Cookies.remove("token");
        Cookies.remove("role");
        router.push("/");
        return;
      }
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/");
    }
  }, []);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/jobs/company/${jobId}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data)
        setJobsData(data.data.job);
        setJobsCandidateRankData(data.data.job.cvs);
        setTotalPages(data.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page, limit]);

  return (
    <main
      className={`flex flex-col gap-12 bg-white ${quicksand.className} pb-24 my-20 mx-10`}
    >
      <Navbar />
      <Link href="/company-jobs" className="flex items-center mb-2">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
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
              fill="#000000"
            ></path>{" "}
          </g>
        </svg>
        <p className="font-medium text-lg">Kembali</p>
      </Link>
      <div className="flex gap-10 items-center mx-[105px]">
        <Image
          src={"/favicon.ico"}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-lg"
        />
        { isLoading ? <div></div> :
        <div className="flex flex-col gap-1">
          <h1 className="text-mainColor font-bold text-2xl">
            {jobsData.name || ''}
          </h1>
          <h3 className="text-subColor font-bold text-xl">
            Sektor Bisnis: {jobsData.business_sector}
          </h3>
          <div className="flex gap-10">
            <div className="flex gap-1 justify-center items-center">
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                class="me-1"
              >
                <path
                  d="M14 12.667h1.333V14H.667v-1.333H2v-10A.667.667 0 0 1 2.667 2h6.666a.667.667 0 0 1 .667.667v10h2.667V7.333h-1.334V6h2a.667.667 0 0 1 .667.667v6ZM3.333 3.333v9.334h5.334V3.333H3.333Zm1.334 4h2.666v1.334H4.667V7.333Zm0-2.666h2.666V6H4.667V4.667Z"
                  fill="#3F3F46"
                ></path>
              </svg>
              <p className="text-base">{jobsData.company.user.fullname}</p>
            </div>
            <div className="flex gap-1">
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                class="me-1"
              >
                <path
                  d="m8 15.819-4.243-4.243a6 6 0 1 1 8.486 0L8 15.82Zm3.3-5.186a4.666 4.666 0 1 0-6.6 0l3.3 3.3 3.3-3.3ZM8 8.667A1.333 1.333 0 1 1 8 6a1.333 1.333 0 0 1 0 2.667Z"
                  fill="#3F3F46"
                ></path>
              </svg>
              <p className="text-base">{jobsData.company.location}</p>
            </div>
            <div className="flex gap-1">
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                class="me-1"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 3.167a2.333 2.333 0 1 0 0 4.666 2.333 2.333 0 0 0 0-4.666ZM4 5.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM11 3.167a2.333 2.333 0 1 0 0 4.666 2.333 2.333 0 0 0 0-4.666ZM10 5.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM8 10.058a3.667 3.667 0 0 0-6.667 2.109V14.5c0 .368.299.667.667.667h12a.667.667 0 0 0 .667-.667v-2.333A3.667 3.667 0 0 0 8 10.057Zm-.667 3.775v-1.668a2.333 2.333 0 0 0-4.666.002v1.666h4.666Zm1.334-1.668v1.668h4.666v-1.666a2.333 2.333 0 0 0-4.666-.002Z"
                  fill="#3F3F46"
                ></path>
              </svg>
              <p className="text-base">{jobsData.candidate_needed | 0} kandidat dibutuhkan</p>
            </div>
          </div>
        </div>
        }
      </div>
      <div className="flex flex-col">
        <div
          className={`flex mx-[105px] px-8 py-4 bg-slate-200 cursor-pointer items-center ${
            isAccordionOpen ? "rounded-t-md" : "rounded-md"
          }`}
          onClick={toggleAccordion}
        >
          <p className="flex-1 font-medium text-xl">Persyaratan Pekerjaan</p>
          {isAccordionOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isAccordionOpen && (
          <div
            className={`flex flex-col mx-[105px] rounded-b-md px-8 py-4 bg-slate-200 border-t-2 border-gray-300 transition
             duration-1000 ease-in-out`}
          >
            <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: jobsData.requirements }}
                ></div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-7 border border-[rgb(0,0,0,0.2)] rounded-2xl mx-[105px] items-center py-10">
        <p className="font-semibold text-mainColor text-2xl">DAFTAR PELAMAR</p>
        <div className='flex flex-col w-full items-center'>
          { isLoading ? <div></div> :
          jobsCandidateRankData.map((cv, idx) => (
            <CandidatesRankCard
              key={idx + 1}
              id={cv.id}
              job_id={jobId}
              rank={idx + 1}
              name={cv.candidate.user.fullname}
              skills={cv.candidate.skills}
              percentage={cv.accuracy}
              isLast={idx === cv.length - 1}
            />
          ))
}
        </div>
        <Pagination
          navigateEndpoint={`/company-jobs/${jobId}/candidates`}
          totalPages={totalPages}
        ></Pagination>
      </div>
    </main>
  );
}
