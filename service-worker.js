/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","8ab50f2336aeaec048a743ee33babf15"],["2016/08/28/【解题】解析url字符串/index.html","25b7261cad46195b7948839607e6f7de"],["2016/09/21/【解题】写一个累加函数/index.html","db8ce75c6ea579a75534c11b54055f0b"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","f67deffd94aa1a0b5fbf30125c2bdc9b"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","48e6d7864488a6d04bb61c3068c71a1e"],["2017/02/20/【配置】VS Code常用插件整理/index.html","bf248345c04566eece785511c56114b5"],["2017/04/10/【构建】webpack4.5升级踩坑/index.html","10be9614e51c8f3d556a3650685d4f65"],["2017/05/15/【起航】hexo博客/index.html","56a72c5c35c4e29b0c18b72506fdb746"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","ae497dac9a0f42bb03b97989dbc2d21c"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","55772582993cff9a4a723c5ba962f41b"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","1d43075b16684060c22a5c3e2a3abf51"],["2017/07/07/【面试】首次作为面试官（一）/index.html","2717f69a98a22d107a23232b7bc4748d"],["2017/07/08/【面试】首次作为面试官（二）/index.html","7cf496d0805d9773502f0949a73c69f6"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","17db872c289f7e1573c0d10f003281cd"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","82dc99166e9875d396c36f0e89fb5f0b"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","628c4b1d1f14112c8f96991f1f7092f4"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","34a2c7d17ac56239a5416b9f2f692252"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","dcf24f939e8da85998ad544a7b8c5878"],["2017/08/01/【调研&方案】预渲染技术/index.html","d8eaa668772ebac7c3b6165962e89df6"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","8e57a66fe2379124d1ee25d7ff0c406d"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","b4f33b4cfe701e152258045df20dc668"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","7a872e6af7b689524cba8f58e93a6f87"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","78d018acc8e54266ec56bf861960b363"],["2017/09/11/【JS】导出图片和导出html/index.html","0988ee36d07f9f59e9733a0c04cf573f"],["2017/09/28/【JS】学习正则表达式/index.html","6be8aa8d4909a70f5757b88eca08596f"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","19219355df1e09a4114ca2990e9b468e"],["2017/11/01/【JS】面向对象相关设计模式/index.html","f49e9d2716b0579c167f0540c76c1ed4"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","8fd835e49716a5d42a373dd7be9eab51"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","44da8c3b56c0fceaddd9789ea8096642"],["2017/12/13/【设计模式】初识IOC/index.html","167eabdb8eaa18594c651beb180b7f45"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/26/【JS】学习正则表达式（二）/index.html","3425323fc26515810d8db4745b09b4d2"],["2018/03/15/【项目总结】vue-jd-finance/index.html","79321abf75afcf7bcc4ba9fef47a561c"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","792245ee844b6b73ed6d1fe5304e0b4c"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","5cf7f58f029765256be65862b1483f4a"],["2018/04/11/【Vue】实现原生双向绑定/index.html","42bb7dc78495e31fa9083cfe2deed9ea"],["2018/04/14/【Vue】理解Vue生命周期/index.html","43517484e34b7bc5d7faee919269e7f3"],["2018/04/15/【JS】函数柯里化[转载]/index.html","603682f5fa6667489f3ab1e04ae10426"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","f63d5f3950524fb15727444d0c6412c0"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","8825e55c95fc434cb2d3d774b751d19f"],["2018/04/25/【TS】vue与typescript集成/index.html","855097a98f5dcd75ad043225713a2628"],["2018/04/26/【TS】vue集成之vue-property-decorator/index.html","4f36403016e0eb68ac26cb6a3f980a93"],["404.html","5423e13673524dab2ad0ff96f6b52a86"],["404/demo.html","322aa72d28b69d59ad944a40ad96b468"],["archives/2016/06/index.html","48b44c74fe73021c868c0c342fdfb0f4"],["archives/2016/08/index.html","fb4e25eeb8c616a844693c4ffdc48f47"],["archives/2016/09/index.html","ac2e15b6194323b35c1c11bc0d08dfef"],["archives/2016/index.html","8f6c7d6414c9724f5a6b51cae72f4806"],["archives/2017/01/index.html","3c6499edbcb2fe8e8a9282d92962bf00"],["archives/2017/02/index.html","5338a1ed6139c65bcde525eda31f85af"],["archives/2017/04/index.html","daf42fe95dd4daff484e9be58df23b0f"],["archives/2017/05/index.html","10d9038a2d26f3275cddb87e8202b5b4"],["archives/2017/06/index.html","a570d95581bbd077e46e235e8aa26533"],["archives/2017/07/index.html","b856562c88c68c66790b3a1cb3ae9b32"],["archives/2017/08/index.html","482c03fc08ca5bb03916378ff958a55f"],["archives/2017/09/index.html","987a0217f0af0adc877ab9586f4a5d52"],["archives/2017/10/index.html","4ce13eaef77f71af3f5caeb2015cf1e7"],["archives/2017/11/index.html","c93f79ae6f5d58397b0e668d4b92804f"],["archives/2017/12/index.html","db81d4cb9f47b67ce620cbae95fb0bf0"],["archives/2017/index.html","74a0508c41fc7470c7bd15446ec80555"],["archives/2017/page/2/index.html","2bce29d1ff8ea93166fc007a7c49151e"],["archives/2018/01/index.html","cf9cf896e6691442304b71ee9b52ebf6"],["archives/2018/02/index.html","321b444a892028a3d41ddb5e4ac32472"],["archives/2018/03/index.html","02eeaac03380c42b7a037c3a4852a6d9"],["archives/2018/04/index.html","83abad068c3c446e99fe0192d1aafff8"],["archives/2018/index.html","586d3b63cd03970bed23cf4f2788b29c"],["archives/index.html","a47e33cc2fdba26df07673a68f75dda4"],["archives/page/2/index.html","c8c362ddbe5ab2fd7793efca132b1671"],["archives/page/3/index.html","0df0f7ca05260cb1a05da81ae4d86570"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","0f87655fb1d6c594878ab6399b5592c7"],["categories/CSS/index.html","a1721c13f2f469a895c4c582e4d91999"],["categories/JS/index.html","3c4ee75a7bfd1919ffaab74b11a29835"],["categories/JavaScript/index.html","e68a5d603d70661c36ad514d25dd64b2"],["categories/index.html","a4e6c1c3db4631acaa0796c042be76b7"],["categories/js/index.html","d71495fa34963f4d488503fc91a503d5"],["categories/js/oop/index.html","97d3b2a14406603e41caadd456d3ba8e"],["categories/js/oop/设计模式/index.html","a018fd815810bb9869d8e4e8aaa87e54"],["categories/js/ts/index.html","d5557c743f1f927072d2b59fcbed463c"],["categories/js/设计模式/index.html","19dcc25af4f35a80d732015c8d9ad037"],["categories/vue/index.html","46bebb3db14996e27715fd6889478d83"],["categories/vue/国际化/index.html","cf6a40a113fb52e5c7307534fe75b003"],["categories/vue/配置/index.html","93ed1c2e8e66518353f47b5ec8e87b30"],["categories/webpack/index.html","fef0d954062ee650785236e298075119"],["categories/前端框架/index.html","5193b22c5eed0426a05ab2521d001ceb"],["categories/工具/index.html","ed753e9cf9adfa185034affaf146d94d"],["categories/心情/index.html","6119bb359fe30ac3a0559bac50a27ad8"],["categories/性能优化/index.html","596f094fac6fecbcc9b7223d135a0519"],["categories/总结/index.html","792b2533c7c810dc94ac94570eef90ee"],["categories/解决方案/index.html","5221d5fca85e0ded669fccf254c6504c"],["categories/配置/index.html","b8192f4020b88c364ad23e7a69c86c74"],["categories/面试/index.html","b79b2f3a88b5ff69dc7618016aaee03e"],["css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","3b0888d0ae828732bc51c24ef0708181"],["gallery/index.html","c2de1ce59ed9f944254a82c8a654abc6"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","a44d0b96c0e5191e58f880b8d43175d9"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","964ef84450cda8d6eba8ba211af14087"],["page/3/index.html","59c9cb479aa58700df0b1b15c786e9d3"],["slides/index.html","3b1b3f6fb33e519cdf9fce0a9f71f0c5"],["tags/ES6/index.html","4e655ffae87dde393fb8455d824f2c2f"],["tags/axios/index.html","0d46028aa82c9e8f2445c25700a08d6f"],["tags/css3/index.html","07d44b5d617474ae11645f8529f07704"],["tags/curry/index.html","4f628bd0a4856085dc99266a3c1eb577"],["tags/demo/index.html","1d6a24a4f0d87dadbf2ac375924d0470"],["tags/es6/index.html","1edb88c7344e7e6f31ba44b24da96edd"],["tags/eslint/index.html","b0228494388148dd6b041608dd909d34"],["tags/index.html","6d983fa58caceaaa84a82172da94eb08"],["tags/js/index.html","c0a48917416cb48a07371d116bb13068"],["tags/jsonp/index.html","1ab6b940923a75f7057fce07e7304f0d"],["tags/mvvm/index.html","6a6ea8fcda94d7721490353d0e05abb7"],["tags/nuxt/index.html","4f38ddf7f95883fa5531dfa5b18ba735"],["tags/oop/index.html","32b4d9e4dea825f70cf78a0edcd10b18"],["tags/promise/index.html","4b251d2a1200a4681023e0b3df63a308"],["tags/rem/index.html","fb443982e44567feec45975d2ab02d2f"],["tags/reveal-js/index.html","892d8868a51403edbb82e47652b885c4"],["tags/ts/index.html","0b6cc255da8a689c3a80ce00d86db3f7"],["tags/underscore/index.html","242d2c5816b01de406023fa45d5289c7"],["tags/vscode/index.html","d7bd65d2cae97dbe4bb63027d0f01607"],["tags/vue-i18n/index.html","02bb74e08c99ce6cdfcaed42ded108c3"],["tags/vue/index.html","4afe3f5daec09beb28b076db68e3477c"],["tags/webpack/index.html","0ecb34cd988b04b26512d35f2ffb25b1"],["tags/填坑/index.html","f00ed5ab7bccac9ad13ee78b79082fd1"],["tags/实战/index.html","edf847f3fde207b09b107f4abd6611d9"],["tags/对象拷贝/index.html","4b4e8e29d535199af924631696504da4"],["tags/引用/index.html","619e4b6a2ca13466f0a657265e717add"],["tags/性能优化/index.html","3ff2053087fdd839c55f3964dc911acc"],["tags/总结/index.html","d0b55e8d04676c4388c9bb756aec4a0d"],["tags/服务端渲染/index.html","f5e065eea2fcc8eb839448c8763a8638"],["tags/杂记/index.html","5010dc1ab882926f2ed8dd00d9e4ce79"],["tags/正则表达式/index.html","9da21f9633a41d54fa4e96a9616c0435"],["tags/源码/index.html","95709269f858fc324e933df892857bd4"],["tags/移动端/index.html","ef1cc31268748164093d3102e9628606"],["tags/自适应/index.html","e1926dc42b87bae376f8b49f9407d0cb"],["tags/装机/index.html","3710bc1089efbe289ff0406c15c9902b"],["tags/设计模式/index.html","7fe965bcd6d08ab881f343c71e94b76e"],["tags/跨域/index.html","309c536ca0f4ddbdcd8cfb2afb067237"],["tags/转载/index.html","787c9d8e2689df6437a1b4fc83ec7254"],["tags/面试/index.html","bd19dcb84f3e4efb78f81440804559c6"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







