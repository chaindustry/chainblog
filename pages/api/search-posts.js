import { baseUrl } from "../../baseUrl";

export default function handler(req, res) {
  const { q } = req.query;
  const arrQuery = q.split(" ");
  let arrStr = arrQuery.filter((a) => a.length > 3);

  try {
    let url = `${baseUrl}/api/posts?populate=*`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let matched = data.data.map((d) => {
          let attr = d?.attributes;
          let title = attr?.title;
          let desc = attr?.description;
          let split_title = title
            .toLowerCase()
            .split(" ")
            .filter((a) => a);
          let split_desc = desc
            .toLowerCase()
            .split(" ")
            .filter((a) => a);
          let desc_matcher = [];
          console.log(desc_matcher);

          if (title.toLowerCase().includes(q)) {
            return {
              post: {
                _id: d?.id,
                title,
                desc,
              },
              matcher: "title_exact_query",
            };
          }
          if (split_title.some((t) => arrStr.some((s) => t.includes(s)))) {
            return {
              post: {
                _id: d?.id,
                title,
                desc,
              },
              matcher: "title_includes_query",
            };
          }
          if (split_desc.some((a) => arrStr.some((b) => a.includes(b)))) {
            return {
              post: {
                _id: d?.id,
                title,
                desc,
              },
              matcher: "desc_includes_query",
            };
          }
        });
        if (matched.filter((a) => a).length > 0) {
          res
            .status(200)
            .json({ success: true, payload: matched.filter((a) => a) });
        } else {
          return res.status(404).json({
            success: false,
            error: "Query does't match any available article",
          });
        }
      });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: err?.code || err?.message || err });
  }
}
