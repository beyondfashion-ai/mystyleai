import Header from "@/components/common/Header";
import Image from "next/image";

export default function MyPage() {
  return (
    <div>
      <div className="px-3 flex justify-between">
        <Header title="마이페이지" />
        <div className="mt-2.5">
          <Image
            src="/images/common/setting.svg"
            alt="edit"
            width={26}
            height={26}
          />
        </div>
      </div>
    </div>
  );
}
