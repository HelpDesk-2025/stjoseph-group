import path from "path";
import { fileURLToPath } from "url";

// Resolve this file's own directory so Tailwind loads THIS project's config
// regardless of the process working directory (the dev server may run from
// the repo root rather than this subfolder).
const dir = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    tailwindcss: { config: path.join(dir, "tailwind.config.js") },
    autoprefixer: {},
  },
};

export default config;
