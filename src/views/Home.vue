<template>
  <div class="home">
    <div class="list" v-for="item in list" :key="item.articleId">
      <router-link :to="`/article/${item.articleId}`">
        <div class="list__top">
          <div class="list__top__name">{{item.authorNickname}}</div>
          <div class="list__top__splitLine">|</div>
          <div class="list__top__time">{{item.updateTime}}</div>
        </div>
        <div class="list__title">文章标题：{{item.articleTitle}}</div>
        <div class="list__middle">
          <div class="list__middle__content">{{item.articleContent}}</div>
          <img class="list__middle__img" :src="item.articleImage" v-lazy="item.articleImage" alt="">
        </div>
        <div class="list__bottom">
          <div class="list__bottom__left">
            <div class="list__bottom__left__support iconfont">&#xe816; 11</div>
            <div class="list__bottom__left__comment iconfont">&#xe6a7;&nbsp;{{item.commentNum}}</div>
          </div>
          <div class="list__bottom__type">
            <div class="list__bottom__type__item">{{item.typeName}}</div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="loadMore" v-if="!isMaxLength" @click="allArticles">点击加载更多</div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup () {
    // 实例化：
    const { proxy } = getCurrentInstance()
    const sqlist = reactive({
      pageNum: 0,
      pageSize: 10
    })
    const isMaxLength = ref(false)
    // 初始页面：
    const list = ref([])
    const allArticles = async () => {
      sqlist.pageNum++
      const res = await proxy.$api.allArticles({ ...sqlist })
      // 后端返回的最大页面数量
      const pages = res.data.pages
      // 如果达到最大页面数量，就取消加载更多按钮
      if (sqlist.pageNum >= pages) {
        isMaxLength.value = true
      }
      // 后端返回的数据列表：用于渲染
      const allList = res.data.list
      allList.forEach(item => {
        list.value.push(item)
      })
    }
    onMounted(() => {
      allArticles()
    })
    return {
      allArticles,
      list,
      isMaxLength
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin: .2rem .2rem 0 .2rem;
  &__top{
    display: flex;
    margin: .1rem .1rem .05rem 0;
    font-size: .13rem;
    line-height: .2rem;
    &__name{
      color: #4e5969;
    }
    &__splitLine{
      margin: 0 0.08rem;
    }
    &__time{
      color: #86909c;
    }
  }
  &__title{
    font-size: .16rem;
    color: #1d2129;
    font-weight: 700;
    // 把文字显示一行，多余用 ... 代表
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__middle{
    margin-top: .06rem;
    padding-bottom: .12rem;
    display: flex;
    &__content{
      flex-grow: 1;
      color: #86909c;
      // 内容显示三行，多余的用 ... 代替
      margin-bottom: 14px;
      font-size: 14px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &__img{
      width: 2rem;
      // background-size: contain;
      flex: 0 0 auto;
      width: 1.2rem;
      height: .8rem;
      margin-left: .24rem;
      border-radius: .02rem;
    }
  }
  &__bottom{
    display: flex;
    border-bottom: .01rem solid #e5e6eb;
    padding-bottom: .05rem;
    font-size: .14rem;
    line-height: .2rem;
    &__left{
      flex: 1;
      display: flex;
      text-align: left;
      &__support{
        color: #86909c;
        flex: 1;
      }
      &__comment{
        color: #86909c;
        flex: 2;
        text-align: left;
      }
    }
    &__type{
      color: #4e5969;
      float: right;
      text-align: right;
      &__item{
        text-align: center;
        min-width: .4rem;
        background: #fafafa;
      }
    }
  }
}
.loadMore{
  width: 2rem;
  height: .4rem;
  margin: 0 auto;
  text-align: center;
  line-height: .4rem;
}
</style>
