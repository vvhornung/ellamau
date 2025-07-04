import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex  gap-1 text-white tracking-wider font-semibold rounded-lg overflow-hidden items-center ">
          <Image
            src={session?.user?.image}
            alt="Next.js logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
