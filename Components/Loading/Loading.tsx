import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <main className="flex items-center flex-col">
      <h1 className="text-2xl text-blue-500 font-bold">Loading...</h1>
      <Image
        src="/spinner.svg"
        alt="spinner"
        width={50}
        height={50}
        className="object-contain"
      />
    </main>
  );
};

export default Loading;
