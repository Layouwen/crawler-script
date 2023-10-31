# Web Status Copy

复制网页的所有状态

> 这个行为很危险, 如果非值得信任的人, 尽可能不要将网页状态提供给他们!!!

## Usage

### Step 1

在已经登录的网页中, 打开控制台, 将 `src/scripts/web_status_copy/get.js` 中的代码复制到控制台中, 并执行

此时会将你的所有状态以 JSON 序列化后的字符串输出, 请记录下来

### Step 2

在需要登录的网页中, 打开控制台, 将 `src/scripts/web_status_copy/set.js` 复制到控制台, 先别运行

将第一步中的 JSON 字符串替换到 `set.js` 中的 `status` 变量中 

接着回车执行, 此时会将你的状态设置到当前网页中

最后一步!! 刷新页面, 正常访问

#### Example

替换前:

```js
const status = `替换成你的get.js输出的内容`
```

替换后:

```js
const status = `{巴拉巴拉, 巴拉啦能力, 稀里哗啦的内容}`
```
