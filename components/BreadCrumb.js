import Link from "next/link";
import React from "react";

const BreadCrumb = ({ crumbs = [] }) => {
  return (
    <div className="mb-[38px]">
      <div>
        {crumbs.map((crumb, id) => {
          const isLast = id === crumbs.length - 1;
          return (
            <Link href={crumb?.path} key={id}>
              <a
                style={{ color: "#ffffff" }}
                className={`inline-flex  leading-[145.34%] tracking-[-0.055em] font-medium items-center gap-[10px] ${
                  isLast && "ml-[10px] !text-grey-30"
                }`}
              >
                <label className="pointer-events-none">{crumb?.label}</label>
                {!isLast && <span>/</span>}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumb;
