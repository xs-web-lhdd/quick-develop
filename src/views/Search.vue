<template>
  <Header @searchTitle="getSearchTitle" />
  <div class="search" v-for="item in searchList" :key="item.articleId">
    <router-link :to="`/article/${item.articleId}`">
      <ArticleItem :item="item"/>
    </router-link>
  </div>
  <div class="notFound" v-if="searchList.length === 0">
    <div class="iconfont notFound__icon">&#xe612;</div>
    <div class="notFound__tag">没有找到呢!亲</div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from '@vue/runtime-core'
import Header from '../components/Header.vue'
import ArticleItem from '../components/ArticleItem.vue'

export default {
  name: 'Search',
  components: { Header, ArticleItem },
  setup () {
    const { proxy } = getCurrentInstance()
    const searchList = ref([])
    // 得到查询的字段:
    const getSearchTitle = (searchContent) => {
      if (searchContent.trim() === '') {
        return
      }
      searchAllArticles(searchContent)
    }
    // 查询文章:
    const searchAllArticles = async (articleTitle) => {
      const { code, data } = await proxy.$api.allArticles({ articleTitle })
      if (code === 200) {
        searchList.value = data.list
      } else {
        searchList.value = []
      }
    }
    return {
      searchAllArticles,
      getSearchTitle,
      searchList
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  margin-top: .7rem;
}
.notFound{
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  text-align: center;
  &__icon{
    color: darkgray;
    font-size: 1.5rem;
  }
  &__tag{
    letter-spacing: .02rem;
    margin-top: .05rem;
  }
}
</style>
