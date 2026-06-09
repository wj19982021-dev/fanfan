# 风起小笺

一个 5 屏手机 H5 生日祝福网站，适合部署到 GitHub Pages 后在微信里直接打开。

页面不是整图贴片：5 个屏幕都由 HTML/CSS/JS 组成，文案、按钮、愿望签、印章、饭菜、灯、收信等都是可交互元素。电脑端会居中显示手机画幅，手机端会铺满宽度。

## 本地预览

直接用浏览器打开 `index.html` 即可，或在本目录启动静态服务：

```bash
python -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库，例如 `birthday-h5`。
2. 把本目录里的所有文件推送到仓库的 `main` 分支。
3. 在仓库页面打开 `Settings -> Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`，保存。
6. 等待 GitHub Pages 构建完成后，使用生成的 `https://你的用户名.github.io/birthday-h5/` 链接发到微信。

## 可替换资源

页面已预留：

- `assets/bgm.mp3`：背景音乐，默认不自动播放。
- `assets/font/zhaomengfu.woff2`：可替换为你拥有授权的书法字体。

当前版本使用 `assets/screens` 作为每页背景，并按 `assets/layout.json` 叠加 `assets/layers` 里的交互图层。第二页和第四页已接入后补的新整屏素材：第二页使用新底图并由前端生成三张“点击查看”卡片；第四页使用背面整屏图作背景，并从正面整屏图裁剪 5 个签牌区域逐个翻开。
