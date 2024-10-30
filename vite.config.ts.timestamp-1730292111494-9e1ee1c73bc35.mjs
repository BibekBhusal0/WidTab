// vite.config.ts
import react from "file:///D:/github/react%20projects/extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///D:/github/react%20projects/extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///D:/github/react%20projects/extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Bookmark Manager",
  description: "Manage your bookmarks .",
  options_page: "src/pages/options/index.html",
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: ["bookmarks", "favicon", "storage"]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  }
};

// package.json
var package_default = {
  name: "bookmark-manager",
  version: "0.0.0",
  description: "Manage Your Bookmarks Easily.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/bibekbhusal0/bookmark-manager"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@ataverascrespo/react18-ts-textfit": "^1.0.0",
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@material/material-color-utilities": "^0.3.0",
    "@mui/material": "^6.1.1",
    "@mui/x-charts": "^7.21.0",
    "@mui/x-date-pickers": "^7.18.0",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@reduxjs/toolkit": "^2.2.7",
    "@types/react-window": "^1.8.8",
    clsx: "^2.1.1",
    dayjs: "^1.11.13",
    "framer-motion": "~11.1.1",
    "moment-timezone": "^0.5.46",
    react: "18.3.1",
    "react-clock": "^5.0.0",
    "react-dom": "18.3.1",
    "react-grid-layout": "^1.4.4",
    "react-redux": "^9.1.2",
    "react-resizable": "^3.0.5",
    "redux-persist": "^6.0.0",
    "redux-persist-webextension-storage": "^1.0.2",
    "tailwind-merge": "^2.5.3",
    "react-window": "^1.8.10",
    "tailwindcss-animate": "^1.0.7"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@iconify/react": "^5.0.2",
    "@types/chrome": "^0.0.268",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/react-grid-layout": "^1.3.5",
    "@types/react-resizable": "^3.0.8",
    "@types/redux-persist-webextension-storage": "^1.0.3",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@xpd/tailwind-3dtransforms": "^1.0.3",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    "tailwind-scrollbar": "^3.1.0",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.2",
    typescript: "^5.4.5",
    vite: "^5.2.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\github\\react projects\\extension";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(
        resolve(outDir2, "dev-icon-32.png"),
        () => console.log(`Deleted dev-icon-32.png frm prod build`)
      );
      fs.rm(
        resolve(outDir2, "dev-icon-128.png"),
        () => console.log(`Deleted dev-icon-128.png frm prod build`)
      );
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": root
      //   "@assets": assetsDir,
      //   "@reducer": resolve(root, "reducer"),
      //   "@lib": resolve(root, "lib"),
      //   "@theme": resolve(root, "theme"),
      //   "@components": resolve(root, "components"),
      //   "@bookmarks": resolve(root, "bookmarks"),
      //   "@pages": pagesDir,
      //   "@newtab": resolve(pagesDir, "newtab"),
      //   "@popup": resolve(pagesDir, "popup"),
      //   "@options": resolve(pagesDir, "options"),
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxccmVhY3QgcHJvamVjdHNcXFxcZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxccmVhY3QgcHJvamVjdHNcXFxcZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvcmVhY3QlMjBwcm9qZWN0cy9leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IGNyeCwgTWFuaWZlc3RWM0V4cG9ydCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcclxuXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCI7XHJcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5kZXYuanNvblwiO1xyXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcclxuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XHJcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIik7XHJcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XHJcblxyXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcclxuICAuLi5tYW5pZmVzdCxcclxuICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6ICh7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSksXHJcbiAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXHJcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbn07XHJcblxyXG4vLyBwbHVnaW4gdG8gcmVtb3ZlIGRldiBpY29ucyBmcm9tIHByb2QgYnVpbGRcclxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyhhcHBseTogYm9vbGVhbikge1xyXG4gIGlmIChhcHBseSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcInN0cmlwLWRldi1pY29uc1wiLFxyXG4gICAgcmVzb2x2ZUlkKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBzb3VyY2UgPT09IFwidmlydHVhbC1tb2R1bGVcIiA/IHNvdXJjZSA6IG51bGw7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyU3RhcnQob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xyXG4gICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpcjtcclxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApXHJcbiAgICAgICk7XHJcbiAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCBcImRldi1pY29uLTEyOC5wbmdcIiksICgpID0+XHJcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMTI4LnBuZyBmcm0gcHJvZCBidWlsZGApXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHJvb3QsXHJcbiAgICAgIC8vICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcclxuICAgICAgLy8gICBcIkByZWR1Y2VyXCI6IHJlc29sdmUocm9vdCwgXCJyZWR1Y2VyXCIpLFxyXG4gICAgICAvLyAgIFwiQGxpYlwiOiByZXNvbHZlKHJvb3QsIFwibGliXCIpLFxyXG4gICAgICAvLyAgIFwiQHRoZW1lXCI6IHJlc29sdmUocm9vdCwgXCJ0aGVtZVwiKSxcclxuICAgICAgLy8gICBcIkBjb21wb25lbnRzXCI6IHJlc29sdmUocm9vdCwgXCJjb21wb25lbnRzXCIpLFxyXG4gICAgICAvLyAgIFwiQGJvb2ttYXJrc1wiOiByZXNvbHZlKHJvb3QsIFwiYm9va21hcmtzXCIpLFxyXG4gICAgICAvLyAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxyXG4gICAgICAvLyAgIFwiQG5ld3RhYlwiOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm5ld3RhYlwiKSxcclxuICAgICAgLy8gICBcIkBwb3B1cFwiOiByZXNvbHZlKHBhZ2VzRGlyLCBcInBvcHVwXCIpLFxyXG4gICAgICAvLyAgIFwiQG9wdGlvbnNcIjogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoe1xyXG4gICAgICBtYW5pZmVzdDogZXh0ZW5zaW9uTWFuaWZlc3QgYXMgTWFuaWZlc3RWM0V4cG9ydCxcclxuICAgIH0pLFxyXG4gICAgc3RyaXBEZXZJY29ucyhpc0RldiksXHJcbiAgXSxcclxuICBwdWJsaWNEaXIsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcixcclxuICAgIHNvdXJjZW1hcDogaXNEZXYsXHJcbiAgICBlbXB0eU91dERpcjogIWlzRGV2LFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAie1xyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwibmFtZVwiOiBcIkJvb2ttYXJrIE1hbmFnZXJcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiTWFuYWdlIHlvdXIgYm9va21hcmtzIC5cIixcclxuICBcIm9wdGlvbnNfcGFnZVwiOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcclxuXHJcbiAgXCJhY3Rpb25cIjoge1xyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcclxuICAgICAgXCIzMlwiOiBcImljb24tMzIucG5nXCJcclxuICAgIH1cclxuICB9LFxyXG4gIFwiY2hyb21lX3VybF9vdmVycmlkZXNcIjoge1xyXG4gICAgXCJuZXd0YWJcIjogXCJzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWxcIlxyXG4gIH0sXHJcbiAgXCJpY29uc1wiOiB7XHJcbiAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiXHJcbiAgfSxcclxuICBcInBlcm1pc3Npb25zXCI6IFtcImJvb2ttYXJrc1wiLCBcImZhdmljb25cIiwgXCJzdG9yYWdlXCJdXHJcbn1cclxuIiwgIntcclxuICBcImFjdGlvblwiOiB7XHJcbiAgICBcImRlZmF1bHRfaWNvblwiOiBcInB1YmxpYy9kZXYtaWNvbi0zMi5wbmdcIixcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcclxuICB9LFxyXG4gIFwiaWNvbnNcIjoge1xyXG4gICAgXCIxMjhcIjogXCJwdWJsaWMvZGV2LWljb24tMTI4LnBuZ1wiXHJcbiAgfVxyXG59XHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwiYm9va21hcmstbWFuYWdlclwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIk1hbmFnZSBZb3VyIEJvb2ttYXJrcyBFYXNpbHkuXCIsXHJcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgIFwidHlwZVwiOiBcImdpdFwiLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vYmliZWtiaHVzYWwwL2Jvb2ttYXJrLW1hbmFnZXJcIlxyXG4gIH0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImRldlwiOiBcIm5vZGVtb25cIlxyXG4gIH0sXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYXRhdmVyYXNjcmVzcG8vcmVhY3QxOC10cy10ZXh0Zml0XCI6IFwiXjEuMC4wXCIsXHJcbiAgICBcIkBlbW90aW9uL3JlYWN0XCI6IFwiXjExLjEzLjNcIixcclxuICAgIFwiQGVtb3Rpb24vc3R5bGVkXCI6IFwiXjExLjEzLjBcIixcclxuICAgIFwiQG1hdGVyaWFsL21hdGVyaWFsLWNvbG9yLXV0aWxpdGllc1wiOiBcIl4wLjMuMFwiLFxyXG4gICAgXCJAbXVpL21hdGVyaWFsXCI6IFwiXjYuMS4xXCIsXHJcbiAgICBcIkBtdWkveC1jaGFydHNcIjogXCJeNy4yMS4wXCIsXHJcbiAgICBcIkBtdWkveC1kYXRlLXBpY2tlcnNcIjogXCJeNy4xOC4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYVwiOiBcIl4xLjIuMFwiLFxyXG4gICAgXCJAcmVkdXhqcy90b29sa2l0XCI6IFwiXjIuMi43XCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC13aW5kb3dcIjogXCJeMS44LjhcIixcclxuICAgIFwiY2xzeFwiOiBcIl4yLjEuMVwiLFxyXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjEzXCIsXHJcbiAgICBcImZyYW1lci1tb3Rpb25cIjogXCJ+MTEuMS4xXCIsXHJcbiAgICBcIm1vbWVudC10aW1lem9uZVwiOiBcIl4wLjUuNDZcIixcclxuICAgIFwicmVhY3RcIjogXCIxOC4zLjFcIixcclxuICAgIFwicmVhY3QtY2xvY2tcIjogXCJeNS4wLjBcIixcclxuICAgIFwicmVhY3QtZG9tXCI6IFwiMTguMy4xXCIsXHJcbiAgICBcInJlYWN0LWdyaWQtbGF5b3V0XCI6IFwiXjEuNC40XCIsXHJcbiAgICBcInJlYWN0LXJlZHV4XCI6IFwiXjkuMS4yXCIsXHJcbiAgICBcInJlYWN0LXJlc2l6YWJsZVwiOiBcIl4zLjAuNVwiLFxyXG4gICAgXCJyZWR1eC1wZXJzaXN0XCI6IFwiXjYuMC4wXCIsXHJcbiAgICBcInJlZHV4LXBlcnNpc3Qtd2ViZXh0ZW5zaW9uLXN0b3JhZ2VcIjogXCJeMS4wLjJcIixcclxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi41LjNcIixcclxuICAgIFwicmVhY3Qtd2luZG93XCI6IFwiXjEuOC4xMFwiLFxyXG4gICAgXCJ0YWlsd2luZGNzcy1hbmltYXRlXCI6IFwiXjEuMC43XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMjNcIixcclxuICAgIFwiQGljb25pZnkvcmVhY3RcIjogXCJeNS4wLjJcIixcclxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjY4XCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEyLjExXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjFcIixcclxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjBcIixcclxuICAgIFwiQHR5cGVzL3JlYWN0LWdyaWQtbGF5b3V0XCI6IFwiXjEuMy41XCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1yZXNpemFibGVcIjogXCJeMy4wLjhcIixcclxuICAgIFwiQHR5cGVzL3JlZHV4LXBlcnNpc3Qtd2ViZXh0ZW5zaW9uLXN0b3JhZ2VcIjogXCJeMS4wLjNcIixcclxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjdcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy44LjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl43LjguMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjIuMVwiLFxyXG4gICAgXCJAeHBkL3RhaWx3aW5kLTNkdHJhbnNmb3Jtc1wiOiBcIl4xLjAuM1wiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXHJcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4xLjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yOS4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi44LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjM0LjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMlwiLFxyXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcclxuICAgIFwibm9kZW1vblwiOiBcIl4zLjEuMFwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxyXG4gICAgXCJ0YWlsd2luZC1zY3JvbGxiYXJcIjogXCJeMy4xLjBcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjNcIixcclxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjJcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4xMVwiXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1MsT0FBTyxXQUFXO0FBQ3BULFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQTZCOzs7QUNKdEM7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLGNBQWdCO0FBQUEsRUFFaEIsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixjQUFnQjtBQUFBLE1BQ2QsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxzQkFBd0I7QUFBQSxJQUN0QixRQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGFBQWUsQ0FBQyxhQUFhLFdBQVcsU0FBUztBQUNuRDs7O0FDbkJBO0FBQUEsRUFDRSxRQUFVO0FBQUEsSUFDUixjQUFnQjtBQUFBLElBQ2hCLGVBQWlCO0FBQUEsRUFDbkI7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxFQUNUO0FBQ0Y7OztBQ1JBO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxZQUFjO0FBQUEsSUFDWixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLGNBQWdCO0FBQUEsSUFDZCxzQ0FBc0M7QUFBQSxJQUN0QyxrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixzQ0FBc0M7QUFBQSxJQUN0QyxpQkFBaUI7QUFBQSxJQUNqQixpQkFBaUI7QUFBQSxJQUNqQix1QkFBdUI7QUFBQSxJQUN2QiwrQkFBK0I7QUFBQSxJQUMvQixvQkFBb0I7QUFBQSxJQUNwQix1QkFBdUI7QUFBQSxJQUN2QixNQUFRO0FBQUEsSUFDUixPQUFTO0FBQUEsSUFDVCxpQkFBaUI7QUFBQSxJQUNqQixtQkFBbUI7QUFBQSxJQUNuQixPQUFTO0FBQUEsSUFDVCxlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxJQUNyQixlQUFlO0FBQUEsSUFDZixtQkFBbUI7QUFBQSxJQUNuQixpQkFBaUI7QUFBQSxJQUNqQixzQ0FBc0M7QUFBQSxJQUN0QyxrQkFBa0I7QUFBQSxJQUNsQixnQkFBZ0I7QUFBQSxJQUNoQix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsNEJBQTRCO0FBQUEsSUFDNUIsMEJBQTBCO0FBQUEsSUFDMUIsNkNBQTZDO0FBQUEsSUFDN0MsZ0NBQWdDO0FBQUEsSUFDaEMsb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0Isd0JBQXdCO0FBQUEsSUFDeEIsOEJBQThCO0FBQUEsSUFDOUIsY0FBZ0I7QUFBQSxJQUNoQixRQUFVO0FBQUEsSUFDViwwQkFBMEI7QUFBQSxJQUMxQix3QkFBd0I7QUFBQSxJQUN4QiwwQkFBMEI7QUFBQSxJQUMxQix1QkFBdUI7QUFBQSxJQUN2Qiw2QkFBNkI7QUFBQSxJQUM3QixZQUFZO0FBQUEsSUFDWixTQUFXO0FBQUEsSUFDWCxTQUFXO0FBQUEsSUFDWCxzQkFBc0I7QUFBQSxJQUN0QixhQUFlO0FBQUEsSUFDZixXQUFXO0FBQUEsSUFDWCxZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsRUFDVjtBQUNGOzs7QUh4RUEsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxPQUFPLFFBQVEsa0NBQVcsS0FBSztBQUNyQyxJQUFNLFdBQVcsUUFBUSxNQUFNLE9BQU87QUFDdEMsSUFBTSxZQUFZLFFBQVEsTUFBTSxRQUFRO0FBQ3hDLElBQU0sU0FBUyxRQUFRLGtDQUFXLE1BQU07QUFDeEMsSUFBTSxZQUFZLFFBQVEsa0NBQVcsUUFBUTtBQUU3QyxJQUFNLFFBQVEsUUFBUSxJQUFJLFlBQVk7QUFFdEMsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixHQUFHO0FBQUEsRUFDSCxHQUFJLFFBQVEsdUJBQWUsQ0FBQztBQUFBLEVBQzVCLE1BQU0sUUFBUSxRQUFRLGlCQUFTLElBQUksS0FBSyxpQkFBUztBQUFBLEVBQ2pELFNBQVMsZ0JBQUk7QUFDZjtBQUdBLFNBQVMsY0FBYyxPQUFnQjtBQUNyQyxNQUFJO0FBQU8sV0FBTztBQUVsQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVLFFBQWdCO0FBQ3hCLGFBQU8sV0FBVyxtQkFBbUIsU0FBUztBQUFBLElBQ2hEO0FBQUEsSUFDQSxZQUFZLGVBQW9CLGNBQW1CO0FBQ2pELFlBQU1BLFVBQVMsY0FBYztBQUM3QixTQUFHO0FBQUEsUUFBRyxRQUFRQSxTQUFRLGlCQUFpQjtBQUFBLFFBQUcsTUFDeEMsUUFBUSxJQUFJLHdDQUF3QztBQUFBLE1BQ3REO0FBQ0EsU0FBRztBQUFBLFFBQUcsUUFBUUEsU0FBUSxrQkFBa0I7QUFBQSxRQUFHLE1BQ3pDLFFBQVEsSUFBSSx5Q0FBeUM7QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVdQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLElBQ0QsY0FBYyxLQUFLO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsYUFBYSxDQUFDO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJvdXREaXIiXQp9Cg==
