# my-wxxiaochengxu
简单小程序开发

Wafer2 开发套件后端使用说明
想看具体步骤下载
小程序开发文档.docx文件



在开发前建议到网上下一些现成的demo
用微信开发者工具打开后大致看一下，能理解多少就理解多少
觉得不理解的就先上开发者文档上看看：
https://developers.weixin.qq.com/miniprogram/dev/
而在开发初期主要了解
开发者工具部分

一个页面的完成主要包括四个文件.json、.wxml、.wxss、.js文件

Wxml、wxss文件
顾名思义wxml文件等同于web开发中的html文件
Wxss文件等同于css文件
这两个文件可以看作视图层
可参考文档：
https://developers.weixin.qq.com/miniprogram/dev/framework/view/
Wxml的组件使用可以参考：
https://developers.weixin.qq.com/miniprogram/dev/component/
这些组件就相当与html中的<p></p><div></div>这些
具体的使用方法可以就要看文档啦


Js可以看作事件处理的文件
这个js文件的作用可以看文档：
https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
其中需要重点了解的是
生命周期回调函数和组件事件处理函数这两个部分	
还有一个js文件使用的比较多的就是微信小程序API，可参考
https://developers.weixin.qq.com/miniprogram/dev/api/



其中json文件不需要多说，这个文件的作用可以忽略，当需要的话，看文档：
https://developers.weixin.qq.com/miniprogram/dev/framework/config.html


但是不同于web开发中各个文件之间需要引用才能使用
微信小程序开发中只要在一个文件夹中
比如create文件中
这四个文件不需要添加引用语句就可使用

了解完这些回头再看看demo看看能理解多少
这个时候就可以去着手进行自己的小程序开发了
其实在看文档的时候就可以自己创建一个项目，按着文档做一些简单的东西

最后微信开发者工具的使用：
https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html

//git clone https://github.com/Topdu/my-wxxiaochengxu.git

开发时使用了
最简版的 Wafer2 开发套件
Github：https://github.com/tencentyun/wafer2-quickstart-nodejs
使用方法上面都有这里不在赘述

下面直接进入项目的后端说明：

看一下目前这个项目的内容

Client 这个文件夹下主要进行视图页面的开发：可以说是前端的开发吧

Server这个文件夹下进行服务端的开发，就是后端的开发
腾讯发布的这一套解决方案这一点比较好，前端后端在一起开发，不过要注意修改后端，也就是GUI（注意文档GUI的使用方法）修改后要进行上传代码到腾讯服务器，这个意思就是说，现在你可以在自己电脑上进行后端开发，但是要使用后端，要把自己的后端代码上传到腾讯服务器，具体方法
Github：https://github.com/tencentyun/wafer2-quickstart-nodejs
这里面都有
进行后端开发的时候，最经常打交道就是数据库了
现在来看一下这一套解决方案怎么进行后端数据库的连接
进入到自己phpmyadmin，看看方案给出的数据库是什么样
怎么进入phpmyadmin，要开通腾讯云



点击后台管理，进入

看到

点击进入，建议用ie浏览器进入

初始密码为自己小程序的appid 点击执行进入

cAuth这个数据库就是方案给出的数据库

以后设计数据库就可以在这里设计啦


回到微信开发者工具连接数据库

这部分就是与数据库进行连接的部分
连接具体方法可以看
Github：https://github.com/tencentyun/wafer2-quickstart-nodejs
关于数据库的部分
如果还是不清楚
这里给一个demo做参考
Github：https://github.com/goolhanrry/Weapp-Demo-LemonJournal
主要可以看一下这个后端部分server/controllers下的js文件
也就是怎么进行数据库查询，修改，增加，删除，这些操作


这里说明一下在进行server/controllers文件夹js开发时，要进行几个步骤，可以参考gui的步骤：
首先在client/下的config.js文件夹中添加
对应controllers文件夹下的js文件
然后在server/routes/index.js文件中进行加入一些东西。对应controller文件下的js文件


注意：
router.post('/**, controllers.**)的用法
router.post的post。这个post或者get对应we.request，method:’POST’或者’GET’
不能弄混！！

后端开发就先说这么多

前端的话真没什么要说的，一些组件的使用就要自己开动脑筋进行设计啦，当然可以看看别人的轮子，进行修改，然后自己进行创新呀

