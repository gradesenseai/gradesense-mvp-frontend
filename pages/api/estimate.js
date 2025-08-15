export const config = { api: { bodyParser: false } };

function formDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const busboy = require("busboy");
    const bb = busboy({ headers: req.headers });
    const fields = {};
    const files = {};
    bb.on("file", (name, file, info) => {
      const chunks = [];
      file.on("data", (d) => chunks.push(d));
      file.on("end", () => {
        files[name] = { buffer: Buffer.concat(chunks), filename: info.filename, mime: info.mimeType };
      });
    });
    bb.on("field", (name, val) => { fields[name] = val; });
    bb.on("finish", () => resolve({ fields, files }));
    bb.on("error", reject);
    req.pipe(bb);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
  if (!backendUrl) return res.status(500).json({ error: "API base URL not configured" });

  const { files } = await formDataFromRequest(req);
  if (!files.front || !files.back) {
    return res.status(400).json({ error: "Both front and back images are required." });
  }

  const fd = new (require("form-data"))();
  fd.append("front", files.front.buffer, { filename: files.front.filename || "front.jpg", contentType: files.front.mime || "image/jpeg" });
  fd.append("back", files.back.buffer, { filename: files.back.filename || "back.jpg", contentType: files.back.mime || "image/jpeg" });

  try {
    const r = await fetch(`${backendUrl.replace(/\/$/, "")}/estimate`, { method: "POST", body: fd });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Upstream error", detail: e?.message || String(e) });
  }
}