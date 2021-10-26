<template>
  <div class="top">
    <input class="top__title" v-model="newArticleData.articleTitle" type="text" placeholder="请输入文章标题">
    <button class="top__btn" @click="addArticle">发布</button>
    <button class="top__theme" @click="changeTheme">切换主题</button>
  </div>
  <van-dropdown-menu class="select" active-color="#1989fa" @click.once="deleteFirst">
    <van-dropdown-item class="select__item" v-model="value" :options="options" />
  </van-dropdown-menu>
  <md-editor v-model="newArticleData.articleContent" :theme="theme" />
</template>

<script>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
// 自选代码高亮样式
import 'highlight.js/scss/atom-one-dark.scss'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default {
  components: { MdEditor },
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const theme = ref('')
    const options = ref([])
    const value = ref()
    const newArticleData = reactive({
      articleTitle: '',
      articleContent: '',
      typeId: value.value,
      articleImage: 'https://chen110.oss-cn-guangzhou.aliyuncs.com/2021/08/03/wallhaven-4ooz99.jpg'
    })
    // 换主题：
    const changeTheme = () => {
      if (theme.value === '') {
        theme.value = 'dark'
      } else {
        theme.value = ''
      }
    }
    // 请求文章分类：
    const getArticleType = async () => {
      const res = await proxy.$api.getArticleType()
      options.value = res.data.list
      options.value.forEach(item => {
        item.text = item.typeName
        item.value = item.typeId
      })
      options.value.unshift({ text: '请选择文章分类', value: -1 })
      value.value = -1
    }
    const deleteFirst = () => {
      options.value.shift({ text: '请选择文章分类', value: -1 })
    }
    // 新建文章：
    const addArticle = async () => {
      // 校验：
      if (newArticleData.articleTitle === '') {
        Toast('请填写文章标题')
        return
      }
      if (newArticleData.articleContent === '') {
        Toast('请写入文章内容！')
        return
      }
      if (value.value === -1) {
        Toast('请选择文章类型！')
        return
      }
      const { code } = await proxy.$api.addArticle({ ...newArticleData })
      if (code === 200) {
        router.push('/')
      } else {
        alert('发布失败')
      }
    }
    onMounted(() => {
      getArticleType()
    })
    return {
      theme,
      changeTheme,
      options,
      value,
      addArticle,
      deleteFirst,
      newArticleData
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  height: .5rem;
  &__title{
    border: none;
    width: 1.4rem;
    height: .4rem;
    padding: 0 .2rem;
    margin: .04rem 0;
  }
  &__btn, &__theme{
    margin: .1rem .1rem;
    background-color: #1d7dfa;
    color: #fff;
    height: .32rem;
    padding: .02rem .16rem;
    border: none;
    border-radius: .02rem;
  }
  &__theme{
    float: right;
    margin: .1rem .1rem;
    background-color: #1d7dfa;
    color: #fff;
    height: .32rem;
    padding: .02rem .16rem;
    border: none;
    border-radius: .02rem;
  }
}
.select{
  margin-left: 1rem;
}
.md{
  height: calc(100vh - 0.5rem);
}
.md-toolbar-item{
  display: none !important;
}
</style>
