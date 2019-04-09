import { appAgentBol, wxAgentBol, getQueryString } from 'insfns'
import { mapGetters } from 'vuex'

export default {
  computed: {
    isApp () {
      return appAgentBol()
    },
    isWx () {
      return wxAgentBol()
    },
    ...mapGetters(['userToken', 'userId'])
  },
  methods: {
    getQueryString (name, defaultVal = null) {
      return this.$route.query[name] || getQueryString(name) || defaultVal
    }
  }
}
