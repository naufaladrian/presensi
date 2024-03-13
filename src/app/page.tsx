import { SignupForm } from "@/components/SignupForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="dark p-8 flex items-center justify-center min-h-screen">
        <SignupForm />
        <BackgroundBeams />
      </main>
    </>
  );
}
