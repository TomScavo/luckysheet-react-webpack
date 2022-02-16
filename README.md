# eevee-project-template

Eevee 脚手架目录模板，脚手架将使用此模板生成新项目目录。

## CI/CD Git 流程规范 && 持续集成 && 持续部署

- [前端项目门禁接入](http://fe-blog-vm.cloud.leihuo.netease.com:1024/qian-duan-men-jin-jie-ru)
- [持续集成任务配置](http://qa-ci.fuxi.netease.com:2333/#/pipeline/integrate)
- [持续部署任务配置](http://qa-ci.fuxi.netease.com:2333/#/pipeline/deploy)
- [如何使用 Gitlab CI 规范项目提交和自动打包部署](https://confluence.leihuo.netease.com/pages/viewpage.action?pageId=71515537)

## 目录结构

```
index.tsx # 入口文件

store
  index.ts # 创建并导出store
  rootReducer.ts # 默认输出rootReducer以及导出RootState
  slice_a.ts

router
  index.ts # 收集router目录下的模块，构建应用路由；
  router_a.ts # 默认输出 RouteConfig
  router_b.ts

service
  service_a.ts # 网络请求模块
  service_b.ts

utils

hooks

styles # 全局样式

pages # 页面

components # 跨页面的可复用组件
```

## 路由配置

路由配置由 `router/`目录下的文件提供, 每个文件应默认导出配置需符合如下规范的路由定义：

```
interface RouteConfig {
  exact?: boolean;
  route?: string;
  component?: RouteProps['component'];
  children?: RouteConfig[];
  redirect?: string;
}
```

## 关于 Mock 和代理

- 项目中接口 Mock 实现的原理是将 API 请求通过 DevServer 代理到 [Mock 平台](http://qa-tool.fuxi.netease.com:9000/html/web/controller/console/console.html)中
- 执行 `yarn run mock` 将在本地开发环境启用 Mock 服务
- 不使用 Mock 服务，请使用 `yarn start`
- 整合了 `net.js`，如果 Mock 平台中接口状态为`开发完成`，将请求真实的后端接口
- 启用 Mock 服务后配置的代理还是生效的，如果代理与 Mock 服务冲突，Mock 的优先级较高
  > 如 config 中配置的 Mock_Target 为 `['**/api/**']`，setupProxy 中存在 context 为 `**/api/**` 的代理服务，那么配置的代理将不生效，api 接口走 Mock 服务
- 请在 setupProxy 中配置代理，不要将代理配置在 package.json 中
- 可以在 `config/config.yaml` 对 mock 服务进行配置
- Eevee 接口 mock 地址：http://qa-tool.fuxi.netease.com:9000/html/web/controller/console/console.html Eevee 模板项目
- Mock_Context 支持各种语法，具体详见 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)

| 参数                  | 说明                                                   | 默认值                               | 是否必填 |
| --------------------- | ------------------------------------------------------ | ------------------------------------ | -------- |
| Mock_Server_Port      | mock 服务的端口号                                      | 36742                                | 否       |
| Mock_Base_Path        | mock 服务的 basePath，可在 mock 平台的相应接口中查询到 | 无                                   | 是       |
| Mock_Context          | 需要拦截的 api 的路径前缀                              | ['/api']                             | 否       |
| Mock_Target           | mock 服务的 host                                       | http://qa-tool.fuxi.netease.com:9000 | 否       |
| Real_Backend_Api_Host | 真实的后端接口地址                                     |                                      | 是       |

## 关于样式

- eevee 支持 Less、Sass、CSS Modules
- 推荐使用 CSS Modules，为你的样式添加命名空间，避免全局污染
- 使用 CSS Modules 时推荐使用`模块中节点名 + 节点相关状态` 来命名 class，例如：

```
/* .dialog.module.css */
.confirm-button-disabled {
}
```

- 配置项目内 less 跳转和变量提示，可以使用 `Less IntelliSense` 插件。该插件，默认过滤掉 node_modules 的检查，如需支持可配置 `scannerExclude`

## 关于代码格式 Prettier, ESLint

目前使用 `husky` 配置了在 `commit` 命令前自动对提交的文件使用 `prettier` 进行格式化。  
`prettier` 会按照 `eslint` 的规则进行格式化。  
如果想确保提交后的代码和提交前格式一致，可以在 vscode 安装 prettier 插件并配置 `on save` 的时候 `auto format`，否则一切提交会被格式化为标准的格式  
如果想跳过格式化， 可以给`git commit`命令加上参数`-- no-verify`

## 关于安全

React 可能发生 XSS 的写法列举

```
1. <a href={user.inputValue}></a> // 可能输入 'javascript: stealYourPassword()'
2. <a {...userData}> // 同上
3. dangerouslySetInnerHTML
4. innerHTML = userInput'
```

使用 [xss](https://github.com/leizongmin/js-xss) 模块可以转义这些危险情况

简单使用举例：

```
import * as xss from "xss";

<a href={xss.friendlyAttrValue(user.inputValue)}></a>
```

更多复杂场景的转义与过滤 ：[XSS 文档](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)
