import React from "react";
import { motion } from "framer-motion";
import AppButton from "./button/AppButton";
import Link from "next/link";
const Join = () => {
  return (
    <motion.div
      //   layout="position"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: "some", fallback: true }}
      className="text-center  max-w-[711px] mx-auto my-[128px]

  "
    >
      <h1
        className="text-[32px] leading-[125.84%] tracking-[-0.06em] font-sfBold mb-[32px]
      lg:text-[48px]
      "
      >
        Join our Chaindustry community
      </h1>
      <p
        className="text-[16px] leading-[164%] tracking-[-0.03em] text-primary-0 mx-[15px] font-sfMedium mb-[32px]
      lg:text-[20px] lg:mx-[62px]
      "
      >
        Join our active community and enjoy your experience with other users
        participating in DoToEarn tasks
      </p>
      <Link href="https://linktr.ee/chaindustry">
        <a rel="noreferrer" target={"_blank"}>
          <AppButton size="lg" variant="secondary" label="Join our community" />
        </a>
      </Link>
    </motion.div>
  );
};

export default Join;
