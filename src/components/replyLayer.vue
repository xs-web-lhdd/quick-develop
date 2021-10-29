<template>
  <div class="reply" :class="[ isShow ? 'showReply' : '' ]">
    <div class="iconfont reply__back">&#xe600;</div>
    <div class="reply__top">
      <div class="reply__top__title">回复详情</div>
      <div class="reply__content">
        <div class="reply__content__img">
          <img src="../assets/img/1.webp" alt="">
        </div>
        <div class="reply__content__writing">
          <div class="reply__content__writing__userName">防微杜渐</div>
          <div class="reply__content__writing__content">今晚月色很美，但我却看不见</div>
          <div class="reply__content__writing__bottom">
            <div class="reply__content__writing__bottom__time">xxxx-xx-xx</div>
            <div class="reply__content__writing__bottom__point">·</div>
            <div class="reply__content__writing__bottom__reply">回复</div>
          </div>
        </div>
      </div>
    </div>
    <div class="reply__main">
      <div class="reply__main__title">全部回复&nbsp;{{7}}</div>
      <div class="reply__content" v-for="item in [1, 2, 3, 4]" :key="item">
        <div class="reply__content__img">
          <img src="../assets/img/1.webp" alt="">
        </div>
        <div class="reply__content__writing">
          <div class="reply__content__writing__userName">防微杜渐</div>
          <div class="reply__content__writing__content">今晚月色很美，但我却看不见</div>
          <div class="reply__content__writing__bottom">
            <div class="reply__content__writing__bottom__time">xxxx-xx-xx</div>
            <div class="reply__content__writing__bottom__point">·</div>
            <div class="reply__content__writing__bottom__reply">回复</div>
          </div>
        </div>
      </div>
    </div>
    <div class="reply__input">
      这是一个回复框
    </div>
  </div>
</template>

<script>
export default {
  name: 'reply',
  props: {
    isShow: {
      default: false
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
img{
  width: .3rem;
  height: .3rem;
}
.reply{
  overflow-y: scroll;
  z-index: 999;
  position: fixed;
  right: 0;
  left: 0;
  bottom: -100%;
  transition: bottom .4s;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  // border-top: .01rem solid #f4f5f5;
  border-top: .01rem solid #e7e7e7;
  border-radius: .1rem;
  &__back{
    position: absolute;
    top: .14rem;
    left: .1rem;
    font-weight: 600;
  }
  &__top{
    position: relative;
    font-size: .16rem;
    margin-top: .1rem;
    padding-bottom: .15rem;
    border-bottom: .01rem solid #f2f2f2;
    &__title{
      font-weight: 600;
      text-align: center;
      // z-index: 9999;
      // position: absolute;
      // top: 0;
      // left: 0;
      // right: 0;
    }
  }
  &__content{
    display: flex;
    padding: .15rem .18rem 0 .18rem;
    &__img{
      margin-top: .05rem;
      width: .4rem;
      height: .4rem;
      background-color: red;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &__writing{
      margin-left: .1rem;
      &__userName{
        color: #1e80b0;
        padding-bottom: .05rem;
      }
      &__bottom{
        display: flex;
        margin-top: .15rem;
        font-size: .14rem;
        color: #909090;
        &__point{
          margin: 0 .1rem;
          font-weight: 700;
        }
      }
    }
  }
  &__main{
    margin-bottom: .5rem;
    &__title{
      padding: .1rem 0 0 .1rem;
      font-size: .16rem;
      font-weight: 600;
    }
  }
  &__input{
    width: 100%;
    height: .5rem;
    background-color: red;
    position: fixed;
    bottom: 0;
  }
}
.showReply{
  bottom: 0rem;
}
</style>
