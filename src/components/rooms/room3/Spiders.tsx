"use client";

import Image from "next/image";
import DoorButton from "@/components/shared/DoorTransition";
import { useState } from "react";
import SpiderAnimation from "@/components/effects/SpiderAnimation";
import DoorTransition from "@/components/shared/DoorTransition";

export default function Spiders() {
  const spiderwebs = [
    {
      id: 1,
      src: "/assets/images/web1.png",
      className: "top-0 left-0 h-[55vh] w-auto opacity-70",
    },
    {
      id: 2,
      src: "/assets/images/web2.png",
      className: "top-0 right-0 h-[55vh] w-auto opacity-70",
    },
    {
      id: 3,
      src: "/assets/images/web3.png",
      className: "top-0 left-0 h-[55vh] w-auto opacity-70 rotate-[345deg]",
    },
  ];

  const [visibleWebs, setVisibleWebs] = useState<number[]>([1, 2, 3]);

  const removeWeb = (id: number) => {
    setVisibleWebs((prev) => prev.filter((w) => w !== id));
  };

  return (
    <div className="absolute inset-0 bg-[url('/assets/images/eerie-hospital.png')] bg-cover bg-bottom">
      {/* <DoorButton buttonText="Do you dare?" /> */}
      <DoorTransition
        buttonText="Do you dare?"
        doorImage=""
        animated={false}
        positionClass="bottom-1/3 right-15"
      />
      {spiderwebs.map((web) =>
        visibleWebs.includes(web.id) ? (
          <div key={web.id} className={`absolute ${web.className}`}>
            <Image
              src={web.src}
              alt="web"
              width={500}
              height={500}
              className="pointer-events-none h-full w-auto"
            />

            <button
              aria-label="Remove spiderweb"
              onClick={() => removeWeb(web.id)}
              className="absolute top-[30%] left-[30%] h-72 w-72 cursor-pointer"
            />
          </div>
        ) : null,
      )}
      <SpiderAnimation />
    </div>
  );
}
