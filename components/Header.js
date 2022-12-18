import React, { useEffect, useState, useTransition } from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { CloudRemove, SearchNormal1 } from "iconsax-react";
import AppButton from "./button/AppButton";
import { AnimatePresence, motion } from "framer-motion";
import { ClipLoader, SyncLoader } from "react-spinners";
import { Router, useRouter } from "next/router";
import replaceSpecChars from "../utils/replaceSpecChars";
const Search = () => {
  const [sq, setSq] = useState(""); //Search query
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  const [isPending, startTransition] = useTransition();
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSearch = (e) => {
    setError("");
    setSq(e.target.value);
    const value = e.target.value.trim();
    if (value.startsWith(" ")) return console.log("No preceeding whitespaces");
    if (!value) return setSearchResult([]);
    console.log("Initializing search", new Date().getTime());
    setLoading(true);
    fetch(`/api/search-posts?q=${value.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setSearchResult(data.payload);
        } else {
          setError(data.error);
          setSearchResult([]);
        }
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const closePanelOnRouteChange = () => {
      setShowSearchPanel(false);
    };
    Router.events.on("routeChangeStart", closePanelOnRouteChange);
    return () => Router.events.off("routeChangeStart", closePanelOnRouteChange);
  }, []);
  const SearchResult = () => {
    return (
      <div className="p-4 flex-1 relative h-full">
        <div className="font-sfLight tracking-[-0.02em] text-sm">
          Your search result:
        </div>
        {error && (
          <div className="absolute text-center inset-0 flex flex-col items-center justify-center text-error-50 tracking-[-0.02em] text-sm font-sfMedium">
            <div>
              <CloudRemove size={70} />
            </div>
            <div className="max-w-[190px]">{error}</div>
          </div>
        )}

        <div>
          {searchResult.map((result, id) => {
            let post = result.post;
            let title = post?.title;
            let desc = post?.desc;
            let query_type = {
              desc_includes_query: "Keywords from blog description",
              title_includes_query: "Keywords on title",
              title_exact_query: "Title matches",
            };
            let match_class = `class='font-sfSemibold text-primary-40'`;
            let lower_case_class = `class='font-sfLight text-[14px]'`;
            const q = sq.trim();
            String.prototype.replaceArray = function (find, replace) {
              var replaceString = this;
              var regex;
              for (var i = 0; i < find.length; i++) {
                regex = new RegExp(find[i], "g");
                replaceString = replaceString.replace(regex, replace[i]);
              }
              return replaceString;
            };
            let global_reg = (str) => {
              return new RegExp(str, "gi");
            };
            let displayHandler = () => {
              switch (result.matcher) {
                case "desc_includes_query":
                  return `
                  <em ${lower_case_class}>...${title}</em>
                  <br/>
                  <div class='text-sm clamp-3'>${desc.replace(
                    global_reg(q),
                    `<span ${match_class}>${q}</span>`
                  )}</div>
                      `;
                case "title_exact_query":
                  return `<h2>${title.replace(
                    global_reg(q),
                    `<span ${match_class}>${q}</span>`
                  )}</h2>
                  <em ${lower_case_class}><span class='clamp-3'>...${desc}</span></em>
                  `;
                case "title_includes_query":
                  return `<h2>${title.replace(
                    global_reg(q),
                    `<span ${match_class}>${q}</span>`
                  )}</h2>
                  <em ${lower_case_class}><span class='clamp-3'>...${desc}</span></em>
                  `;
              }
            };
            // console.log(displayHandler());
            return (
              <Link
                href={{
                  pathname: `/posts/${replaceSpecChars(post?.title)}`,
                  query: { pid: post._id },
                }}
                key={id}
              >
                <a className="cursor-pointer">
                  <div>
                    {/* {query_type[result?.matcher]} */}
                    <div className="border-b border-b-primary-30 py-4 ">
                      <div
                        className=""
                        dangerouslySetInnerHTML={{ __html: displayHandler() }}
                      />
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <ClipLoader
              aria-label="loading spinner"
              // size={5}
              color="var(--secondary-50)"
              loading={loading}
            />
          </div>
        )}
      </div>
    );
  };
  let router = useRouter();
  return (
    <div className="relative">
      <div className="lg:flex lg:gap-4 relative z-[1]">
        <div className="relative sticky top-0 z-[2]">
          <div
            className={`rounded-[10px] bg-white/10  h-[60px] flex items-center mb-4 lg:mb-0 lg:h-auto backdrop-blur-md 
  ${classes.input_container}`}
          >
            <input
              onFocus={(e) => {
                setShowSearchPanel(true);
              }}
              // onBlur={() => {
              //   setShowSearchPanel(false);
              // }}
              onChange={debounce(handleSearch, 500)}
              placeholder="Search Articles"
              className="p-[18px] bg-transparent outline-none w-full mr-2 placeholder:text-grey-20 tracking-[-0.02em] text-base"
            />
            <SearchNormal1 size={20} className="mr-[18px]" />
          </div>
          <AnimatePresence>
            {showSearchPanel && (
              <motion.div className="absolute flex flex-col shadow-lg -mt-1 lg:hidden rounded-lg z-[2] min-h-[400px] max-h-screen overflow-auto bg-primary-90 w-full">
                <SearchResult />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <Link
            href={{
              pathname: router.pathname,
              hash: "footer",
              query: router.query,
            }}
          >
            <a className="w-full">
              <AppButton
                fullWidth
                variant="secondary"
                sxclass={
                  "!rounded-[10px] !whitespace-nowrap lg:!h-[60px] lg:!px-[32px] lg:!text-base"
                }
                label="Subscribe"
              />
            </a>
          </Link>

          <Link href={`#`}>
            <a className="w-full">
              <AppButton
                fullWidth
                variant="ghost"
                sxclass={
                  "!rounded-[10px] !whitespace-nowrap lg:!h-[60px] lg:!px-[32px] backdrop-blur-md lg:!text-base !bg-secondary-50/10"
                }
                label="Start Earning"
              />
            </a>
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {showSearchPanel && (
          <motion.div className="hidden  flex-col shadow-lg rounded-lg z-[2] lg:flex bg-primary-90 mt-2 w-full min-h-[290px] max-h-[500px] overflow-auto absolute">
            <SearchResult />
          </motion.div>
        )}
      </AnimatePresence>
      {showSearchPanel && (
        <div
          onClick={() => setShowSearchPanel(false)}
          className="z-0 fixed inset-0 bg-white/09"
        />
      )}
    </div>
  );
};
const Header = () => {
  return (
    <header
      className={
        "flex z-[2] flex-col mb-[61px] lg:flex-row lg:justify-between lg:items-center lg:sticky lg:top-4 "
      }
    >
      <div className="flex items-center justify-between mb-[38.9px] lg:mb-0">
        <Link href="/">
          <a className={`${classes.logo} lg:w-[185px] lg:h-[39.33px]`}>
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
              priority
              quality={100}
              blurDataURL="/logo.png"
              placeholder="blur"
              alt="logo"
            />
          </a>
        </Link>
        {/* <div className="lg:hidden">Bars</div> */}
      </div>
      <Search />
    </header>
  );
};

export default Header;
