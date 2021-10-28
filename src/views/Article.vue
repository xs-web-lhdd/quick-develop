<template>
  <Header />
  <div class="about" v-if="message">
    <!-- 文章头部信息：作者头像、点赞... -->
    <div class="top">
      <div class="top__left" @click="() => changeUserPage(currentUserId)">
        <img class="top__left__img" :src="message.avatar" alt="">
      </div>
      <div class="top__right">
        <div class="top__right__userName">{{message.authorNickname}}</div>
        <div class="top__right__time">{{articleTime}}</div>
      </div>
    </div>
    <!-- 文章信息：标题、内容... -->
    <div class="main">
      <img class="main__img" :src="message.articleImage" alt="">
      <h1>{{message.articleTitle}}</h1>
      <div class="main__content" v-html="handleMarkDown"></div>
    </div>
    <!-- 文章结尾：分类... -->
    <div class="bottom">
      <div class="bottom__top">
        <div class="bottom__top__class">文章分类</div>
        <div class="bottom__top__type">前端</div>
      </div>
      <div class="bottom__bottom">
        <div class="iconfont bottom__bottom__support" v-if="!isSupport" @click="supportArticle">&#xe8ad;&nbsp;{{likeCount}}</div>
        <div class="iconfont bottom__bottom__support" v-else :class="[isSupport ? 'bottom__bottom__isSupport': '']" @click="cancelSupportArticle">&#xe8c3;&nbsp;{{likeCount}}</div>
        <div class="bottom__bottom__avatar">
          <img :src="message.avatar" alt="">
        </div>
      </div>
    </div>
    <!-- 评论区 -->
    <CommentArea />
  </div>
  <!-- <Loading /> -->
</template>

<script>
import { getCurrentInstance, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkDownIt from 'markdown-it'
// 引入加载,头部,评论区组件
// import Loading from '../components/Loading.vue'
import Header from '../components/Header.vue'
import CommentArea from '../components/CommentArea.vue'

export default {
  name: 'Article',
  components: { Header, CommentArea },
  setup () {
    // 实例化：
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const currentArticleId = route.params.id
    const currentUserId = ref()
    const message = ref(null)
    // 得到本篇文章的详情：
    const articleDetail = async () => {
      const res = await proxy.$api.articleDetail({ articleId: currentArticleId })
      message.value = res.data.list[0]
      currentUserId.value = res.data.list[0].userId
    }
    // 获取文章的点赞数量：
    const likeCount = ref(null)
    const getArticleLike = async () => {
      const { data } = await proxy.$api.getArticleLike(currentArticleId)
      likeCount.value = data
    }
    // 查询该篇文章的点赞状态:
    const supportArticleState = async () => {
      const { data, code } = await proxy.$api.supportArticleStatus(currentArticleId)
      if (data === 1 && code === 200) { // 已经点过赞了
        isSupport.value = true
      }
    }
    // 点赞功能实现:
    const isSupport = ref(false)
    // 给本篇文章点赞：
    const supportArticle = async () => {
      const { code } = await proxy.$api.supportArticle(currentArticleId)
      if (code === 500) {
        alert('你还没有登录，请进行登录！！！')
        router.push('/login')
      } else if (code === 200) {
        isSupport.value = true
        console.log('点赞成功！')
        getArticleLike()
      }
    }
    // 取消给本篇文章点赞:
    const cancelSupportArticle = async () => {
      const { code } = await proxy.$api.cancelSupportArticle(currentArticleId)
      if (code === 200) {
        isSupport.value = false
        console.log('取消点赞!')
        getArticleLike()
      }
    }
    // 点击用户头像跳转到用户对应界面：
    const changeUserPage = (userId) => {
      router.push(`/mine/${userId}`)
    }
    onMounted(() => {
      articleDetail()
      getArticleLike()
      supportArticleState()
    })
    // 把内容转化为 markdown 进行展示
    const handleMarkDown = computed(() => {
      if (!message.value.articleContent) return
      const md = new MarkDownIt()
      const result = md.render(message.value.articleContent)
      return result
    })
    // 将后端给到的time返回xxxx-xx-xx形式
    const articleTime = computed(() => {
      return message.value.createTime.split(' ')[0]
    })
    return {
      articleDetail,
      message,
      handleMarkDown,
      articleTime,
      likeCount,
      supportArticle,
      cancelSupportArticle,
      currentUserId,
      changeUserPage,
      isSupport
    }
  }
}
</script>

<style lang="scss" scoped>
.about{
  margin: .73rem .2rem 0 .2rem;
}
.top{
  display: flex;
  border-bottom: .01rem #f1f1f1 solid;
  padding-bottom: .1rem;
  &__left{
    margin-right: .1rem;
    &__img{
      width: .4rem;
      height: .4rem;
      border-radius: 50%;
    }
  }
  &__right{
    &__userName{
      font-size: .16rem;
      font-weight: 700;
    }
    &__time{
      font-size: .12rem;
      line-height: .2rem;
      color: #909090;
    }
  }
}
.main {
  border-bottom: .01rem solid #909090;
  &__img{
    width: 100%;
  }
  &__content{
    img {
      width: .2rem !important;
    }
    p {
      color: blue;
    }
  }
}
.bottom{
  &__top{
    display: flex;
    padding: .2rem 0;
    &__class{
      flex-shrink: 0;
      margin-right: .1rem;
      font-weight: 500;
      color: #333;
    }
    &__type{
      color: #4e5969;
      background-color: #fafafa;
      min-width: .4rem;
      text-align: center;
    }
  }
  &__bottom{
    // display: flex;
    margin-bottom: .2rem;
    &__support{
      float: left;
      width: .3rem;
      height: .3rem;
      padding-top: .05rem;
      flex: 1;
    }
    &__isSupport{
      color: #007fff;
    }
    &__avatar{
      float: right;
      width: .3rem;
      img{
        display: block;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
      }
    }
  }
}
.comment{
  &__top{
    height: 0.9rem;
    padding-bottom: .3rem;
    border-bottom: .01rem solid #e5e6eb;
  }
  &__area{
    max-height: .5rem;
    min-height: .5rem;
    max-width: 3.24rem;
    min-width: 3.24rem;
    border: none;
    border-radius: .02rem;
    background-color: #f4f5f5;
    padding: .05rem;
  }
  &__button{
    float: right;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: .02rem;
    border: none;
    padding: .05rem .13rem;
    margin-right: .015rem;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer;
  }
  &__all{
    padding-bottom: .2rem;
    &__title{
      display: block;
      margin-top: .15rem;
      font-size: 500;
      font-weight: 500;
      font-size: 16px;
      color: #1d2129;
      width: 100%;
      align-items: center;
    }
    &__item{
      display: flex;
      padding: .15rem 0;
      border-bottom: .01rem solid #e5e6eb;
      &__left{
        display: block;
        width: .3rem;
        height: .3rem;
        margin-right: .15rem;
      }
      &__right{
        &__top{
          display: flex;
          &__one{
            font-weight: 500;
            font-size: 14px;
            color: #1d2129;
            max-width: .9rem;
          }
          &__two{
            margin: 0 .1rem;
            color: #86909c;
            line-height: .18rem;
          }
          &__three{
            font-size: 14px;
            color: #86909c;
            line-height: .18rem;
          }
        }
        &__main{
          font-size: .14rem;
          line-height: .22rem;
          color: #4e5969;
          margin-top: .08rem;
          margin-bottom: .08rem;
          -webkit-line-clamp: 6;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        &__bottom{
          display: flex;
          line-height: .2rem;
          font-size: .12rem;
          cursor: pointer;
          color: #86909c;
          &__support{
            margin-right: .16rem;
          }
        }
      }
    }
  }
}
</style>
