# NeptuneBlog

基于Angular 10的MicroBlog, 后端部分使用Spring Cloud Netflix开发.

## 项目地址

- 前端 <https://github.com/liuweigeek/NeptuneBlog-frontend>
- 后端 <https://github.com/liuweigeek/NeptuneBlog-backend>

## 项目截图

#### 主页

![主页](./docs/images/homepage.png)

#### 个人资料页

![个人资料页](./docs/images/user-profile.png)

## 部署步骤

- 执行`npm install -g @angular/cli`来安装Angular CLI
- 在项目目录下执行`npm i`初始化项目依赖
- 启动后端项目 [NeptuneBlog-backend](https://github.com/liuweigeek/NeptuneBlog-backend)
- 在项目目录下执行`ng serve`启动前端项目,然后在浏览器中访问<http://localhost:4200>

打开`docs/docker/services`
中对应版本的Docker Compose配置文件, 修改`volumes`为自己的本地路径, 统一部署中间件
