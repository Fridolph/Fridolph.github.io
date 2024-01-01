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

var precacheConfig = [["D:/gitee/myblog/public/2016/06/04/【JS】用Jsonp解决跨域问题/index.html","1cbebbd35d31d94db73b46ae4326278f"],["D:/gitee/myblog/public/2016/08/28/【JS】解析url字符串/index.html","64e67416c8b0f5a8ce19db0cca1b1c67"],["D:/gitee/myblog/public/2016/09/21/【JS】写一个累加函数/index.html","fcbf37e0f3f9a3d8fc1bd3bf95a78aed"],["D:/gitee/myblog/public/2017/01/22/【配置】ESLint常用配置，规范代码/index.html","079008668cf23c0afca61c10d71be669"],["D:/gitee/myblog/public/2017/02/20/【CSS】纯CSS3手工打造变形金刚/index.html","776e72f206739d8b8fc55e168f22e86a"],["D:/gitee/myblog/public/2017/02/20/【配置】VS Code常用插件整理/index.html","6029fcb4d6315f8716a8e98854cd03c4"],["D:/gitee/myblog/public/2017/05/15/【起航】hexo博客/index.html","da4cad3f7fbd047b63f04aa0112da7aa"],["D:/gitee/myblog/public/2017/06/02/【学习】underscore源码学习（一）——核心架构/index.html","184990d13cf130ab4914a3be25b86e6d"],["D:/gitee/myblog/public/2017/06/05/【学习】underscore源码学习（二）——集合函数/index.html","6654b2183d268ca54a4c12445e7ac0e2"],["D:/gitee/myblog/public/2017/06/09/【学习】underscore源码学习（三）——Array方法/index.html","fc95d78e479a8f72d7050be4e0f10c9a"],["D:/gitee/myblog/public/2017/07/15/【配置】初始环境搭建 nvm node.js git/index.html","1040198b482a45e08165a73839522720"],["D:/gitee/myblog/public/2017/07/17/【JS】深入理解ES6——块级作用域绑定/index.html","13404b363f6854521a0303e5de6d781c"],["D:/gitee/myblog/public/2017/07/18/【Axios】学习学习~ 官方readme翻译/index.html","e43ef3f08171dec7150e5959988d5bab"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列1——从几道面试题开始/index.html","65f41de3c437f460f407dc86d20ede8b"],["D:/gitee/myblog/public/2017/07/23/【面试】知识点查缺补漏系列2——从原型到闭包你必知的js知识点/index.html","bbaf6f71f5fec9b0bbced0ba346edf10"],["D:/gitee/myblog/public/2017/08/01/【性能】预渲染技术/index.html","c207d724cd94ed5c1bbb728ce05915ee"],["D:/gitee/myblog/public/2017/08/02/【JS】深入理解ES6——JavaScript中的类/index.html","0f3c0bc3fcf8bd33541ec86a88516841"],["D:/gitee/myblog/public/2017/08/12/【JS】深入理解ES6——Promise与异步编程/index.html","06d37556d51dd48598f84d278f5d71e3"],["D:/gitee/myblog/public/2017/08/24/【Vue】vue-cli改多页配置及踩坑笔记/index.html","6e30733c4114e1fdcd9ac78a8aea5a4e"],["D:/gitee/myblog/public/2017/09/05/【Vue】vue-i18n踩坑记录/index.html","b9f93e4b600e104a44d7aad0cd60ee3e"],["D:/gitee/myblog/public/2017/09/11/【JS】导出图片和导出html/index.html","8c38740b3e1f814f48f2096ed3304a46"],["D:/gitee/myblog/public/2017/10/14/【Vue】iview按需引入相关配置/index.html","4bf37bdd3b8facc7c093e06e2d0cef8f"],["D:/gitee/myblog/public/2017/11/01/【JS】面向对象相关设计模式/index.html","8cef8ea0cf041f25f1acd3f8566ed411"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/index.html","67a4d2f6f2426f275b2f58ecfc2d5cef"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/原有关系依赖图.jpg","22fa59016b9794a9ba2059a808714833"],["D:/gitee/myblog/public/2017/12/13/【设计模式】初识IOC/最终依赖关系图.jpg","7978bd56e91195170520bcfd8f392f62"],["D:/gitee/myblog/public/2017/12/20/【React】从基础开始再来温习React，相关学习整理/index.html","f4707cb457b76730d40bddff1b101e4e"],["D:/gitee/myblog/public/2017/12/28/【React】进阶React的重要知识点/index.html","8b59f847030452fad7b50874be720518"],["D:/gitee/myblog/public/2018/02/04/【Mock】搭建部署自己的easy-mock服务/index.html","0247b99b249b12925752d77bb0d2c564"],["D:/gitee/myblog/public/2018/02/26/【JS】应用正则表达式（二）/index.html","c6378acaa629d10cd3041332c689f5f1"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/1.png","e336bbbd513b6e0d552cbbe874251ab6"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/2.png","3cdee46fab2d65e8867e04c09444096f"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/3.png","099ee2477220ea144801814aa0de6819"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/4.png","a9d7de071d2ec07ecf03f7e3e9e45714"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/5.png","f62b4e727301371de07ff704633ed796"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/6.png","34a85f4c06d6d5ba14f82b66bfbe6e17"],["D:/gitee/myblog/public/2018/03/15/【项目总结】vue-jd-finance/index.html","39deb389f9367a86711c15876ce0c288"],["D:/gitee/myblog/public/2018/03/29/【解决方案】移动端布局解决hotcss/index.html","509dae9edf4eef8536a55fd6903c6de2"],["D:/gitee/myblog/public/2018/04/03/【学习】Reveal.js一个Web演示文稿框架/index.html","8ea1ea625240c8ba2e2e1156aeed7b98"],["D:/gitee/myblog/public/2018/04/10/【工程化】webpack4.5升级踩坑/index.html","bfa5728b6c5284cfd792e64a116255bf"],["D:/gitee/myblog/public/2018/04/11/【Vue】实现原生双向绑定/index.html","678092f8c13b213b26f27aaf832a8ba4"],["D:/gitee/myblog/public/2018/04/14/【Vue】理解Vue生命周期/index.html","67736fc92ffd8c643670cccbc743b818"],["D:/gitee/myblog/public/2018/04/15/【JS】函数柯里化[转载]/index.html","b777e14d25241f080ae0427ec7a5f37b"],["D:/gitee/myblog/public/2018/04/17/【Vue】服务端渲染框架Nuxt入门/index.html","8800b4c37037c1fd2337a16558b04df7"],["D:/gitee/myblog/public/2018/04/22/【Next】一次掌握ES6到ES8新增功能/index.html","0f8c2af4613707217bb9922bf00263bb"],["D:/gitee/myblog/public/2018/04/25/【TS】vue与typescript集成/index.html","3fb41292e04287b79f035ef9de5478f6"],["D:/gitee/myblog/public/2018/04/26/【TS】装饰模式与vue-property-decorator/index.html","4297541fc7bddce11d772a3c4b852bbb"],["D:/gitee/myblog/public/2018/05/01/【TS】使用vuex-class/index.html","c0ad358ca9a1eda199d1eabbf7677d7c"],["D:/gitee/myblog/public/2018/05/07/【小程序】mpvue开发小程序初体验/index.html","8303afcf0d3a8e3d51a1b6ad98677140"],["D:/gitee/myblog/public/2018/06/03/【年总结】提升学习效率，良好习惯养成与坚持/index.html","d582d91dfba796a8312b9342e8e794a8"],["D:/gitee/myblog/public/2018/06/13/【设计模式】从订阅发布模式说起/index.html","303a2b61964899ce2cf6b43d2572ad80"],["D:/gitee/myblog/public/2018/06/23/【JS】变量声明与赋值，引用、值传递与对象拷贝/index.html","a0935a777e4d0e19d79b3150f946d5dc"],["D:/gitee/myblog/public/2018/06/29/【JS】学习正则表达式（一）/index.html","4bc1916c8f73feb8a5cbe2fec35a7046"],["D:/gitee/myblog/public/2018/07/07/【跨域】理解跨域及相关解决方案/index.html","01611e8f3c20de1d29fc403899686528"],["D:/gitee/myblog/public/2018/07/14/【JS】脚本错误及错误捕获/index.html","fefb9d91f9122b30a9061d5b40158320"],["D:/gitee/myblog/public/2018/07/20/【数据结构】栈、队列、链表及其区别/index.html","370b31a0faa097b9618d2bb176b6653e"],["D:/gitee/myblog/public/2018/07/28/【学习】cookie、session和token/index.html","ae5d2888c1e8f44180030f1659522ed9"],["D:/gitee/myblog/public/2018/11/15/【Node】学习stream模块/index.html","14d23af63de9bc4a94b60fa834eec3b4"],["D:/gitee/myblog/public/2019/01/20/【性能】1资源压缩与合并/index.html","80cfb254b0c38813562a98d02a810d3f"],["D:/gitee/myblog/public/2019/01/22/【性能】2图片优化相关/index.html","da1a65992a8da20bcd04031bf24bfd0b"],["D:/gitee/myblog/public/2019/01/27/【性能】3JS加载与执行/index.html","cc19bdaaff3d2057bfea3d6d13c3f497"],["D:/gitee/myblog/public/2019/01/30/【性能】4懒加载与预加载/index.html","fc119aec4006c86b7f0ed94b7abe00f7"],["D:/gitee/myblog/public/2019/01/31/【性能】5回流与重绘/index.html","0a0c1909c8ecce9067d6f20ba0b01679"],["D:/gitee/myblog/public/2019/02/02/【性能】6浏览器存储/index.html","4c9bbeeb37f4ab388c65c98eb5e6f073"],["D:/gitee/myblog/public/2019/02/03/【性能】7浏览器缓存优化/index.html","258198bcf24f2b3792b56ee721b95f0f"],["D:/gitee/myblog/public/2023/12/28/【总结】2023年底面临的危机及一些反思/index.html","6bf8fd6ccf6ad0f60e6abd14ead83774"],["D:/gitee/myblog/public/404.html","e41d7cbeed0a4c497b13634c26ca242a"],["D:/gitee/myblog/public/404/demo.html","bad3111cb29bacbe3ded383eaf02a672"],["D:/gitee/myblog/public/archives/2016/06/index.html","49af3918bd1d4f78bc3c653b2e4732d6"],["D:/gitee/myblog/public/archives/2016/08/index.html","e1a9edf4ec734cf27014f97b2e0f4098"],["D:/gitee/myblog/public/archives/2016/09/index.html","e6689687a32ebbc4a94e0a1c3b39879e"],["D:/gitee/myblog/public/archives/2016/index.html","aed97a9e135eba9adc018e937480d120"],["D:/gitee/myblog/public/archives/2017/01/index.html","2ff5eec23b3e3cbbcc4981d861426aa9"],["D:/gitee/myblog/public/archives/2017/02/index.html","3a9e572749df45f4021bb70bde333613"],["D:/gitee/myblog/public/archives/2017/05/index.html","094b159137c981edcdde3a212980feeb"],["D:/gitee/myblog/public/archives/2017/06/index.html","c338257c35ca95cfa7efd2988ad4baaa"],["D:/gitee/myblog/public/archives/2017/07/index.html","f06f3fe30adb62719744097d23a7844d"],["D:/gitee/myblog/public/archives/2017/08/index.html","2dde14fe8a23424bf04adcc3ce0a882b"],["D:/gitee/myblog/public/archives/2017/09/index.html","c2b327585d5a72e40573db00fb6b9cdb"],["D:/gitee/myblog/public/archives/2017/10/index.html","418fa5bfe0d30114f9bd03184696e27d"],["D:/gitee/myblog/public/archives/2017/11/index.html","03dff33a45f49a7f28e16ddbc51a9e22"],["D:/gitee/myblog/public/archives/2017/12/index.html","7520c30dbc3b3a794d217ac7a8c2309a"],["D:/gitee/myblog/public/archives/2017/index.html","63e7497a8519de1d631f972b18b44d49"],["D:/gitee/myblog/public/archives/2017/page/2/index.html","d61a0a30d6b45084766ccc7e1a48fd82"],["D:/gitee/myblog/public/archives/2018/02/index.html","3409200e639aac9d7e19eb78ba88ae90"],["D:/gitee/myblog/public/archives/2018/03/index.html","d48bb589785e1647cec12d1e89c41552"],["D:/gitee/myblog/public/archives/2018/04/index.html","117274943d76bb25588952a5ed87e2f6"],["D:/gitee/myblog/public/archives/2018/05/index.html","59ae1f5a50ba423dfa4230215b879f14"],["D:/gitee/myblog/public/archives/2018/06/index.html","be25ad5c0e0e10ad5b7b76ece2239d6a"],["D:/gitee/myblog/public/archives/2018/07/index.html","34469e8608bd1f7325cbeb0d89a95069"],["D:/gitee/myblog/public/archives/2018/11/index.html","05f034390b907d5e500122b321985412"],["D:/gitee/myblog/public/archives/2018/index.html","c765bcea70401ed5432c66bd47bc77d2"],["D:/gitee/myblog/public/archives/2018/page/2/index.html","4a584d9573a7e28726baac959a100892"],["D:/gitee/myblog/public/archives/2019/01/index.html","e0f5be365b7824c6de0ec138d4a1ce53"],["D:/gitee/myblog/public/archives/2019/02/index.html","cfab6210829a13b2c96ccd669e1e2c39"],["D:/gitee/myblog/public/archives/2019/index.html","362aa2533c2b540a14327bf808b1f8a8"],["D:/gitee/myblog/public/archives/2023/12/index.html","1ac591680a880f91e08614d8b3792d35"],["D:/gitee/myblog/public/archives/2023/index.html","64575ae5eef4929fce1a805e75db6898"],["D:/gitee/myblog/public/archives/index.html","ab8b5bdfa8c4afc8e9e5bc8da6f78b7d"],["D:/gitee/myblog/public/archives/page/2/index.html","44c79d94bf038568489bb405ae172172"],["D:/gitee/myblog/public/archives/page/3/index.html","e2b3d0490dde040c81f3926cf13fc7ff"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.js","210cdc21eb25fcf3b788cb6a246e3f8d"],["D:/gitee/myblog/public/assets/algolia/algoliasearch.min.js","bcda2cbb8ae4df8def1d63567ac73c83"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.js","38a9a07c3d496ff6e01225d95dce9b3a"],["D:/gitee/myblog/public/assets/algolia/algoliasearchLite.min.js","f4f424c8a3ed63ca50352767fa636c06"],["D:/gitee/myblog/public/books/index.html","03bee2422a07e64a7bcc711ae4c716a1"],["D:/gitee/myblog/public/categories/CSS/index.html","17f7103327084257b034fd51b8586000"],["D:/gitee/myblog/public/categories/JavaScript/index.html","fca6e98515e7f666fc888396331471fa"],["D:/gitee/myblog/public/categories/JavaScript/page/2/index.html","0d19f4fefc043645ca6cfe804440ba6c"],["D:/gitee/myblog/public/categories/React/index.html","18f252adc049407ac87e6b8f9d6e8293"],["D:/gitee/myblog/public/categories/TypeScript/index.html","3d57af8a544e0e01d165f8baaedd8167"],["D:/gitee/myblog/public/categories/index.html","43a08dbe873170b2f5df03f074944695"],["D:/gitee/myblog/public/categories/其他/index.html","2c68660e84da6c7b5b435c035b785bfe"],["D:/gitee/myblog/public/categories/学习/index.html","b168770758c3deac8f6a583619a75c75"],["D:/gitee/myblog/public/categories/工程化/index.html","00eeedebd2064351ab729230b0b734fb"],["D:/gitee/myblog/public/categories/性能/index.html","80371b66751667aef7c169dfb5f3ec88"],["D:/gitee/myblog/public/categories/总结/index.html","c9058399a4eab357e256b0a9e5e1eb88"],["D:/gitee/myblog/public/categories/调研/index.html","7fdee0ec13db579c8e683c751210f57b"],["D:/gitee/myblog/public/categories/调研/性能/index.html","f7426ffff044877c8eb2ee4746f920bf"],["D:/gitee/myblog/public/categories/配置/index.html","37a34b699dcfb016c92c93e6937106b8"],["D:/gitee/myblog/public/categories/面试/JavaScript/index.html","845fb20ff15bf59e5ddb9cf99472b1c2"],["D:/gitee/myblog/public/categories/面试/index.html","ac0d7a78f58d0e56cc25d37e9c755973"],["D:/gitee/myblog/public/css/index.css","64c502bd0cdfbe83fcc9ed315ca19891"],["D:/gitee/myblog/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/demo/index.html","1c59af75642e3b74c0a81bc8d1e21432"],["D:/gitee/myblog/public/gallery/index.html","2626c46725efd17ce05753269e36db78"],["D:/gitee/myblog/public/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["D:/gitee/myblog/public/img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["D:/gitee/myblog/public/img/config/avatar.jpg","33c5c7a963345da5533644b727f6dd9b"],["D:/gitee/myblog/public/img/gallery/2015/01.jpg","9fda788e8cc2ed91030358053f85d774"],["D:/gitee/myblog/public/img/gallery/2015/02.jpg","4198b24a86cb8087a428723ce0d057a3"],["D:/gitee/myblog/public/img/gallery/2015/03.jpg","471fd7f31ddb5084cb9909c3c4a164dd"],["D:/gitee/myblog/public/img/gallery/2015/04.jpg","373b9db1c9f0b0522e2769d534de01f5"],["D:/gitee/myblog/public/img/gallery/2015/05.jpg","cd2802a1ab2163af009c3540524ed447"],["D:/gitee/myblog/public/img/gallery/2015/06.jpg","64357ea216c5748cfa69791c06e949e4"],["D:/gitee/myblog/public/img/gallery/2015/07.jpg","980d6c887b12828d84209aeaa1a1a792"],["D:/gitee/myblog/public/img/gallery/2015/08.jpg","d28bb790ba5b6e709d7d663a18042e4c"],["D:/gitee/myblog/public/img/gallery/2015/09.jpg","84575d3800dcdcf5057d327790229a16"],["D:/gitee/myblog/public/img/gallery/2015/10.jpg","aa27c8a114fa427f5ab783a6695d052a"],["D:/gitee/myblog/public/img/gallery/2015/11.jpg","9192bd68b16a6a33bfefd0146c947ca4"],["D:/gitee/myblog/public/img/gallery/2015/12.jpg","825638f1851602c4a3cc7fb2b816dfb0"],["D:/gitee/myblog/public/img/gallery/2015/13.jpg","11c5209f75aef602bcafc6f7e30aa126"],["D:/gitee/myblog/public/img/gallery/2015/14.jpg","c750bba27f21e588e1cd36dd3abae045"],["D:/gitee/myblog/public/img/gallery/2015/15.jpg","0e7c148b76d157c07808a95cbd372538"],["D:/gitee/myblog/public/img/gallery/2015/16.jpg","84a4cd5c6490d52a431fb3cac23315f4"],["D:/gitee/myblog/public/img/gallery/2015/17.jpg","fff944453719876a407a8a8177495e0e"],["D:/gitee/myblog/public/img/gallery/2015/18.jpg","28cba5b2ebf33ddcef1df9b0a783536a"],["D:/gitee/myblog/public/img/gallery/2015/19.jpg","ad1b5179836b382b6d2c21501840f657"],["D:/gitee/myblog/public/img/gallery/2015/20.jpg","dd0ca42f122c6081a4cfda85912bd63d"],["D:/gitee/myblog/public/img/gallery/2015/21.jpg","8ca08987838a6b610645d132afa38728"],["D:/gitee/myblog/public/img/gallery/2015/22.jpg","0557995e43112c6e4eab5efb7bf2224e"],["D:/gitee/myblog/public/img/gallery/2015/23.jpg","d82aed1ea713f4a2967300ebcbd05fde"],["D:/gitee/myblog/public/img/gallery/2015/24.jpg","598a058f3fbd0b679db8650f4aff3feb"],["D:/gitee/myblog/public/img/gallery/2015/25.jpg","a9e9a8786a5ccae1f6064240429a3867"],["D:/gitee/myblog/public/img/gallery/2016/01.jpg","55e6afa4fdc93b16b57b8cfef5de9c0d"],["D:/gitee/myblog/public/img/gallery/2016/02.jpg","8e1ba9e15bf217134451e43721479daa"],["D:/gitee/myblog/public/img/gallery/2016/03.jpg","5ee13947ed9d162d4062479e5878f97f"],["D:/gitee/myblog/public/img/gallery/2016/04.jpg","cd24ac518f3e62d955999c4a845ecfd9"],["D:/gitee/myblog/public/img/gallery/2016/05.jpg","5c14834b3e4a409335a4b9acaf68f158"],["D:/gitee/myblog/public/img/gallery/2016/06.jpg","72cb2474c4921598265d21653fc49301"],["D:/gitee/myblog/public/img/gallery/2016/07.jpg","3ecbfdea75fdef8387e879d419433288"],["D:/gitee/myblog/public/img/gallery/2016/08.jpg","a65862a7cfedc48a68881539bd0a907c"],["D:/gitee/myblog/public/img/gallery/2016/09.jpg","ece6aef964d3ba2551564c5c7267afc9"],["D:/gitee/myblog/public/img/gallery/2016/10.jpg","4871dfbf60707e56744f4b969e914568"],["D:/gitee/myblog/public/img/gallery/2016/11.jpg","b15502e1a453fccbb659e4d0bddb1979"],["D:/gitee/myblog/public/img/gallery/2016/12.jpg","e69defd9eba0c1f41041aac8282dab31"],["D:/gitee/myblog/public/img/gallery/2016/13.jpg","404aad8efb76000f4035a7497efdc763"],["D:/gitee/myblog/public/img/gallery/2016/14.jpg","476faefd906521c0d252e6dd8ca1f2d9"],["D:/gitee/myblog/public/img/gallery/2016/15.jpg","1e777005f6bba8fda72ca9c6978224fe"],["D:/gitee/myblog/public/img/gallery/2016/16.jpg","ae300641f3db292df562cbd07b124119"],["D:/gitee/myblog/public/img/gallery/2016/17.jpg","fcc0b046816f6f565334cb75e18f6f84"],["D:/gitee/myblog/public/img/gallery/2016/18.jpg","b3164c434be829455458efdbcc597555"],["D:/gitee/myblog/public/img/gallery/2017/03.jpg","290167ba14399fa8d3b125e17999b5e5"],["D:/gitee/myblog/public/img/gallery/2017/04.jpg","79428f1a4a1a29c5074f1960bcb8dc4d"],["D:/gitee/myblog/public/img/gallery/2018/01.jpg","e1fb1d25a8ba1c8ee6af8bef2eb88736"],["D:/gitee/myblog/public/img/gallery/2018/02.jpg","2710772e9271e06e6d1e43b79373e692"],["D:/gitee/myblog/public/img/gallery/2018/03.jpg","a3fca686c28b1a61f62cd03f1800c1ac"],["D:/gitee/myblog/public/img/gallery/2018/04.jpg","6463db8e28fc07d14426b5c18ea436c7"],["D:/gitee/myblog/public/img/gallery/2018/05.jpg","750131574daa40534b57b4f56684011c"],["D:/gitee/myblog/public/img/gallery/2018/06.jpg","73076fb2c65592bef9da0551de372f60"],["D:/gitee/myblog/public/img/gallery/2019/01.jpg","07a547e48a4f8593d4bba5fe263b449c"],["D:/gitee/myblog/public/img/gallery/2019/02.jpg","9ee23c33247831f266ce523f09df9f81"],["D:/gitee/myblog/public/img/gallery/2019/03.jpg","2a60f430aaf362765426ce1d0b12bcb4"],["D:/gitee/myblog/public/img/gallery/2019/04.jpg","ad04a6e0279cfe156508765e12e020b7"],["D:/gitee/myblog/public/img/gallery/2019/05.jpg","09f056891d27c81bf2314f38b3171c2a"],["D:/gitee/myblog/public/img/gallery/2019/06.jpg","b234af5dee92ba69056f50bfa55ca43a"],["D:/gitee/myblog/public/img/gallery/2019/07.jpg","49ad420ce4f2fb3601aafaac81d31ce4"],["D:/gitee/myblog/public/img/gallery/2019/08.jpg","8e687f6c27716401ee80107039a5cb73"],["D:/gitee/myblog/public/img/gallery/2019/09.jpg","489d74d164bfd08a00af09c50f26d752"],["D:/gitee/myblog/public/img/gallery/2019/10.jpg","311097665eaf576e1d993f513e4a4969"],["D:/gitee/myblog/public/img/gallery/2020/01.jpg","e55210c94745c6d58f84779cbb6cf248"],["D:/gitee/myblog/public/img/gallery/2020/02.jpg","22c8e15469132e7b1a50de6065a984ed"],["D:/gitee/myblog/public/img/gallery/2020/03.jpg","b43ac60d014f1e949652e8b881fb52d1"],["D:/gitee/myblog/public/img/gallery/2020/04.jpg","3376e559891f32010e9790d99b65217d"],["D:/gitee/myblog/public/img/gallery/2020/05.jpg","5ac4cab0667d89270f1daad31dddaa4c"],["D:/gitee/myblog/public/img/gallery/2021/1.jpg","0153d88d57cc8932295de93fcc2395e1"],["D:/gitee/myblog/public/img/gallery/2021/2.jpg","cf4ce42f51b8bd285ab8fe01e050e8ec"],["D:/gitee/myblog/public/img/gallery/2021/3.jpg","d870124e3a6706e171658db44b7f1228"],["D:/gitee/myblog/public/img/gallery/2021/4.jpg","db0b95b9cc45a26d615b8bc37f20cba7"],["D:/gitee/myblog/public/img/gallery/2021/5.jpg","60f5ae772608b452bc91936eb11f5938"],["D:/gitee/myblog/public/img/gallery/2022/01.jpg","0437d66e14d09cdeadbffe17aa30ceda"],["D:/gitee/myblog/public/img/gallery/2022/02.jpg","11a28e3dd3c059d7e777f846203be10c"],["D:/gitee/myblog/public/img/gallery/2022/03.jpg","f80e4980c8a345bf2baa2cdd91bb809e"],["D:/gitee/myblog/public/img/gallery/2022/04.jpg","59755112a4e1411ca759413cd31caafa"],["D:/gitee/myblog/public/img/gallery/2022/05.jpg","b7af7a24d2e27da9172701be72f8e8bb"],["D:/gitee/myblog/public/img/gallery/2023/01.jpg","3815cde1eed61f6d23b066c619032e85"],["D:/gitee/myblog/public/img/gallery/2023/02.jpg","b8655e020dd6538e80a376e5b6f5e8f6"],["D:/gitee/myblog/public/img/gallery/2023/03.jpg","f062f6048c46a77d2b4d7895d7c3de59"],["D:/gitee/myblog/public/img/gallery/2023/04.jpg","feaba3e583fb992049355c8a9f532892"],["D:/gitee/myblog/public/img/gallery/2023/05.jpg","659f4c1921a2e03050f564649da256d5"],["D:/gitee/myblog/public/img/gallery/2023/06.jpg","953861441bf852d4d8e2f4503c8258b3"],["D:/gitee/myblog/public/img/gallery/2023/07.jpg","173f8df0e12672f5dbb64bf6976d1d21"],["D:/gitee/myblog/public/img/gallery/2023/08.jpg","8c04a7cc9cf781b0929964324899d02a"],["D:/gitee/myblog/public/img/gallery/2023/09.jpg","4dc9f88bf5cc347db7ea9a8f4861abc6"],["D:/gitee/myblog/public/img/gallery/2023/10.jpg","dc5dd29e8df37b86be3e8f4aa729116f"],["D:/gitee/myblog/public/index.html","43e6fd06abbb2804c92002495ac1690f"],["D:/gitee/myblog/public/js/copy.js","f4607057c0513bd07a69fcac08121979"],["D:/gitee/myblog/public/js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["D:/gitee/myblog/public/js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["D:/gitee/myblog/public/js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["D:/gitee/myblog/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["D:/gitee/myblog/public/js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["D:/gitee/myblog/public/js/search/algolia.js","dedc6e24c8d82429d5d498cc5a47ab07"],["D:/gitee/myblog/public/js/search/local-search.js","bac0e1eda3d01fe70e4f7b887390ad97"],["D:/gitee/myblog/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["D:/gitee/myblog/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["D:/gitee/myblog/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["D:/gitee/myblog/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["D:/gitee/myblog/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["D:/gitee/myblog/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["D:/gitee/myblog/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["D:/gitee/myblog/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["D:/gitee/myblog/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["D:/gitee/myblog/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["D:/gitee/myblog/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["D:/gitee/myblog/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["D:/gitee/myblog/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["D:/gitee/myblog/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["D:/gitee/myblog/public/js/transition.js","bd261a5dda799613501070ecc19d6e69"],["D:/gitee/myblog/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["D:/gitee/myblog/public/page/2/index.html","db9e31cb5b6f240e68dfbd19cf3da079"],["D:/gitee/myblog/public/page/3/index.html","32fca191e5c4791f7af258da2055ca56"],["D:/gitee/myblog/public/slides/index.html","bb8099b4588c83705bf6d1fc2f73c246"],["D:/gitee/myblog/public/tags/ES标准/index.html","23803aa48cc28a7d8b7c9ffa2a72080c"],["D:/gitee/myblog/public/tags/Error/index.html","7e417c6b70c54fd182fe821a3468ddbe"],["D:/gitee/myblog/public/tags/React/index.html","b71f182170afcaf84abb4a111b146f28"],["D:/gitee/myblog/public/tags/axios/index.html","0c6baca5d70f394325f366c8588171fc"],["D:/gitee/myblog/public/tags/cookie/index.html","efeba6de3cc3a847104209d9259f3a2a"],["D:/gitee/myblog/public/tags/css/index.html","a2c5f245c1e7d3afdacaacd3882d00b4"],["D:/gitee/myblog/public/tags/curry/index.html","56849f650f902ec762d3d0ce551c0e9b"],["D:/gitee/myblog/public/tags/demo/index.html","92b5a6932e100d1133166e669cb3fa26"],["D:/gitee/myblog/public/tags/es6/index.html","9c93af4e61fc2cc24d91d9e3c89f425f"],["D:/gitee/myblog/public/tags/eslint/index.html","827089ff115fd6766978335f4c6ce6d2"],["D:/gitee/myblog/public/tags/http/index.html","16399c4bd0d60d019c425e90f0ed313b"],["D:/gitee/myblog/public/tags/index.html","97aaad6fadbdcee2f417859293f33d24"],["D:/gitee/myblog/public/tags/iview/index.html","c5076c31bb77b6ef9941a50973a88175"],["D:/gitee/myblog/public/tags/js/index.html","03a18ad640313df934c73940b286a9ba"],["D:/gitee/myblog/public/tags/jsonp/index.html","dd902b7686c958e1979858ffde89ce95"],["D:/gitee/myblog/public/tags/localstorage/index.html","35d99e9f3616f21b42c1cb561d5f017f"],["D:/gitee/myblog/public/tags/mock/index.html","36041f5c358c5f5c8643410ffd09a79d"],["D:/gitee/myblog/public/tags/mpvue/index.html","7fd9ecaff120107fcb1eb463f4d04674"],["D:/gitee/myblog/public/tags/mvvm/index.html","190fa14dc5e06f61bb6557f01d29870a"],["D:/gitee/myblog/public/tags/node/index.html","7b16c56aa1c02a26831b721431ccfbf6"],["D:/gitee/myblog/public/tags/nuxt/index.html","78a367df00c6de08ebdedc137aabb282"],["D:/gitee/myblog/public/tags/nvm/index.html","26cdb4acfb8dabc15415414cfa1bfce4"],["D:/gitee/myblog/public/tags/oop/index.html","1deecf19fe674c31f27121f57dce120d"],["D:/gitee/myblog/public/tags/promise/index.html","27ebfa42ad4eb9c9b48efeca80bf7ed0"],["D:/gitee/myblog/public/tags/rem/index.html","7fcee5c72ea89e1b0769877e52bfc71e"],["D:/gitee/myblog/public/tags/reveal-js/index.html","868da08e8691f39870089e5745958397"],["D:/gitee/myblog/public/tags/session/index.html","8e157d07fda62c0f6716fd4299bfe3d5"],["D:/gitee/myblog/public/tags/sessionstorage/index.html","129baa8739302ca53e00dc049aa3fede"],["D:/gitee/myblog/public/tags/stream/index.html","4fe2703bc810a7ad7a958a912b750233"],["D:/gitee/myblog/public/tags/token/index.html","43db02cb5c84abbdd992a69b1239f17f"],["D:/gitee/myblog/public/tags/ts/index.html","9ee545328a5699a0acfa859eb9bebcc0"],["D:/gitee/myblog/public/tags/underscore/index.html","af3489829c5df6bf11e55f50d9316dcf"],["D:/gitee/myblog/public/tags/vscode/index.html","8363563dfabfb3aad0bca7822499e6ac"],["D:/gitee/myblog/public/tags/vue-cli/index.html","967fb39405e23ffe1dba6f65b410d128"],["D:/gitee/myblog/public/tags/vue-i18n/index.html","a4bbcdf3d5ea257eb5f4a9040e978163"],["D:/gitee/myblog/public/tags/vue/index.html","5c5baba06aa9eca1d5fa9f9183ffdd7a"],["D:/gitee/myblog/public/tags/webpack/index.html","438b0a8e6736f9d14165d240167c164d"],["D:/gitee/myblog/public/tags/压缩/index.html","584175b52e9259e76fb5b8bc8a39a716"],["D:/gitee/myblog/public/tags/发布订阅/index.html","916a457bd4d23c836518d2c5dba47543"],["D:/gitee/myblog/public/tags/吐槽/index.html","063b35e0d053586f79f523f6b6d3c617"],["D:/gitee/myblog/public/tags/回流/index.html","7743b9fc44780dd8d6cdf0b91ad943c9"],["D:/gitee/myblog/public/tags/国际化/index.html","ea6ddb4f7bb763c0e85ef0a6b51fe204"],["D:/gitee/myblog/public/tags/图片/index.html","8d06ccaac556c0184bddebda8866548e"],["D:/gitee/myblog/public/tags/实战/index.html","0aab54c4505d5f3268a73308f3c1402e"],["D:/gitee/myblog/public/tags/小程序/index.html","2b1e5356d3388ae073e2187cf3ec620a"],["D:/gitee/myblog/public/tags/引用/index.html","5c25cfecc5b250c7d0563b3e60f10d0d"],["D:/gitee/myblog/public/tags/思考/index.html","062f02cc0e69cc78d8c2cf7fecdb34e4"],["D:/gitee/myblog/public/tags/性能/index.html","8b6aa921b5e18dc44caeec1c56f0f1af"],["D:/gitee/myblog/public/tags/总结/index.html","fa44eaac9319455bee1ea209f696ab1a"],["D:/gitee/myblog/public/tags/懒加载/index.html","15bce50b13f84a8f48d79d8f8d155ddb"],["D:/gitee/myblog/public/tags/数据结构/index.html","7f1cae1c93fb0d0c6cbe6199a0f3d65e"],["D:/gitee/myblog/public/tags/服务端渲染/index.html","45befc4e75c339fb210aa96b24f0e063"],["D:/gitee/myblog/public/tags/框架/index.html","8dd1af7723493979eb99c08bd88f6a0e"],["D:/gitee/myblog/public/tags/正则表达式/index.html","502cc7f9c96b848e0ffeb30078caa52a"],["D:/gitee/myblog/public/tags/渲染/index.html","4fd726527df56c6d4fd9c9c253056eb9"],["D:/gitee/myblog/public/tags/源码/index.html","06b8fa9af31874d86110f1f6700a06ff"],["D:/gitee/myblog/public/tags/移动端/index.html","9a1027eb46222c040ebec1ba80a173eb"],["D:/gitee/myblog/public/tags/缓存/index.html","ba8c27da78e46460af58c81e4f5f88e0"],["D:/gitee/myblog/public/tags/自适应/index.html","d32363b3fe3531a1b2ad97b2aa8ae209"],["D:/gitee/myblog/public/tags/装机/index.html","b7e842ea658cc310696e37bdc87e19ab"],["D:/gitee/myblog/public/tags/观察者/index.html","42bc27815a145959769161d8d563f442"],["D:/gitee/myblog/public/tags/解题/index.html","a970a835b0695a24b28013be35c30c9c"],["D:/gitee/myblog/public/tags/设计模式/index.html","f2c7501e9a42322fc679a0be3b7f5c5a"],["D:/gitee/myblog/public/tags/跨域/index.html","32359ca4e0498c44d5811d134f1109f4"],["D:/gitee/myblog/public/tags/重绘/index.html","d3f3b559f34d382ff6a612f70f464ded"],["D:/gitee/myblog/public/tags/面试/index.html","40988490a021a4bc010557215a994696"],["D:/gitee/myblog/public/tags/预加载/index.html","82e31ed2cc08f10d04c104d79e1d1742"],["D:/gitee/myblog/public/tags/预渲染/index.html","d4274ca1418f28643acdb558286ef4ad"]];
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







