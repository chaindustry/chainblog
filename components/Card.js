import React from "react";
import Image from "next/image";
import classes from "./Card.module.css";
import moment from "moment";
import Link from "next/link";
import { baseUrl } from "../baseUrl";
import { wordsToMinutes, wordsToSeconds } from "words-to-time-converter";
const Card = ({ title, img, createdAt, tags, id, content }) => {
  const minRead = wordsToMinutes(content);
  const secRead = wordsToSeconds(content);
  console.log(`${img}`);
  return (
    <Link href={`/posts/${id}`}>
      <a className={classes.card}>
        <div className={classes.img}>
          {img ? (
            <Image
              className={classes.post_img}
              layout="fill"
              src={`${img}`}
              priority
              objectFit="cover"
              objectPosition="top"
            />
          ) : (
            ""
          )}
        </div>
        <div className={classes.post_details}>
          <div className={classes.pd_top}>
            <div className={classes.date}>
              {moment(createdAt).format("MMM DD, YYYY")}
            </div>
            <div className={classes.read_time}>
              <div className={classes.bull} />{" "}
              {minRead < 1
                ? `${Math.floor(secRead)} sec${secRead > 1.9 ? "s" : ""} read`
                : `${Math.floor(minRead)} min${minRead > 1.9 ? "s" : ""} read`}
            </div>
          </div>
          {tags && tags.length > 0 && (
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
      </a>
    </Link>
  );
};

export default Card;
