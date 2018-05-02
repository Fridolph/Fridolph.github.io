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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","45cde0aaa656f250cacbc61512d5d778"],["2016/08/28/【解题】解析url字符串/index.html","46ca1222f6e8cdf134e7b78d768cbfbd"],["2016/09/21/【解题】写一个累加函数/index.html","5b5b3954b50ca71b476b44162e994443"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","c8668878ece8e8f3d05c736510a53faf"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","8938ace2ffa029e5257456292edae965"],["2017/02/20/【配置】VS Code常用插件整理/index.html","6929eded52dcf2430e1b40fd745566cb"],["2017/03/01/【方案】预渲染技术/index.html","8e5914fbed82e67d78a5176a29485b69"],["2017/04/10/【构建】webpack4.5升级踩坑/index.html","628c0f027a3ac89c53146a9b4768447d"],["2017/05/15/【起航】hexo博客/index.html","644b06c4265e4148bf274332c44774a6"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","b2d246210b90a2f1d93e8c7dbd6064b4"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","e19ec4f4825e943e01ee65f3f3b48e66"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","f276342337ea8fdf8869e2837afa7ad1"],["2017/07/07/【面试】首次作为面试官（一）/index.html","1d532598fdb65b4b8ae087f082c62570"],["2017/07/08/【面试】首次作为面试官（二）/index.html","d236a36bed3141a608389ee7cc83df30"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","b8d7d0f81d6707187758229121881f55"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","b9cdae117b54e314fd2e1cef5f3bf586"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","13d5b756b492217db5a250f9d951cb7d"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","978b58d21717a06efe03a5f0125a5450"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","284bf09f8ce8844746fd55c73a255daa"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","12171881d4a6296a74d049f0be3f6c98"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","f939b0e39b64333cf9b704c124bc6ea9"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","7e98d363c22fba8c19937a67ac1637ab"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","cb18524cd64cb40d7fadd53bbc016f8e"],["2017/09/11/【JS】导出图片和导出html/index.html","678b045a8c529ba1397ff87eddd142b5"],["2017/09/28/【JS】学习正则表达式/index.html","a9b0e0a825626d320ba9f6c0b8bfe169"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","059c6ddbcd0dcb1dd2f5ab0163639ac2"],["2017/11/01/【JS】面向对象相关设计模式/index.html","26533b4cf20247a57759e1ffb2d509ee"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","eecc244b80bd4968989929e50903e9b6"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","ee89220aa2b9dbe4d91f6717bbf72aa7"],["2017/12/13/【设计模式】初识IOC/index.html","f8c33e04f9a039b0bd6733a62f03d1df"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/26/【JS】学习正则表达式（二）/index.html","3d35bbe33247f0f682de5c50b795046c"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","7fef560948c036e01da358938fe93bbf"],["2018/03/30/【项目总结】vue-jd-finance/index.html","d831cae56cb6f6a4add16fb892d8e313"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","f523d151aed5cd7f4cf19901f8cd4880"],["2018/04/11/【Vue】实现原生双向绑定/index.html","e0aaddd5567df3c6046f975b863315df"],["2018/04/14/【Vue】理解Vue生命周期/index.html","e53c91f2ed46a65a1729d36a9fcc92d8"],["2018/04/15/【JS】函数柯里化[转载]/index.html","05ff9dd5621408c0e4547011c05162c0"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","db2c62f5c7c167da4591d3a7d417dd01"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","b2cc8d458c77c4a4b5f720c880b02df6"],["2018/04/25/【TS】vue与typescript集成/index.html","9a51372199e426fad5e41dd99ca8cae4"],["2018/04/26/【TS】vue集成之vue-property-decorator/index.html","7fc2098ef8f9710ee5f7aea23e242b45"],["404.html","c0252a8da7e7367eab85b0bf630ffa33"],["404/demo.html","8e2add05afb6b38fda736b40f6c51146"],["archives/2016/06/index.html","4fe32dbabeced5a1fcb746773acb0d9e"],["archives/2016/08/index.html","1ed3c90ab7f775cf99072d9bd6acea67"],["archives/2016/09/index.html","b4df011d4a9808264a5366db15dd833b"],["archives/2016/index.html","57a347a09e6945997c960e6d5cae6de8"],["archives/2017/01/index.html","0aa5a53688d57d41d35c49641ab8b6a7"],["archives/2017/02/index.html","4990cb87b670f1db3f5388790d68672a"],["archives/2017/03/index.html","1441eab58e17062a4be7af6037f90c3c"],["archives/2017/04/index.html","9fbcba28fbb5f29677decc0354ab0d6d"],["archives/2017/05/index.html","fc12dd9ef8b605061f746dda784286b1"],["archives/2017/06/index.html","844353fb34d9ee58813fbc000b09273d"],["archives/2017/07/index.html","f86c106c0cd29c66394a9522bc9abbfe"],["archives/2017/08/index.html","29590f78d3f2a0527e7a0afc23c0cd55"],["archives/2017/09/index.html","63e86618dd860fa0483e1e15afdb83e8"],["archives/2017/10/index.html","a118b5a23b7c6cfa9aea9c04b14fe172"],["archives/2017/11/index.html","7a72d1a0ba86689b5629cb293bbd960f"],["archives/2017/12/index.html","8d48a59d9f954a5442bd73c9abb8d38a"],["archives/2017/index.html","645ffbc069dabeeae7624a63c1bac007"],["archives/2017/page/2/index.html","fd38e4c63369b1b5e8ca082699220876"],["archives/2018/01/index.html","d915eb2648f0512e710b6bdda4998f9f"],["archives/2018/02/index.html","a15da531e42db09d3a4dac14da58dbe7"],["archives/2018/03/index.html","a28f393bd877fb1fc0699cfcca3d6d95"],["archives/2018/04/index.html","149194d258f405d091b19142cb1bbdb0"],["archives/2018/index.html","3757ebc0a81ec75d8bab5eb91b8d9812"],["archives/index.html","e6763d3ea5cf80b13ec53205d56e4874"],["archives/page/2/index.html","e4ba6b3c389b2b553c5dc60d3b65983e"],["archives/page/3/index.html","2a07cf9d82f63080fe27342fd5bca557"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","1e77087da30beaf8867d31258a897580"],["categories/CSS/index.html","84632ed48f8964ac8a95e77cd6bade78"],["categories/JS/index.html","65396e001f40d1159c88f618a2477e40"],["categories/JavaScript/index.html","330cdcbe3e78c609be635692b298185b"],["categories/index.html","b317a97555edab214b1e2d7b96d98672"],["categories/js/index.html","2dd11ad97af2d4424581e510d9eb488c"],["categories/js/oop/index.html","c813dedb2ddcc06d9a187b59da5c5f9c"],["categories/js/oop/设计模式/index.html","5af07f1d4a9fe7208719b0f073551fa8"],["categories/js/ts/index.html","bbd907f1d56a384453f447342254f70e"],["categories/js/设计模式/index.html","630e5154b2ec31bc05c1edfa0690cab0"],["categories/vue/index.html","6ebd37c2c395b537fec875031469d1c1"],["categories/vue/国际化/index.html","e14e6e5c0a4abdcd17e548fc5e1b1bc2"],["categories/vue/配置/index.html","95fa51952f8bd691817f941141fc5eb6"],["categories/webpack/index.html","127ff86c9f906549b183226514eb4821"],["categories/前端框架/index.html","ceebdc7800450ffdfcc073885eabf684"],["categories/工具/index.html","0c00c4ea211cb5361dd522940aab295d"],["categories/心情/index.html","a62e644cb65c7da9e9d29585ed8bd08e"],["categories/性能优化/index.html","8909067a11ac30b8a546d12ee6686a90"],["categories/总结/index.html","278f8c45a1263feaeb3b3fe51fed4d2e"],["categories/解决方案/index.html","5cc01475b06b0da9ce8e3a7830188890"],["categories/配置/index.html","862b94f07eb069f5da32209929405536"],["categories/面试/index.html","1cdb7f744ea0cc24280125881eceeb61"],["css/index.css","5a5b13967491d821601c43b08fc5c478"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","19ccc0b11df6fe6d24a064ea8128eea6"],["gallery/index.html","06e6bac135dfa87ae6672fcdcb82265f"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","d35756d6d23aa1ff9667bd8fc78b1fc6"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","d0cd3857444d69cc60df58eaebee55d1"],["page/3/index.html","425198cbebbee9a0ecb7ebae64a9b93e"],["slides/index.html","a34e6267ddf73b2f06b646a7e3448908"],["tags/ES6/index.html","5da82c8777d7c67a9d1671a14d1bd3fe"],["tags/axios/index.html","110c56a961574431c706afd59db05201"],["tags/css3/index.html","059a06a135983fe1cf47b7420a93cc49"],["tags/curry/index.html","d85bab7bf297185e778d1ac1109a17d7"],["tags/demo/index.html","6530c1aa98901762556269c94bdd90b1"],["tags/es6/index.html","31159f07306bfd4d192f3278e81750f0"],["tags/eslint/index.html","ac4e77a83327abd17a0f81d80a161297"],["tags/index.html","c1131f8b84731c6a1f85127878bb8586"],["tags/js/index.html","a7df672a88a90dfeef6be94052966646"],["tags/jsonp/index.html","38e5cc8640629c9e287145ae7ac7d12f"],["tags/mvvm/index.html","0e296173ff22234f4145fd2082bfc767"],["tags/nuxt/index.html","bbaed4990f39361019c8359e21691267"],["tags/oop/index.html","5da40a96ed8afda506f88998815f45d1"],["tags/promise/index.html","17f868062de799830c1a85d0d504e2d8"],["tags/rem/index.html","a4368505cc1cbffcb9e64153b62aed6e"],["tags/reveal-js/index.html","866c81b6409d07fb8ccddeb392f8c709"],["tags/ts/index.html","1865c5be62c5cbb880c4f9b3efd08d6c"],["tags/underscore/index.html","2f04428721eea25b84fe6e07ab63dbef"],["tags/vscode/index.html","aaeccde26c654ff752016e419d670953"],["tags/vue-i18n/index.html","04aadf51756f94de1567654c920a3f3c"],["tags/vue/index.html","b71df990b207adf742f3eec71f8d1925"],["tags/webpack/index.html","f0c2a749305bbc77984033bf24bc0281"],["tags/填坑/index.html","8490f45a1ede35d085157972056bb6a3"],["tags/实战/index.html","de47426d28d6f1aab9b39af68a5ed687"],["tags/对象拷贝/index.html","b9d04a604dde7031d76d838668986f63"],["tags/引用/index.html","d11f72c599aaea8f0065dd059e3ce78b"],["tags/性能优化/index.html","8e83c588c9864ed1d0604e7e2a798d30"],["tags/总结/index.html","8a034f6f559f4021259c33ba575f3065"],["tags/服务端渲染/index.html","7cf20a960dc3d9cde2918ed9d78519ca"],["tags/杂记/index.html","5c17d20339a27546142025a1c31fb10a"],["tags/正则表达式/index.html","bb2e8a0883220658e8e83ff80fe82755"],["tags/源码/index.html","75c88e8d348b2bfbac5f3c146f1c2da3"],["tags/移动端/index.html","8d7c92b320b697f3dd85fc63178d96f6"],["tags/自适应/index.html","b7c2634719531545bc8ca686e4d8de06"],["tags/装机/index.html","27a5fbd37d5e645e38b8915170323e75"],["tags/设计模式/index.html","15a59adf2cb9df721276215c7d560fcf"],["tags/跨域/index.html","3399a91983ec11459d1c62708140a32b"],["tags/转载/index.html","97fb6c05b5fb136eb30b9330e80109e9"],["tags/面试/index.html","5b0dc4ff8198a9577f8b8ba41f57aee5"]];
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







