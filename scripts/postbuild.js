import { promises as fs } from "fs";
import path from "path";

async function main() {
  const root = process.cwd();
  const indexPath = path.join(root, "dist", "index.html");
  const fallbackPath = path.join(root, "dist", "404.html");

  const html = await fs.readFile(indexPath, "utf8");
  await fs.writeFile(fallbackPath, html, "utf8");
  console.log("Copied dist/index.html -> dist/404.html");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
