# nuxt-typescript-composition-api-20190920

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

Create `tsconfig.json`.

```json
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
% npm i -D @nuxtjs/eslint-config-typescript @typescript-eslint/parser
```

```diff
--- a/.eslintrc.js
+++ b/.eslintrc.js
@@ -9,6 +9,7 @@ module.exports = {
   parserOptions: {
-    parser: 'babel-eslint'
+    parser: '@typescript-eslint/parser'
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

## composition-api

```
% npm i @vue/composition-api
```

Create `./plugins/composition-api.js`.

```js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.js
@@ -27,7 +27,7 @@ export default {
   /*
    ** Plugins to load before mounting the App
    */
-  plugins: [],
+  plugins: ['@/plugins/composition-api'],
   /*
    ** Nuxt.js dev-modules
    */
```

```diff
--- a/components/Card.vue
+++ b/components/Card.vue
@@ -23,7 +23,9 @@
 </template>

 <script lang="ts">
-export default {
+import { createComponent } from '@vue/composition-api'
+
+export default createComponent({
   props: {
     title: {
       type: String,
@@ -34,5 +36,5 @@ export default {
       required: true
     }
   }
-}
+})
```

```diff
--- a/pages/index.vue
+++ b/pages/index.vue
@@ -34,13 +34,14 @@
 </template>

 <script lang="ts">
+import { createComponent } from '@vue/composition-api'
 import Card from '~/components/Card.vue'

-export default {
+export default createComponent({
   name: 'HomePage',

   components: {
     Card
   }
-}
+})
 </script>
```

```diff
--- a/layouts/default.vue
+++ b/layouts/default.vue
@@ -39,23 +39,37 @@
-<script>
-export default {
-  data() {
+<script lang="ts">
+import { createComponent } from '@vue/composition-api'
+
+type To = {
+  name: string
+}
+
+type Item = {
+  title: string
+  icon: string
+  to: To
+}
+
+export default createComponent({
+  setup() {
+    const items: Item[] = [
+      {
+        title: 'Home',
+        icon: 'home',
+        to: { name: 'index' }
+      },
+      {
+        title: 'Inspire',
+        icon: 'lightbulb',
+        to: { name: 'inspire' }
+      }
+    ]
+
     return {
-      items: [
-        {
-          title: 'Home',
-          icon: 'home',
-          to: { name: 'index' }
-        },
-        {
-          title: 'Inspire',
-          icon: 'lightbulb',
-          to: { name: 'inspire' }
-        }
-      ]
+      items
     }
   }
-}
+})
```

## links

* https://nuxtjs.org/guide/installation/
* https://typescript.nuxtjs.org/guide/
