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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","6ec107a238718c434f2ca2d2f92dcb4b"],["2016/08/28/【解题】解析url字符串/index.html","b6e092b1c1d1f8d6a30c5392d584c2fe"],["2016/09/21/【解题】写一个累加函数/index.html","1f0788dcff35ee31839357a3b84f0c29"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","dc3adb84af97844226879a8b1d60d830"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","009073494610f10f78afa4688f9638ae"],["2017/02/20/【配置】VS Code常用插件整理/index.html","a5aa527147f32b2898f8df364686680f"],["2017/04/10/【构建】webpack4.5升级踩坑/index.html","6f634ba5a59ccbd3a6f40b3e9f9af925"],["2017/05/15/【起航】hexo博客/index.html","303aa9b354e21df35c37c94273f425b0"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","a108abb9f4d89c0c246d4ae85c6e0c39"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","3b7443fea4f1a116c6d083867597cfc3"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","d49e8099ca70daa0efe22af6f206bc93"],["2017/07/07/【面试】首次作为面试官（一）/index.html","c7ce3c7b0d50d76551ffa293bb3936dc"],["2017/07/08/【面试】首次作为面试官（二）/index.html","f01e347bca69930280f6e668153be52d"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","79316a47c62a3558bf4791583bbef1f5"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","f14c13fe559431d154a80e976a0d08aa"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","2245c584b06580f2e813900c1a694bc4"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","789f21761472ee9a25951571b015c540"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","6ac9cd0d6605491f329761b8ba6baeb7"],["2017/08/01/【调研&方案】预渲染技术/index.html","e8102badc7fb1c2dac817a1e7cc7b45a"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","915f63779a9e1794f2f2f9e80b804c16"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","3eeb18fd62572bd205a6da27791c7498"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","f43603e23025b77698f499c7930341d1"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","edad68ec77bb695d71cecf86e6955cad"],["2017/09/11/【JS】导出图片和导出html/index.html","4b6343a209790a6f5cd7807b4c720949"],["2017/09/28/【JS】学习正则表达式/index.html","ba2d1383483f5b195eaee533ef9d4f0d"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","5792d61c2c504dbe5e0e3bdd10f0fbd0"],["2017/11/01/【JS】面向对象相关设计模式/index.html","f1ab9da067342f1290f85b82f6dd2b1d"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","cd25b16343becabcceae7dbabfd1867a"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","e6957dd735397f8edb0311aa8890e021"],["2017/12/13/【设计模式】初识IOC/index.html","935705fd645d6890bf7b0d410e6f7576"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/26/【JS】学习正则表达式（二）/index.html","6011b8520925d69851c1b8ce64d7806a"],["2018/03/15/【项目总结】vue-jd-finance/index.html","ce805795dc9e7703e2da92016a18d924"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","a2021f041a237c4dec9538d1a3878aaa"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","27589fc40259b9c5d50e0e30cedd9042"],["2018/04/11/【Vue】实现原生双向绑定/index.html","8ba4c4099f2651fdabe900fde72a940d"],["2018/04/14/【Vue】理解Vue生命周期/index.html","896273e576f6d9a6bbb4d3e1d0b0789a"],["2018/04/15/【JS】函数柯里化[转载]/index.html","da96508dbdd3a7f831ab5b5bf0d96bf9"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","d2aa0eeff27506e88c971b7a12ef5add"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","12b787e9b61782fa25663ace9f2e20e2"],["2018/04/25/【TS】vue与typescript集成/index.html","855f2fdf00d24c0754852df96468c44a"],["2018/04/26/【TS】vue集成之vue-property-decorator/index.html","9f3cb49c0230234849486178e4fe67b2"],["404.html","e0172d3f6ac992cbb8a70028c08f5604"],["404/demo.html","9f6c9f367595d25739a4f8b0be9320d8"],["archives/2016/06/index.html","9c3541c3fa70879585d3fa96433a2c09"],["archives/2016/08/index.html","3ffdb30d4c6038459c087f916f86dcbd"],["archives/2016/09/index.html","7184023c17f7feba2faa2025202b4fda"],["archives/2016/index.html","797e06704a7c235b10a1255124d72f83"],["archives/2017/01/index.html","dc8b26c210dbedb2b6d4587bee4ebf00"],["archives/2017/02/index.html","8fade13123436c2f38113494f79c5f6e"],["archives/2017/04/index.html","a8da089989dec9b484c9cb59a94cb998"],["archives/2017/05/index.html","81b82f1b47e45e1f6066f895c9a12048"],["archives/2017/06/index.html","7eb8202ce47a4e8d930f849da9ec75ec"],["archives/2017/07/index.html","8b4d216205fd416b8cdc01171e229138"],["archives/2017/08/index.html","cb0680e661c3849144ecfccfbef69b18"],["archives/2017/09/index.html","57e99db8145eddcd0f8e6eccd1a6d676"],["archives/2017/10/index.html","039d907eecdc8774c080f06ee771e862"],["archives/2017/11/index.html","82e057ddf71da775b4e59bcc9368901d"],["archives/2017/12/index.html","bd6359ca45513bc81691892709c04ddf"],["archives/2017/index.html","636c587a4d44bde4691885d469319078"],["archives/2017/page/2/index.html","28fd33072dbed868d673c1fa5b0ec959"],["archives/2018/01/index.html","482a17b02aa809a77e018ce56ce0d0c0"],["archives/2018/02/index.html","dce7c982f4810790e57499aab830800a"],["archives/2018/03/index.html","59223f3d578044189874525862183e6b"],["archives/2018/04/index.html","13662183648c6f037014535d87418071"],["archives/2018/index.html","e4fea5dcc398440202f3a126182ca40b"],["archives/index.html","83cd0ba764e05a4a38726d14674b5f3a"],["archives/page/2/index.html","c3ed88b9be0beddf702280682f19cb96"],["archives/page/3/index.html","a716366148bf7509b831cfde07f42a93"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","116a18a803acb14fdf0221080f01de4d"],["categories/CSS/index.html","1f2f74c910d23d56a3f0c0a4592d2bae"],["categories/JS/index.html","216fade52aaa88b0d77f75c6dd49fb00"],["categories/JavaScript/index.html","765f8da1a44d2daa94be5df2854b156e"],["categories/index.html","ae6b924d11a01e6831fbc861c5d461f2"],["categories/js/index.html","24c58965498db482d1581ac97792a157"],["categories/js/oop/index.html","52bfc55a3248cfc8bb5cb3f320ece8db"],["categories/js/oop/设计模式/index.html","5c6d34005cc2bc887e5bb013e7c9d16e"],["categories/js/ts/index.html","429f1c5d2b6a977aaf07b96dfb97d774"],["categories/js/设计模式/index.html","f5c42399bfb97e6ecd29d8ea718584bb"],["categories/vue/index.html","c78c0ed5c4809041faaa41dcb182c7aa"],["categories/vue/国际化/index.html","959f6d3b219a52d1507a370cadb93486"],["categories/vue/配置/index.html","c33acdaca031d301df8b0f9d45036205"],["categories/webpack/index.html","9666c8692e53c85b7e2031cca1a41625"],["categories/前端框架/index.html","de70f036abe7e6d61d36e73a23c8c69d"],["categories/工具/index.html","979af12449962b2ea4967babcc48e25b"],["categories/心情/index.html","5050cfcb40dd519082d60b66d9c393e3"],["categories/性能优化/index.html","a8a52943037d3b0d689eda1ed14ad4c1"],["categories/总结/index.html","5bdac981b3b736867b0a089130f2c2b9"],["categories/解决方案/index.html","158c4a9b30bcf7daaab9373e88a06f3b"],["categories/配置/index.html","7ab66d4c07669f800c0e23674ad6fde0"],["categories/面试/index.html","d7977b962ec53c7f7c1f04ecf4a55ccc"],["css/index.css","5a5b13967491d821601c43b08fc5c478"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","7e48bf5b52486a58be96bc43578e617b"],["gallery/index.html","c7b8ef3491822265d6d39531636a6a77"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","b6a26a2119adf8432ebb71298874390d"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","a78bc08e6f310e725f8fa4a436e8d527"],["page/3/index.html","2364418ae1719424181c0ae1f826bab5"],["slides/index.html","b8df9da0e42b73d0f9a8901845a5a3a2"],["tags/ES6/index.html","7fa21a4aaef0af6afa81b6cc1b285fa8"],["tags/axios/index.html","fca00ebd156b971148f985d1109c4038"],["tags/css3/index.html","d0618c2de6d7ff2b1318bb3c3f651ba1"],["tags/curry/index.html","4a542a7b25b120d27189125ee192250f"],["tags/demo/index.html","3e9129486f33f188544a1679b1d95d15"],["tags/es6/index.html","b0e5dc47a8749136c31d9456819119dd"],["tags/eslint/index.html","98adafb2713618899a006da57d717564"],["tags/index.html","f677c1455be8b5526fd09e9840cde62c"],["tags/js/index.html","59f6be6015c39fd3fc550f997949d71e"],["tags/jsonp/index.html","059ee4871b2ab395300345a8f00966cb"],["tags/mvvm/index.html","ff52a52ae4ceaa228b9fdc655add6585"],["tags/nuxt/index.html","625bb0d53d1a226bc22194cd81b10896"],["tags/oop/index.html","c1f4f3d29c2fb02edd0c124cf61e010e"],["tags/promise/index.html","315869bd5cd9d55642c3c24e58144259"],["tags/rem/index.html","d43b81c9b49b26d1f22fbb7f895ab2a8"],["tags/reveal-js/index.html","fe8d7c30d3050349ddc1dfc84fce6c4a"],["tags/ts/index.html","316853ffa4204115db233262b883c7ed"],["tags/underscore/index.html","8c3eb1dc7266e1980a2d65cb20bf608d"],["tags/vscode/index.html","19960b22b78beb35ab341c62fd1d1342"],["tags/vue-i18n/index.html","6262e3af52f09930417ee2cb8caddf09"],["tags/vue/index.html","d2c4edb959752e3281ab79f9a352f393"],["tags/webpack/index.html","5c0d266cb2a9436b6c9b85a3954c92b7"],["tags/填坑/index.html","a09b68ccf4cb27363bd8672f2bdcceb7"],["tags/实战/index.html","cdfad0704d2badcebd3e8e120558bf19"],["tags/对象拷贝/index.html","165a52508b4d1ea4c5ad88e1787b9bbb"],["tags/引用/index.html","b6f2126c178064042acd71e47fa31695"],["tags/性能优化/index.html","cca4dc1e202f015dc6df6f811a63bde4"],["tags/总结/index.html","7a3f3f93b4505e21a42d7169ad269e9d"],["tags/服务端渲染/index.html","5ca79ceeedd7735c98c3ca517587cfa0"],["tags/杂记/index.html","112768a23c11b2b7a2db0f672b0cb44c"],["tags/正则表达式/index.html","5e031bd17db09342a4840b57fa7ff19a"],["tags/源码/index.html","45e7b6d847221fb2be9338035b2ffae8"],["tags/移动端/index.html","7a93a5843245c5e8a90a713164bc1889"],["tags/自适应/index.html","3664064ef7bf82072051f9b1eeb20b5a"],["tags/装机/index.html","5697777c1282650d065023bd8ce9f574"],["tags/设计模式/index.html","278b5d66cca618e054310dc9bd6903c3"],["tags/跨域/index.html","126688f059a6499abc1deb6a5bef10f7"],["tags/转载/index.html","78885285cabc3ab0431afc89744d8548"],["tags/面试/index.html","58ffad43c8cfbc50fe2a5a9cce1902d5"]];
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







