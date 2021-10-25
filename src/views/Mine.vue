<template>
  <Header />
  <div class="bgc"></div>
  <div class="wrapper">
    <div class="mine">
      <div class="mine__avatar">
        <img src="../assets/img/1.webp" alt="">
      </div>
      <div class="mine__nickName">{{showUserInfo.nickeName}}</div>
      <div class="mine__sex">{{sexFormat}}</div>
      <div class="mine__email">{{showUserInfo.email}}</div>
    </div>
    <div class="bgc"></div>
    <div class="articles list" v-for="item in articlesList" :key="item.articleId">
      <router-link :to="`/article/${item.articleId}`">
        <ArticleItem :item="item" :articleItem="item.articleId" deleteIsShow="true" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sexOptions } from '../config/constants'
import Header from '../components/Header.vue'
import ArticleItem from '../components/ArticleItem.vue'

export default {
  name: 'Mine',
  components: { Header, ArticleItem },
  setup () {
    // 实例化：
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    const currentUserId = route.params.id
    // 定义用户展示信息：
    let showUserInfo = reactive({})
    // 作者文章列表：
    const articlesList = ref([])
    // 获取用户个人信息：
    const getUserInfobyId = async () => {
      const { data, code } = await proxy.$api.getNowUserInfo()
      if (code === 500) {
        alert('亲，你还没登陆，请先登录呦！')
        router.push('/login')
      } else if (code === 200) {
        showUserInfo = Object.assign(showUserInfo, data)
      }
    }
    // 根据登录用户个人id获取自己所有文章：
    const getArticlesbyId = async () => {
      const { code, data } = await proxy.$api.getArticlesbyId(currentUserId)
      if (code === 200) {
        articlesList.value = data.list
        console.log(articlesList)
      }
    }
    onMounted(() => {
      getUserInfobyId()
      getArticlesbyId()
    })
    const sexFormat = computed(() => {
      return sexOptions[showUserInfo.sex]
    })
    return {
      showUserInfo,
      sexFormat,
      articlesList
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100%;
  height: 5rem;
}
.bgc{
  width: 100%;
  height: .2rem;
  background-color: #f4f5f5;
}
.mine{
  background-color: #fff;
  margin: .2rem;
  text-align: center;
  color: #72777b;
  &__avatar{
    img{
      width: .75rem;
      height: .75rem;
      margin: 0 auto;
      display: block;
      border-radius: 50%;
    }
  }
  &__nickName{
    margin: 0 auto;
    margin-top: .1rem;
    max-width: 2rem;
    padding: 0;
    font-size: .16rem;
    font-weight: 600;
    line-height: 1.2;
    color: #000;
  }
  &__sex{
    margin: 0 auto;
    margin-top: .1rem;
    max-width: 2rem;
  }
  &__email{
    margin: 0 auto;
    margin-top: .1rem;
    max-width: 2rem;
  }
}

</style>
