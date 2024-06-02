"use client";
import Image from "next/image";
import Link from "next/link";

export default function LowonganCard({
  id,
  name,
  companyName,
  companyPicture,
  companyLocation,
  candidateNeeded,
}) {
  return (
    <div className="flex space-x-8 items-center p-8 border-2 border-gray-300 rounded-lg">
      <div className="flex flex-1 space-x-8">
        <div className="flex flex-none w-[100px] items-center">
          <Image
            src={companyPicture}
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
            <p className="text-base">{candidateNeeded} kandidat dibutuhkan</p>
          </div>
          <div className="flex gap-12"></div>
        </div>
      </div>
      <Link
        href={`/jobs/${id}/apply`}
        className="flex items-center justify-center space-x-2 bg-mainColor h-12 p-4 rounded"
      >
        <p className="font-medium text-lg text-white">Daftar</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width="20"
          height="20"
        >
          <metadata>
            {" "}
            Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
          </metadata>
          <g>
            <g>
              <path
                fill="#FFFFFF"
                d="M178.7,83c0-6.2-5-11.2-11.2-11.2H66.2C60,71.8,55,76.8,55,83s5,11.2,11.2,11.2h101.2C173.6,94.3,178.7,89.2,178.7,83z M66.2,116.7c-6.2,0-11.2,5-11.2,11.2v0.1c0,6.2,5,11.2,11.2,11.2h67.5c6.2,0,11.2-5,11.2-11.2v-0.1c0-6.2-5-11.2-11.2-11.2H66.2z M71.8,229.2H60.6c-15.5,0-28.1-12.6-28.1-28.1V54.9c0-15.5,12.6-28.1,28.1-28.1h112.4c15.5,0,28.1,12.6,28.1,28.1V83c0,6.2,5,11.2,11.2,11.2c6.2,0,11.2-5,11.2-11.2V49.3c0-24.8-20.1-45-45-45H55c-24.8,0-45,20.1-45,45v157.4c0,24.8,20.1,45,45,45h16.9c6.2,0,11.2-5,11.2-11.2C83.1,234.2,78,229.2,71.8,229.2z M236.2,126.5c-13-13.1-34.1-13.1-47.1,0l-72.8,71.9l0.1,0.1c-2.4,2-4,5.1-4,8.5v33.5c0,6.2,5,11.2,11.1,11.2l0,0h33.3c4.1,0,7.6-2.2,9.5-5.5l0,0l69.8-72.3C249.3,160.8,249.3,139.5,236.2,126.5z M220.5,158l-68.7,71.2h-17.3v-17.5l70.2-69.5c4.3-4.4,11.4-4.4,15.7,0C224.8,146.6,224.8,153.7,220.5,158z M100,161.7H66.2c-6.2,0-11.2,5-11.2,11.2s5,11.2,11.2,11.2H100c6.2,0,11.2-5,11.2-11.2C111.2,166.8,106.2,161.7,100,161.7z"
              ></path>
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
}
