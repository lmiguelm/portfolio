if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return s[e]||(n=new Promise((async n=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},n=(n,s)=>{Promise.all(n.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(n)};self.define=(n,a,r)=>{s[n]||(s[n]=Promise.resolve().then((()=>{let s={};const t={uri:location.origin+n.slice(1)};return Promise.all(a.map((n=>{switch(n){case"exports":return s;case"module":return t;default:return e(n)}}))).then((e=>{const n=r(...e);return s.default||(s.default=n),s}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/JAmUhqcwx7nnWGpUkMrqn/_buildManifest.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/JAmUhqcwx7nnWGpUkMrqn/_ssgManifest.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/232683af8789c0862c9cc7e1632d2195b2313b73.db23eb33d176135f94af.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/453127e7ff070b1a43c1a0158b22dd23bc73bd62.a364682ab8b26e7895bd.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/679ec655c734b14e193f169986d5e1fd6b736a84.937f7eb0c02447319abc.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.cef94e2e7c070ca5ae36.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/854421abf1fd3a764932c740df638c32cd6be3b2.2759f372918695ff1ee3.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/9078387d7690717e32001bc49d929490fdb3cd40.245b8204da8850bff641.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/commons.71bba9c81a488d36c0ce.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/ea88be26.ef9ef276b1159f5b54b1.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/f7ab972b684ad4424321f553988a01a8328932fa.3a82445a1ef72e4bdde9.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/main-abc92573990dff615311.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/404-3fe54420d2a539eaa909.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/_app-183f1eca187c14f21f1f.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/_error-811acfa1f0914ac33700.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/about-75859880ff8a2d52dbe2.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/dashboard-836743cdeaf68fe35f42.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/forgot-c61f136cd6562eccf35c.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/login-498baad8dc3519edb7b4.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/projects-34004262e7f85cf69689.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/skills-ffbb5744ea857c283c88.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/auth/tools-0518e147eac384429049.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/contact-d8a1a160d0507aa7bfba.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/index-03f6216efe69d0846ff4.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/projects-6e9c88c2b5b4d81f8c16.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/pages/projects/%5Bslug%5D-e2cad1f733f419e4f735.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/polyfills-2561d2db27eb35fd0862.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/_next/static/css/b57b7cfd9d32ec409ea1.css",revision:"JAmUhqcwx7nnWGpUkMrqn"},{url:"/docs/LuisMiguel.pdf",revision:"13734dc0e5dcc78b5be1208bb519d5e2"},{url:"/favicon.png",revision:"bd2f2dc977ad43685b2c0f067b7d8bf1"},{url:"/lottie/16294-404-space-error.json",revision:"cf0712bca82a55e1c297a21241b72f96"},{url:"/lottie/36185-animation-about-seo-dashboard.json",revision:"62e728568e86dde7d825a00351c525b4"},{url:"/lottie/37147-contact-us.json",revision:"c6c1d8aa759bb8ef5e137f173336524f"},{url:"/lottie/59446-black-guy-animation.json",revision:"573a3c55b96f0e97b714554eb230e13c"},{url:"/manifest.json",revision:"26eea29edd7dc4f27dda6f21da3b51b9"},{url:"/wallpapers/wallpaper-about.jpg",revision:"faf4165229e9361ea3f89570335dc127"},{url:"/wallpapers/wallpaper-projects.jpg",revision:"d02b2251e7dffdfc68a858707561a796"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:a})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
