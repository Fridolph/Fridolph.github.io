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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","beadbe071dff8429838f490e05361498"],["2016/08/28/【解题】解析url字符串/index.html","1adb9fa8df46a1919ffa8c4fc5475ab5"],["2016/09/21/【解题】写一个累加函数/index.html","a30f9944ead090280bc26c4b0b7823dd"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","a1493c457ee165e5324d260ec5046269"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","d85daca4b64406228ac5bb1bcd0d8afa"],["2017/02/20/【配置】VS Code常用插件整理/index.html","7802b301f78eb70fabe801be7637bac5"],["2017/04/10/【构建】webpack4.5升级踩坑/index.html","d11687cf83889930a2abf1a6812e1b9f"],["2017/05/15/【起航】hexo博客/index.html","cd1a2f4a28c8cd1234ab83be01ddf3a9"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","ae9842010f0f1836cb9baea5b9cc6147"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","356e0cf73b5050b22dfefba3d2912bad"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","096b8a5e82be729f80bc64b5d08099e3"],["2017/07/07/【面试】首次作为面试官（一）/index.html","649d9fabe492f922873a65ead7c69615"],["2017/07/08/【面试】首次作为面试官（二）/index.html","68b2316da1b10254fe564ca08c655db7"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","bdcd8d9415bd7a2265266b57c1f6fe3b"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","7da7ac23c66bedc13c0876d299c3152b"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","788bd77c13865302af754066b7cf4ae0"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","3b92db62d15f6435a9c93c888861b310"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","d924277546fb7b78fd1556c8add61259"],["2017/08/01/【调研&方案】预渲染技术/index.html","f471c4d99d236646c022d193e0583a90"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","b4c34a005c3bbcc6bf9c37ca9784fa68"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","50999d79d2bf626f376c0a499f1f08bf"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","5ff5609c170aa6936261b2754a7e1c80"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","e6d5d456b458e996eb7ad1899f156699"],["2017/09/11/【JS】导出图片和导出html/index.html","cb1f6fe2d07198bff307df60a897a6d8"],["2017/09/28/【JS】学习正则表达式/index.html","18549fe6b53ae774c96bdca1759b09f6"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","eb5aa144e44c51c362af5e844dce1aab"],["2017/11/01/【JS】面向对象相关设计模式/index.html","7bca0624c2d60eccf60f050e0c734de2"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","ef1916b0ec7f9288b5323c6050560bf6"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","8b78e80332f8458ed4effadcea62d529"],["2017/12/13/【设计模式】初识IOC/index.html","eef6746037eed5549b5ea0bc062800cb"],["2018/01/04/【Mock】搭建部署自己的easy-mock服务/index.html","dad83a4ea7cf81d38c29df59d79306c1"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/26/【JS】学习正则表达式（二）/index.html","67d8adfefd3860f40f5fe2b6b4c79659"],["2018/03/15/【项目总结】vue-jd-finance/index.html","9f07993372125dfe408bf3769b9da3aa"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","84f58092f60efc6dc60a62e4d8fbd2a0"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","ba133f6e89ce10b313bbc8f093b97189"],["2018/04/11/【Vue】实现原生双向绑定/index.html","6e091a737139bab70e2998df6058b816"],["2018/04/14/【Vue】理解Vue生命周期/index.html","c80f2ac2e83010c29824ff261c70ee35"],["2018/04/15/【JS】函数柯里化[转载]/index.html","e6d470e011186ce2b86d67f5c9a3d907"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","66cb9e606e49a89fd077386e147fb34b"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","6dc0628b236d90f3ec0fed15d7855565"],["2018/04/25/【TS】vue与typescript集成/index.html","ecad94329ddefae1627a9e4ab4630334"],["2018/04/26/【TS】vue集成之vue-property-decorator/index.html","430d065a610cffce35912bfc77c61a43"],["2018/05/07/【小程序】mpvue开发小程序初体验/index.html","7da1db612186a11ffc4cc593758e6c97"],["404.html","605a0c43fa932c27d4ef34ee3c0e54a2"],["404/demo.html","376c2338ec38818392464382bd67318b"],["archives/2016/06/index.html","5d574c823b20a75fb88bdfe631875e04"],["archives/2016/08/index.html","36ca5100beae2760c7151b40a7afe846"],["archives/2016/09/index.html","6a4cdf41339e79af2e9f239d24b146cc"],["archives/2016/index.html","5e8d924952edbabedb2c680b31451d36"],["archives/2017/01/index.html","e7ef0921a84632725f8929a9590436e0"],["archives/2017/02/index.html","a2bfe4d9c2e49d40ab10904a88905105"],["archives/2017/04/index.html","90caee7674e5c32d593a2c71ca7f7324"],["archives/2017/05/index.html","3437e9af8237ea42da1b09e284de5e97"],["archives/2017/06/index.html","37e982a43747add5665413f7370ffabb"],["archives/2017/07/index.html","2f697f00e4179762274c51307ebcffb9"],["archives/2017/08/index.html","6a39fd374dfa1872f0b3dc38804d8b94"],["archives/2017/09/index.html","3200e4c8ff7625dd5250d0a3b3422103"],["archives/2017/10/index.html","bbb577fd840631684279fb6c159562be"],["archives/2017/11/index.html","7122764867681e3335dcfd725e2b4fa1"],["archives/2017/12/index.html","e9363a6c735223e15dd389c30662fb9b"],["archives/2017/index.html","50a82ea27a9d089818746a2ca77a1da4"],["archives/2017/page/2/index.html","44a58c7a367fbfdb6adbecb7c53dfc88"],["archives/2018/01/index.html","26b419daf1d6d2d720537c67f10c2d34"],["archives/2018/02/index.html","d96b94b0f7c648b6bb2b9ebaf84ee74d"],["archives/2018/03/index.html","cbaf309eab200ac5124b368a5ee361cd"],["archives/2018/04/index.html","a97b76cfd9b5c95bef401ef756010648"],["archives/2018/05/index.html","e546f9cee1b5b00589b86b570e1eb93b"],["archives/2018/index.html","4685a7ae93fc2eaedf574958dc0fbab6"],["archives/index.html","91c8e06f5f157383dc0002bb08b28166"],["archives/page/2/index.html","50b800bb123341e5e3ada26ae9a53223"],["archives/page/3/index.html","7400122fa71a59f6ab30ba0a9b898e27"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","79a5d27311bbed4c8ca4ef63ed4b18be"],["categories/CSS/index.html","973432b6fb77527ab29d6f370a002d7c"],["categories/JS/index.html","92f45605d467586d5fd3a26835908a7b"],["categories/JavaScript/index.html","932d0a94fa2a1b00b64c3ac6b5f4fce7"],["categories/index.html","cd0d1466fdfb92e5f4e5a8c559f6ebbb"],["categories/js/index.html","9500f88530aec2b8c2991d2c4618be4e"],["categories/js/oop/index.html","fc3ad03b2503445b1aba6c15fc2c8613"],["categories/js/oop/设计模式/index.html","12b32b7b36ac4eea2e273534a1a628ed"],["categories/js/ts/index.html","ef1a58a5f7171c94bb5ac19d2cf7c0e0"],["categories/js/设计模式/index.html","80422cce4902a574c2b6edb00157b104"],["categories/vue/index.html","4aa1efc12f83614c523c21d6992617e2"],["categories/vue/国际化/index.html","20dae7e334583b2d6eca3d2c7070b48f"],["categories/vue/配置/index.html","48c2331d6c7ac812e4e19c7b7cb518b8"],["categories/webpack/index.html","4ee4da447a3429d1da85a5d5154d5f0c"],["categories/前端框架/index.html","2c7a68439df72f1b954dbc364fcf7ba0"],["categories/小程序/index.html","cb73e18b553e4feb31f7b71d12fa01be"],["categories/工具/index.html","cae79fa3bd2f2a2421a13b586d3ca36a"],["categories/心情/index.html","bbd44592617a95cb76c161aef0922648"],["categories/性能优化/index.html","7c9acf0152e3eb2b5760da6d5a4182c9"],["categories/总结/index.html","5f6f64b736984d0219d26dd770e482bd"],["categories/环境/index.html","40690f6cee6cd3553032e0b6ef0ab7a9"],["categories/解决方案/index.html","61ffde75fb1b2e20de5197086fcf0263"],["categories/配置/index.html","1277eb327dc12bec429edb2214633f7b"],["categories/面试/index.html","8853427823b9881c9b19d3b6f1812f76"],["css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","d9673c49c37cb49d787d76a6a81da9cd"],["gallery/index.html","9083726ab4679f7e00594ab123ee885c"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","212c60411500a801aa7cc487232f12ab"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","9e634449d3212b8efb1c334bd6774841"],["page/3/index.html","997e991a74b659232308332eb9ac34b7"],["slides/index.html","b40a60bcc974ba4d128cbc9323f2bf4d"],["tags/ES6/index.html","ca937104ab8d944db06668f583aa8d76"],["tags/axios/index.html","4f308bc0d52d3916932ca57839ac1d9d"],["tags/css3/index.html","b0204c14f78bccd54418e76e246c9aab"],["tags/curry/index.html","175a55007833ec62df69e9750a5abada"],["tags/demo/index.html","9f26a00ab79d2f6acf53168e5212021d"],["tags/es6/index.html","4e8f91ead2c7aa0f300471dc19059626"],["tags/eslint/index.html","1e0f31e4313d0fda975bc709806aaadd"],["tags/index.html","a1ff50221a8a71494004adf07b7e9e13"],["tags/js/index.html","747c70d86a0b747a85da0a573b969b09"],["tags/jsonp/index.html","c3ec8c6d2747d022e1deb1aba49a5de0"],["tags/mock/index.html","7c17f11209da722ac5962bf311b0fb89"],["tags/mpvue/index.html","68afd7955c4b42314db621002f70badb"],["tags/mvvm/index.html","b1e4ee175e97d3e9733a310c290e4370"],["tags/nuxt/index.html","3b7de0902cdf24f92932c04722a04990"],["tags/oop/index.html","f81e16e4ca1584d64c50d1cf9f0955c2"],["tags/promise/index.html","2b640f926b9262891f4a2ec07756e528"],["tags/rem/index.html","c7b20cd5a0f957cfc6d799f79f1a6001"],["tags/reveal-js/index.html","c98a598c20486fb9ba95f82ce1c8533c"],["tags/ts/index.html","d4480a9ff547603f5ee20ed2749105f6"],["tags/underscore/index.html","7098fcd26fc5b9cbfd16bddcba21427f"],["tags/vscode/index.html","02396c6406e86af7238802851866027d"],["tags/vue-i18n/index.html","2d344f676aa8f725cdef601c3006f61b"],["tags/vue/index.html","e470463d1dddbae1cf3a8afbb62005c6"],["tags/webpack/index.html","c224bf144b2bb1cf8d50073a7815133c"],["tags/填坑/index.html","6e6075b5fc5dd0d244e84327fdcecd46"],["tags/实战/index.html","972a891143b832a0ec8c053b10ecf05c"],["tags/对象拷贝/index.html","7aab7bf98455d62e703eff88a790a011"],["tags/小程序/index.html","9eeb41e31c3fd4d8ff15abb2faf75e05"],["tags/引用/index.html","f6dab2006761c69472031d5a0b66d3f6"],["tags/性能优化/index.html","2baebbf476d4ada753d9d555632220b8"],["tags/总结/index.html","a6fcae5845a05291f1d037f10618bcdd"],["tags/服务端渲染/index.html","91e2e2e1a423e498b5421b08198c9aa8"],["tags/杂记/index.html","d123800a2bf6708c54546fc5a21919b1"],["tags/正则表达式/index.html","f818f3aded5c44fc74670f211ea4ffc1"],["tags/源码/index.html","d43e84ce732934cb8a2e28c7d0345073"],["tags/移动端/index.html","69ce70f6371a326f600b9ae563b620fe"],["tags/自适应/index.html","a6fad957a72eb9f13db4602897de3eb4"],["tags/装机/index.html","ad3e20818bbc32f39cf00f525c86caad"],["tags/设计模式/index.html","4d82c984959fb1bc19ebe12aa6aeea70"],["tags/跨域/index.html","fa1c354830e06068f1d6e20eb1fd3b0a"],["tags/转载/index.html","d87f4abfbf38dbe403eba67ae5a1b8f7"],["tags/面试/index.html","3fa8a011f872b4657478b6da81ed42de"]];
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







