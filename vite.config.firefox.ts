import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest, baseBuildOptions, basePermissions } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          permissions: basePermissions,
        } as ManifestV3Export,
        browser: "firefox",
      }),
    ],
    build: { ...baseBuildOptions, outDir },
    publicDir: resolve(__dirname, "public"),
  })
);
