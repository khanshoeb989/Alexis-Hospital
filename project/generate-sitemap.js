import fs from "fs";
import path from "path";

const BASE_URL = "https://alexishospitalbhiwandi.com";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/cosmetology",
  "/services/medical",
  "/doctors/dr-ganesh-ahire",
  "/doctors/dr-ahmed-khan",
  "/doctors/dr-saman-ahmed-khan",
  "/contact",
  "/testimonials"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

const outputPath = path.join("public", "sitemap.xml");
fs.writeFileSync(outputPath, sitemap.trim());

console.log("✅ sitemap.xml generated successfully");
