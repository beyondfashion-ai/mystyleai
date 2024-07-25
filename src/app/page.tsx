"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/home');
  };

  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      {/* <div className="flex-grow flex flex-col justify-center items-center"> */}
        <Image
          src="/images/mainLogo.png"
          alt="mainLogo"
          width={144}
          height={39}
        />
      {/* </div> */}

      <div
        className="absolute w-full bottom-1 px-5 bg-black"
      >
        <button
          onClick={navigateToHome}
          className="mb-8 text-bold w-full py-3"
          style={{ backgroundColor: 'var(--main-color)', borderRadius: 24 }}
        >
          시작하기
        </button>
      </div>

      {/* <div
        className="w-full px-5"
        
      >
        <button
          onClick={navigateToHome}
          className="mb-8 text-bold w-full py-3"
          style={{ backgroundColor: 'var(--main-color)', borderRadius: 24 }}
        >
          시작하기
        </button>
      </div> */}

    </div>
  );
}
