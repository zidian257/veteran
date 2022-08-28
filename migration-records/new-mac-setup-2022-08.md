# 新 Macbook 笔记本配置

## 办公、基础

- 搜狗输入法(https://shurufa.sogou.com/)
 - 设置开启中英文空格
 - 设置关闭不必要的通知、字数统计
- Chrome[地址](https://www.google.com/chrome/)
- 企业微信 [地址](https://work.weixin.qq.com/)
- 微信 [地址](https://mac.weixin.qq.com/)
- 飞连
- MindNode（从 AppStore 直接安装
- 金山文档
- SetApp
  - CleanShotX 截图必备
  - 
- Telegram 摸鱼必备

## 编码

- VSCode
- WebStorm
- homebrew[地址](https://brew.sh/)
  - brew install tree
  - brew install neovim
  - brew install node
- npm
  - corepack enable（yarn packed after v16.9；corepack 支持 yarn + pnpm）
  - npm install -g n（全局的 node 版本管理器）
- Charles[地址](https://www.charlesproxy.com/download/)
  - MacOS https 抓包配置
    - help -> SSL Proxying -> Install Charles Root Certificate
    - 完毕后在 Key Chain 信任该证书
    - Proxy -> SSL Proxying Settings -> 添加一个匹配符；通常来说 `*` 即可：开启全部流量的 SSL 监听
- ssh
  - ssh-keygen -t rsa -C "comment"
  - 去公司 GitLab 添加 cat `~/.rsa_pub` 的公钥
  - 记得更新 Github 的 SSH Key
- 仓库
  - 没啥特别的，一个一个地拉吧 


## reference

[New MacBook Setup](https://sourabhbajaj.com/mac-setup/)
