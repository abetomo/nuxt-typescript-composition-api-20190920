# nuxt-typescript-function-api-20190920

## install

```
% npx create-nuxt-app example
```

## TypeScript

```
% npm i -D @nuxt/typescript-build
```

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.js
@@ -33,7 +33,8 @@ export default {
    */
   buildModules: [
     // Doc: https://github.com/nuxt-community/eslint-module
-    '@nuxtjs/eslint-module'
+    '@nuxtjs/eslint-module',
+    '@nuxt/typescript-build'
   ],
   /*
    ** Nuxt.js modules
```

create `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

## lint

```
% npm i -D @nuxtjs/eslint-config-typescript
```

```diff
--- a/.eslintrc.js
+++ b/.eslintrc.js
@@ -9,6 +9,7 @@ module.exports = {
   },
   extends: [
     '@nuxtjs',
+    '@nuxtjs/eslint-config-typescript',
     'prettier',
     'prettier/vue',
     'plugin:prettier/recommended',
```

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.js
@@ -49,6 +50,6 @@ export default {
     /*
      ** You can extend webpack config here
      */
-    extend(config, ctx) {}
+    extend(config, ctx) {} // eslint-disable-line
   }
 }
```

```diff
--- a/package.json
+++ b/package.json
@@ -9,7 +9,7 @@
     "build": "nuxt build",
     "start": "nuxt start",
     "generate": "nuxt generate",
-    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
+    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore .",
     "test": "jest"
   },
   "dependencies": {
```

## `ts` language

### ./components/*.vue

```diff
--- a/components/Card.vue
+++ b/components/Card.vue
@@ -22,7 +22,7 @@
   </div>
 </template>

-<script>
+<script lang="ts">
 export default {
   props: {
     title: {
```

### ./pages/*.vue

```diff
--- a/pages/index.vue
+++ b/pages/index.vue
@@ -33,8 +33,8 @@
   </section>
 </template>

-<script>
-import Card from '~/components/Card'
+<script lang="ts">
+import Card from '~/components/Card.vue'

 export default {
   name: 'HomePage',
```

## links

* https://nuxtjs.org/guide/installation/
* https://typescript.nuxtjs.org/guide/
