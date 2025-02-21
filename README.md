# DeepSeek 分支说明
这个分支是支持对接DeepSeek的分支，SpreadJS版本还没有升级，后续会更新到最新版本
DeepSeek的接入可以用官方或者其他服务商提供的API
Demo为了简单直接在网页里调用了模型，apiKey是暴露在网页中的，正式场景应该是服务端来完成模型API的调用


# spreadjs-chatgpt

This is a demo that SpreadJS working with ChatGPT by Vue 3 in Vite.
Main project is TypeScript, but deisnger config is JavaScript which is easier for more users copy the code.

## DeepSeek setup

需要在/src/components/openai.ts 设置自己的DeepSeek链接和apiKey

## Customize configuration

See [SpreadJS 产品文档](https://demo.grapecity.com.cn/spreadjs/help/docs/overview).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
