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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","3ff5e8fa60c495320a448a054661c6f8"],["2016/08/28/【解题】解析url字符串/index.html","ddd916a6cfbb8ab8e9c98c151c0bc709"],["2016/09/21/【解题】写一个累加函数/index.html","6fff7ebc9cc594e9289039f768c3d1e0"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","1af8e8e08ec17ec3cac0e24b39705706"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","f8d8d1445edcbf545ce2915c4bec6f80"],["2017/02/20/【配置】VS Code常用插件整理/index.html","82aa197c3f6646635e2366fc28ec1923"],["2017/05/15/【起航】hexo博客/index.html","d902e16a8399c83dba2b7db126d6322d"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","07a8e8622b653cffdab6df12c5a210a3"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","e71d28817c744801940af6c4274cdb72"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","7e3302f8a70095f55bb6cfb9a5864f20"],["2017/07/07/【面试】首次作为面试官（一）/index.html","a35cc888177249196454421dd73d46c3"],["2017/07/08/【面试】首次作为面试官（二）/index.html","6c85f5845ef14cbd055c3b400d914ec9"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","edcf8024589c7bccb96a59c468bfea04"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","286707233e8a8014e00cb466dc69b397"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","87b9f67ff2d4fc6940aa2dc8519b53be"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","bbabafe92ae0da99681a579801534417"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","8e8163f76d2c7ca689400583408acac5"],["2017/08/01/【调研&方案】预渲染技术/index.html","5d3e7974f5d0f4010e77d4fa929f90f6"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","01e9e1a3ee91158aa90ac76b9332e9aa"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","4d672c9a79c5ae735bb34a5e8ef72813"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","caeb8e52438d5a2b30edcf3703410872"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","62e324e94233d7992d65ee31c7a01a69"],["2017/09/11/【JS】导出图片和导出html/index.html","bafc0f230727b398abcbbf58f7978354"],["2017/09/28/【JS】学习正则表达式/index.html","2d5711d8b9a883a2294925bcc2062cfd"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","67cadcf469e126f33b7f10c581773c4c"],["2017/11/01/【JS】面向对象相关设计模式/index.html","a6a9ea5e4df21eab2f2bbcb9a1925afc"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","5ddb2935840d800b60e3baa6d2b5b1a3"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","c68a8ab2fb1fe71e06024bb978a2bfa3"],["2017/12/13/【设计模式】初识IOC/index.html","5c9538b8df8c2c6fa6c8ab915acc6194"],["2017/12/20/【React】从基础开始再来温习React，相关学习整理/index.html","062820eff3f96fed9c87deeae9a01576"],["2017/12/28/【React】进阶React的重要知识点/index.html","913a2785e049fe1760d169709c5a9fb2"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/04/【Mock】搭建部署自己的easy-mock服务/index.html","396041e8d69a5a462a73446a5892e7c2"],["2018/02/26/【JS】学习正则表达式（二）/index.html","1b7c79621684259702d45ffc7e76439d"],["2018/03/15/【项目总结】vue-jd-finance/index.html","c32aa6a099506e4f498a982a44fa1df9"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","e9fb6bd77a8e63a1206a488df4892e9d"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","42955dc91925118696d5d06bb0075fce"],["2018/04/10/【构建】webpack4.5升级踩坑/index.html","b0ade51e49789714ae70e5006da86e35"],["2018/04/11/【Vue】实现原生双向绑定/index.html","b942987ab176324a615f36005aee1010"],["2018/04/14/【Vue】理解Vue生命周期/index.html","e344343810a37024b81707e3e49696aa"],["2018/04/15/【JS】函数柯里化[转载]/index.html","cbd4c70e8f271074c1ecb2427c97033e"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","c07c69722f465abd2f6504b79f6708ce"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","5ab065e5a03e6b832ef931fee597694a"],["2018/04/25/【TS】vue与typescript集成/index.html","a5e96fa481178323f732202039bd8471"],["2018/04/26/【TS】装饰模式与vue-property-decorator/index.html","9d2079914b5195d6ceca08a35c2c32c3"],["2018/05/01/【TS】使用vuex-class/index.html","e9f1eab469694d35433bd69423e7d957"],["2018/05/07/【小程序】mpvue开发小程序初体验/index.html","6fdf09dcaababa172f823b5c4928b2ac"],["2018/06/03/【年总结】提升学习效率，良好习惯养成与坚持/index.html","f8007976021963074a59c6d2fc04f677"],["2018/06/13/【FEStar】(一)从订阅发布模式说起/index.html","4a929179e14ccc13ec4d16f8082ea4c2"],["404.html","566825d7a0fcb0bdeed89e1ef9c4f53f"],["404/demo.html","05ea719166668276eefd627ac8d7f0f1"],["archives/2016/06/index.html","17d3c74e0b93d7f6274aaa44086491ca"],["archives/2016/08/index.html","03d632db39d09fafe88e763a02b604b1"],["archives/2016/09/index.html","43a470e4debf293c23688334a19d7a09"],["archives/2016/index.html","f45e31b7ef2b56fc6abe593fff6b3497"],["archives/2017/01/index.html","b3f2a8ab89a6c838524819055045dcdd"],["archives/2017/02/index.html","8436b3ef06d6070a7060a139dcf8b6bd"],["archives/2017/05/index.html","4a0d28efde999c434ff540627a23808f"],["archives/2017/06/index.html","647d365a36b1716aa2d2812683fab0b6"],["archives/2017/07/index.html","f326b4518637f9aef2ac2d344adfee4d"],["archives/2017/08/index.html","f044bf3d393856a6f99336379ca7ce36"],["archives/2017/09/index.html","59e43383463c18251b5c038a7cd7142d"],["archives/2017/10/index.html","f16a6db5e929454897c20636655313be"],["archives/2017/11/index.html","b250ed9d9868dfec027fcf5d653bcef0"],["archives/2017/12/index.html","d1fbc54c990300429c7e01c595a6213e"],["archives/2017/index.html","dcf806d40a8050906a3cc561794aa0dd"],["archives/2017/page/2/index.html","61f905e8d52d2c99d3995ba2f1d98ba0"],["archives/2018/01/index.html","6456ac24fa6f8e6f35777add698ccffe"],["archives/2018/02/index.html","479624b17c2fab9e5dca54341d69ebda"],["archives/2018/03/index.html","ac56103a33a4d9962c29b66985395d13"],["archives/2018/04/index.html","5ca8f105a6dde79ae99ea04f8eec66b3"],["archives/2018/05/index.html","f43db42902dfe97259055ec6069789e2"],["archives/2018/06/index.html","7acefa565ccddce46186253e6968d706"],["archives/2018/index.html","d730016f65b811d131c5bed4b8877014"],["archives/2018/page/2/index.html","e31a521f5b3d6109db8109d6d20515c7"],["archives/index.html","9c1edee8cce17035461279dad236d7dc"],["archives/page/2/index.html","178039d641440e8d294562285402a6e8"],["archives/page/3/index.html","a454f80d45ebb6ff913aebc1dbcbdebf"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","18cfddc8c018a597e417b04d5f016f10"],["categories/CSS/index.html","93eb749039c447615c49780a5c43a485"],["categories/JS/index.html","2b7860956d91d828ec6542e28bb5627a"],["categories/JavaScript/index.html","199d5a820628dd75152d66fdcf59684d"],["categories/index.html","4c03bcfe09a0864113b59477451c36dc"],["categories/js/index.html","8afa983c77de0a09d15a41e422403121"],["categories/js/oop/index.html","f86fb01e315fbe329f7cd390b6d00431"],["categories/js/oop/设计模式/index.html","7a17014e02af90404c6fed6c7b4c3e60"],["categories/js/ts/index.html","7e2db7fc46f1b87488ea0e450e8ce841"],["categories/js/设计模式/index.html","83e7ad5ba65a4bc68f25b3c74862ec46"],["categories/react/index.html","8c943155bc06537bbdeed146808025b0"],["categories/vue/index.html","89a5c046f36bd312135e7fb660d814d7"],["categories/vue/国际化/index.html","1e0f6de66670965a636b202dc1f49918"],["categories/vue/配置/index.html","46a0f228b4ba80b550fa45dc42528d46"],["categories/webpack/index.html","1f4a2a42fff9b16ec9a8f6cab5e2ab75"],["categories/前端框架/index.html","4e54914875066964e8f4cdfdfec482df"],["categories/小程序/index.html","b3fc12c1845f5f31c58e68f252e880ed"],["categories/工具/index.html","eb40ea0cbde5de0647edd180c23c6586"],["categories/心情/index.html","665f15da6481b638fad67c66c2583527"],["categories/性能优化/index.html","94653efa6e0430a2b4aa8f4a49d7a26d"],["categories/总结/index.html","61691a472e0c261ca1e4fce296d85b62"],["categories/环境/index.html","d9638c2bb8bf1c4072f0126f9c318985"],["categories/解决方案/index.html","8b697a2d9afb5e088f1dd867bb9b4f5c"],["categories/设计模式/index.html","35040ce92b2a10fc09ec91bebc2b4321"],["categories/配置/index.html","4aacbd56c392dbb114d3983b358455cc"],["categories/面试/index.html","8fabb7172fa5bf0cb01c722694358fe2"],["css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","49256349f97193eb64c08a9137236bd0"],["gallery/index.html","2a122bc7e0335e0591aa9c1a242c26d4"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","fd27c5dceac26210acdc8d4cf9c6520d"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","ae3d001c14f0d1803e52eb38c0a2afe6"],["page/3/index.html","659f50421606f0e19d9ba8e0666c1021"],["slides/index.html","450dc54ae3d070b08284451b31a42080"],["tags/ES6/index.html","155af98592adbefd4bddcfb210e5ae26"],["tags/axios/index.html","c5f8b021be85e5cf06f8c7eb52966085"],["tags/css3/index.html","9fdf8bc79217ca00af7936428e8bc20f"],["tags/curry/index.html","daccefa70794ec9d2361e3eb07792120"],["tags/demo/index.html","0914cdd7240f5e37bf24adb240fddb4f"],["tags/es6/index.html","4d218511c0ca4f66c8bceaedb9d8900f"],["tags/eslint/index.html","e58c70499af88b62cedb1a8956f47610"],["tags/index.html","aec0d2cd12c1ca1a4bc4d44a4de227e8"],["tags/js/index.html","a72f5bd0d37e039fff514f96a9a7bbb9"],["tags/jsonp/index.html","679daf28d13522b21d05e66aa2cc25c3"],["tags/mock/index.html","4bd6d7ed0a5d8be0d235cb178ac55c0c"],["tags/mpvue/index.html","2d9a7d0f8d267ddd05d350ff1d735265"],["tags/mvvm/index.html","f1b274188ff6308050b645fb2de080c2"],["tags/nuxt/index.html","be42c0700997a767053ae2239ee4fd2d"],["tags/oop/index.html","57d06b7f2edfb08dd2c62103a2b5eb22"],["tags/promise/index.html","640317a986cc01fc0fd9bcf120711278"],["tags/react/index.html","fc981b48a859cfba29ff4b37a6caa7df"],["tags/rem/index.html","a4520b2a9372b8ff7fe9cc4c65714fea"],["tags/reveal-js/index.html","11b4b3739b9706f5f3a193c4016c79e6"],["tags/ts/index.html","70446fc092bf99746153f630c0d3aeae"],["tags/underscore/index.html","7b15a3b50c6151de7dd9a7772b556ed7"],["tags/vscode/index.html","37e32f98a1d19d0205e046d0697663e0"],["tags/vue-i18n/index.html","b1e0f900d0675543c146fb94e96b1ee9"],["tags/vue/index.html","325c87aa35a6cc902756177595eda990"],["tags/webpack/index.html","085f3c1e92e43556404cba26bf5b258c"],["tags/发布订阅/index.html","ef9a72cdd616410a4e678031ec28e46e"],["tags/填坑/index.html","608025e081c31558a3f5e07a38fb462f"],["tags/实战/index.html","c55094f856a56d9e10428e9da0cf9955"],["tags/对象拷贝/index.html","7ba1638fbbecb3113ffa54579d57c3f5"],["tags/小程序/index.html","c89646071544ce307103f9632dfc8116"],["tags/引用/index.html","f2ff27d89e76f39225afb72cae23602b"],["tags/性能优化/index.html","b16547d7ebd3fbd124d9b0077aac0314"],["tags/总结/index.html","12557f31e831577abc9c623c6522d3ce"],["tags/服务端渲染/index.html","f31fec83f899b911aba642e728c509c1"],["tags/杂记/index.html","a5b74451308dca1498a571d9a53bda17"],["tags/正则表达式/index.html","c4fb8a52c295fc56b9712b2122a8a39a"],["tags/源码/index.html","bfaf5bd88a5b19e67840d242b08e12b5"],["tags/移动端/index.html","2cffe14070483f4db7bf17dc48e3e406"],["tags/自适应/index.html","e75aff99ae9a9ca1741619e4db94f826"],["tags/装机/index.html","f001121473adc7a92e359641d0315953"],["tags/观察者/index.html","77bf5916c207354bcc834bdd0276d74b"],["tags/设计模式/index.html","c8918cc64ac148c7e43209039d15d7da"],["tags/跨域/index.html","c71879cb124ab7c87b2c0cc6898455e8"],["tags/转载/index.html","72f94560ab53f96b3066910d509a0de6"],["tags/面试/index.html","7cd3d34f55ca17699a893ca3e0840f76"]];
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







