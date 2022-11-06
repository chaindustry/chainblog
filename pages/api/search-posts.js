import { baseUrl } from "../../baseUrl";

export default function handler(req, res) {
  const { q } = req.query;
  try {
    let url = `${baseUrl}/api/posts?populate=*`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => res.status(200).json({ success: true, payload: data }));
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: err?.code || err?.message || err });
  }
}
