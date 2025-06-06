import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest, baseBuildOptions, basePermissions } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_chrome");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          permissions: [...basePermissions, "favicon"],
        } as ManifestV3Export,
        browser: "chrome",
      }),
    ],
    build: { ...baseBuildOptions, outDir },
  })
);
