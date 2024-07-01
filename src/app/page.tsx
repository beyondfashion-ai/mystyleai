"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const navigateToHome = () => {
    router.push('/home')
  }

  return (
    <div>
      <button
        onClick={navigateToHome}
      >
        12345
      </button>
    </div>
  );
}
