import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const Available = () => {
  const Store = ({ store }) => {
    let img = `/${store}.png`;
    let cx = {
      apple: `h-[20.1px] w-[17.23px] 
      lg:w-[24px] lg:h-[28px]
`,
      google: `w-[18.66px] h-[20.1px]`,
    };
    return (
      <div
        className="border-[0.717884px]  rounded-[17.2292px] border-[#ffffff20] px-[23px] py-[11px] inline-flex items-center cursor-pointer
      lg:py-[16px] lg:px-[32px] lg:border-[1px] lg:rounded-[24px]
      "
      >
        <div
          className={`relative ${cx[store]} mr-[11.49px]
        
        lg:mr-[16px]
        `}
        >
          <Image
            src={img}
            quality={100}
            layout="fill"
            alt="gg"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col">
          <span
            className="text-grey-20 leading-[12px] text-[10.0504px] font-sfLight tracking-[-0.02em] inline-block mb-[2.36px]
          lg:text-[14px] lg:leading-[17px] lg:mb-[3px]
          "
          >
            Available on
          </span>

          <span
            className="text-[11.4861px] leading-[150%] tracking-[-0.02em] font-sfLight
          lg:text-[1em]
          "
          >{`${store === "apple" ? "App Store" : "Google Play"}`}</span>
        </div>
      </div>
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: "some", fallback: true }}
      className="bg-[#170337] px-[20px] pt-[40px] rounded-[20px] mb-[200px] items-center flex flex-col  max-w-[1184px] mx-auto
    md:flex md:justify-between md:mb-[148px]
    lg:pt-[55px] lg:px-[60px] lg:rounded-[48px]
    xl:pt-[65px] xl:px-[121px] 
    "
    >
      <div
        className="mb-[44.67px]
      md:flex-1
      lg:mb-[124px]     
      flex flex-col items-center justify-center
      "
      >
        <h3
          className="font-sfBold mb-[24px] leading-[125.84%] text-[32px] tracking-[-0.06em] max-w-[225px]
        lg:mt-[45px] lg:text-[48px] lg:text-center lg:leading-[125.84%] lg:tracking-[-0.06em] lg:max-w-[404px] lg:mb-[55px]
        "
        >
          Available on mobile devices
        </h3>
        <div
          className="flex gap-[17.23px]
        lg:gap-[24px]
        "
        >
          <Store store="apple" />
          <Store store={"google"} />
        </div>
      </div>
      <div
        className=" pl-[29px] h-[243px] w-auto relative overflow-hidden 
        md:flex-1 md:flex md:flex-col md:items-end
      lg:h-[420px]
      "
      >
        <div
          className="w-[237.04px] h-[436px]
        lg:h-[1000px] lg:w-[500px] transform translate-y-1/2 -mt-[200px] lg:-mt-[500px]"
        >
          <Image
            src="/mainapp.png"
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL="/mainapp.png"
            alt="main app"
            quality={100}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Available;
