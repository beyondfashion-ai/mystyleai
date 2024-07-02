"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {

  const router = useRouter();
  const handleBack = () => {
    router.back();
  }


  return (
    <div className="flex flex-row items-center">
      <div 
        className="p-3.5 cursor-pointer"
        onClick={handleBack}
      >
        <Image src="/images/svgs/leftArrow.svg" alt="mainLogo" width={18} height={18} />
      </div>
      <p className="text-bold ms-4" style={{ fontSize: 16 }}>{title}</p>
    </div>
  );
}