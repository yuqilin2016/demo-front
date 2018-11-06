# demo

## 基本环境

- 必须条件
  - 安装NodeJs： [官网](https://nodejs.org)  [阿里云镜像](https://npm.taobao.org/mirrors/node)

- 可选条件
  - 安装vue-cli: `npm install -g @vue/cli`
  - 安装cnpm: `npm install -g cnpm`
  - 安装yarn: [官网](https://yarnpkg.com/)

## 开发

```bash
# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:8000

## 发布

```bash
# 构建测试环境
npm run build:sit

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# --report to build with bundle size analytics
npm run build:prod

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```
