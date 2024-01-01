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

var precacheConfig = [["D:/gitee/myblog/public/2016/06/04/【JS】用Jsonp解决跨域问题/index.html","eff31f2cd404b0b8ca208310b477e209"],["D:/gitee/myblog/public/2016/08/28/【JS】解析url字符串/index.html","e62b70d4d99d5394db8efed4d97e40ca"],["D:/gitee/myblog/public/2016/09/21/【JS】写一个累加函数/index.html","b4ccc944de0107aa612d7ad4dde5b7c6"],["D:/gitee/myblog/public/2017/01/22/【配置】ESLint常用配置，规范代码/index.html","5c84838587210db3342c383e7025aa2a"],["D:/gitee/myblog/public/2017/02/20/【CSS】纯CSS3手工打造变形金刚/index.html","719b0b1d6f9258cb2cce578c507de0ba"],["D:/gitee/myblog/public/2017/02/20/【配置】VS Code常用插件整理/index.html","d2dd0db251b2aafbe2bf81c353f61c1e"],["D:/gitee/myblog/public/2017/05/15/【起航】hexo博客/index.html","231ce537b2029adca88d02c604ca1aef"],["D:/gitee/myblog/public/2017/06/02/【学习】underscore源码学习（一）——核心架构/index.html","3f7011943908580b56f30713d78f1353"],["D:/gitee/myblog/public/2017/06/05/【学习】underscore源码学习（二）——集合函数/index.html","7162f82967465e85c36e279ee04a371b"],["D:/gitee/myblog/public/2017/06/09/【学习】underscore源码学习（三）——Array方法/index.html","1ac848cf1ee0cbfb41192260f81f9467"],["D:/gitee/myblog/public/2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","fb2ceb8d82ccdb126f023b28080c14fa"],["D:/gitee/myblog/public/2017/07/17/【JS】深入理解ES6——块级作用域绑定/index.html","bd35dc002e5a123c1cc97cbc4820bd80"],["D:/gitee/myblog/public/2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","4732a47162425969075c6458dc742bcb"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","237e60208be9828fdb2a6c420f6d551f"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","a9d30d62c4d62b03c26f9625001f2421"],["D:/gitee/myblog/public/2017/08/01/【性能】预渲染技术/index.html","2676888499586337ca79cd1a0984bc41"],["D:/gitee/myblog/public/2017/08/02/【JS】深入理解ES6——JavaScript中的类/index.html","e30745045e836c78a127c3029ad52b6f"],["D:/gitee/myblog/public/2017/08/12/【JS】深入理解ES6——Promise与异步编程/index.html","48b20f456d57bce23213201fce144595"],["D:/gitee/myblog/public/2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","b96217a1a54aea2af0aea8b84cf00322"],["D:/gitee/myblog/public/2017/09/05/【Vue】vue-i18n踩坑记录/index.html","6be2500ddf473888fa271d23103021f3"],["D:/gitee/myblog/public/2017/09/11/【JS】导出图片和导出html/index.html","8445f3b0ce8924defaf01f246638f983"],["D:/gitee/myblog/public/2017/10/14/【Vue】iview按需引入相关配置/index.html","aff15d2f409e11e80c9648c91f27e03d"],["D:/gitee/myblog/public/2017/11/01/【JS】面向对象相关设计模式/index.html","0b4e86f7f0c51091706a3eb5e4d54c54"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/index.html","68e7746b111c84270b7817178e3d5fd9"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["D:/gitee/myblog/public/2017/12/20/【React】从基础开始再来温习React，相关学习整理/index.html","a6fcc01dd11868336592be9cdba15e5a"],["D:/gitee/myblog/public/2017/12/28/【React】进阶React的重要知识点/index.html","cfec4e30525eefab692432d194f60988"],["D:/gitee/myblog/public/2018/02/04/【Mock】搭建部署自己的easy-mock服务/index.html","3a56deeee31d38e7bd456b9b191f32a5"],["D:/gitee/myblog/public/2018/02/26/【JS】应用正则表达式（二）/index.html","a1c380d718cc09b3323d81883d581c6a"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/index.html","c0444e7d29858e0b862787e5ca186eeb"],["D:/gitee/myblog/public/2018/03/29/【解决方案】移动端布局解决hotcss/index.html","2194b5b5ba741bf42ee28c9a6b8a5e0d"],["D:/gitee/myblog/public/2018/04/03/【学习】Reveal.js一个Web演示文稿框架/index.html","87602469cc77766e50eac68259c34d1d"],["D:/gitee/myblog/public/2018/04/10/【工程化】webpack4.5升级踩坑/index.html","764c586c240eb643d59e0af2255602a8"],["D:/gitee/myblog/public/2018/04/11/【Vue】实现原生双向绑定/index.html","381a91fa8eb7d46a5fef91d664b41647"],["D:/gitee/myblog/public/2018/04/14/【Vue】理解Vue生命周期/index.html","0c8d5eba07e040f50e1ee55be7afba0b"],["D:/gitee/myblog/public/2018/04/15/【JS】函数柯里化[转载]/index.html","2dfbded33e116d0dbb50faf136ef17d9"],["D:/gitee/myblog/public/2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","ea8b35705fd3eccbaa2531e136aabe1c"],["D:/gitee/myblog/public/2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","11355699351a32a7b35234539e0517d0"],["D:/gitee/myblog/public/2018/04/25/【TS】vue与typescript集成/index.html","eb7391f3f7815949a502bbb18bab8768"],["D:/gitee/myblog/public/2018/04/26/【TS】装饰模式与vue-property-decorator/index.html","211e8e2c8a75faac8f34372b1ef448fd"],["D:/gitee/myblog/public/2018/05/01/【TS】使用vuex-class/index.html","c82cd9981c1a3f493a5df6baf85eb1a2"],["D:/gitee/myblog/public/2018/05/07/【小程序】mpvue开发小程序初体验/index.html","d3e259588ceec0526640712ba7de8a7c"],["D:/gitee/myblog/public/2018/06/03/【年总结】提升学习效率，良好习惯养成与坚持/index.html","5f8787297fa3b2bee1450b9c69dbc4bf"],["D:/gitee/myblog/public/2018/06/13/【设计模式】从订阅发布模式说起/index.html","81f0181595eb727e379b762676063504"],["D:/gitee/myblog/public/2018/06/23/【JS】变量声明与赋值，引用、值传递与对象拷贝/index.html","6621d44c3ac78759e6548c1b9a2c9a48"],["D:/gitee/myblog/public/2018/06/29/【JS】学习正则表达式（一）/index.html","03bf8e139578acfa65a7e7bb599f7db4"],["D:/gitee/myblog/public/2018/07/07/【跨域】理解跨域及相关解决方案/index.html","33d5269e94f9a43469269cbe55fdf796"],["D:/gitee/myblog/public/2018/07/14/【JS】脚本错误及错误捕获/index.html","8796044c128b2b0168cfd845344accc9"],["D:/gitee/myblog/public/2018/07/20/【数据结构】栈、队列、链表及其区别/index.html","e136e6a22431716c2089d68b96ba4f5a"],["D:/gitee/myblog/public/2018/07/28/【学习】cookie、session和token/index.html","b7cccec3b3a39db700b863b55646745f"],["D:/gitee/myblog/public/2018/11/15/【Node】学习stream模块/index.html","30e3ac8e69bbf3bd88ab2f5de91be8a8"],["D:/gitee/myblog/public/2019/01/20/【性能】1资源压缩与合并/index.html","80cfb254b0c38813562a98d02a810d3f"],["D:/gitee/myblog/public/2019/01/22/【性能】2图片优化相关/index.html","da1a65992a8da20bcd04031bf24bfd0b"],["D:/gitee/myblog/public/2019/01/27/【性能】3JS加载与执行/index.html","cc19bdaaff3d2057bfea3d6d13c3f497"],["D:/gitee/myblog/public/2019/01/30/【性能】4懒加载与预加载/index.html","fc119aec4006c86b7f0ed94b7abe00f7"],["D:/gitee/myblog/public/2019/01/31/【性能】5回流与重绘/index.html","0a0c1909c8ecce9067d6f20ba0b01679"],["D:/gitee/myblog/public/2019/02/02/【性能】6浏览器存储/index.html","4c9bbeeb37f4ab388c65c98eb5e6f073"],["D:/gitee/myblog/public/2019/02/03/【性能】7浏览器缓存优化/index.html","258198bcf24f2b3792b56ee721b95f0f"],["D:/gitee/myblog/public/2023/12/28/【总结】2023年底面临的危机及一些反思/index.html","ef5bd3ad2689a1eee93d98d98417ecc1"],["D:/gitee/myblog/public/404.html","3e271926120aef678866b7d4858e368a"],["D:/gitee/myblog/public/404/demo.html","4389c272df9e4cc4f448405a6435d39a"],["D:/gitee/myblog/public/archives/2016/06/index.html","592ec67d0f88d2d161279d8cfb77a540"],["D:/gitee/myblog/public/archives/2016/08/index.html","7adc968356c78fdbbeee00682b9f8f4b"],["D:/gitee/myblog/public/archives/2016/09/index.html","53ce52f86449a7e3ede73debac9eb698"],["D:/gitee/myblog/public/archives/2016/index.html","b5df6553d0574c1dbb5273bc651625cb"],["D:/gitee/myblog/public/archives/2017/01/index.html","3cf73bbce25cf0d13ecbb4c74b468447"],["D:/gitee/myblog/public/archives/2017/02/index.html","1dd40b0362fe7254d8672035f9ebe48d"],["D:/gitee/myblog/public/archives/2017/05/index.html","ce9ddfbc59b2d9fe8402beb053a0916e"],["D:/gitee/myblog/public/archives/2017/06/index.html","410a701cc3619e1a31a286b724bc0024"],["D:/gitee/myblog/public/archives/2017/07/index.html","25f1cbdaec4cbc7ef8e2b49a76aafd97"],["D:/gitee/myblog/public/archives/2017/08/index.html","5c0662e8a3464113c7b115837d88c343"],["D:/gitee/myblog/public/archives/2017/09/index.html","6f50121500e33fa398c78397bae8df17"],["D:/gitee/myblog/public/archives/2017/10/index.html","a106ce40f7130bb7f152fce9f52e912f"],["D:/gitee/myblog/public/archives/2017/11/index.html","82ed119d1b304110f6d5c9cffc8b110a"],["D:/gitee/myblog/public/archives/2017/12/index.html","57066a49fc6a93342a32eb79396536fa"],["D:/gitee/myblog/public/archives/2017/index.html","f77b8cb80e5e83072d3c02efab27c18f"],["D:/gitee/myblog/public/archives/2017/page/2/index.html","427a72ae42e2ba3162491b8a509ac10f"],["D:/gitee/myblog/public/archives/2018/02/index.html","a280fb7e6cd2b52be2360c18a8ae38d4"],["D:/gitee/myblog/public/archives/2018/03/index.html","e6e8ab3250411117f232c22a40069b09"],["D:/gitee/myblog/public/archives/2018/04/index.html","2c7c113df66cb11fad8346bcb2b4e948"],["D:/gitee/myblog/public/archives/2018/05/index.html","88fa355df284482974fdff0e2fe147c0"],["D:/gitee/myblog/public/archives/2018/06/index.html","5d092d8808d0af118504a85151b93f3a"],["D:/gitee/myblog/public/archives/2018/07/index.html","28f51c5a6649897b3fe16bef0395e794"],["D:/gitee/myblog/public/archives/2018/11/index.html","cbd3a3c8946602956b7c503278f8571c"],["D:/gitee/myblog/public/archives/2018/index.html","202ab92974b586b02ac3995e527a3634"],["D:/gitee/myblog/public/archives/2018/page/2/index.html","44d02418bd4518c292276f2fa2c90892"],["D:/gitee/myblog/public/archives/2019/01/index.html","cdeb5783634b9b4b29a370bc8e123fd7"],["D:/gitee/myblog/public/archives/2019/02/index.html","4e558e66ed98e2857f70622eed148e0c"],["D:/gitee/myblog/public/archives/2019/index.html","3e8e12a18d033508132ecac70d1187dc"],["D:/gitee/myblog/public/archives/2023/12/index.html","f8f16d6e7c7e9eb199ff520b88f9b59d"],["D:/gitee/myblog/public/archives/2023/index.html","c79fde079b69c51fa5ca9c4a61e35a50"],["D:/gitee/myblog/public/archives/index.html","d7e33530641e014000659ef9f6fa3a9b"],["D:/gitee/myblog/public/archives/page/2/index.html","2d6eb951cc8f02de853a2bd88ff5ffea"],["D:/gitee/myblog/public/archives/page/3/index.html","5a40347930dcb629b3e79820112dd1b4"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["D:/gitee/myblog/public/books/index.html","43b2bd8d4a43bc8d4520073cb9e29e9c"],["D:/gitee/myblog/public/categories/CSS/index.html","0c96e3788102394dab503199e6260a0f"],["D:/gitee/myblog/public/categories/JavaScript/index.html","8a03b48442f58e7c9b03915d24119a8c"],["D:/gitee/myblog/public/categories/JavaScript/page/2/index.html","28c39b9472b00a1347178fe99666c0d8"],["D:/gitee/myblog/public/categories/React/index.html","137eb3e4a87303f6069bfad0c06f14eb"],["D:/gitee/myblog/public/categories/TypeScript/index.html","eff7b8a3e3604e165fb56f307525c263"],["D:/gitee/myblog/public/categories/index.html","58428028e3d3881b17d6ca7dd8db0309"],["D:/gitee/myblog/public/categories/其他/index.html","98be131843c118357487fc1e8d75efe9"],["D:/gitee/myblog/public/categories/学习/index.html","329eaf98be2c83d5b7b4907d0fe7c571"],["D:/gitee/myblog/public/categories/工程化/index.html","600292b7946c27110f92ae2a8192d87d"],["D:/gitee/myblog/public/categories/性能/index.html","89cff0e0f4adc7b8ea283b6bc83baaa1"],["D:/gitee/myblog/public/categories/总结/index.html","ecf5af9e56f62ba55a56a0ccde0f0102"],["D:/gitee/myblog/public/categories/调研/index.html","0fce6d7e32af8e5648f4131bf1f1de9a"],["D:/gitee/myblog/public/categories/调研/性能/index.html","69fc0560246ca8849ec49df027c674e1"],["D:/gitee/myblog/public/categories/配置/index.html","3fe96eef84cd5f90c9f576f9edab18e8"],["D:/gitee/myblog/public/categories/面试/JavaScript/index.html","b849eb583882dcdd90f68297356a3d06"],["D:/gitee/myblog/public/categories/面试/index.html","f53a4a89ce1435e638860d575d256574"],["D:/gitee/myblog/public/css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["D:/gitee/myblog/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/demo/index.html","52698e7d9ebf4ab055209c0cb6c8c82a"],["D:/gitee/myblog/public/gallery/index.html","05e078155e9d52530e3be588af3fb556"],["D:/gitee/myblog/public/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["D:/gitee/myblog/public/img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["D:/gitee/myblog/public/img/config/avatar.jpg","33c5c7a963345da5533644b727f6dd9b"],["D:/gitee/myblog/public/img/gallery/2015/01.jpg","9fda788e8cc2ed91030358053f85d774"],["D:/gitee/myblog/public/img/gallery/2015/02.jpg","4198b24a86cb8087a428723ce0d057a3"],["D:/gitee/myblog/public/img/gallery/2015/03.jpg","471fd7f31ddb5084cb9909c3c4a164dd"],["D:/gitee/myblog/public/img/gallery/2015/04.jpg","373b9db1c9f0b0522e2769d534de01f5"],["D:/gitee/myblog/public/img/gallery/2015/05.jpg","cd2802a1ab2163af009c3540524ed447"],["D:/gitee/myblog/public/img/gallery/2015/06.jpg","64357ea216c5748cfa69791c06e949e4"],["D:/gitee/myblog/public/img/gallery/2015/07.jpg","980d6c887b12828d84209aeaa1a1a792"],["D:/gitee/myblog/public/img/gallery/2015/08.jpg","d28bb790ba5b6e709d7d663a18042e4c"],["D:/gitee/myblog/public/img/gallery/2015/09.jpg","84575d3800dcdcf5057d327790229a16"],["D:/gitee/myblog/public/img/gallery/2015/10.jpg","aa27c8a114fa427f5ab783a6695d052a"],["D:/gitee/myblog/public/img/gallery/2015/11.jpg","9192bd68b16a6a33bfefd0146c947ca4"],["D:/gitee/myblog/public/img/gallery/2015/12.jpg","825638f1851602c4a3cc7fb2b816dfb0"],["D:/gitee/myblog/public/img/gallery/2015/13.jpg","11c5209f75aef602bcafc6f7e30aa126"],["D:/gitee/myblog/public/img/gallery/2015/14.jpg","c750bba27f21e588e1cd36dd3abae045"],["D:/gitee/myblog/public/img/gallery/2015/15.jpg","0e7c148b76d157c07808a95cbd372538"],["D:/gitee/myblog/public/img/gallery/2015/16.jpg","84a4cd5c6490d52a431fb3cac23315f4"],["D:/gitee/myblog/public/img/gallery/2015/17.jpg","fff944453719876a407a8a8177495e0e"],["D:/gitee/myblog/public/img/gallery/2015/18.jpg","28cba5b2ebf33ddcef1df9b0a783536a"],["D:/gitee/myblog/public/img/gallery/2015/19.jpg","ad1b5179836b382b6d2c21501840f657"],["D:/gitee/myblog/public/img/gallery/2015/20.jpg","dd0ca42f122c6081a4cfda85912bd63d"],["D:/gitee/myblog/public/img/gallery/2015/21.jpg","8ca08987838a6b610645d132afa38728"],["D:/gitee/myblog/public/img/gallery/2015/22.jpg","0557995e43112c6e4eab5efb7bf2224e"],["D:/gitee/myblog/public/img/gallery/2015/23.jpg","d82aed1ea713f4a2967300ebcbd05fde"],["D:/gitee/myblog/public/img/gallery/2015/24.jpg","598a058f3fbd0b679db8650f4aff3feb"],["D:/gitee/myblog/public/img/gallery/2015/25.jpg","a9e9a8786a5ccae1f6064240429a3867"],["D:/gitee/myblog/public/img/gallery/2016/01.jpg","55e6afa4fdc93b16b57b8cfef5de9c0d"],["D:/gitee/myblog/public/img/gallery/2016/02.jpg","8e1ba9e15bf217134451e43721479daa"],["D:/gitee/myblog/public/img/gallery/2016/03.jpg","5ee13947ed9d162d4062479e5878f97f"],["D:/gitee/myblog/public/img/gallery/2016/04.jpg","cd24ac518f3e62d955999c4a845ecfd9"],["D:/gitee/myblog/public/img/gallery/2016/05.jpg","5c14834b3e4a409335a4b9acaf68f158"],["D:/gitee/myblog/public/img/gallery/2016/06.jpg","72cb2474c4921598265d21653fc49301"],["D:/gitee/myblog/public/img/gallery/2016/07.jpg","3ecbfdea75fdef8387e879d419433288"],["D:/gitee/myblog/public/img/gallery/2016/08.jpg","a65862a7cfedc48a68881539bd0a907c"],["D:/gitee/myblog/public/img/gallery/2016/09.jpg","ece6aef964d3ba2551564c5c7267afc9"],["D:/gitee/myblog/public/img/gallery/2016/10.jpg","4871dfbf60707e56744f4b969e914568"],["D:/gitee/myblog/public/img/gallery/2016/11.jpg","b15502e1a453fccbb659e4d0bddb1979"],["D:/gitee/myblog/public/img/gallery/2016/12.jpg","e69defd9eba0c1f41041aac8282dab31"],["D:/gitee/myblog/public/img/gallery/2016/13.jpg","404aad8efb76000f4035a7497efdc763"],["D:/gitee/myblog/public/img/gallery/2016/14.jpg","476faefd906521c0d252e6dd8ca1f2d9"],["D:/gitee/myblog/public/img/gallery/2016/15.jpg","1e777005f6bba8fda72ca9c6978224fe"],["D:/gitee/myblog/public/img/gallery/2016/16.jpg","ae300641f3db292df562cbd07b124119"],["D:/gitee/myblog/public/img/gallery/2016/17.jpg","fcc0b046816f6f565334cb75e18f6f84"],["D:/gitee/myblog/public/img/gallery/2016/18.jpg","b3164c434be829455458efdbcc597555"],["D:/gitee/myblog/public/img/gallery/2017/03.jpg","290167ba14399fa8d3b125e17999b5e5"],["D:/gitee/myblog/public/img/gallery/2017/04.jpg","79428f1a4a1a29c5074f1960bcb8dc4d"],["D:/gitee/myblog/public/img/gallery/2018/01.jpg","e1fb1d25a8ba1c8ee6af8bef2eb88736"],["D:/gitee/myblog/public/img/gallery/2018/02.jpg","2710772e9271e06e6d1e43b79373e692"],["D:/gitee/myblog/public/img/gallery/2018/03.jpg","a3fca686c28b1a61f62cd03f1800c1ac"],["D:/gitee/myblog/public/img/gallery/2018/04.jpg","6463db8e28fc07d14426b5c18ea436c7"],["D:/gitee/myblog/public/img/gallery/2018/05.jpg","750131574daa40534b57b4f56684011c"],["D:/gitee/myblog/public/img/gallery/2018/06.jpg","73076fb2c65592bef9da0551de372f60"],["D:/gitee/myblog/public/img/gallery/2019/01.jpg","07a547e48a4f8593d4bba5fe263b449c"],["D:/gitee/myblog/public/img/gallery/2019/02.jpg","9ee23c33247831f266ce523f09df9f81"],["D:/gitee/myblog/public/img/gallery/2019/03.jpg","2a60f430aaf362765426ce1d0b12bcb4"],["D:/gitee/myblog/public/img/gallery/2019/04.jpg","ad04a6e0279cfe156508765e12e020b7"],["D:/gitee/myblog/public/img/gallery/2019/05.jpg","09f056891d27c81bf2314f38b3171c2a"],["D:/gitee/myblog/public/img/gallery/2019/06.jpg","b234af5dee92ba69056f50bfa55ca43a"],["D:/gitee/myblog/public/img/gallery/2019/07.jpg","49ad420ce4f2fb3601aafaac81d31ce4"],["D:/gitee/myblog/public/img/gallery/2019/08.jpg","8e687f6c27716401ee80107039a5cb73"],["D:/gitee/myblog/public/img/gallery/2019/09.jpg","489d74d164bfd08a00af09c50f26d752"],["D:/gitee/myblog/public/img/gallery/2019/10.jpg","311097665eaf576e1d993f513e4a4969"],["D:/gitee/myblog/public/img/gallery/2020/01.jpg","e55210c94745c6d58f84779cbb6cf248"],["D:/gitee/myblog/public/img/gallery/2020/02.jpg","22c8e15469132e7b1a50de6065a984ed"],["D:/gitee/myblog/public/img/gallery/2020/03.jpg","b43ac60d014f1e949652e8b881fb52d1"],["D:/gitee/myblog/public/img/gallery/2020/04.jpg","3376e559891f32010e9790d99b65217d"],["D:/gitee/myblog/public/img/gallery/2020/05.jpg","5ac4cab0667d89270f1daad31dddaa4c"],["D:/gitee/myblog/public/img/gallery/2021/1.jpg","0153d88d57cc8932295de93fcc2395e1"],["D:/gitee/myblog/public/img/gallery/2021/2.jpg","cf4ce42f51b8bd285ab8fe01e050e8ec"],["D:/gitee/myblog/public/img/gallery/2021/3.jpg","d870124e3a6706e171658db44b7f1228"],["D:/gitee/myblog/public/img/gallery/2021/4.jpg","db0b95b9cc45a26d615b8bc37f20cba7"],["D:/gitee/myblog/public/img/gallery/2021/5.jpg","60f5ae772608b452bc91936eb11f5938"],["D:/gitee/myblog/public/img/gallery/2022/01.jpg","0437d66e14d09cdeadbffe17aa30ceda"],["D:/gitee/myblog/public/img/gallery/2022/02.jpg","11a28e3dd3c059d7e777f846203be10c"],["D:/gitee/myblog/public/img/gallery/2022/03.jpg","f80e4980c8a345bf2baa2cdd91bb809e"],["D:/gitee/myblog/public/img/gallery/2022/04.jpg","59755112a4e1411ca759413cd31caafa"],["D:/gitee/myblog/public/img/gallery/2022/05.jpg","b7af7a24d2e27da9172701be72f8e8bb"],["D:/gitee/myblog/public/img/gallery/2023/01.jpg","3815cde1eed61f6d23b066c619032e85"],["D:/gitee/myblog/public/img/gallery/2023/02.jpg","b8655e020dd6538e80a376e5b6f5e8f6"],["D:/gitee/myblog/public/img/gallery/2023/03.jpg","f062f6048c46a77d2b4d7895d7c3de59"],["D:/gitee/myblog/public/img/gallery/2023/04.jpg","feaba3e583fb992049355c8a9f532892"],["D:/gitee/myblog/public/img/gallery/2023/05.jpg","659f4c1921a2e03050f564649da256d5"],["D:/gitee/myblog/public/img/gallery/2023/06.jpg","953861441bf852d4d8e2f4503c8258b3"],["D:/gitee/myblog/public/img/gallery/2023/07.jpg","173f8df0e12672f5dbb64bf6976d1d21"],["D:/gitee/myblog/public/img/gallery/2023/08.jpg","8c04a7cc9cf781b0929964324899d02a"],["D:/gitee/myblog/public/img/gallery/2023/09.jpg","4dc9f88bf5cc347db7ea9a8f4861abc6"],["D:/gitee/myblog/public/img/gallery/2023/10.jpg","dc5dd29e8df37b86be3e8f4aa729116f"],["D:/gitee/myblog/public/index.html","ec5cf9194c0c2bdd4c9b457369f18798"],["D:/gitee/myblog/public/js/copy.js","f4607057c0513bd07a69fcac08121979"],["D:/gitee/myblog/public/js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["D:/gitee/myblog/public/js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["D:/gitee/myblog/public/js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["D:/gitee/myblog/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["D:/gitee/myblog/public/js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["D:/gitee/myblog/public/js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["D:/gitee/myblog/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["D:/gitee/myblog/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["D:/gitee/myblog/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["D:/gitee/myblog/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["D:/gitee/myblog/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["D:/gitee/myblog/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["D:/gitee/myblog/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["D:/gitee/myblog/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["D:/gitee/myblog/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["D:/gitee/myblog/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["D:/gitee/myblog/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["D:/gitee/myblog/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["D:/gitee/myblog/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["D:/gitee/myblog/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["D:/gitee/myblog/public/js/transition.js","bd261a5dda799613501070ecc19d6e69"],["D:/gitee/myblog/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["D:/gitee/myblog/public/page/2/index.html","9eb0c9ecdb39d1faa5975c897b094d30"],["D:/gitee/myblog/public/page/3/index.html","b630689ceb9a583a6f06a67a5f853bf3"],["D:/gitee/myblog/public/slides/index.html","c2460ba0a2774f28921e597b5828d77b"],["D:/gitee/myblog/public/tags/ES标准/index.html","2a506b02e4e6ce724c925d387787a3a2"],["D:/gitee/myblog/public/tags/Error/index.html","4f677fde4f4c1fe9d68f1b20567597b4"],["D:/gitee/myblog/public/tags/React/index.html","781a06c300552958571c8f27bfb8d288"],["D:/gitee/myblog/public/tags/axios/index.html","7c21725e9370a0e591e43738754f766d"],["D:/gitee/myblog/public/tags/cookie/index.html","d26964e15c16b68d4876b3cb512ceb5a"],["D:/gitee/myblog/public/tags/css/index.html","4af5d96c90a445531523dfdb98ee6e92"],["D:/gitee/myblog/public/tags/curry/index.html","130df6279dce693857197dfa74b425c6"],["D:/gitee/myblog/public/tags/demo/index.html","0fbf9d9312ca1a10064183be5ad18c23"],["D:/gitee/myblog/public/tags/es6/index.html","41fb98344e24fcb601c8537dd5fe9d80"],["D:/gitee/myblog/public/tags/eslint/index.html","3b04d0582ba21bd4efd604ef39d030f5"],["D:/gitee/myblog/public/tags/http/index.html","5e8aa56135e6f35e6bc75dce258ba240"],["D:/gitee/myblog/public/tags/index.html","8509d8b5aff11a404be5acdd91aab20d"],["D:/gitee/myblog/public/tags/iview/index.html","2e730ce6f2af1b8c0c475768e0f2aa84"],["D:/gitee/myblog/public/tags/js/index.html","07ce3e91895b7986b7ecc481087a5625"],["D:/gitee/myblog/public/tags/jsonp/index.html","d6a61908a377976c388c1b1fe185e761"],["D:/gitee/myblog/public/tags/localstorage/index.html","e366da5215ee04de2e62d5f89356235a"],["D:/gitee/myblog/public/tags/mock/index.html","77650a5d6718dbc68c304f3f980dd424"],["D:/gitee/myblog/public/tags/mpvue/index.html","330cee590f30c0e6c819e14615d090b2"],["D:/gitee/myblog/public/tags/mvvm/index.html","f8678d2bada6384dd0ebc7d25c6c6e1d"],["D:/gitee/myblog/public/tags/node/index.html","1d72826fc6b82ef5a3aebe30b12c5500"],["D:/gitee/myblog/public/tags/nuxt/index.html","3176a8e9f60ce43c44bb55661a429d47"],["D:/gitee/myblog/public/tags/nvm/index.html","1423aa174d42f04a5f47d97c1c2da1c0"],["D:/gitee/myblog/public/tags/oop/index.html","4b1289a2a246e997d1f63e5093cdaf37"],["D:/gitee/myblog/public/tags/promise/index.html","ab090ad6830b968d38ef461657b07243"],["D:/gitee/myblog/public/tags/rem/index.html","4dc503a705fd931a9f4683cbdac38c9d"],["D:/gitee/myblog/public/tags/reveal-js/index.html","839ec2ecd01515feeee25af278121304"],["D:/gitee/myblog/public/tags/session/index.html","1d9d20c60472369b6f1488416c070c56"],["D:/gitee/myblog/public/tags/sessionstorage/index.html","17a84dfbf1f436e66f5ff5bcc9a82dd0"],["D:/gitee/myblog/public/tags/stream/index.html","8a18d504758b3b2ea25df244d48bec46"],["D:/gitee/myblog/public/tags/token/index.html","a0f957c9fbeb336dd904eb62a1c1b448"],["D:/gitee/myblog/public/tags/ts/index.html","b20335e9c4e9b5a88ad59f156db3ff0b"],["D:/gitee/myblog/public/tags/underscore/index.html","136eefa32689f191dcf29c619f21d5ab"],["D:/gitee/myblog/public/tags/vscode/index.html","0cd8ccb233da319e1be4bf4176c1e3f5"],["D:/gitee/myblog/public/tags/vue-cli/index.html","cfd964e837e8ae34693757bf460fad47"],["D:/gitee/myblog/public/tags/vue-i18n/index.html","2bba64504072de8f4a812b7d05f9e36e"],["D:/gitee/myblog/public/tags/vue/index.html","1d7bcfe69561e43bb4f97f88a6bc8c65"],["D:/gitee/myblog/public/tags/webpack/index.html","25dfd4b2022773758c88b7d79c18b52d"],["D:/gitee/myblog/public/tags/压缩/index.html","2776f64bab888104d9d22b435d363d8c"],["D:/gitee/myblog/public/tags/发布订阅/index.html","b193ee396769f49817d3093410c269bc"],["D:/gitee/myblog/public/tags/吐槽/index.html","4f6eede2afe6bfb76a1723f2a5e552b5"],["D:/gitee/myblog/public/tags/回流/index.html","bd9c8e4736676c430b31a1aaeb581ea7"],["D:/gitee/myblog/public/tags/国际化/index.html","d1f9052d9f13704ea0ecab5e420440fb"],["D:/gitee/myblog/public/tags/图片/index.html","0742b5a6d9f83767ffb019affdb09ef0"],["D:/gitee/myblog/public/tags/实战/index.html","0118458d7f45830efce93c9b2fb6a036"],["D:/gitee/myblog/public/tags/小程序/index.html","154eb064a83cd9ef4fa88e9db99a4edf"],["D:/gitee/myblog/public/tags/引用/index.html","c444e362e58f6048b5bc2a44df6eec39"],["D:/gitee/myblog/public/tags/思考/index.html","75c1115d825882c6efa3edc3989d94c7"],["D:/gitee/myblog/public/tags/性能/index.html","3b25a12f153831bf0caca160ffcc1969"],["D:/gitee/myblog/public/tags/总结/index.html","6b8331ad31d4eadae0971bc4bbba517b"],["D:/gitee/myblog/public/tags/懒加载/index.html","15092223a06cad989b85ec03e4d29688"],["D:/gitee/myblog/public/tags/数据结构/index.html","01759f884aca577046b2e856f89ed300"],["D:/gitee/myblog/public/tags/服务端渲染/index.html","caae18d12e26df1bcc9602eb0abe88d7"],["D:/gitee/myblog/public/tags/框架/index.html","b1ebbee81495ed21c4219e9ba47d7e3e"],["D:/gitee/myblog/public/tags/正则表达式/index.html","2c1b1fe4e9f9533f88254539b8e9a40f"],["D:/gitee/myblog/public/tags/渲染/index.html","0b6180ec0576f54545df897702b85388"],["D:/gitee/myblog/public/tags/源码/index.html","4437fefcf7e43302723a7bc48843f362"],["D:/gitee/myblog/public/tags/移动端/index.html","18bf18d9f9031377eb2614416648e6b5"],["D:/gitee/myblog/public/tags/缓存/index.html","148262cb7c598d84e55950fa2ee08c44"],["D:/gitee/myblog/public/tags/自适应/index.html","473160aeb578be3bdaef1df4b1f6dec0"],["D:/gitee/myblog/public/tags/装机/index.html","72e2aa76b35deb04d23e7a892a985280"],["D:/gitee/myblog/public/tags/观察者/index.html","08ea073af03755ceaa7d8f2c4dd2dbc4"],["D:/gitee/myblog/public/tags/解题/index.html","663dc75d47f73d06c9c50219a12348a9"],["D:/gitee/myblog/public/tags/设计模式/index.html","f512fa1fec9ac34fec284518c81dc7d7"],["D:/gitee/myblog/public/tags/跨域/index.html","b03d2b2b3932f62f010cf3747021a611"],["D:/gitee/myblog/public/tags/重绘/index.html","ced26c5205c9b6ad8aaed2a1fd81c2ec"],["D:/gitee/myblog/public/tags/面试/index.html","b967c6c8da1f2975adcdcbf7378a7066"],["D:/gitee/myblog/public/tags/预加载/index.html","57b24e874b3edf574802af0afbe1545a"],["D:/gitee/myblog/public/tags/预渲染/index.html","14cb4bd662ea7ab94d9bc5d861f8d1b6"]];
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







