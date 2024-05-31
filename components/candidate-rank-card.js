"use client";
import Image from "next/image";
import Link from "next/link";

export default function CandidatesRankCard({
  rank,
  name,
  skills,
  percentage,
  isLast,
}) {
  return (
    <div
      className={`flex space-x-8 items-center p-7 ${
        isLast ? "" : "border-b"
      } border-[rgb(0,0,0,0.2)] w-full max-w-4xl`}
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
          <p className="text-base">Skills: {skills.join(", ")}</p>
        </div>
      </div>
      <div
        className={`flex items-center border rounded-[4px] justify-center px-4 p-2 w-24 ${
          percentage > 80
            ? "text-greenColor border-greenColor bg-[rgb(68,181,43,0.1)]"
            : percentage > 50
            ? "text-yellowColor border-yellowColor bg-[rgb(255,213,28,0.1)]"
            : "text-redColor border-redColor bg-[rgb(255,73,45,0.1)]"
        }`}
      >
        <p className="font-medium text-3xl">{percentage}%</p>
      </div>
      {/*querynya dikasih dinamis ya kak (id di tabel cv nya)*/}
      <Link
        href={{ pathname: "/detail", query: { id: 2 } }}
        className="flex items-center justify-center space-x-2 bg-mainColor py-2 p-4 rounded"
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
