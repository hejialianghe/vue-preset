module.exports = (api) => {
    api.render('./templates')
    api.extendPackage({
     dependencies: {
        "vuex": "^3.4.0",
        "vuex-persistedstate": "^2.5.4"
        }
    })
}