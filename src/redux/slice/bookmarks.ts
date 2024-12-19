[1mdiff --git a/.eslintignore b/.eslintignore[m
[1mnew file mode 100644[m
[1mindex 0000000..af6ab76[m
[1m--- /dev/null[m
[1m+++ b/.eslintignore[m
[36m@@ -0,0 +1,20 @@[m
[32m+[m[32m.now/*[m
[32m+[m[32m*.css[m
[32m+[m[32m.changeset[m
[32m+[m[32mdist[m
[32m+[m[32mesm/*[m
[32m+[m[32mpublic/*[m
[32m+[m[32mtests/*[m
[32m+[m[32mscripts/*[m
[32m+[m[32m*.config.js[m
[32m+[m[32m.DS_Store[m
[32m+[m[32mnode_modules[m
[32m+[m[32mcoverage[m
[32m+[m[32m.next[m
[32m+[m[32mbuild[m
[32m+[m[32m!.commitlintrc.cjs[m
[32m+[m[32m!.lintstagedrc.cjs[m
[32m+[m[32m!jest.config.js[m
[32m+[m[32m!plopfile.js[m
[32m+[m[32m!react-shim.js[m
[32m+[m[32m!tsup.config.ts[m
\ No newline at end of file[m
[1mdiff --git a/.eslintrc b/.eslintrc[m
[1mdeleted file mode 100644[m
[1mindex 3377c72..0000000[m
[1m--- a/.eslintrc[m
[1m+++ /dev/null[m
[36m@@ -1,28 +0,0 @@[m
[31m-{[m
[31m-  "env": {[m
[31m-    "browser": true,[m
[31m-    "es6": true,[m
[31m-    "node": true[m
[31m-  },[m
[31m-  "extends": [[m
[31m-    "eslint:recommended",[m
[31m-    "plugin:react/recommended",[m
[31m-    "plugin:@typescript-eslint/recommended"[m
[31m-  ],[m
[31m-  "parser": "@typescript-eslint/parser",[m
[31m-  "parserOptions": {[m
[31m-    "ecmaFeatures": {[m
[31m-      "jsx": true[m
[31m-    },[m
[31m-    "ecmaVersion": "latest",[m
[31m-    "sourceType": "module"[m
[31m-  },[m
[31m-  "plugins": ["react", "@typescript-eslint"],[m
[31m-  "rules": {[m
[31m-    "react/react-in-jsx-scope": "off"[m
[31m-  },[m
[31m-  "globals": {[m
[31m-    "chrome": "readonly"[m
[31m-  },[m
[31m-  "ignorePatterns": ["watch.js", "dist/**"][m
[31m-}[m
[1mdiff --git a/.eslintrc.json b/.eslintrc.json[m
[1mnew file mode 100644[m
[1mindex 0000000..d3067d4[m
[1m--- /dev/null[m
[1m+++ b/.eslintrc.json[m
[36m@@ -0,0 +1,92 @@[m
[32m+[m[32m{[m
[32m+[m[32m  "$schema": "https://json.schemastore.org/eslintrc.json",[m
[32m+[m[32m  "env": {[m
[32m+[m[32m    "browser": false,[m
[32m+[m[32m    "es2021": true,[m
[32m+[m[32m    "node": true[m
[32m+[m[32m  },[m
[32m+[m[32m  "extends": [[m
[32m+[m[32m    "plugin:react/recommended",[m
[32m+[m[32m    "plugin:prettier/recommended",[m
[32m+[m[32m    "plugin:react-hooks/recommended",[m
[32m+[m[32m    "plugin:jsx-a11y/recommended"[m
[32m+[m[32m  ],[m
[32m+[m[32m  "plugins": ["react", "unused-imports", "import", "@typescript-eslint", "jsx-a11y", "prettier"],[m
[32m+[m[32m  "parser": "@typescript-eslint/parser",[m
[32m+[m[32m  "parserOptions": {[m
[32m+[m[32m    "ecmaFeatures": {[m
[32m+[m[32m      "jsx": true[m
[32m+[m[32m    },[m
[32m+[m[32m    "ecmaVersion": 12,[m
[32m+[m[32m    "sourceType": "module"[m
[32m+[m[32m  },[m
[32m+[m[32m  "settings": {[m
[32m+[m[32m    "react": {[m
[32m+[m[32m      "version": "detect"[m
[32m+[m[32m    }[m
[32m+[m[32m  },[m
[32m+[m[32m  "rules": {[m
[32m+[m[32m    "no-console": "warn",[m
[32m+[m[32m    "react/prop-types": "off",[m
[32m+[m[32m    "react/jsx-uses-react": "off",[m
[32m+[m[32m    "react/react-in-jsx-scope": "off",[m
[32m+[m[32m    "react-hooks/exhaustive-deps": "off",[m
[32m+[m[32m    "jsx-a11y/click-events-have-key-events": "warn",[m
[32m+[m[32m    "jsx-a11y/interactive-supports-focus": "warn",[m
[32m+[m[32m    "prettier/prettier": "warn",[m
[32m+[m[32m    "no-unused-vars": "off",[m
[32m+[m[32m    "unused-imports/no-unused-vars": "off",[m
[32m+[m[32m    "unused-imports/no-unused-imports": "warn",[m
[32m+[m[32m    "@typescript-eslint/no-unused-vars": [[m
[32m+[m[32m      "warn",[m
[32m+[m[32m      {[m
[32m+[m[32m        "args": "after-used",[m
[32m+[m[32m        "ignoreRestSiblings": false,[m
[32m+[m[32m        "argsIgnorePattern": "^_.*?$"[m
[32m+[m[32m      }[m
[32m+[m[32m    ],[m
[32m+[m[32m    "import/order": [[m
[32m+[m[32m      "warn",[m
[32m+[m[32m      {[m
[32m+[m[32