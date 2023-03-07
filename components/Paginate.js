import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Paginate = ({ pageCount, perPage, page }) => {
  const pageNumbers = pageCount;
  const router = useRouter();
  const breakLabel = "...";
  const breakOffset = 4;
  const siblingsCount = 2;
  const isBreakableToRight = page <= breakOffset;

  // console.log(isBreakableToRight, "Is break");

  const Navigator = ({ children, active, ...props }) => {
    return (
      <div
        className={`cursor-pointer h-[40px] select-none  cursor-pointer transition hover:bg-secondary-40
         hover:text-white mr-[2px] last:mr-0 w-[40px] flex justify-center items-center text-[13px]  ${
           active && "text-secondary-50  font-sfBold border border-secondary-50"
         }`}
        {...props}
      >
        {children}
      </div>
    );
  };
  const arrayedPages = [...Array(pageNumbers)].map((_, id) => id + 1);

  const arrayToMap = () => {
    const range = (start, end) => {
      let length = end - start + 1;
      /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
      return Array.from({ length }, (_, idx) => idx + start);
    };
    const leftSiblingIndex = Math.max(page - siblingsCount, 1);
    const rightSiblingIndex = Math.min(page + siblingsCount, pageNumbers);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageNumbers - 2;
    const totalPageNumbers = siblingsCount + 5;

    if (totalPageNumbers >= pageNumbers) {
      return range(1, pageNumbers);
    }
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 1 + 2 * siblingsCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, breakLabel, pageNumbers];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 1 + 2 * siblingsCount;
      let rightRange = range(pageNumbers - rightItemCount + 1, pageNumbers);
      return [1, breakLabel, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, breakLabel, ...middleRange, breakLabel, pageNumbers];
    }
    return arrayedPages;
  };
  // console.log(arrayedPages, arrayToMap());
  if (pageNumbers < 2) return "";
  return (
    <div>
      <div className="flex justify-center">
        {page !== 1 && (
          <Navigator
            onClick={() => {
              router.replace({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: page - 1,
                },
              });
            }}
          >
            <MdKeyboardArrowLeft className="!text-[25px] !text-color-text opacity-70" />
          </Navigator>
        )}
        {arrayToMap().map((num, id) => {
          const active = page === num;
          // if (breakOffset === pageNumbers / 2) return breakLabel;
          // console.log(typeof num);
          return (
            <Navigator
              key={id}
              active={active}
              onClick={() => {
                if (typeof num !== "number") return;
                router.replace({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: num,
                  },
                });
              }}
            >
              {num}
            </Navigator>
          );
        })}

        {page !== pageNumbers && (
          <Navigator
            onClick={() => {
              router.replace({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: page + 1,
                },
              });
            }}
          >
            <MdKeyboardArrowRight className="!text-[25px] !text-color-text opacity-70" />
          </Navigator>
        )}
      </div>
    </div>
  );
};

export default Paginate;
