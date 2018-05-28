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

var precacheConfig = [["2016/06/04/【JS】用Jsonp解决跨域问题/index.html","715f97a36b1ee65ecae38232ff49a02d"],["2016/08/28/【解题】解析url字符串/index.html","d1f31d6e6ff961290b91f83156582e60"],["2016/09/21/【解题】写一个累加函数/index.html","647b7981e3cb904b06fdc71d33c39efe"],["2017/01/22/【配置】ESLint常用配置，规范代码/index.html","bbcc17fc26e170f5435c5a978a39af08"],["2017/02/20/【DEMO】纯CSS3手工打造变形金刚/index.html","9a1a6e4031daa14123f4568397c4797c"],["2017/02/20/【配置】VS Code常用插件整理/index.html","b3db705d8c9ef88091b133abd2d898b8"],["2017/05/15/【起航】hexo博客/index.html","693e279284b3f06730ba858dc4332583"],["2017/06/02/【源码】underscore源码学习（一）——核心架构/index.html","e911391c4ce9382776b7bebc13d00bc3"],["2017/06/05/【源码】underscore源码学习（二）——集合函数/index.html","f29363d359543d52ddaf0134eeb53959"],["2017/06/09/【源码】underscore源码学习（三）——Array方法/index.html","3dfa134890fd1e146d33a7a0ce7c978a"],["2017/07/07/【面试】首次作为面试官（一）/index.html","d4f90548ef479e0c2ea129912912b292"],["2017/07/08/【面试】首次作为面试官（二）/index.html","e5179f884cfce92e0938f5379f95e0f9"],["2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","6237707194d32b39d175b26aa70bc719"],["2017/07/17/【ES6】深入理解ES6——块级作用域绑定/index.html","fc4e1079c56e4a06a6ace066f8be5c88"],["2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","3bfc97aa656c9a92bb3b4570feaf7b63"],["2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","73a1b3eb7e26945949feb01f69c19066"],["2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","057ca12c0f7ecfc8d24dbf732525fe4e"],["2017/08/01/【调研&方案】预渲染技术/index.html","c2f88bbfbaa4d663ab3db3237d2826cf"],["2017/08/02/【ES6】深入理解ES6——JavaScript中的类/index.html","49bdf6dee481243bf046771b41c8a37b"],["2017/08/12/【ES6】深入理解ES6——Promise与异步编程/index.html","627ddc587ce7734de5b6cfe6938a2161"],["2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","d3ca59ee7936173d89c7112140403a5f"],["2017/09/05/【Vue】vue-i18n踩坑记录/index.html","9c50afaf9c4ec57d077be4675e847150"],["2017/09/11/【JS】导出图片和导出html/index.html","ca4a205f01ddc1b755c8586e831987e5"],["2017/09/28/【JS】学习正则表达式/index.html","b9ba3bcaab6fb644d3a8b9581a9d67c0"],["2017/10/14/【Vue】iview按需引入相关配置/index.html","efdc699ef994c68d7a4ebfc7edd9fe5d"],["2017/11/01/【JS】面向对象相关设计模式/index.html","205f13de19d8075467ac941c7cd088a2"],["2017/12/02/【JS】变量声明与赋值（一）引用与值传递/index.html","917810d27b9d1e291fbc49909eaa86d0"],["2017/12/04/【JS】变量声明与赋值（二）浅拷贝与深拷贝/index.html","2c9caadaf25bb45f3186942626b31843"],["2017/12/13/【设计模式】初识IOC/index.html","d7317282b8cce9c04866968f40932d5e"],["2017/12/20/【React】从基础开始再来温习React，相关学习整理/index.html","55e9dc81dd0bc1d5b3e91c22ecef819b"],["2017/12/28/【React】进阶React的重要知识点/index.html","fa63a48ba99f0783ea7d8c590de64686"],["2018/01/20/【web优化】（一）资源压缩与合并/index.html","e84c5e91a903f088128e76d9264e6d87"],["2018/01/22/【web优化】（二）图片优化相关/index.html","11f32c2aa22101eea5fe5f46ce12971b"],["2018/01/27/【web优化】（三）JS加载与执行/index.html","cea7bad717d127cead45467ddce2bef3"],["2018/01/30/【web优化】（四）懒加载与预加载/index.html","2850c7edf99030bc8ab8f8b4acc40997"],["2018/01/31/【web优化】（五）回流与重绘/index.html","6db40ad62ee9fdc523d68ad8931eafee"],["2018/02/02/【web优化】（六）浏览器存储/index.html","55a5736baa6799862df22b0c28443ec5"],["2018/02/03/【web优化】（七）浏览器缓存优化/index.html","f6311880d4d59bd5dd18c12900dc2e96"],["2018/02/04/【Mock】搭建部署自己的easy-mock服务/index.html","8c8851210152d530d3d251f3e33e8ebb"],["2018/02/26/【JS】学习正则表达式（二）/index.html","1cfd26dbd83ffa877897875cecc2a9cf"],["2018/03/15/【项目总结】vue-jd-finance/index.html","0a72f681f41d4dc2742bfae81d91258e"],["2018/03/29/【解决方案】移动端布局解决hotcss/index.html","4657f02b1af1835eff7a1cc7a7bde81e"],["2018/04/03/【框架】Reveal.js一个Web演示文稿框架/index.html","ad617a43feaa2705a18b32c8bff86337"],["2018/04/10/【构建】webpack4.5升级踩坑/index.html","37cb77f018a5043178b2f7e618723cdb"],["2018/04/11/【Vue】实现原生双向绑定/index.html","904f8a7269d9cb848c0f6cc91c7c390b"],["2018/04/14/【Vue】理解Vue生命周期/index.html","82ad1bbed8ca50723feee6d4a51d3356"],["2018/04/15/【JS】函数柯里化[转载]/index.html","6403c03408078ccf4b188ad812287d09"],["2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","093760204237dd0cbf4cd5d056c57c4e"],["2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","029e5cd9c2d2f2f52eddc31d72167370"],["2018/04/25/【TS】vue与typescript集成/index.html","eebbd3363c6e5de502055ca3a4502465"],["2018/04/26/【TS】装饰模式与vue-property-decorator/index.html","637895f610fa7922480cb73cbb0dcb57"],["2018/05/01/【TS】使用vuex-class/index.html","6ff16aaaa3118128cf7a9029162e6a59"],["2018/05/07/【小程序】mpvue开发小程序初体验/index.html","6817f728ae8e42147ac6f2981e5c490f"],["404.html","f9145614bb39ddfdd440dc3c47dbe8e5"],["404/demo.html","5b383c1768fecb1233b787898f153fb3"],["archives/2016/06/index.html","249f2697f26df58d05119ccd1a892943"],["archives/2016/08/index.html","cb4d5e8f6596bc2fc25ff8209c925da6"],["archives/2016/09/index.html","f9c5af4f7eb2121a36d9846bb5952c80"],["archives/2016/index.html","6f87a11cc7f3866344f47dd6199e9c4b"],["archives/2017/01/index.html","033e758ec7504d52597e482bc9cfa448"],["archives/2017/02/index.html","5e0f0f81348d25f91743c73b9ae34024"],["archives/2017/05/index.html","c9fb3aceab6982c95918fda5792260ec"],["archives/2017/06/index.html","97839287a93a7b1fbcc3358c510eb5c4"],["archives/2017/07/index.html","15a475ce52f1bbceebcd510b1982368f"],["archives/2017/08/index.html","3393b6372f15b1a0fba037bbd31bc5c3"],["archives/2017/09/index.html","983f22e5a2d9e62a4955926049e0694f"],["archives/2017/10/index.html","5610bb6f6151a7321e8508cab92dc6df"],["archives/2017/11/index.html","bfca0c8c9f2224af2d56d0b713a595f6"],["archives/2017/12/index.html","7970243b1b9ad94d356dbf1961bf303a"],["archives/2017/index.html","21e4e65cb91ceb04155463e21c51131c"],["archives/2017/page/2/index.html","e3d535ac4b070f74023fcb6633b061b0"],["archives/2018/01/index.html","5b10d329fd666bffa0da8f33b552e012"],["archives/2018/02/index.html","d6552a37275f58ec7b0ac95197341dbd"],["archives/2018/03/index.html","7bb0beb87574001c2f6ccd55f40e73f6"],["archives/2018/04/index.html","81a409e234b82a898ecf0de96a7a171f"],["archives/2018/05/index.html","3bfeb5be5e2ffd9a2eb89e533b842ea8"],["archives/2018/index.html","f0f1758f17fa16e40c8c98930df707a7"],["archives/2018/page/2/index.html","eb96f8c83a2533915943eddff8c92700"],["archives/index.html","ce47b0b5c12fdf23d53ab41b3eb30368"],["archives/page/2/index.html","c00baa4420db059ffeed551dd2669cb1"],["archives/page/3/index.html","861cb22763e0c44620616b474b7be9b8"],["assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["books/index.html","a280df799e1e869061d402302f349a75"],["categories/CSS/index.html","4ded3892136b99c3ec072e93999eff1b"],["categories/JS/index.html","b2ac891cd92d224b9eb58ec544efcb83"],["categories/JavaScript/index.html","566e720d6f7465e739e4648afba7e8da"],["categories/index.html","b2036f4588291b246398d172d10bb5c2"],["categories/js/index.html","729699f9bea64866f1f63d084d6a6a03"],["categories/js/oop/index.html","d1505280d16456ca698d64bcf3c904d6"],["categories/js/oop/设计模式/index.html","cf1f7d4ee93434bd4c4bcf0379c2217e"],["categories/js/ts/index.html","d2c235d3e93a96f51d54cef65c00241f"],["categories/js/设计模式/index.html","cab719bca728d5f6f197b49b575bdc0d"],["categories/react/index.html","0d3e99748752777d2bf3eee52903a30b"],["categories/vue/index.html","49b1e08326156d2980fcbef8886e8e13"],["categories/vue/国际化/index.html","1b4122782f19512ecd8003d62694dacd"],["categories/vue/配置/index.html","b85883543b1e7a295af028cc76683b4d"],["categories/webpack/index.html","401b2c7fe71dc221110b3c4ad9d9c186"],["categories/前端框架/index.html","f11f4414ab2f1d9fc6e8bffb810e12ca"],["categories/小程序/index.html","e3d8f1b6ce346a85aaa297dde3f2dacf"],["categories/工具/index.html","7380677377a9b421f9094847568a4bca"],["categories/心情/index.html","8db7b495bee6b76c9677acba9ccdebfa"],["categories/性能优化/index.html","12a18380dd3a3c07f15b5fd1f767b089"],["categories/总结/index.html","3496ae8edacf9885df06ff51e785fe7d"],["categories/环境/index.html","8cf620d3e621926394e61677544e8e71"],["categories/解决方案/index.html","e084877aa7e03a991f63de940b102680"],["categories/配置/index.html","633b0bee82ff36c50fb5a7b44a8b5e01"],["categories/面试/index.html","89d33aa09010c35c827e4bdbc2b3d313"],["css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["demo/index.html","c554b20a315864451d5b047b4a9c413a"],["gallery/index.html","0ea34ce30da8d2a3bb83cd5eb2090223"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["img/design/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["img/design/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["img/jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["img/jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["img/jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["img/jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["img/jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["img/jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["img/jsonp/err.jpg","eb652410d17e67da3a8c30ae324dad32"],["img/underscore/01.png","980b64dc6ad797a2128c8c3c99b77658"],["img/underscore/02.png","d3e56ec986eebc1eea4bc0931a97dd93"],["img/zhuanzai/bianliang.png","8c044ca404bfdabab3928b9044771efa"],["index.html","0310d0e2628e46e322b63aa1e8297a3d"],["js/copy.js","f4607057c0513bd07a69fcac08121979"],["js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","b97f309fcde8bd21ddf654756e142601"],["page/3/index.html","0201e56e226c2c4c17e4c962fe964018"],["slides/index.html","d5164257fcb32cedf0144a27ee438c72"],["tags/ES6/index.html","b76a236c6f011aaea480f19226b107cf"],["tags/axios/index.html","d9e3515eb172ecd716da6bf85f71bc09"],["tags/css3/index.html","d2a807ed56382c15d82748aec6c1b5fe"],["tags/curry/index.html","ede9856fb28e7421433b7612a801abf6"],["tags/demo/index.html","aec5442c13c98f7a52d7892bf9ce731d"],["tags/es6/index.html","bf8738e38cc4cfa23beb8d6c213803bf"],["tags/eslint/index.html","f68510381a535a7176797fb38c99b6c2"],["tags/index.html","29a01cc1990df0c06be99bba2e74a126"],["tags/js/index.html","63fea2e4119dbee9e0727eda21f5325f"],["tags/jsonp/index.html","2df9aa90dfb9f16ec3eae19311de0f2b"],["tags/mock/index.html","e68d4273374c274388333a06bb0de662"],["tags/mpvue/index.html","2b9bd3b0d07054ca6fada77d4fd44f83"],["tags/mvvm/index.html","54814d6f03c37ea15a186e96d22f41cd"],["tags/nuxt/index.html","1f8b974b56caec3c02629a1cccb5cb5a"],["tags/oop/index.html","9c949062f184f5e10de57acc25a763ef"],["tags/promise/index.html","0579035e63f2fe8319c46ff342a0464a"],["tags/react/index.html","053d3b455d1bd9a05daae1d08a68bb39"],["tags/rem/index.html","4110be04dc9b12d6dd3304dc0e45e00b"],["tags/reveal-js/index.html","e0460f18904101e7c721e85f0bf574de"],["tags/ts/index.html","9928b6f12534be1e02472dc740928058"],["tags/underscore/index.html","379bf0ba231413a1ef1bb317f8f62b3c"],["tags/vscode/index.html","b660631bab1e86ff19ccf4df57d8eeea"],["tags/vue-i18n/index.html","397f00eeed5618bcf2e7b34aae7062b1"],["tags/vue/index.html","335c2083e209dd2cb04583beb9615ec3"],["tags/webpack/index.html","d883d406b851ab985edcadcb7bfc19a5"],["tags/填坑/index.html","0fee2a1fc8cc8a91229d1e530d744bba"],["tags/实战/index.html","de9a06122957419c4b155a899167227f"],["tags/对象拷贝/index.html","3b8899991cc9a0a7396dae745fcfe77e"],["tags/小程序/index.html","c7b0732ed86d4bcbe1ce1e411fd6ae27"],["tags/引用/index.html","94053534e754dc0de66772284ab15c0b"],["tags/性能优化/index.html","fa00635ec5848d51327d527255934d45"],["tags/总结/index.html","38e55eab93ed74eb83bacb05e30e0ac6"],["tags/服务端渲染/index.html","dca7142308f88aa3bf102269035b8521"],["tags/杂记/index.html","359083419ce1dc8dd09fca547f278191"],["tags/正则表达式/index.html","a3fa2e351103b6eb3bf222b33ab90b3d"],["tags/源码/index.html","074048b0b77403f54b203d7297086b18"],["tags/移动端/index.html","8e475f3e351b302dfef0d74c78d8b71c"],["tags/自适应/index.html","f5ff063c06b312b0ee0cf8c127c41f4b"],["tags/装机/index.html","60ffa727ce64177f9bad153bd6d60418"],["tags/设计模式/index.html","a51d8d58854272d4b1e3732dd227bb8d"],["tags/跨域/index.html","bdf2888d72263e5b404ea8c8df51ea29"],["tags/转载/index.html","8d45628d81feb4f50ef737e142850253"],["tags/面试/index.html","633a1dcf49cb8db51b48a342b096244b"]];
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







