import React from "react";

const Title = ({ title, sub, className }) => {
  return (
    <div className={`${className}`}>
      <h2
        className={`m-unset leading-[125.84%] mb-[4px] font-sfSemibold tracking-[-0.045em] text-[24px] lg:text-[32px]`}
      >
        {title}
      </h2>
      <p className="text-grey-20 m-0 leading-[125.84%] text-[14px] tracking-[-0.045em] lg:text-[16px]">
        {sub}
      </p>
    </div>
  );
};

export default Title;
