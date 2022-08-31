import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./mention.module.css";
const Mention = ({
  openMention,
  setOpenMention,
  commenters,
  setComment,
  comment,
  cursorPosition,
  mentioned,
  setMentioned,
}) => {
  // console.log(commenters, "Filter");
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const unique = getUniqueListBy(commenters, "uid");

  // console.log(currentPosition, "CurrenPos");
  // const appendedSelected = comment?.splice(currentPosition, "Joined");
  // console.log(output, "Output");
  // const selectionFromEnd =
  const allComment = comment.slice(0, cursorPosition);
  console.log(allComment, "all");
  const currentPosition = allComment.lastIndexOf("@") + 1;
  const appendToComment = (name) => {
    const output = [
      comment.slice(0, currentPosition),
      name,
      comment.slice(cursorPosition),
    ].join("");
    return setComment(output);
  };
  console.log(mentioned);
  return (
    <AnimatePresence>
      {openMention && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, transformOrigin: "left" }}
          animate={{ opacity: 1, scale: 1, transformOrigin: "left" }}
          exit={{ opacity: 0, scale: 0.5, transformOrigin: "left" }}
          className={classes.container}
        >
          {unique.map((c, id) => {
            const image = c?.dp || "/avatar.png";
            const name = `${c?.name?.firstname || ""} ${
              c?.name?.lastname || ""
            }`;
            return (
              <div
                key={id}
                className={classes.option}
                onClick={() => {
                  console.log(c, "CurrentlySelected");
                  appendToComment(name);
                  setOpenMention(false);
                  setMentioned([...mentioned, { ...c, pos: cursorPosition }]);
                }}
              >
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
                {name}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Mention;
