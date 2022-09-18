import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'

Vue.use(VueI18n)

const messages = {
  zh_CN: {
    ...zhCN
  },
  en_US: {
    ...enUS
  }
}

const i18n = new VueI18n({
  locale: 'en_US',
  messages,
})

export default i18n
