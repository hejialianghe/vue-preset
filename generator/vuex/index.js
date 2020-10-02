module.exports = (api) => {
    api.render('./template')
    api.extendPackage({
     dependencies: {
        "vuex": "^3.4.0",
        "vuex-persistedstate": "^2.5.4"
        }
    })
}