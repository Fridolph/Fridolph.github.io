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

var precacheConfig = [["D:/gitee/myblog/public/2016/06/04/【JS】用Jsonp解决跨域问题/index.html","e948e576bee5e0c20083f2c1e184e0bc"],["D:/gitee/myblog/public/2016/08/28/【JS】解析url字符串/index.html","bbe2b651bb09be0f5c4d8e8a2a7f4d54"],["D:/gitee/myblog/public/2016/09/21/【JS】写一个累加函数/index.html","f47b5d732982088856849b2ff269146b"],["D:/gitee/myblog/public/2017/01/22/【配置】ESLint常用配置，规范代码/index.html","533bd946b7cf86f06e660e3f0ea28b8d"],["D:/gitee/myblog/public/2017/02/20/【CSS】纯CSS3手工打造变形金刚/index.html","49ebd2dd87e2e482e9e32419350fd872"],["D:/gitee/myblog/public/2017/02/20/【配置】VS Code常用插件整理/index.html","e3b18d19cb03071904f8c05283a62676"],["D:/gitee/myblog/public/2017/05/15/【起航】hexo博客/index.html","cde5aacc3ffab1fd8e72ce6a3516598d"],["D:/gitee/myblog/public/2017/06/02/【学习】underscore源码学习（一）——核心架构/index.html","ad730f051fb42c1439d999287b17bb9a"],["D:/gitee/myblog/public/2017/06/05/【学习】underscore源码学习（二）——集合函数/index.html","e99ffc8b015d51423071c3e3f74e6faa"],["D:/gitee/myblog/public/2017/06/09/【学习】underscore源码学习（三）——Array方法/index.html","36b138ceec4456f5cec4162fe66663d7"],["D:/gitee/myblog/public/2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","ed86c4b187c623c23c3ae9d4472466a0"],["D:/gitee/myblog/public/2017/07/17/【JS】深入理解ES6——块级作用域绑定/index.html","dd7d55a071f3d6a38817419e5cd9be11"],["D:/gitee/myblog/public/2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","dba5f1877f321863467d0f16b03de614"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","0d2702d1e940f8f6c716676a3b331ce6"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","5481305c1e6e4f77c63394d8f63fc70f"],["D:/gitee/myblog/public/2017/08/01/【性能】预渲染技术/index.html","41f108f55dbb35a30d482b03fdcc81d2"],["D:/gitee/myblog/public/2017/08/02/【JS】深入理解ES6——JavaScript中的类/index.html","9650cabf78c3f99fdda83b135cfd3759"],["D:/gitee/myblog/public/2017/08/12/【JS】深入理解ES6——Promise与异步编程/index.html","e41e3ffe3719efaec0083829cb395998"],["D:/gitee/myblog/public/2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","aa297acdff8f31f5739bc6516c06fdeb"],["D:/gitee/myblog/public/2017/09/05/【Vue】vue-i18n踩坑记录/index.html","301c43f148c5a9b42ae17d6083c0217a"],["D:/gitee/myblog/public/2017/09/11/【JS】导出图片和导出html/index.html","e3ff86523d763cb117f9ff6338de4421"],["D:/gitee/myblog/public/2017/10/14/【Vue】iview按需引入相关配置/index.html","364746f1c55b62016e99c6acaedcabf3"],["D:/gitee/myblog/public/2017/11/01/【JS】面向对象相关设计模式/index.html","b05407c2838d6aa4e3b7d6cae7083295"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/index.html","a8a77c8a55cf655372c182c71efdb036"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["D:/gitee/myblog/public/2017/12/20/【React】从基础开始再来温习React，相关学习整理/index.html","fd3fdca1b7c1b40638f4f222b11d8d85"],["D:/gitee/myblog/public/2017/12/28/【React】进阶React的重要知识点/index.html","7d2c846323b64c6abec788de58eb145d"],["D:/gitee/myblog/public/2018/02/04/【Mock】搭建部署自己的easy-mock服务/index.html","569c69473efc8aee78546c0d2d3c40ce"],["D:/gitee/myblog/public/2018/02/26/【JS】应用正则表达式（二）/index.html","3360ffe29ae6205e40354fda56f6c80a"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/index.html","0d8818aa7c63a211ea598a5f01a24d43"],["D:/gitee/myblog/public/2018/03/29/【解决方案】移动端布局解决hotcss/index.html","8b811a2a3b378dc5428c36ae28f84334"],["D:/gitee/myblog/public/2018/04/03/【学习】Reveal.js一个Web演示文稿框架/index.html","fb2a22fd13f1cb8cd83e30a75bfd2099"],["D:/gitee/myblog/public/2018/04/10/【工程化】webpack4.5升级踩坑/index.html","e9e8f02a95975a058dd9564f4d211bc7"],["D:/gitee/myblog/public/2018/04/11/【Vue】实现原生双向绑定/index.html","d7bc659ab77303d6095420655fd8a83b"],["D:/gitee/myblog/public/2018/04/14/【Vue】理解Vue生命周期/index.html","307df7ba4027a03f6eda2ddaab3f53d0"],["D:/gitee/myblog/public/2018/04/15/【JS】函数柯里化[转载]/index.html","7c233558c5dd4f161465f5a3e9f6326a"],["D:/gitee/myblog/public/2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","ea49e3a8aa552ca87fb26226d306b5bb"],["D:/gitee/myblog/public/2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","329352cf83d9bf84364a449617831fa4"],["D:/gitee/myblog/public/2018/04/25/【TS】vue与typescript集成/index.html","dd03168112257e58f42306d3d1a608f3"],["D:/gitee/myblog/public/2018/04/26/【TS】装饰模式与vue-property-decorator/index.html","ad83a87023603ec0cf7c60e5be1edd04"],["D:/gitee/myblog/public/2018/05/01/【TS】使用vuex-class/index.html","ad15d66ba1bd4d13171c35a999998192"],["D:/gitee/myblog/public/2018/05/07/【小程序】mpvue开发小程序初体验/index.html","9f50281add4cf2f8a3f25be6ff1e8435"],["D:/gitee/myblog/public/2018/06/03/【年总结】提升学习效率，良好习惯养成与坚持/index.html","e91ca2fd4b1b9e49a9b68a8415dfe4e1"],["D:/gitee/myblog/public/2018/06/13/【设计模式】从订阅发布模式说起/index.html","dea6a693c203fd1c4ee064fc75fa956a"],["D:/gitee/myblog/public/2018/06/23/【JS】变量声明与赋值，引用、值传递与对象拷贝/index.html","331ebdbb5a6f497e4d3e2d7fc30d6891"],["D:/gitee/myblog/public/2018/06/29/【JS】学习正则表达式（一）/index.html","e37b22d0d242d6ad9fd4f6a9d1fd18dd"],["D:/gitee/myblog/public/2018/07/07/【跨域】理解跨域及相关解决方案/index.html","1c7629e6dc17938a1903e45bdcf1b622"],["D:/gitee/myblog/public/2018/07/14/【JS】脚本错误及错误捕获/index.html","0c1d8cddde4af3e83524f4e3ec6f1dc0"],["D:/gitee/myblog/public/2018/07/20/【数据结构】栈、队列、链表及其区别/index.html","125374a708b77e718d13d87391bc83c0"],["D:/gitee/myblog/public/2018/07/28/【学习】cookie、session和token/index.html","8cd61527e1561c4a158667e0246c0ba5"],["D:/gitee/myblog/public/2018/11/15/【Node】学习stream模块/index.html","59581b9203f692d98799b7a5bdc24c61"],["D:/gitee/myblog/public/2019/01/20/【性能】1资源压缩与合并/index.html","80cfb254b0c38813562a98d02a810d3f"],["D:/gitee/myblog/public/2019/01/22/【性能】2图片优化相关/index.html","da1a65992a8da20bcd04031bf24bfd0b"],["D:/gitee/myblog/public/2019/01/27/【性能】3JS加载与执行/index.html","cc19bdaaff3d2057bfea3d6d13c3f497"],["D:/gitee/myblog/public/2019/01/30/【性能】4懒加载与预加载/index.html","fc119aec4006c86b7f0ed94b7abe00f7"],["D:/gitee/myblog/public/2019/01/31/【性能】5回流与重绘/index.html","0a0c1909c8ecce9067d6f20ba0b01679"],["D:/gitee/myblog/public/2019/02/02/【性能】6浏览器存储/index.html","4c9bbeeb37f4ab388c65c98eb5e6f073"],["D:/gitee/myblog/public/2019/02/03/【性能】7浏览器缓存优化/index.html","258198bcf24f2b3792b56ee721b95f0f"],["D:/gitee/myblog/public/2023/12/28/【总结】2023年底面临的危机及一些反思/index.html","0a2e79fe796471cec0c6df368b549c64"],["D:/gitee/myblog/public/404.html","be0c6fc7e3cc75580f52be414c315b17"],["D:/gitee/myblog/public/404/demo.html","2d91e9fd9a004289f9392d57da95c7e2"],["D:/gitee/myblog/public/archives/2016/06/index.html","86c2d639c53890fdc28859fb2f969df3"],["D:/gitee/myblog/public/archives/2016/08/index.html","90902ba27f9b35b273db9cfb13e742cd"],["D:/gitee/myblog/public/archives/2016/09/index.html","f845c4f97c54906c39623c6a448508e5"],["D:/gitee/myblog/public/archives/2016/index.html","b15336d971438574b6ae430f333c9c24"],["D:/gitee/myblog/public/archives/2017/01/index.html","37503559aa7a07e8678c20f1f3ade0d8"],["D:/gitee/myblog/public/archives/2017/02/index.html","529339d2ffe0a2dba3d10f291b31ccd8"],["D:/gitee/myblog/public/archives/2017/05/index.html","cc47685cca62447d149e0c3cff3971ba"],["D:/gitee/myblog/public/archives/2017/06/index.html","bb9a63c8bd270e1921f9cdbc3f7f6cd6"],["D:/gitee/myblog/public/archives/2017/07/index.html","76b7c2c9927b0ace2136940958294475"],["D:/gitee/myblog/public/archives/2017/08/index.html","cbab384df498b54a753064d3d5b02de8"],["D:/gitee/myblog/public/archives/2017/09/index.html","4e12521b6166bdbe66f6d82dadda20f3"],["D:/gitee/myblog/public/archives/2017/10/index.html","f87681ee70f9f9c932f09d797bddb2c8"],["D:/gitee/myblog/public/archives/2017/11/index.html","060a4e70cba84a10d84e35cdfee44c34"],["D:/gitee/myblog/public/archives/2017/12/index.html","16d71d4915dcc2e01f9eb475fb6398bf"],["D:/gitee/myblog/public/archives/2017/index.html","e5b5d36e84f947f40e45ef9baaecca52"],["D:/gitee/myblog/public/archives/2017/page/2/index.html","b4335d41fc9123ce792fa9c7d40a214e"],["D:/gitee/myblog/public/archives/2018/02/index.html","27562511d27f5466bbf59d538b1c75ee"],["D:/gitee/myblog/public/archives/2018/03/index.html","9099549841e95b2a159f8b9817adf7ae"],["D:/gitee/myblog/public/archives/2018/04/index.html","7823c17d02f88698dead88348529a0a4"],["D:/gitee/myblog/public/archives/2018/05/index.html","18e4ef458909d3f455b43b54b7afc15c"],["D:/gitee/myblog/public/archives/2018/06/index.html","25adcab7e947e1a06bd97025bdc4a6f1"],["D:/gitee/myblog/public/archives/2018/07/index.html","dbf6731c2a7c55171630e0d274b14436"],["D:/gitee/myblog/public/archives/2018/11/index.html","f8bd046bd43c8f32fa8f18f024a03eb6"],["D:/gitee/myblog/public/archives/2018/index.html","29131662716712fde3d7b7cdefc400a7"],["D:/gitee/myblog/public/archives/2018/page/2/index.html","6c81bb51f88ce4a9a88a5ca6c5d7b28a"],["D:/gitee/myblog/public/archives/2019/01/index.html","82dc116030163adf9d7d6155a40e38f1"],["D:/gitee/myblog/public/archives/2019/02/index.html","61a6ed4049f365ea0ab2fe151add7f50"],["D:/gitee/myblog/public/archives/2019/index.html","b3a017708c0fc341d3e0cb264287d15b"],["D:/gitee/myblog/public/archives/2023/12/index.html","79f2d491830002665c51056d06c977ad"],["D:/gitee/myblog/public/archives/2023/index.html","6157796bde9456874200574d477e9220"],["D:/gitee/myblog/public/archives/index.html","320f774f290375ff6d743596fefd9f9c"],["D:/gitee/myblog/public/archives/page/2/index.html","39facc6fb001632e46b8d4fd79937166"],["D:/gitee/myblog/public/archives/page/3/index.html","e196468a664d41041ba17d8013a634ec"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["D:/gitee/myblog/public/books/index.html","8cc33f85601bb89a54fd25637c47285a"],["D:/gitee/myblog/public/categories/CSS/index.html","a8b822a74bc3e8cb5564de9eb7dfc466"],["D:/gitee/myblog/public/categories/JavaScript/index.html","00556bede8104bf47eeb2cf196b5e643"],["D:/gitee/myblog/public/categories/JavaScript/page/2/index.html","dc8e275965bcd0f7dcd4b4209ea323e1"],["D:/gitee/myblog/public/categories/React/index.html","227be55c381fd1188a241cff69afe32f"],["D:/gitee/myblog/public/categories/TypeScript/index.html","a0f5f3ead3583b257506c21af8dd942d"],["D:/gitee/myblog/public/categories/index.html","4b00d74494bfe3b74929d82daaf9f924"],["D:/gitee/myblog/public/categories/其他/index.html","da4f82a3e01e9494844c202f31a88bc9"],["D:/gitee/myblog/public/categories/学习/index.html","620d442052227c7ec66b20ab7aa2c9c7"],["D:/gitee/myblog/public/categories/工程化/index.html","c05ce68c39c49bd2cb8cb95b0af5b2ab"],["D:/gitee/myblog/public/categories/性能/index.html","bb707666104f66d6049e04b633c9913b"],["D:/gitee/myblog/public/categories/总结/index.html","6ad547f16b85879c44d10027011058d2"],["D:/gitee/myblog/public/categories/调研/index.html","6b02432fbd2bbb70a3d2bebaa97135ee"],["D:/gitee/myblog/public/categories/调研/性能/index.html","430f4166ed3c9a4031450d3801767ddd"],["D:/gitee/myblog/public/categories/配置/index.html","817653aa6318cc076c2d692a968388a0"],["D:/gitee/myblog/public/categories/面试/JavaScript/index.html","cf163bdd500c0be89a35d2ee485961cc"],["D:/gitee/myblog/public/categories/面试/index.html","66fa756d8c97623bb6e1387e8c06832a"],["D:/gitee/myblog/public/css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["D:/gitee/myblog/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/demo/index.html","9acd5273b68450b6c9dd2980414aea4d"],["D:/gitee/myblog/public/gallery/index.html","9510b8c88a1966270f7648f4cd91b44b"],["D:/gitee/myblog/public/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["D:/gitee/myblog/public/img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["D:/gitee/myblog/public/img/config/avatar.jpg","33c5c7a963345da5533644b727f6dd9b"],["D:/gitee/myblog/public/img/gallery/2015/01.jpg","9fda788e8cc2ed91030358053f85d774"],["D:/gitee/myblog/public/img/gallery/2015/02.jpg","4198b24a86cb8087a428723ce0d057a3"],["D:/gitee/myblog/public/img/gallery/2015/03.jpg","471fd7f31ddb5084cb9909c3c4a164dd"],["D:/gitee/myblog/public/img/gallery/2015/04.jpg","373b9db1c9f0b0522e2769d534de01f5"],["D:/gitee/myblog/public/img/gallery/2015/05.jpg","cd2802a1ab2163af009c3540524ed447"],["D:/gitee/myblog/public/img/gallery/2015/06.jpg","64357ea216c5748cfa69791c06e949e4"],["D:/gitee/myblog/public/img/gallery/2015/07.jpg","980d6c887b12828d84209aeaa1a1a792"],["D:/gitee/myblog/public/img/gallery/2015/08.jpg","d28bb790ba5b6e709d7d663a18042e4c"],["D:/gitee/myblog/public/img/gallery/2015/09.jpg","84575d3800dcdcf5057d327790229a16"],["D:/gitee/myblog/public/img/gallery/2015/10.jpg","aa27c8a114fa427f5ab783a6695d052a"],["D:/gitee/myblog/public/img/gallery/2015/11.jpg","9192bd68b16a6a33bfefd0146c947ca4"],["D:/gitee/myblog/public/img/gallery/2015/12.jpg","825638f1851602c4a3cc7fb2b816dfb0"],["D:/gitee/myblog/public/img/gallery/2015/13.jpg","11c5209f75aef602bcafc6f7e30aa126"],["D:/gitee/myblog/public/img/gallery/2015/14.jpg","c750bba27f21e588e1cd36dd3abae045"],["D:/gitee/myblog/public/img/gallery/2015/15.jpg","0e7c148b76d157c07808a95cbd372538"],["D:/gitee/myblog/public/img/gallery/2015/16.jpg","84a4cd5c6490d52a431fb3cac23315f4"],["D:/gitee/myblog/public/img/gallery/2015/17.jpg","fff944453719876a407a8a8177495e0e"],["D:/gitee/myblog/public/img/gallery/2015/18.jpg","28cba5b2ebf33ddcef1df9b0a783536a"],["D:/gitee/myblog/public/img/gallery/2015/19.jpg","ad1b5179836b382b6d2c21501840f657"],["D:/gitee/myblog/public/img/gallery/2015/20.jpg","dd0ca42f122c6081a4cfda85912bd63d"],["D:/gitee/myblog/public/img/gallery/2015/21.jpg","8ca08987838a6b610645d132afa38728"],["D:/gitee/myblog/public/img/gallery/2015/22.jpg","0557995e43112c6e4eab5efb7bf2224e"],["D:/gitee/myblog/public/img/gallery/2015/23.jpg","d82aed1ea713f4a2967300ebcbd05fde"],["D:/gitee/myblog/public/img/gallery/2015/24.jpg","598a058f3fbd0b679db8650f4aff3feb"],["D:/gitee/myblog/public/img/gallery/2015/25.jpg","a9e9a8786a5ccae1f6064240429a3867"],["D:/gitee/myblog/public/img/gallery/2016/01.jpg","55e6afa4fdc93b16b57b8cfef5de9c0d"],["D:/gitee/myblog/public/img/gallery/2016/02.jpg","8e1ba9e15bf217134451e43721479daa"],["D:/gitee/myblog/public/img/gallery/2016/03.jpg","5ee13947ed9d162d4062479e5878f97f"],["D:/gitee/myblog/public/img/gallery/2016/04.jpg","cd24ac518f3e62d955999c4a845ecfd9"],["D:/gitee/myblog/public/img/gallery/2016/05.jpg","5c14834b3e4a409335a4b9acaf68f158"],["D:/gitee/myblog/public/img/gallery/2016/06.jpg","72cb2474c4921598265d21653fc49301"],["D:/gitee/myblog/public/img/gallery/2016/07.jpg","3ecbfdea75fdef8387e879d419433288"],["D:/gitee/myblog/public/img/gallery/2016/08.jpg","a65862a7cfedc48a68881539bd0a907c"],["D:/gitee/myblog/public/img/gallery/2016/09.jpg","ece6aef964d3ba2551564c5c7267afc9"],["D:/gitee/myblog/public/img/gallery/2016/10.jpg","4871dfbf60707e56744f4b969e914568"],["D:/gitee/myblog/public/img/gallery/2016/11.jpg","b15502e1a453fccbb659e4d0bddb1979"],["D:/gitee/myblog/public/img/gallery/2016/12.jpg","e69defd9eba0c1f41041aac8282dab31"],["D:/gitee/myblog/public/img/gallery/2016/13.jpg","404aad8efb76000f4035a7497efdc763"],["D:/gitee/myblog/public/img/gallery/2016/14.jpg","476faefd906521c0d252e6dd8ca1f2d9"],["D:/gitee/myblog/public/img/gallery/2016/15.jpg","1e777005f6bba8fda72ca9c6978224fe"],["D:/gitee/myblog/public/img/gallery/2016/16.jpg","ae300641f3db292df562cbd07b124119"],["D:/gitee/myblog/public/img/gallery/2016/17.jpg","fcc0b046816f6f565334cb75e18f6f84"],["D:/gitee/myblog/public/img/gallery/2016/18.jpg","b3164c434be829455458efdbcc597555"],["D:/gitee/myblog/public/img/gallery/2017/03.jpg","290167ba14399fa8d3b125e17999b5e5"],["D:/gitee/myblog/public/img/gallery/2017/04.jpg","79428f1a4a1a29c5074f1960bcb8dc4d"],["D:/gitee/myblog/public/img/gallery/2018/01.jpg","e1fb1d25a8ba1c8ee6af8bef2eb88736"],["D:/gitee/myblog/public/img/gallery/2018/02.jpg","2710772e9271e06e6d1e43b79373e692"],["D:/gitee/myblog/public/img/gallery/2018/03.jpg","a3fca686c28b1a61f62cd03f1800c1ac"],["D:/gitee/myblog/public/img/gallery/2018/04.jpg","6463db8e28fc07d14426b5c18ea436c7"],["D:/gitee/myblog/public/img/gallery/2018/05.jpg","750131574daa40534b57b4f56684011c"],["D:/gitee/myblog/public/img/gallery/2018/06.jpg","73076fb2c65592bef9da0551de372f60"],["D:/gitee/myblog/public/img/gallery/2019/01.jpg","07a547e48a4f8593d4bba5fe263b449c"],["D:/gitee/myblog/public/img/gallery/2019/02.jpg","9ee23c33247831f266ce523f09df9f81"],["D:/gitee/myblog/public/img/gallery/2019/03.jpg","2a60f430aaf362765426ce1d0b12bcb4"],["D:/gitee/myblog/public/img/gallery/2019/04.jpg","ad04a6e0279cfe156508765e12e020b7"],["D:/gitee/myblog/public/img/gallery/2019/05.jpg","09f056891d27c81bf2314f38b3171c2a"],["D:/gitee/myblog/public/img/gallery/2019/06.jpg","b234af5dee92ba69056f50bfa55ca43a"],["D:/gitee/myblog/public/img/gallery/2019/07.jpg","49ad420ce4f2fb3601aafaac81d31ce4"],["D:/gitee/myblog/public/img/gallery/2019/08.jpg","8e687f6c27716401ee80107039a5cb73"],["D:/gitee/myblog/public/img/gallery/2019/09.jpg","489d74d164bfd08a00af09c50f26d752"],["D:/gitee/myblog/public/img/gallery/2019/10.jpg","311097665eaf576e1d993f513e4a4969"],["D:/gitee/myblog/public/img/gallery/2020/01.jpg","e55210c94745c6d58f84779cbb6cf248"],["D:/gitee/myblog/public/img/gallery/2020/02.jpg","22c8e15469132e7b1a50de6065a984ed"],["D:/gitee/myblog/public/img/gallery/2020/03.jpg","b43ac60d014f1e949652e8b881fb52d1"],["D:/gitee/myblog/public/img/gallery/2020/04.jpg","3376e559891f32010e9790d99b65217d"],["D:/gitee/myblog/public/img/gallery/2020/05.jpg","5ac4cab0667d89270f1daad31dddaa4c"],["D:/gitee/myblog/public/img/gallery/2021/1.jpg","0153d88d57cc8932295de93fcc2395e1"],["D:/gitee/myblog/public/img/gallery/2021/2.jpg","cf4ce42f51b8bd285ab8fe01e050e8ec"],["D:/gitee/myblog/public/img/gallery/2021/3.jpg","d870124e3a6706e171658db44b7f1228"],["D:/gitee/myblog/public/img/gallery/2021/4.jpg","db0b95b9cc45a26d615b8bc37f20cba7"],["D:/gitee/myblog/public/img/gallery/2021/5.jpg","60f5ae772608b452bc91936eb11f5938"],["D:/gitee/myblog/public/img/gallery/2022/01.jpg","0437d66e14d09cdeadbffe17aa30ceda"],["D:/gitee/myblog/public/img/gallery/2022/02.jpg","11a28e3dd3c059d7e777f846203be10c"],["D:/gitee/myblog/public/img/gallery/2022/03.jpg","f80e4980c8a345bf2baa2cdd91bb809e"],["D:/gitee/myblog/public/img/gallery/2022/04.jpg","59755112a4e1411ca759413cd31caafa"],["D:/gitee/myblog/public/img/gallery/2022/05.jpg","b7af7a24d2e27da9172701be72f8e8bb"],["D:/gitee/myblog/public/img/gallery/2023/01.jpg","3815cde1eed61f6d23b066c619032e85"],["D:/gitee/myblog/public/img/gallery/2023/02.jpg","b8655e020dd6538e80a376e5b6f5e8f6"],["D:/gitee/myblog/public/img/gallery/2023/03.jpg","f062f6048c46a77d2b4d7895d7c3de59"],["D:/gitee/myblog/public/img/gallery/2023/04.jpg","feaba3e583fb992049355c8a9f532892"],["D:/gitee/myblog/public/img/gallery/2023/05.jpg","659f4c1921a2e03050f564649da256d5"],["D:/gitee/myblog/public/img/gallery/2023/06.jpg","953861441bf852d4d8e2f4503c8258b3"],["D:/gitee/myblog/public/img/gallery/2023/07.jpg","173f8df0e12672f5dbb64bf6976d1d21"],["D:/gitee/myblog/public/img/gallery/2023/08.jpg","8c04a7cc9cf781b0929964324899d02a"],["D:/gitee/myblog/public/img/gallery/2023/09.jpg","4dc9f88bf5cc347db7ea9a8f4861abc6"],["D:/gitee/myblog/public/img/gallery/2023/10.jpg","dc5dd29e8df37b86be3e8f4aa729116f"],["D:/gitee/myblog/public/index.html","1193a942c6e6e09d0fd9f168cd1c9c2e"],["D:/gitee/myblog/public/js/copy.js","f4607057c0513bd07a69fcac08121979"],["D:/gitee/myblog/public/js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["D:/gitee/myblog/public/js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["D:/gitee/myblog/public/js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["D:/gitee/myblog/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["D:/gitee/myblog/public/js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["D:/gitee/myblog/public/js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["D:/gitee/myblog/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["D:/gitee/myblog/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["D:/gitee/myblog/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["D:/gitee/myblog/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["D:/gitee/myblog/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["D:/gitee/myblog/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["D:/gitee/myblog/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["D:/gitee/myblog/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["D:/gitee/myblog/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["D:/gitee/myblog/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["D:/gitee/myblog/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["D:/gitee/myblog/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["D:/gitee/myblog/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["D:/gitee/myblog/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["D:/gitee/myblog/public/js/transition.js","bd261a5dda799613501070ecc19d6e69"],["D:/gitee/myblog/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["D:/gitee/myblog/public/page/2/index.html","a5db4bc36d11e31fc348fdbf801a0b9e"],["D:/gitee/myblog/public/page/3/index.html","1a21540fa10543bcfa329932bb23850a"],["D:/gitee/myblog/public/slides/index.html","2b74cab0a3a65a69213831db023fb64b"],["D:/gitee/myblog/public/tags/ES标准/index.html","ec943a97d54b07a9e2d8819754c842a8"],["D:/gitee/myblog/public/tags/Error/index.html","ef4d6d4265cb80ae90725b3453bb7b65"],["D:/gitee/myblog/public/tags/React/index.html","7f48fd9c1904fd36e52337320deacc14"],["D:/gitee/myblog/public/tags/axios/index.html","7cd099aae86fc5a37195e8728634f1e0"],["D:/gitee/myblog/public/tags/cookie/index.html","4d2d9ebd5c08d3098ccad44f56cbcdc4"],["D:/gitee/myblog/public/tags/css/index.html","6fa8c1e291895ea74ad495763ad4b5a0"],["D:/gitee/myblog/public/tags/curry/index.html","684d157c027ce29ebd64f8293832ab07"],["D:/gitee/myblog/public/tags/demo/index.html","80487ecce3ea2d5a014b726dc2d6199e"],["D:/gitee/myblog/public/tags/es6/index.html","ae4c1afaaa59701e7936586dfe6acaf4"],["D:/gitee/myblog/public/tags/eslint/index.html","6001940a1ab3a8efef3c0ccc93e5e7c2"],["D:/gitee/myblog/public/tags/http/index.html","b42ba47a6bab7718be95dc90014ace21"],["D:/gitee/myblog/public/tags/index.html","d295195fce6251d33aee367aebf9973f"],["D:/gitee/myblog/public/tags/iview/index.html","7e50290452bd308781200ab8527a2c8a"],["D:/gitee/myblog/public/tags/js/index.html","17ef15ce1b7fd9d7f359fcd20c6c5a69"],["D:/gitee/myblog/public/tags/jsonp/index.html","5233429c95620458ea51945c87f32f05"],["D:/gitee/myblog/public/tags/localstorage/index.html","97c336701fdc8c5324b3157609aab0a9"],["D:/gitee/myblog/public/tags/mock/index.html","5dd923cb441e404502b65379bdd91e6f"],["D:/gitee/myblog/public/tags/mpvue/index.html","5f9ae3d11dc81dd0ee1688a07ea0f063"],["D:/gitee/myblog/public/tags/mvvm/index.html","fefedadaf5529f6e5b793d32af2f6abd"],["D:/gitee/myblog/public/tags/node/index.html","0c26de02a638713e30514a5d043b54a6"],["D:/gitee/myblog/public/tags/nuxt/index.html","0506dcfaf4b405fb1be9dd3b607293a5"],["D:/gitee/myblog/public/tags/nvm/index.html","ccf603cd67c614fbe7b005fabca42364"],["D:/gitee/myblog/public/tags/oop/index.html","c29ebb3483a5ffb0d4cef3f6c6bff211"],["D:/gitee/myblog/public/tags/promise/index.html","9119da11a2719d1b2982950fc132d305"],["D:/gitee/myblog/public/tags/rem/index.html","591a161b93b320bd59b72e31ce543c72"],["D:/gitee/myblog/public/tags/reveal-js/index.html","486751fcc114436f5631850dea5ae237"],["D:/gitee/myblog/public/tags/session/index.html","6b58e6bc09c3f32af93a985168f587eb"],["D:/gitee/myblog/public/tags/sessionstorage/index.html","d2088714d050df1d6172e0500d6a951b"],["D:/gitee/myblog/public/tags/stream/index.html","1331832c6b7d91a28aceba68efd523da"],["D:/gitee/myblog/public/tags/token/index.html","73575ae580c2fe9400d008928ce9c1eb"],["D:/gitee/myblog/public/tags/ts/index.html","29cf9abc2c76e5cde1e8a2010518ce97"],["D:/gitee/myblog/public/tags/underscore/index.html","cb2a2a35375b020ab65e7014b3d495e2"],["D:/gitee/myblog/public/tags/vscode/index.html","f1630592b1a73ab726fa5e43faa4bd26"],["D:/gitee/myblog/public/tags/vue-cli/index.html","bec1a4d7161876137a6d48ff56b4d38d"],["D:/gitee/myblog/public/tags/vue-i18n/index.html","60eeef9bbb06586cc9e0a26ef6769e1f"],["D:/gitee/myblog/public/tags/vue/index.html","6e88abc027b8989bd7c002d6f45dbfcd"],["D:/gitee/myblog/public/tags/webpack/index.html","1380eff7ca29d7251f8742fc9cb2d9d9"],["D:/gitee/myblog/public/tags/压缩/index.html","18856a593f6e52558a13410f89247b89"],["D:/gitee/myblog/public/tags/发布订阅/index.html","2c95d18278efe5a6b9295783e78520eb"],["D:/gitee/myblog/public/tags/吐槽/index.html","5f6c0d5b81325713896439514d23e289"],["D:/gitee/myblog/public/tags/回流/index.html","4b1feac8b8fe9c286a509c1d0a4304fe"],["D:/gitee/myblog/public/tags/国际化/index.html","e41920f96b9325768b32fcfc4a257618"],["D:/gitee/myblog/public/tags/图片/index.html","0f287aca4bad3b7faffcab4b35c5092d"],["D:/gitee/myblog/public/tags/实战/index.html","c7ef9f41ea2452d16dcca493a1295c0c"],["D:/gitee/myblog/public/tags/小程序/index.html","2c17a26986cf0c50ad8850af155ec046"],["D:/gitee/myblog/public/tags/引用/index.html","e6d7730b37db8402963b02188c69c05d"],["D:/gitee/myblog/public/tags/思考/index.html","55b227c261c5b1df713652fe60ec1c87"],["D:/gitee/myblog/public/tags/性能/index.html","b635fc3d90be5378cdfbe0f9b38e11b8"],["D:/gitee/myblog/public/tags/总结/index.html","20cfa631a1577a095da36d99df9248ca"],["D:/gitee/myblog/public/tags/懒加载/index.html","c4f43bcd301432f5c5b1035959e2a6fe"],["D:/gitee/myblog/public/tags/数据结构/index.html","9a5876872b7a84384adf9adfeb176c5a"],["D:/gitee/myblog/public/tags/服务端渲染/index.html","f0654252b826f1c379bac713fb2a2b94"],["D:/gitee/myblog/public/tags/框架/index.html","88be32db84a4cbb465ee1fa2acff232f"],["D:/gitee/myblog/public/tags/正则表达式/index.html","735c03a5f87ce35fd7fe6f3d45942a7b"],["D:/gitee/myblog/public/tags/渲染/index.html","2d0ba88c3f838651c238f0be5f27d0d6"],["D:/gitee/myblog/public/tags/源码/index.html","7b1999bd5892c9b250724859fede5309"],["D:/gitee/myblog/public/tags/移动端/index.html","38d2a54d0e65f7a7514a0afaf8b19d14"],["D:/gitee/myblog/public/tags/缓存/index.html","c1fafaaf0f09ce343fc0f2d45c1c4d69"],["D:/gitee/myblog/public/tags/自适应/index.html","50e1409027b404a9359ff7e140755cc9"],["D:/gitee/myblog/public/tags/装机/index.html","5bc0d91aad0edbe2931009c93f4c8a17"],["D:/gitee/myblog/public/tags/观察者/index.html","ce28fbe1cc4af900e9f9b72d27855c46"],["D:/gitee/myblog/public/tags/解题/index.html","41a005d0743c51d55f319f30e2209517"],["D:/gitee/myblog/public/tags/设计模式/index.html","632789534e8da70454909d202e983e56"],["D:/gitee/myblog/public/tags/跨域/index.html","c90b7921588182017d348fc42ada2599"],["D:/gitee/myblog/public/tags/重绘/index.html","97cd1d4aae3f7f084c0ecd1ab39b1e03"],["D:/gitee/myblog/public/tags/面试/index.html","d2c1ffa046f9627ecd31515807956099"],["D:/gitee/myblog/public/tags/预加载/index.html","133f98451518a13f09ce9d7035e07da1"],["D:/gitee/myblog/public/tags/预渲染/index.html","ac8369b8e6a2f0517ca24e1f315b9251"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
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

var createCacheKey = function(originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function(originalUrl,
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







