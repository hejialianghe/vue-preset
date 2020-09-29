
<%_ if(options.application === 'mobile') { _%>
 module.exports = { 
  plugins:{
    autoprefixer: {
      // browsers: ["Android >= 4.0", "iOS >= 7"],
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
      unitPrecision: 5, // px转rem后保留小数的位数
      selectorBlackList: [
        'ignore', /^.van-/
      ], // 选择器黑名单，排除转换列表中的选择器
      replace: true,
      mediaQuery: false, // false表示媒体查询的尺寸px不转换为rem
      minPixelValue: 2 // 设置最小的转换尺寸，此尺寸以下的值不转换
    }
  }
}

<%_ } else _%>
module.exports = { 
  plugins:{
    autoprefixer: {
      // browsers: ["Android >= 4.0", "iOS >= 7"],
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    }
  }
}
<%_ } _%>


