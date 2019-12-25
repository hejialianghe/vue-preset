## 项目文件结构（vueCli3.O项目结构）

```
public
├── index.html     // 文件入口，因为这框架是单页面应用，挂在一个app,然后动态渲染路由模板
src
├── assets          // 资源目录 图片，样式，iconfont
    ├── scss        // scss文件
    ├── iconfont    // iconfont文件
    └── images         // 图片文件
├── components      // 全局通用组件目录
    ├── Login       // 登录组件
    ├── Loading     // loading组件
    └── ...
├── mixins          // 分发 Vue 组件中的可复用功能
	├── default.js  // 复用方法分装，例如可以在任意组件通过this.access_token获取access_token
├── module          // 工具类
    ├── common.js   // 常用功能函数
    ├── directives.js // 自定义指令
    ├──  filters.js  // 过滤器
    └── ...
├── router          // 路由配置
├── service         // 服务层
    ├── api         // 请求
    	├──index.js // 请求模块入口
    	├──user.js  // user模块
    ├── config     // 请求方法封装，拦截器相关设置
        ├─ axios   // 创建axios
        ├─ interceptors // 拦截器设置
        └── index // 请求模块封装
├── store          // 状态管理
    ├──modules     // 子模块集合
    index.JS       // 状态管理入口文件
└── views           // 视图层
├── App.vue         // 根组件，也是我们的主组件，所有的页面都在App.vue下进行切换
├── global.js       // 配置全局模式文件
├── main.js         // 入口文件，主要作用是初始化实例并使用需要的插件
.env.dev.build      // 打测试包环境变量配置
.env.dev.serve      // 运行测试项目环境变量配置
.env.prod.build     // 打生产包环境变量配置
.env.prod.serve     // 运行生产项目环境变量配置
.eslintrc           // eslint配置
postcss.config      //postcss转为px为rem
vue.config.js       // 可以配置文件，主要配置调试的端口配置，proxy接口配置，插件配置等
package.json        // 配置文件，里面设定了脚本及项目依赖的库
babel.config.js     // 可以按需加载引用多个不同的组件库，配置polyfills。
.gitignore          // 用来过滤一些不需要上传git仓库的文件，比如node_modules文件夹，通过配置可取消git版本控制代码上传时不需要的模块
editorconfig // 编辑器配置文件，indent_style = space缩进方式为空格，indent_size = 2缩进2个字符；
trim_trailing_whitespace // 自动删除文件末尾空白行，更多配置可google
```

### 运行方式

```
命令只做参考，因为npm run serve 会运行package.json里script下的脚本命令，serve可配置
npm（安装node即可用npm）
npm i 安装依赖
npm run serve:dev // 运行测试项目
npm run build:dev  // 打包测试包
npm run serve:prod // 运行生产项目
npm run build:prod  // 打生产包
npm i vant -g // 全局安装vant包
npm i vant -s // 只用与项目内的包，生产依赖包
npm i vant -d // 只用与项目内的包，开发依赖包
npm uninstall vant //卸载包

yarn （跟npm同样功能，但是下载方式采用并行安装；安装速度快，稳定性强；推荐用yarn）
yarn 安装依赖
yarn  serve:dev // 运行测试项目
yarn  build:dev  // 打包测试包
yarn  serve:prod // 运行生产项目
yarn  build:prod  // 打生产包
yarn  add [package] // 添加项目内生产依赖包
yarn  add [package] -D // 添加项目内开发依赖包
yarn  add [package] -G // 添加项目全局依赖包
yarn upgrade [package] // 升级依赖
yarn remove [package] // 移除依赖

特别提示：1.npm下载yarn npm i yarn -g  2.推荐下载nrm切换镜像源
```

### 请求接口方式

```
==请求方式1==
例如请求获取token接口
├── service         
    ├── api         
    	├──index.js 
    	├──user.js  // user模块
1.在api文件下新建ueser.js用于存放用户相关信息的接口；如果是home模块，就新建home.js
2.在user.js中填写一下信息
  {
    name: 'login', // 接口名称
    method: 'POST', // 请求方式POST/GET
    desc: '登陆接口', // 接口描述
    path: '/api/user/login',// 接口地址
    mockPath: '',
    params: {// 配置参数，若无参数，空对象即可
      account: '',
      method: '',
      password: ''
    }
  }
3.在index.js中引入user.js到出的模块
4.在组件中调用接口
this.$api['user/login']( // user是文件名，login是接口名
 {
    account: 'test',
     method: 0,
     password: md5('111111')
 }).then(res=>{})
 重要提示：
     1.拦截器中已经默认封装了loading效果和错误Toast提示；如果不想用默认，就在请求方法中传入参数，示例如下：
     this.$api['user/login']({请求参数},{noShowLoading:true,noShowDefaultError:true})
     2.拦截器中会默认对接口参数进行序列话，a=1&b=2形式；而有些接口要求的contentType不同，需要关掉序列化，示例如下：
     this.$api['user/login']({请求参数},{noStringify:true})
 ==请求方式2==
  为什么有这个请求方式？
  答：因为有些请求不在vue实例中，所以获取不到this.$api,所以注册了一个全局的方法，例如在vuex实例中可以用以下方法
global.ajax.get('/api/user/getUserInfo').then(res => {})
```

### 模块化store用法

```
一.state (存值)
1.组件中引入辅助函数 import { mapState } from 'vuex'
2.computed: {..mapState({ userInfo: state => state.user.userInfo })} 
3.this.userInfo

二.getter (操作state里的值，return新值)
1.组件中引入辅助函数 import { mapGetters } from 'vuex'
2.computed: {...mapGetters(['access_token', 'refresh_token'])} 
3.this.access_tokenmapActions

三.mutations(只有在mutations中才能改变state里的值)
1.组件中引入辅助函数 import { mapMutations } from 'vuex'
2.methods: {...mapMutations(['setUserIdentity'])} 
3.this.setUserIdentity()

三.actions(异步处理)
1.组件中引入辅助函数 import { mapActions } from 'vuex'
2.methods: {...mapMutations(['getCurrUserInfo'])} 
3.this.getCurrUserInfo()
```

### mixins

```
作用：分发 Vue 组件中的可复用功能，目前把userInfo，access_token，refresh_token等放在这里，在组件中this.方法名，即可拿到；就是把很多组件都要用的写在这里。
例如：在组件中this.userInfo，无需在引入vuex辅助函数
```

### module

```
common.js 常用方法可写在这里
例如：解决穿透的方法
directives.js  全局的自定义指令
例如:给页面一个屏幕的高度;<div v-extendHeight ></div>
filters.js
例如：过滤时间和价格
```



### global.js

```
全局的方法可引入到这里
```



### 插件

```
vscode编辑器
安装ESLint，Vetur，Beautify插件
```

