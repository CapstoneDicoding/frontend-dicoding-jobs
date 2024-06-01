"use client";
import Image from "next/image";
import Link from "next/link";

export default function LowonganPerusahaanCard({
  id,
  name,
  companyName,
  companyLocation,
  candidateApplied,
}) {
  return (
    <div className="flex space-x-8 items-center p-8 border-2 border-gray-300 rounded-lg">
      <div className="flex flex-1 space-x-8">
        <div className="flex flex-none w-[100px] items-center">
          <Image
            src={"/favicon.ico"}
            alt="Company Logo"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-xl">{name}</p>
          <div className="flex gap-3 items-center w-full">
            <svg
              width="16"
              height="16"
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
            <p className="text-base">{companyName}</p>
          </div>
          <div className="flex gap-3 items-center">
            <svg
              width="16"
              height="16"
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
            <p className="text-base">{companyLocation}</p>
          </div>
          <div className="flex gap-3 items-center">
            <svg
              width="16"
              height="16"
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
            <p className="text-base">{candidateApplied} pelamar</p>
          </div>
          <div className="flex gap-12"></div>
        </div>
      </div>
      <Link
        href={`/company-jobs/${id}/candidates`}
        className="flex items-center justify-center space-x-2 bg-mainColor h-12 p-4 rounded"
      >
        <p className="font-medium text-lg text-white">Detail</p>
        <Image
          className="fill-white"
          src="/view-details.png"
          alt="icon-detail"
          width={20}
          height={0}
        ></Image>
      </Link>
    </div>
  );
}
