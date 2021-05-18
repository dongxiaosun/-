# 权限验证

## cookie

本示例主要演示 `/login`、`/user` 这两个接口，且都是 GET 请求。

### 启动项目

```yml
npm run cookie
```

### cookie 属性

| Property | Type                                                              | Description                                                                                                                                                   |
| -------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| domain   | String                                                            | Domain name for the cookie. Defaults to the domain name of the app.                                                                                           |
| encode   | Function                                                          | A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.                                                                        |
| expires  | Date                                                              | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.                                                                     |
| httpOnly | Boolean Flags the cookie to be accessible only by the web server. |
| maxAge   | Number                                                            | Convenient option for setting the expiry time relative to the current time in milliseconds.                                                                   |
| path     | String                                                            | Path for the cookie. Defaults to “/”.                                                                                                                         |
| secure   | Boolean                                                           | Marks the cookie to be used with HTTPS only.                                                                                                                  |
| signed   | Boolean                                                           | Indicates if the cookie should be signed.                                                                                                                     |
| sameSite | Boolean                                                           | or String Value of the “SameSite” Set-Cookie attribute. More information at https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1. |

参考资料：
http://expressjs.com/en/5x/api.html#res.cookie
https://sxd.vercel.app/http/cookie.html

### 登录

**接口信息**
URL: http://localhost:3100/login
method: GET

**入参**
query: username=admin&password=123456

**出参（json）**
成功 => { message: "登录成功" }
失败 => { message: "登录失败" }

登录成功之后设置了 `token` ，有效期时间为 2s。

### 用户信息

**接口信息**
URL: http://localhost:3100/user
method: GET

**出参（json）**
成功 => { message: "管理员" }
失败 => { message: "登录失效，请重新登录" }

基于 cookie 的认证方式也有很多缺点：

- cookie 是存储在客户端的，所以在一定程度上增加了可以伪造的几率，安全性上稍微弱一点。
- 由于 cookie 在浏览中有跨域的阻拦，所以在有跨域需求的时候，需要服务器做相应的配置。
- cookie 是有长度限制的，所以不宜存储过长的信息。
- 用户的客户端可能会禁用 cookie，这个时候可以依靠 url 传值来解决这个问题。
- 服务端想要操作 cookie 认证信息的失效，比较困难，不像 session 认证那样方便。
