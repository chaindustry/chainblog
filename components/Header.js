import React from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { SearchNormal1 } from "iconsax-react";
import AppButton from "./button/AppButton";
const Header = () => {
  const Search = () => (
    <div className="lg:flex lg:gap-4">
      <div
        className="rounded-[10px]  bg-white/10 p-[18px] h-[60px] flex items-center mb-4 lg:mb-0 lg:h-auto backdrop-blur-md 
       focus-within:border"
      >
        <input
          placeholder="Search Articles"
          className="bg-transparent outline-none w-full mr-2 placeholder:text-grey-20 tracking-[-0.02em] text-base"
        />
        <SearchNormal1 size={20} />
      </div>
      <div className="flex gap-4">
        <AppButton
          fullWidth
          variant="secondary"
          sxclass={
            "!rounded-[10px] !whitespace-nowrap lg:!h-[60px] lg:!px-[32px] lg:!text-base"
          }
          label="Subscribe"
        />
        <AppButton
          fullWidth
          variant="ghost"
          sxclass={
            "!rounded-[10px] !whitespace-nowrap lg:!h-[60px] lg:!px-[32px] backdrop-blur-md lg:!text-base !bg-secondary-50/10"
          }
          label="Start Earning"
        />
      </div>
    </div>
  );
  return (
    <header
      className={
        "flex z-[2] flex-col mb-[61px] lg:flex-row lg:justify-between lg:items-center lg:sticky lg:top-4 "
      }
    >
      <div className="flex items-center justify-between mb-[38.9px] lg:mb-0">
        <Link href="/">
          <a className={`${classes.logo} lg:w-[185px] lg:h-[39.33px]`}>
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
              priority
              quality={100}
              blurDataURL="/logo.png"
              placeholder="blur"
              alt="logo"
            />
          </a>
        </Link>
        {/* <div className="lg:hidden">Bars</div> */}
      </div>
      <Search />
    </header>
  );
};

export default Header;
