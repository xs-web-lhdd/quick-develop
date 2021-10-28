<template>
  <Header />
  <div class="bgc"></div>
  <div class="wrapper">
    <div class="mine">
      <div class="mine__avatar">
        <img v-if="showUserInfo.avatar" :src="showUserInfo.avatar" alt="">
        <img v-else src="../assets/img/defaultAvatar.jpg" alt="">
      </div>
      <div class="mine__nickName">{{showUserInfo.nickeName}}</div>
      <div class="mine__sex">{{sexFormat}}</div>
      <div class="mine__tag">{{showUserInfo.role}}</div>
      <div class="mine__email">{{showUserInfo.email}}</div>
    </div>
    <div class="bgc"></div>
    <div class="noArticle" v-if="!articlesList.length">
      <div class="noArticle__icon iconfont">&#xe733;</div>
      <div class="noArticle__tag">空空如也</div>
    </div>
    <div class="articles list" v-for="item in articlesList" :key="item.articleId">
      <div @click.stop="changeInfo(`/article/${item.articleId}`)">
        <ArticleItem :item="item" :articleItem="item.articleId" :deleteIsShow="userId.toString() === currentUserId.toString()" @deleteOk="deleteOk" />
      </div>
    </div>
    <Writing />
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sexOptions } from '../config/constants'
import Header from '../components/Header.vue'
import ArticleItem from '../components/ArticleItem.vue'
import Writing from '../components/Writing.vue'

export default {
  name: 'Mine',
  components: { Header, ArticleItem, Writing },
  setup () {
    // 实例化：
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    // 拿出路由中命中的用户id和登录人的用户id，如果相等就可以删除文章，否则无法删除
    const currentUserId = route.params.id
    const { userId } = proxy.$storage.getItem('userAllInfo')
    // 定义用户展示信息：
    let showUserInfo = reactive({})
    // 作者文章列表：
    const articlesList = ref([])
    // 获取用户个人信息：
    const getUserInfobyId = async () => {
      const { data, code } = await proxy.$api.getUserInfobyId(currentUserId)
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
      } else if (code === 404) { // 用户没有文章的情况
        articlesList.value = []
      }
    }
    // 点击文字进行跳转：
    const changeInfo = (value) => {
      router.push(value)
    }
    // 删除成功得回调：
    const deleteOk = () => {
      getArticlesbyId()
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
      articlesList,
      changeInfo,
      getArticlesbyId,
      deleteOk,
      userId,
      currentUserId
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
  margin-top: .5rem;
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
  &__tag{
    font-size: .12rem;
    background-color: #ffde66;
    color: #d50101;
    padding: 2px 4px;
    border-radius: 4px;
    max-width: .6rem;
    margin: 0 auto;
    margin-top: .05rem;
  }
  &__email{
    margin: 0 auto;
    margin-top: .1rem;
    max-width: 2rem;
  }
}
.noArticle{
  width: 100%;
  height: 3rem;
  text-align: center;
  color: #909090;
  &__icon{
    font-size: .8rem;
    margin-top: 1rem;
  }
  &__tag{
    font-size: .16rem;
    margin-top: .1rem;
    letter-spacing: .02rem;
  }
}
</style>
