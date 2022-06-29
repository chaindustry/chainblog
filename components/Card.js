import React from "react";
import Image from "next/image";
import classes from "./Card.module.css";
import moment from "moment";
const Card = ({ title, img, date, tags }) => {
  return (
    <section className={classes.card}>
      <div className={classes.img}>
        <Image
          className={classes.post_img}
          layout="fill"
          src={`/${img}`}
          priority
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className={classes.post_details}>
        <div className={classes.pd_top}>
          <div className={classes.date}>
            {moment(date).format("MMM DD, YYYY")}
          </div>
        </div>
        {tags.length > 0 && (
          <div className={classes.tag_container}>
            {tags.map((t, id) => (
              <div key={id} className={classes.tag}>
                <span style={{ marginRight: "9px" }}>{t}</span>
                {tags.length > id + 1 && "|"}
              </div>
            ))}
          </div>
        )}
        <div className={classes.post_title}>{title}</div>
      </div>
    </section>
  );
};

export default Card;
