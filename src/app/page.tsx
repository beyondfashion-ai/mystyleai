"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/home');
  };

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <div className="flex relative flex-col items-center justify-center" style={{ height: 'calc(var(--vh, 1vh) * 100)', backgroundColor: 'red' }}>
        <Image
          src="/images/mainLogo.png"
          alt="mainLogo"
          width={144}
          height={39}
        />


      <div
        className="absolute w-full bottom-0 px-5"
      >
        <button
          onClick={navigateToHome}
          className="text-bold w-full py-3"
          style={{ backgroundColor: 'var(--main-color)', borderRadius: 24 }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
