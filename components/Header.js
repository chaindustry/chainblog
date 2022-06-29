import React from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image
          src="/logo.svg"
          layout="fill"
          objectFit="contain"
          priority
          quality={100}
          blurDataURL="/logo.svg"
          placeholder="blur"
        />
      </div>
      <div className={classes.links}>
        <Link href="/">Home</Link>
        <Link href="/wiki">Wiki</Link>
      </div>
    </header>
  );
};

export default Header;
