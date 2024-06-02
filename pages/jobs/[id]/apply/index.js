"use client";
import Image from "next/image";
import { Quicksand } from "@next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "500"],
});

const Daftar = ({}) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { query } = useRouter();
  const { id } = query;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    } else {
      if (role !== "candidate") {
        Cookies.remove("token");
        Cookies.remove("role");
        router.push("/");
        return;
      }
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/");
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log({ res });

        if (res.ok) {
          const result = await res.json();
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    async function fetchUserData() {
      try {
        const res = await fetch(
          `http://localhost:3000/candidates/${decodedToken.candidate_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const result = await res.json();
          setUserData(result);
        }
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    }

    fetchData();
    fetchUserData();
  }, []);

  if (!data || !userData) {
    return <div>Memuat data...</div>;
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("job_id", id);

    try {
      const response = await fetch("http://localhost:3000/cvs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("File berhasil diunggah");
        router.push(`/jobs/${id}/apply/sent`);
      } else {
        alert("Gagal mengunggah file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Terjadi kesalahan saat mengunggah file");
    }
  };

  return (
    <div className={quicksand.className}>
      <Navbar />
      <div className="bg-mainColor min-h-screen">
        <div>
          <div className="pt-[56px] my-3 mx-10">
            <div className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
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
                    fill="#FFFFFF"
                  ></path>{" "}
                </g>
              </svg>
              <Link href="/jobs">
                <p className="text-white text-base">Kembali</p>
              </Link>
            </div>
            <div className="flex gap-10 items-center mx-[105px] my-12">
              <Image
                src={data.data.job.company.user.photo_path}
                alt="Profile Picture"
                width={100}
                height={100}
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-white font-bold text-2xl">
                  {data.data.job.name}
                </h1>
                <h3 className="text-subColor font-bold text-xl">
                  Sektor Bisnis: {data.data.job.business_sector}
                </h3>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <svg
                      fill="#FFFFFF"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="none"
                      className="w-4"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M22,7H13V2a1,1,0,0,0-1-1H2A1,1,0,0,0,1,2V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM11,13H3V11h8Zm0-5V9H3V7h8ZM3,15h8v2H3ZM11,3V5H3V3ZM3,19h8v2H3Zm18,2H13V9h8Zm-5-5H14V14h2Zm0,4H14V18h2Zm4-4H18V14h2Zm-4-4H14V10h2Zm4,0H18V10h2Zm0,8H18V18h2Z"></path>
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.company.user.fullname}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4"
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
                          d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                          stroke="#FFFFFF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                          stroke="#FFFFFF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.company.location}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <svg
                      className="w-4"
                      fill="#FFFFFF"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#FFFFFF"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g data-name="Layer 2">
                          {" "}
                          <g data-name="people">
                            {" "}
                            <rect
                              width="24"
                              height="24"
                              opacity="0"
                            ></rect>{" "}
                            <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path>{" "}
                            <path d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path>{" "}
                            <path d="M17 14a5 5 0 0 0-3.06 1.05A7 7 0 0 0 2 20a1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 6.9 6.9 0 0 0-.86-3.35A3 3 0 0 1 20 19a1 1 0 0 0 2 0 5 5 0 0 0-5-5z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <p className="text-white text-base">
                      {data.data.job.candidate_needed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl py-20 mt-16">
          <div className="flex mx-10 gap-20">
            <div className="bg-lightGrey basis-2/5 px-10 py-10 flex flex-col gap-3">
              <h1 className="text-mainColor font-bold text-2xl">
                Persyaratan Pekerjaan
              </h1>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: data.data.job.requirements }}
              ></div>
            </div>
            <div className="basis-3/5">
              <div className=" flex flex-col justify-center gap-12">
                <div className="flex gap-5">
                  <div className="w-24 h-24 overflow-hidden rounded-full border-2 border-gray-300 relative">
                    <Image
                      src={userData.user.photo_path}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-mainColor text-xl font-bold">
                      {userData.user.fullname}
                    </p>
                    <p className="text-mainColor text-md font-medium">
                      {userData.skills.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-mainColor font-bold">CV/Resume</p>
                  <div className="flex flex-col px-52 py-20 items-center justify-center text-center border-2 border-logoGrey gap-5">
                    <svg
                      className="w-16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                          d="M2.5 6.5V6H2V6.5H2.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 10.5H6V11H6.5V10.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 7H3.5V6H2.5V7ZM3 11V8.5H2V11H3ZM3 8.5V6.5H2V8.5H3ZM3.5 8H2.5V9H3.5V8ZM4 7.5C4 7.77614 3.77614 8 3.5 8V9C4.32843 9 5 8.32843 5 7.5H4ZM3.5 7C3.77614 7 4 7.22386 4 7.5H5C5 6.67157 4.32843 6 3.5 6V7ZM6 6.5V10.5H7V6.5H6ZM6.5 11H7.5V10H6.5V11ZM9 9.5V7.5H8V9.5H9ZM7.5 6H6.5V7H7.5V6ZM9 7.5C9 6.67157 8.32843 6 7.5 6V7C7.77614 7 8 7.22386 8 7.5H9ZM7.5 11C8.32843 11 9 10.3284 9 9.5H8C8 9.77614 7.77614 10 7.5 10V11ZM10 6V11H11V6H10ZM10.5 7H13V6H10.5V7ZM10.5 9H12V8H10.5V9ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1Z"
                          fill="#D9D9D9"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p>Unggah Berkas dalam Bentuk PDF (Maksimal 5 MB)</p>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3 my-12 justify-end">
                <Link href="/jobs">
                  <button className="bg-logoGrey font-semibold text-mainColor px-12 py-2 rounded-sm">
                    Batal
                  </button>
                </Link>
                <div href={`/jobs/${id}/apply/sent`}>
                  <button
                    className="bg-mainColor font-semibold text-white px-5 py-2 rounded-sm"
                    onClick={handleFileUpload}
                  >
                    Kirim Lamaran
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
