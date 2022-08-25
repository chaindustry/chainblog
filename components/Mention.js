import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./mention.module.css";
const Mention = ({ openMention, setOpenMention, commenters }) => {
  // console.log(commenters, "Filter");
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const unique = getUniqueListBy(commenters, "uid");

  return (
    <AnimatePresence>
      {openMention && (
        <div className={classes.container}>
          {unique.map((c, id) => {
            const image = c?.dp || "/avatar.png";
            return (
              <div key={id} className={classes.option}>
                <div className={classes.avatar_img}>
                  <Image
                    src={image}
                    objectFit="cover"
                    layout="fill"
                    quality={70}
                    priority
                    alt="Dp"
                    placeholder="blur"
                    blurDataURL="/avatar.png"
                  />
                </div>
                {`${c.name?.firstname || ""} ${c.name?.lastname || ""}`}
              </div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Mention;
