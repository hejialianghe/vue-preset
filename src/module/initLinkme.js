export default function initLinkme(config) {
  // 环境配置
  let currHref = location.href;
  let env = currHref.indexOf("/prod/") !== -1 ? "prod" : "dev";
  if (env === "prod") {
    config.type = "live";
  } else {
    config.type = "test";
  }
  let linkedme = window.linkedme;
  if (linkedme) {
    linkedme.init("69910da011e66261cd3aa2c27f5b9688", config, function(
      err,
      response
    ) {
      if (err) {
        // 初始化失败，返回错误对象err
        // console.error('初始化失败', err)
        window.linkErr = err;
      } else {
        // 初始化成功，可以不做处理
        // console.log('linkedme init success')
      }
    });
  } else {
    // console.log('linkErrbug')
    window.linkErr = "notfind";
  }
}
