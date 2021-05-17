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

## jwt

基于 Token 的认证。

基于 token 的验证方式也是现代互联网普通使用的认证方式，那它有什么优点吗？

- 支持跨域访问，Cookie 是不允许垮域访问的，这一点对 Token 机制是不存在的，前提是传输的用户认证信息通过 HTTP 头传输.
- 无状态:Token 机制在服务端不需要存储 session 信息，因为 Token 自身包含了所有登录用户的信息，只需要在客户端的 cookie 或本地介质存储状态信息.
- 解耦 不需要绑定到一个特定的身份验证方案。Token 可以在任何地方生成，只要在你的 API 被调用的时候，你可以进行 Token 生成调用即可.
- 适用性更广：只要是支持 http 协议的客户端，就可以使用 token 认证。
- 服务端只需要验证 token 的安全，不必再去获取登录用户信息，因为用户的登录信息已经在 token 信息中。
- 基于标准化:你的 API 可以采用标准化的 JSON Web Token (JWT). 这个标准已经存在多个后端库（.NET, Ruby, Java,Python,PHP）和多家公司的支持（如：Firebase,Google, Microsoft）.

那基于 token 的认证方式有哪些缺点呢？

- 网络传输的数据量增大：由于 token 中存储了大量的用户和安全相关的信息，所以比单纯的 cookie 信息要大很多，传输过程中需要消耗更多流量，占用更多带宽，
- 和所有的客户端认证方式一样，如果想要在服务端控制 token 的注销有难度，而且也很难解决客户端的劫持问题。
- 由于 token 信息在服务端增加了一次验证数据完整性的操作，所以比 session 的认证方式增加了 cpu 的开销。
- 但是整体来看，基于 token 的认证方式还是比 session 和 cookie 方式要有很大优势。在所知的 token 认证中，jwt 是一种优秀的解决方案

参考资料：
https://segmentfault.com/a/1190000023870645
https://cloud.tencent.com/developer/article/1610950
