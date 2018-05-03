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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","f456c7e43d7a537caadd1155966d99a4"],["2016/08/28/【解题】解析url字符串/index.html","1c42e1b3ba167aa503b76c080f939ae8"],["2016/09/21/【解题】写一个累加函数/index.html","5f76f50251ca42a33592f9352e3381d2"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","8ef20ae13efbe9f009d91f4cb5b27a21"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","e3072b1665e65b20287ea5c6064a9b0d"],["2017/02/20/【配置】VS Code常用插件整理/index.html","078b874db96459a8459d92b5ad589181"],["2017/04/10/【构建】webpack4.5升级踩坑/index.html","d083668db74630afcd602e1f9b83e208"],["2017/05/15/【起航】hexo博客/index.html","1bd04b884dc86167a969ffdbac02dcfc"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","df0ef404efad03aa7800f001bd042e10"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","4b1963728bb2ca20229b7abcba84c0d9"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","0f6ab41087c36a213a9e06cc95da8889"],["2017/07/07/【面试】首次作为面试官（一）/index.html","412082be14b9d7883b215c95ff0e92fb"],["2017/07/08/【面试】首次作为面试官（二）/index.html","f81e9c8f948c54e20dfbbe147768d673"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","ad35d88097c1e7c02701a1a81a84792b"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","5cab36f4175e0543ac5b7c6fa434824f"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","613a0aa8d33f7dd0f0366e79e52f362d"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","5691f53df97e3ad4142a19ec2aec8724"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","83b27792823511c0a6a116f59b420e72"],["2017/08/01/【调研&方案】预渲染技术/index.html","51b6a4de348a1c287725f70b197d36c7"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","5306bed6e47c1502a9b8d6838b42507a"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","6a94daad659613b7f62b65251b6bf909"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","d860a65aae6526ca3ba27f4435ed3bba"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","c9e0c914935ae509b6b4aed38e7d0e72"],["2017/09/11/【JS】导出图片和导出html/index.html","39a00e3d266107106ff434336512cfa8"],["2017/09/28/【JS】学习正则表达式/index.html","6bfd6175a9acbc4da8874d2e06473a7c"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","5813da26d898fbceba1a1f5489c37778"],["2017/11/01/【JS】面向对象相关设计模式/index.html","5a1804fc94628ecbafdb4afc3011c96a"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","c819649796859ab38abfd87cc076c8aa"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","5586ca9093bc69a962089bd847e34455"],["2017/12/13/【设计模式】初识IOC/index.html","65009867d8886ce754b7bd203097089a"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/26/【JS】学习正则表达式（二）/index.html","a1d49e28b5819f84a1e5700819a11342"],["2018/03/15/【项目总结】vue-jd-finance/index.html","c68a950f80a63b23d5e2238200e6a3bb"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","0ac067c8544c0005563b432faad1e98d"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","1f71aeee9e694746d1ebd30ac3a80537"],["2018/04/11/【Vue】实现原生双向绑定/index.html","845d954f4a527c817b60fa74831a7adf"],["2018/04/14/【Vue】理解Vue生命周期/index.html","9eaad9eca2c773a32bf68cf5e5ec1cf9"],["2018/04/15/【JS】函数柯里化[转载]/index.html","2f910f6320835b7df365d84763b328ab"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","773d3b18d78c73105090d82a49075bbc"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","bfc7d78bef823edaf6d2816358c35f58"],["2018/04/25/【TS】vue与typescript集成/index.html","f2faea43524d1a1de2b16a7f3f73719f"],["2018/04/26/【TS】vue集成之vue-property-decorator/index.html","dfbdb73564835a40427791a4c2e222e9"],["404.html","be82728551bceaf9e7087f7d8de2bf72"],["404/demo.html","e4149a70a9d8a108f51710f746b0495d"],["archives/2016/06/index.html","01b901a9d7c35b68051462e52e970b72"],["archives/2016/08/index.html","2b0698decb66e10b92605507f3537adc"],["archives/2016/09/index.html","32dae43c8b1ba895e9fbc4ecb92cdee2"],["archives/2016/index.html","b338df140d3d7d79fee6ce544ada25a4"],["archives/2017/01/index.html","fce87a39b5df8c572e8c561c9974a467"],["archives/2017/02/index.html","b3e5d09d67fda1bfe56bc4fc17796188"],["archives/2017/04/index.html","97f5cca5e084cb45aa2c45f55881d0b1"],["archives/2017/05/index.html","731ff39baed82bcdda8d8151444e26e7"],["archives/2017/06/index.html","15be6e6c5c6f1c9e20add95d0d237a19"],["archives/2017/07/index.html","abe315a0b9987cb8a540b7c8348b73ad"],["archives/2017/08/index.html","9b020f79eb44642587a24936a42dafaa"],["archives/2017/09/index.html","52587a3793d1780bb41ffbb3c51d5ef6"],["archives/2017/10/index.html","6e5c2567aca903b565d1de0b2e661756"],["archives/2017/11/index.html","b413b6a80d8f8b836a04b6850f2a605e"],["archives/2017/12/index.html","c7ca4b6f612ccdd328e4173f252ce2f7"],["archives/2017/index.html","edac37f758eadd596362e371a8dc7884"],["archives/2017/page/2/index.html","8a0db166419d91a89fe205a44a1b1b35"],["archives/2018/01/index.html","d8d967ac6d0406ab381a40ea1d55c8eb"],["archives/2018/02/index.html","32c0606307905062fbef3b5493646d61"],["archives/2018/03/index.html","a35c108cfd99534f11a94dc657d31e56"],["archives/2018/04/index.html","b1269747cda2993f51902ad020d0546f"],["archives/2018/index.html","cc4ca47c5b9e814cd3261549705e6332"],["archives/index.html","aadbddcd84a5c79aac53849b4b7d3788"],["archives/page/2/index.html","9efd34c1b052b7b005c44b538b724284"],["archives/page/3/index.html","c469c3b4a03887dfd695e30e93d6bafc"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","dd6ec12177d2e1c47d739dd8d677d970"],["categories/CSS/index.html","cd0fe37aee3a6cd78677512b79d86933"],["categories/JS/index.html","bdddc9378ace222e3704246fb2eef246"],["categories/JavaScript/index.html","cbc8c3dc94dbe8468e4228cf0cf00095"],["categories/index.html","d63772cfe3e531e9664454e3f69634a2"],["categories/js/index.html","7ab3544d91c52fbfd7d954240f31c14d"],["categories/js/oop/index.html","050d849cd9c6c580b951b5bea84dd7ce"],["categories/js/oop/设计模式/index.html","cce31645912b21ca3b789d776bc0879b"],["categories/js/ts/index.html","829a81dc54e25e079757b728da0eac9c"],["categories/js/设计模式/index.html","e7b78da0f5c62a37c123344ab231234d"],["categories/vue/index.html","c22516afe067fa6a78ed862152634803"],["categories/vue/国际化/index.html","c24de57bf60f343d425572eccf5bd72f"],["categories/vue/配置/index.html","cdbc5d12192a873bcbce66caad540d8b"],["categories/webpack/index.html","8feb65f79e0b65e56eb9411a6edf10c9"],["categories/前端框架/index.html","c52e6900d9ea2958ff8f30bf35c7fed5"],["categories/工具/index.html","0825a2ba74a5ba5a36c450534a044965"],["categories/心情/index.html","8817690c3c7f1cca29bf14fb2212e67e"],["categories/性能优化/index.html","d826de14a0202a358f6ad03d32349744"],["categories/总结/index.html","b7277e97035fd4af94eb1904291920da"],["categories/解决方案/index.html","bbec2c5d4893a729e97a402f33c7fb4b"],["categories/配置/index.html","deac51cbc45251b4f207565587db8a0b"],["categories/面试/index.html","c71177d52443406ac3fc052477fd3fb3"],["css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","ffce3db20d3ad54b9ca791d7bccc5e0e"],["gallery/index.html","0894955a661cb27d1932f87361473709"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","2beaa76145a72e4e49f5334983d1941c"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","023a922513467df26d25d56b453d501d"],["page/3/index.html","9e73003e135f1148558ed093cb409cd6"],["slides/index.html","5072491a07ee0d31f96b9e1c2fba7410"],["tags/ES6/index.html","f6bdd420ce088602e49bf6549b402c1b"],["tags/axios/index.html","c9633c77bfff176ee9b8abdef07b77ff"],["tags/css3/index.html","d46aaf994e6b03735fb5ec51475f548e"],["tags/curry/index.html","3b7edd48f864de5f27e175c5aae23be5"],["tags/demo/index.html","39d6d4bfc5817ff8cc921d54de1345f7"],["tags/es6/index.html","a93e92aa4c610a8faacdc5f25fb5cccd"],["tags/eslint/index.html","86c1e687fb892729d4f375233b98e449"],["tags/index.html","5f8348cfbb57443e1156c4c000a64ac8"],["tags/js/index.html","92707b8565b88a4c85b9c32c4c07d878"],["tags/jsonp/index.html","192969a5dd70b7e812a20a1e5da19103"],["tags/mvvm/index.html","69b234d5e7663597f34e6c06742ff640"],["tags/nuxt/index.html","6b2b8df2c1bd53773efa93b5654660c6"],["tags/oop/index.html","dc7ab483adafda9ab2d66b54a872a40d"],["tags/promise/index.html","77d823c4545be54acbd1ce97afe3931a"],["tags/rem/index.html","d3d5bc41ac2efd71a84e492bd235f554"],["tags/reveal-js/index.html","d78ca7b72b292b671d6da8963b03759b"],["tags/ts/index.html","35fd3611170faed8195a887369d3f9d1"],["tags/underscore/index.html","c0ec359382e187a007554169873ce936"],["tags/vscode/index.html","f655730b077eaf7a16a4fecdba0b8a14"],["tags/vue-i18n/index.html","569deb0ed55b3771b8d0f8645e8e37d1"],["tags/vue/index.html","6e567cd822fdb08116de1f0409940b0c"],["tags/webpack/index.html","7c0b7005cd20c2c5fd9a4ec449b27382"],["tags/填坑/index.html","4b6789f1f229f58fe513d5100fd89b0a"],["tags/实战/index.html","abd8011901a0ecdc48ebc655fd09804a"],["tags/对象拷贝/index.html","5b32c96e49b61b6be826a272bfb1b9b4"],["tags/引用/index.html","f259f5a63168febfe9d64d231d227387"],["tags/性能优化/index.html","12877da62af85d88623e14be6b03656d"],["tags/总结/index.html","4760c7468bc99ba1b8de68c505359491"],["tags/服务端渲染/index.html","5b6ac805c3f126f4c15ea03f48a6850d"],["tags/杂记/index.html","d84646d8eec07f22542d87ca288fa281"],["tags/正则表达式/index.html","b0a5ff0cf8d53c36e506f2fa0eeab4b0"],["tags/源码/index.html","efa8ecd79173d4565e8d7de29cee7bcc"],["tags/移动端/index.html","d0890b837c9b46b35abbe0117715a1e9"],["tags/自适应/index.html","ac36db24663e631e72b45f5724773171"],["tags/装机/index.html","6c59060cfae110c25e28caea2d19fbed"],["tags/设计模式/index.html","88ecfbb2c183a19fdf780b12cf6094a4"],["tags/跨域/index.html","4dae28e95b3505a049dc9c72105c4b85"],["tags/转载/index.html","807e3a1ee29e7dbe148d5b4e616609ea"],["tags/面试/index.html","270c6fe94945cc6896f09a9d2743ff85"]];
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







