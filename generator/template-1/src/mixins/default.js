import { getQueryString } from '@/module/common'
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters(['access_token', 'refresh_token']),
    ...mapState({ userInfo: state => state.user.userInfo })
  },
  methods: {
    getQueryString (name, defaultVal = null) {
      return this.$route.query[name] || getQueryString(name) || defaultVal
    }
  }
}
