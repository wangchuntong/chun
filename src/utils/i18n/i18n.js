// I18n
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import locale from 'element-ui/lib/locale'

// 引入 elementui 的多语言
import enLocale from 'element-ui/lib/locale/lang/en'
import zhCnLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

// 引入自己定义的 I18n 文件
import ch from './ch.json'
import en from './en.json'
import ja from './ja.json'

// 注册 vue-i18n
Vue.use(VueI18n)
// 默认中文
const lang = 'ch'
const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: lang,
  messages: {
    // 会把ch的所有内容拷贝到zhCnLocale文件中
    'ch': Object.assign(zhCnLocale, ch),
    'en': Object.assign(enLocale, en),
    'ja': Object.assign(jaLocale, ja),
  }
})

locale.i18n((key, value) => i18n.t(key, value))
export default i18n
