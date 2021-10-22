<template>
  <div class="about" v-if="message">
    <!-- 文章头部信息：作者头像、点赞... -->
    <div class="top">
      <div class="top__left">
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
        <div class="iconfont bottom__bottom__support" @click="supportArticle">&#xe611;11</div>
        <div class="bottom__bottom__avatar">
          <img :src="message.avatar" alt="">
        </div>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="comment">
      <div class="comment__top">
        <textarea class="comment__area" cols="52" rows="10" placeholder="输入您的评论"></textarea>
        <button class="comment__button">发表评论</button>
      </div>
      <div>
        全部评论
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkDownIt from 'markdown-it'

export default {
  setup () {
    // 实例化：
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const currentId = route.params.id
    const message = ref(null)
    // 得到本篇文章的详情：
    const articleDetail = async () => {
      const res = await proxy.$api.articleDetail({ articleId: currentId })
      message.value = res.data.list[0]
    }
    // 给本篇文章点赞：
    const supportArticle = async () => {
      const { code } = await proxy.$api.supportArticle(currentId)
      if (code === 500) {
        alert('你还没有登录，请进行登录！！！')
        router.push('/login')
      }
    }
    onMounted(() => {
      articleDetail()
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
      supportArticle
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 2rem;
}
.about{
  margin: .23rem .2rem 0 .2rem;
}
.top{
  display: flex;
  border-bottom: .01rem #f1f1f1 solid;
  padding-bottom: .1rem;
  &__left{
    margin-right: .1rem;
    &__img{
      width: .5rem;
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
    display: flex;
    margin-bottom: .2rem;
    &__support{
      padding-top: .05rem;
      flex: 5;
    }
    &__avatar{
      flex: 1;
      width: .3rem;
      img{
        display: block;
        width: .3rem;
        border-radius: 50%;
      }
    }
  }
}
.comment{
  &__top{
    height: 0.9rem;
    padding-bottom: .15rem;
    border-bottom: .01rem solid #4e5969;
  }
  &__area{
    max-height: .5rem;
    min-height: .5rem;
    max-width: 3.24rem;
    min-width: 3.24rem;
  }
  &__button{
    float: right;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: .01rem;
    border: none;
    padding: .05rem .13rem;
    margin-right: .04rem;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer;
  }
}
</style>
