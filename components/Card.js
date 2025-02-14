import React from "react";
import Image from "next/image";
import classes from "./Card.module.css";
import moment from "moment";
import Link from "next/link";
import { baseUrl } from "../baseUrl";
import { Clock } from "iconsax-react";
import { wordsToMinutes, wordsToSeconds } from "words-to-time-converter";
import replaceSpecChars from "../utils/replaceSpecChars";

export const ReadTime = ({ content }) => {
  const minRead = wordsToMinutes(content);
  const secRead = wordsToSeconds(content);
  return (
    <div className={classes.read_time}>
      <Clock size={20} />
      {minRead < 1
        ? `${Math.floor(secRead)} sec${secRead > 1.9 ? "s" : ""} read`
        : `${Math.floor(minRead)} min${minRead > 1.9 ? "s" : ""} read`}
    </div>
  );
};
const Card = ({
  title,
  img,
  createdAt,
  tags,
  id,
  content,
  xs,
  pdxs,
  imgxs,
  type,
}) => {
  // console.log(`${img}`);
  const uri = replaceSpecChars(title);
  return (
    <Link
      href={{
        pathname: `/posts/${uri}`,
        query: {
          pid: id,
        },
      }}
      // as={`posts/${title.toLowerCase().replace(/ /g, "-")}`}
    >
      <a data-type={type} className={`${classes.card} ${xs}`}>
        <div className={`${classes.img} ${imgxs}`}>
          {img ? (
            <Image
              className={classes.post_img}
              layout="fill"
              src={`${img}`}
              loading="lazy"
              placeholder="blur"
              blurDataURL={img}
              objectFit="contain"
              objectPosition="top"
              alt="Post Cover"
            />
          ) : (
            ""
          )}
        </div>
        <div className={`${classes.post_details} ${pdxs}`}>
          <div
            data-title
            className={
              "mb-2 track-3 text-[18px] font-sfMedium p_title md:text-[20px]"
            }
          >
            {title}
          </div>
          <div className={classes.pd_top}>
            <div
              className={
                "text-grey-30 tracking-[-0.025em] leading-[145.34%] text-[14px]"
              }
            >
              {moment(createdAt).format("Do MMMM, YYYY")}
            </div>
            <ReadTime content={content} />
          </div>
          {/* {tags && tags.length > 0 && (
            <div className={classes.tag_container}>
              {tags.map((t, id) => (
                <div key={id} className={classes.tag}>
                  <span style={{ marginRight: "9px" }}>{t}</span>
                  {tags.length > id + 1 && "|"}
                </div>
              ))}
            </div>
          )} */}
        </div>
      </a>
    </Link>
  );
};

export default Card;
