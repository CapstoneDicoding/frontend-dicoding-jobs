"use client";
import Image from "next/image";
import Link from 'next/link';

export default function CandidatesRankCard({ rank, name, skills, percentage }) {
  return (
    <div
      className="flex space-x-8 items-center p-7 border-2 border-gray-300 rounded-2xl w-full max-w-4xl"
    >
      <div className="flex flex-none w-16 items-center justify-center">
        <p className="font-bold text-4xl text-mainColor">{rank}</p>
      </div>
      <div className="flex flex-1 space-x-5">
        <Image
          src="/profil.png"
          alt="icon-profil"
          width={65}
          height={0}
        ></Image>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-xl">{name}</p>
          <p className="text-base">Skills: {skills.join(', ')}</p>
        </div>
      </div>
      <div
        className={`flex items-center ${
          percentage > 80
            ? "text-greenColor"
            : percentage > 50
            ? "text-yellowColor"
            : "text-redColor"
        }`}
      >
        <p className="font-medium text-4xl">{percentage}%</p>
      </div> 
      <Link href="/detail" className="flex items-center justify-center space-x-2 bg-mainColor h-12 p-4 rounded">
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
