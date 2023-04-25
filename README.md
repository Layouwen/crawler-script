# 爬虫和脚本 Crawler & Script

## MQTT Client

```bash
node main.js <host> <port> <protocol> <topic> <msg>
```

example:

```bash
node main.js localhost 1883 ws UPDATE_NAME "hello world"
```
## 百度网盘

![baiduwangpan](/assets/gif/baiduwangpan.gif)

### 功能

1. 获取指定路径的所有文件信息
2. 查账文件
3. 统计没有添加序号前缀和序号不连续的文件名

### 使用方式

```bash
npx ts-node index.ts
```

### 配置

运行程序自动在家目录创建 `crawler-script/config.json` 存储配置文件

```json
{
  "cookie": "",
  "customFindPath": ""
}
```
## 问卷星

### 获取题目、选项、解析的数据

复制 `./index.ts` 的代码到控制台执行，即可获取字符串。
## 大牛教育

### 网页嵌入式脚本

- 视频窗口化全屏控件

#### 使用方式

将 `web` 目录中的脚本，复制粘贴到 `console` 控制台执行。

> 可以使用油猴之类的插件，自动执行脚本。

### 爬取题目

[✅] 章节演练 选择题/应用题  
[✅] 历史真题 选择题/应用题

#### 使用方式

配置 `config/index.ts` 文件中 `daniu` 中的 `token`

执行 `index.ts` 脚本爬取数据到 `output` 目录
## 粤师教育

### 爬取科目所有章节练习

修改 `api/yueShiJiaoYu.ts` 中的 `Cookie`
修改 `index.ts` 里面的 `subcourseId` 为对应科目的 id 号

执行 `index.ts` 接着在 `output` 中查看结果
## 空格教育

### 下载对应作业的题目

1. 修改 `api/kongGeJiaoYu.ts` 中的 `token` 参数
2. 修改 `getHomeworkDetail()` 函数中的 `id` 参数
3. 执行 `ts-node src/scripts/kongGeJiaoYu/index.ts`
4. 在 `output` 中，查看结果
## 樱花动漫快捷键猴油脚本

### 播放地址

[https://www.yhpdm.net/](https://www.yhpdm.net/)

### 功能

- ✅ 自动播放，并跳过片头（需要手动设置片头时间）
- ✅ ctrl + n 下一集
- ✅ ctrl + shift + n 上一集
- ✅ ctrl + p 暂停/播放