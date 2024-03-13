"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { dataPeserta } from "@/data/peserta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { cn } from "@/utils/cn";

export function SignupForm() {
  const style = `
  flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
  file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
  focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
   disabled:cursor-not-allowed disabled:opacity-50
   dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
   group-hover/input:shadow-none transition duration-400
   `;
  const dataPst = dataPeserta;
  const data = Object.keys(dataPeserta);

  const [kelas, setKelas] = useState<String>(data[0]);
  const [nama, setNama] = useState<String>(dataPst["Web Programming"][0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/absensi", {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({
        nama,
        kelas,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          toast.success("Berhasil Absen", {
            position: "top-right",
          });
        });
      } else {
        res.json().then((data) => {
          toast.error(data.message, {
            position: "top-right",
          });
        });
      }
    });
  };

  return (
    <BackgroundGradient className="max-w-md w-full mx-auto rounded-[22px] md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Selamat datang di Doscom University
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Silahkan isi presensi sebelum memasuki kelas
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="kelas">Kelas</Label>
          <select
            name="kelas"
            id="kelas"
            className={style}
            onChange={(e) => setKelas(e.target.value)}
          >
            {data.map((e, idx) => (
              <option value={e} key={idx}>
                {e}
              </option>
            ))}
          </select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="nama">Nama Peserta</Label>
          <select
            name="nama"
            id="nama"
            className={style}
            onChange={(e) => setNama(e.target.value)}
          >
            {dataPst[String(kelas)]?.map((e: string, idx: number) => (
              <option value={e} key={idx}>
                {e}
              </option>
            ))}
          </select>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </BackgroundGradient>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
