module.exports=(api,options,rootOptions)=>{
    api.extendPackage({
        "scripts": {
            "serve": "yarn serve:dev",
            "build": "yarn build:prod",
            "lint": "vue-cli-service --fix lint",
            "test:unit": "vue-cli-service test:unit",
            "serve:dev": "vue-cli-service serve --mode dev.serve",
            "serve:prod": "vue-cli-service serve --mode prod.serve",
            "build:dev": "vue-cli-service build --mode dev.build",
            "build:prod": "vue-cli-service build --mode prod.build",
            "build:analyze": "vue-cli-service build --mode analyze",
            "dll": "webpack -p --progress --config ./webpack.dll.conf.js",
            "serve:dist": "http-server -p 9090 dist/"
        }

    })
    api.extendPackage({   
            "dependencies": {
                "@babel/runtime": "^7.11.2",
                "axios": "^0.18.0",
                "vue": "^2.6.10",
                "vue-router": "^3.0.3",
                "vuex": "^3.0.1",
                "vuex-persistedstate": "^2.5.4"
            },
            "devDependencies": {
                "@babel/cli": "^7.8.4",
                "@babel/plugin-transform-runtime": "^7.11.0",
                "@babel/preset-env": "^7.9.6",
                "@vue/cli-plugin-babel": "^3.9.0",
                "@vue/cli-plugin-eslint": "^3.9.0",
                "@vue/cli-plugin-unit-mocha": "^3.9.0",
                "@vue/cli-service": "^3.9.0",
                "@vue/eslint-config-standard": "^4.0.0",
                "@vue/test-utils": "1.0.0-beta.29",
                "add-asset-html-webpack-plugin": "^3.1.3",
                "babel-eslint": "^10.0.1",
                "babel-plugin-import": "^1.12.0",
                "babel-plugin-lodash": "^3.3.4",
                "chai": "^4.1.2",
                "clean-webpack-plugin": "^3.0.0",
                "compression-webpack-plugin": "^4.0.0",
                "eslint": "^5.16.0",
                "eslint-plugin-vue": "^5.0.0",
                "lodash": "^4.17.15",
                "lodash-webpack-plugin": "^0.11.5",
                "node-sass": "^4.12.0",
                "prettier": "^1.18.2",
                "sass-loader": "^7.1.0",
                "terser-webpack-plugin": "^1.4.1",
                "uglifyjs-webpack-plugin": "^2.2.0",
                "vue-template-compiler": "^2.6.10",
                "webpack-bundle-analyzer": "^3.8.0",

         }
    })
    if(options.application=== 'pc') {
        api.extendPackage({
            dependencies: {
                "amfe-flexible": "^2.2.1",
                "vant": "^2.0.9"
            },
            devDependencies: {
                "postcss-pxtorem": "^4.0.1",
            }
        })

    }else {
        api.extendPackage({
            dependencies: {
              'element-ui': '^2.8.2'
            }
          });
    }

    api.render('./template')
}