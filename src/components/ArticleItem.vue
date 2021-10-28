<template>
<div class="list">
  <div class="list__top">
    <div class="list__top__name">{{item.authorNickname}}</div>
    <div class="list__top__splitLine">|</div>
    <div class="list__top__time">{{item.updateTime}}</div>
  </div>
  <div class="list__title">文章标题：{{item.articleTitle}}</div>
  <div class="list__middle">
    <div class="list__middle__content">{{item.articleContent}}</div>
    <img class="list__middle__img" :src="item.articleImage ? item.articleImage : '../assets/img/defaultBgc.jpg'" v-lazy="item.articleImage" alt="">
  </div>
  <div class="list__bottom">
    <div class="list__bottom__left">
      <div class="list__bottom__left__support iconfont">&#xe816; 11</div>
      <div class="list__bottom__left__comment iconfont">&#xe6a7;&nbsp;{{item.commentNum}}</div>
    </div>
    <div class="list__bottom__type">
      <div class="list__bottom__type__item">{{item.typeName}}</div>
    </div>
    <div class="list__bottom__delete" v-if="deleteIsShow" @click.stop="deleteArticle">
      <div>删除</div>
    </div>
  </div>
</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dialog } from 'vant'
export default {
  name: 'ArticleItem',
  props: {
    item: {},
    articleItem: {},
    deleteIsShow: {
      default: false
    }
  },
  emits: ['deleteOk'],
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    // 删除某篇文章：
    const deleteArticle = async () => {
      Dialog.confirm({
        message: '确认删除该篇文章吗？'
      })
        .then(async () => {
          const { code } = await proxy.$api.deleteCurrentArticle(props.articleItem)
          if (code === 200) { emit('deleteOk') }
        })
        .catch(() => {})
    }
    return {
      deleteArticle
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin: .2rem .2rem 0 .2rem;
  background-color: #fff;
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
    &__delete{
      color: #e5e6eb;
      margin: .05rem;
    }
  }
}
</style>
