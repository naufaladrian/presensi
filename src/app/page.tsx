import { SignupForm } from "@/components/SignupForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="dark p-8 flex items-center justify-center min-h-screen flex-col">
        <SignupForm />
        <a
          href="/presensi"
          className="relative z-50 text-md font-medium cursor-pointer my-4 underline underline-offset-8"
        >
          Riwayat Presensi
        </a>
        <BackgroundBeams />
      </main>
    </>
  );
}
