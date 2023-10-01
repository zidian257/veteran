# 新 Macbook 笔记本配置

## 办公、基础

- 搜狗输入法(https://shurufa.sogou.com/)
 - 设置开启中英文空格
 - 设置关闭不必要的通知、字数统计
- Chrome[地址](https://www.google.com/chrome/)
- 企业微信 [地址](https://work.weixin.qq.com/)
- 微信 [地址](https://mac.weixin.qq.com/)
- 飞连(airdop) 
- MindNode
- SetApp[地址](https://setapp.com)
  - CleanShotX 截图必备
- Telegram 摸鱼必备
- 那啥以后,
```
  // You can use unset command to remove the environment variable.
  unset http_proxy
```
取消 terminal 的代理
## 编码
- VSCode
  - 开启 synchronization
  - 把父级目录全部加入 workspace（TODO 感觉这里可以继续总结一下）
- WebStorm
- oh-my-zsh
  - aliases: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git
- homebrew[地址](https://brew.sh/)
  - brew install tree
  - brew install neovim
  - brew install node
- npm
  - corepack enable（yarn packed after v16.9；corepack 支持 yarn + pnpm）
  - npm install -g n（全局的 node 版本管理器）
  - 在 .zshrc 里面添加:
    ```
    export PATH=$HOME/bin:/usr/local/bin:$PATH
    export N_PREFIX=$HOME/.n
    export PATH=$N_PREFIX/bin:$PATH
    ```
- Charles[地址](https://www.charlesproxy.com/download/)
  - MacOS https 抓包配置
    - help -> SSL Proxying -> Install Charles Root Certificate
    - 完毕后在 Key Chain 信任该证书
    - Proxy -> SSL Proxying Settings -> 添加一个匹配符；通常来说 `*` 即可：开启全部流量的 SSL 监听
- ssh
  - ssh-keygen -t rsa -C "mbp-14-2023-10"
  - 去公司 GitLab 添加 cat `~/.rsa_pub` 的公钥
  - 记得更新 Github 的 SSH Key
- 仓库
  - 没啥特别的，一个一个地拉吧
- 微信小程序/百度小程序/etc

## Lifestyle 生活

- [Adobe cloud 修图、摄影](https://creativecloud.adobe.com/apps/all/desktop?action=install&source=apps&productId=creative-cloud)
- Iosevka[地址](https://github.com/be5invis/Iosevka)
  - build fira version
  - brew install ttfautohinting
## reference

[New MacBook Setup](https://sourabhbajaj.com/mac-setup/)
