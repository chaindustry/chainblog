import { ArrowRight, ArrowUp } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SiDiscord, SiTelegram, SiTwitter } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  let links = {
    company: [
      {
        label: "About Us",
        path: "https://www.chaindustry.io/about",
      },
      {
        label: "Our services",
        path: "https://www.chaindustry.io/about#services",
      },
      { label: "Team", path: "https://www.chaindustry.io/about#team" },
      // { label: "Blog", path: "https://www.blog.chaindustry.io" },
      { label: "FAQs", path: "https://www.chaindustry.io/#faqs" },
    ],
    misc: [
      { label: "Terms of use", path: "https://www.chaindustry.io/terms" },
      {
        label: "Privacy Policy",
        path: "https://www.chaindustry.io/privacy-policy",
      },
    ],
    socials: [
      { icon: <SiDiscord size={19} />, path: "https://discord.gg/v4bw6fHPeP" },
      {
        icon: <SiTwitter size={19} />,
        path: "https://twitter.com/ChainDustry",
      },
      {
        icon: <FaTelegramPlane size={21} />,
        path: "https://t.me/chaindustrynetwork",
      },
    ],
  };
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://chaindustry-waitlist.herokuapp.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.text())
      .then((data) => {
        setLoading(false);
        setEmail("");
        if (data.toLowerCase().includes("successfully")) {
          alert("Successfully submitted, thank you 🎉");
        } else {
          alert(`Error: ${data}`);
        }
        console.log(data);
      });
  };
  return (
    <footer
      className="app-footer md:py-[50px] lg:pt-[133px] lg:pb-[123px]"
      id="footer"
    >
      <div className=" lg:flex lg:justify-between container relative z-[1] mx-auto p-5 xl:max-w-[1185px] 2xl:max-w-[1285px] lg:p-8">
        <div className="mb-[60px] lg:mb-0">
          <div
            className="relative w-[118px] h-[25.09px] mb-[28.91px] 
        lg:w-[185px] lg:h-[39px]"
          >
            <Image
              src="/logo.png"
              layout="fill"
              quality={100}
              objectFit="contain"
              alt="logo"
            />
          </div>

          <form
            className="bg-white/10 rounded-[1em] p-[2em] max-w-[284px]"
            onSubmit={subscribe}
          >
            <h2 className="max-w-[190px] text-[18px] leading-[150%] tracking-[-0.05em] font-sfSemibold mb-[35px]">
              Subscribe now for updates
            </h2>
            <div className="flex items-center">
              <input
                disabled={loading}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder="Email"
                className="bg-transparent  px-2 outline-none w-full h-[40px] rounded-none flex-1 border-b-grey-50 border-b-[1px] mr-[11.5px]"
              />
              <button
                disabled={loading}
                className="bg-secondary-50 border-none disabled:bg-gray-500 h-[32px] w-[32px] rounded-full flex items-center justify-center shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
        {/* Links */}
        <div className="md:flex md:justify-between lg:gap-[100px]">
          <nav className="flex flex-col gap-[2em] mb-[69px] md:mb-0">
            {links.company.map((link, id) => {
              return (
                <Link key={id} href={link.path}>
                  <a className="font-sfLight text-[1em] flex leading-[150%] tracking=[-0.02em]">
                    {link.label}
                    {link.label === "Blog" && (
                      <ArrowRight style={{ transform: "rotate(-45deg)" }} />
                    )}
                  </a>
                </Link>
              );
            })}
          </nav>
          <nav className="flex flex-col gap-[2em] mb-[51px] md:mb-0">
            {links.misc.map((link, id) => {
              return (
                <Link key={id} href={link.path}>
                  <a className="font-sfLight text-[1em] leading-[150%] tracking=[-0.02em]">
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </nav>
          <div className="md:flex md:flex-col md:justify-between">
            <div className="md:flex md:justify-between">
              <nav className="flex gap-[8px] mb-[66px] md:mb-0">
                {links.socials.map((link, id) => {
                  return (
                    <Link key={id} href={link.path}>
                      <a
                        rel="noreferrer"
                        target={"_blank"}
                        className="w-[2em] shrink-0 h-[2em] bg-[#9d99a3] inline-flex items-center justify-center rounded-full text-primary-100"
                      >
                        {link.icon}
                      </a>
                    </Link>
                  );
                })}
              </nav>
              <BackToTop screen={"lg"} />
            </div>
            <CopyWright screen={"lg"} />
          </div>

          <div className="items-center flex justify-between md:gap-[10px] md:hidden pb-[92px] md:pb-0">
            <CopyWright screen={"sm"} />
            <BackToTop screen={"sm"} />
          </div>
        </div>
      </div>
    </footer>
  );
};
const CopyWright = ({ screen }) => {
  let size = {
    sm: "md:hidden",
    lg: "hidden md:inline-flex !mb-0",
  };
  return (
    <span
      className={`${size[screen]} font-sfLight text-[14px] leading-[150%] tracking-[-2%]`}
    >
      Copyright &copy; {new Date().getFullYear()} Chaindustry
    </span>
  );
};
const BackToTop = ({ screen }) => {
  const scrolUp = () => {
    typeof window !== "undefined" &&
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  };
  let size = {
    sm: "md:hidden",
    lg: "hidden md:flex",
  };
  return (
    <div
      onClick={scrolUp}
      className={`${size[screen]} cursor-pointer bg-secondary-50 h-[32px] rounded-full shrink-0 flex items-center justify-center w-[32px]`}
    >
      <ArrowUp size={16} />
    </div>
  );
};
export default Footer;
