import React from "react";
import Card from "./Card";
import Title from "./Title";

const Recommended = (post) => {
  return (
    <section className="mb-[95px] md:flex">
      <Title
        title={"Recommended"}
        sub="Best Pick for you"
        className="mb-16 md:mr-[68px]"
      />
      <Card
        type={"recommended"}
        {...post}
        xs={"md:!flex-row md:flex-1 md:gap-[40px]"}
        imgxs={"md:!mb-0"}
        pdxs={
          "!shrink-0 md:w-2/3 md:!flex-[unset] md:flex md:flex-col md:!justify-between"
        }
      />
    </section>
  );
};

export default Recommended;
