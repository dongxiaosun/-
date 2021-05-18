# jwt 认证

## 简介

JSON Web Token（JWT）是一个开放的标准（RFC 7519），它定义了一个紧凑且自包含的方式，用于在各方之间作为 JSON 对象安全地传输信息。由于此信息是经过数字签名的，因此可以被验证和信任。
更多信息可以查看官网：[https://jwt.io/introduction/](https://jwt.io/introduction/)

基于 token 的鉴权机制类似于 http 协议也是无状态的，它不需要在服务端去保留用户的认证信息或会话信息。这也就意味着 JWT 认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利。

## 认证流程

![jwt认证流程](./images/jwt1.jpg)

认证流程如下：

- 用户使用账号和密码发出 post 请求；
- 服务器使用私钥创建一个 jwt；
- 服务器返回这个 jwt 给浏览器；
- 浏览器将该 jwt 串在请求头中像服务器发送请求；
- 服务器验证该 jwt；
- 返回响应的资源给浏览器。

## 组成

先来看一张 JWT 的信息的截图：

![jwt组成](./images/jwt2.jpg)

从上图可以看到，JWT 含有三部分：头部（header）、载荷（payload）、签名（signature）。

#### 头部（header）

JWT 的头部有两部分信息：

- 声明类型，这里是 JWT
- 声明加密的算法，通常直接使用 HMAC SHA256

头部示例如下：

```
{ "alg": "HS256", "typ": "JWT" }
```

头部一般使用 base64 加密，加密后密文：eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9

#### 载荷（payload）

该部分一般存放一些有效的信息。JWT 的标准定义包含五个字段：

- iss：该 JWT 的签发者
- sub: 该 JWT 所面向的用户
- aud: 接收该 JWT 的一方
- exp(expires): 什么时候过期，这里是一个 Unix 时间戳
- iat(issued at): 在什么时候签发的
- nbf: 在 xxx 日期之间，该 JWT 都是可用的
- jti: JWT 的唯一身份标识

载荷示例如下：

```
{ "sub": "1234567890", "name": "Java 碎碎念", "iat": 1516239022 }
```

#### 签名（signature）

前面两部分都是使用 Base64 进行编码的，即前端可以解开知道里面的信息。signature 需要使用编码后的 header 和 payload 以及我们提供的一个密钥，然后使用 header 中指定的签名算法（HS256）进行签名。签名的作用是保证 JWT 没有被篡改过。
三个部分通过.连接在一起就是我们的 JWT 了，所以我们生成的 JWT 如下：
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphdmHnoo7noo7lv7UiLCJpYXQiOjE1MTYyMzkwMjJ9.LLJIkhJs6SVYlzn3n8fThQmhGutjTDI3RURTLtHV4ls
注意：密钥就是用来进行 JWT 的签发和 JWT 的验证，所以，它就是你服务端的私钥，在任何场景都不应该泄露出去。

## 使用场景

JWT 主要使用场景如下：

**授权**

这是 JWT 使用最多的场景，一旦用户登录，每个后续的请求将包括 JWT，从而允许用户访问该令牌允许的路由、服务和资源。

**信息交换：JSON**

JWT 可以用在各方之间安全地传输信息，因为 JWT 可以进行签名，所以您可以确定发件人是他们所说的人。另外，由于签名是使用标头和有效负载计算的，因此您还可以验证内容是否未被篡改。

## 优缺点

基于 token 的验证方式也是现代互联网普通使用的认证方式，那它有什么优点吗？

- 支持跨域访问，Cookie 是不允许垮域访问的，这一点对 Token 机制是不存在的，前提是传输的用户认证信息通过 HTTP 头传输。
- 无状态:Token 机制在服务端不需要存储 session 信息，因为 Token 自身包含了所有登录用户的信息，只需要在客户端的 cookie 或本地介质存储状态信息。
- 解耦 不需要绑定到一个特定的身份验证方案。Token 可以在任何地方生成，只要在你的 API 被调用的时候，你可以进行 Token 生成调用即可。
- 适用性更广：只要是支持 http 协议的客户端，就可以使用 token 认证。
- 服务端只需要验证 token 的安全，不必再去获取登录用户信息，因为用户的登录信息已经在 token 信息中。
- 基于标准化:你的 API 可以采用标准化的 JSON Web Token (JWT). 这个标准已经存在多个后端库（.NET, Ruby, Java,Python,PHP）和多家公司的支持（如：Firebase,Google, Microsoft）。

那基于 token 的认证方式有哪些缺点呢？

- 网络传输的数据量增大：由于 token 中存储了大量的用户和安全相关的信息，所以比单纯的 cookie 信息要大很多，传输过程中需要消耗更多流量，占用更多带宽，
- 和所有的客户端认证方式一样，如果想要在服务端控制 token 的注销有难度，而且也很难解决客户端的劫持问题。
- 由于 token 信息在服务端增加了一次验证数据完整性的操作，所以比 session 的认证方式增加了 cpu 的开销。
- 但是整体来看，基于 token 的认证方式还是比 session 和 cookie 方式要有很大优势。在所知的 token 认证中，jwt 是一种优秀的解决方案。

**参考资料**

[https://segmentfault.com/a/1190000023870645](https://segmentfault.com/a/1190000023870645)

[https://cloud.tencent.com/developer/article/1610950](https://cloud.tencent.com/developer/article/1610950)
