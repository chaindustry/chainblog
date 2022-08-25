import Image from "next/image";
import React, { memo, useState } from "react";
import classes from "./comments.module.css";
const Comments = ({ comments }) => {
  const Avatar = ({ user }) => {
    const image = user?.dp || "/avatar.png";
    const name = user?.name;
    return (
      <div className={classes.avatar}>
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
        {name?.firstname || ""} {name?.lastname || ""}
      </div>
    );
  };
  return (
    <div className={classes.container}>
      {comments.map((c, id) => {
        return (
          <div key={id} className={classes.comment_main}>
            <Avatar user={c.user} />
            <p className={classes.comment}>{c?.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Comments);
