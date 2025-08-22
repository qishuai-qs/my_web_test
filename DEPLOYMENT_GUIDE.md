# 知库知识门户部署指南

## 一、申请第三方登录凭证

### QQ互联申请步骤
1. 访问[QQ互联开放平台](https://connect.qq.com/)
2. 注册开发者账号（需实名认证）
3. 创建新应用 → 选择"网站应用"
4. 填写应用信息：
   - 网站名称：知库知识门户
   - 网站类型：教育学习
   - 网站简介：个人知识管理平台
5. 获取APP ID和APP Key
6. 在`index.html`中替换：
   ```html
   data-appid="您的QQ互联APPID"
   appId: "您的QQ互联APPID"
   ```

### 微信登录申请步骤
1. 访问[微信开放平台](https://open.weixin.qq.com/)
2. 注册账号（需企业资质，个人可考虑微信公众号登录方案）
3. 创建"网站应用"
4. 填写域名和回调地址：
   - 授权回调域：您的域名.com
5. 获取APPID和APPSECRET
6. 在`index.html`中替换：
   ```html
   appid: "您的微信开放平台APPID"
   ```

## 二、HTTPS配置方案

### 方案1：使用Let's Encrypt免费证书（推荐）
```bash
# 安装certbot
sudo apt update && sudo apt install certbot python3-certbot-nginx

# 获取证书（需要已解析的域名）
sudo certbot --nginx -d 您的域名.com

# 自动续期测试
sudo certbot renew --dry-run
```

### 方案2：云平台托管证书
- 阿里云/腾讯云等平台提供一键HTTPS配置
- 在SSL证书管理页面申请免费证书并部署

## 三、部署方案选择

### 方案1：静态网站托管（最简单）
1. 推送代码到GitHub仓库
2. 使用GitHub Pages/Vercel/Netlify等服务自动部署
3. 配置自定义域名和HTTPS

### 方案2：云服务器部署（最灵活）
```bash
# 安装Nginx
sudo apt update && sudo apt install nginx

# 部署项目
sudo mkdir -p /var/www/zhiku
sudo cp -r * /var/www/zhiku/

# 配置Nginx
sudo nano /etc/nginx/sites-available/zhiku.conf
```
示例Nginx配置：
```nginx
server {
    listen 80;
    server_name 您的域名.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name 您的域名.com;
    
    ssl_certificate /etc/letsencrypt/live/您的域名.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/您的域名.com/privkey.pem;
    
    root /var/www/zhiku;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 方案3：Docker容器化部署
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```
构建命令：
```bash
docker build -t zhiku .
docker run -d -p 80:80 --name zhiku-portal zhiku
```

## 四、后续优化建议
1. 添加资源评论功能
2. 实现资源收藏夹
3. 开发后台管理系统
4. 接入网站统计工具