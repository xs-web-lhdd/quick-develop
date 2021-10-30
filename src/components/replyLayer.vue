<template>
  <div class="reply" v-if="topTitle" :class="[ isShow ? 'showReply' : '' ]" >
    <div class="iconfont reply__back">&#xe600;</div>
    <div class="reply__top">
      <div class="reply__top__title">回复详情</div>
      <div class="reply__content">
        <div class="reply__content__img">
          <img v-if="topTitle.commentUserAvatar !== '发表评论的用户的头像'" :src="topTitle.commentUserAvatar" alt="" @click="() => changeUserPage(topTitle.commentUserId)">
          <img v-else src="../assets/img/1.webp" alt="" @click="() => changeUserPage(topTitle.commentUserId)">
        </div>
        <div class="reply__content__writing">
          <div class="reply__content__writing__userName">{{topTitle.commentUserNickName}}</div>
          <div class="reply__content__writing__content">{{topTitle.content}}</div>
          <div class="reply__content__writing__bottom">
            <div class="reply__content__writing__bottom__time">{{topTitle.createTime.split(' ')[0]}}</div>
            <div class="reply__content__writing__bottom__point">·</div>
            <div class="reply__content__writing__bottom__reply" @click="() => replyFloor(topTitle.commentUserNickName ,topTitle.commentId)">回复</div>
          </div>
        </div>
      </div>
    </div>
    <div class="reply__main">
      <div class="reply__main__title">全部回复</div>
      <div class="reply__content" v-for="item in replyList" :key="item">
        <div class="reply__content__img">
          <img v-if="item.commentUserAvatar !== '发表评论的用户的头像'" :src="item.commentUserAvatar" alt="" @click="() => changeUserPage(topTitle.commentUserId)">
          <img v-else src="../assets/img/1.webp" alt="" @click="() => changeUserPage(topTitle.commentUserId)">
        </div>
        <div class="reply__content__writing">
          <div class="reply__content__writing__userName">{{item.commentUsername}}</div>
          <div class="reply__content__writing__content">{{item.content}}</div>
          <div class="reply__content__writing__bottom">
            <div class="reply__content__writing__bottom__time">{{item.createTime.split(' ')[0]}}</div>
            <div class="reply__content__writing__bottom__point">·</div>
            <div class="reply__content__writing__bottom__reply" @click="() => replyFloor(item.commentUserNickName ,item.commentId)">回复</div>
            <div class="iconfont reply__content__writing__bottom__delete" v-if="userId === item.commentUserId" @click="() => deleteSelfComment(item.commentId)">&#xed44;</div>
          </div>
        </div>
      </div>
      <div class="bgcComment" v-if="hasComment">
        <div class="iconfont bgcComment__icon">&#xe622;</div>
        <div class="bgcComment__letter">暂且没有评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, watchEffect, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'
export default {
  name: 'reply',
  props: {
    isShow: {
      default: false
    },
    replyCommentId: {},
    topTitle: {
      required: true
    }
  },
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { userId } = proxy.$storage.getItem('userAllInfo')
    // 点击用户头像跳转到用户对应界面：
    const changeUserPage = (userId) => {
      router.push(`/mine/${userId}`)
    }
    // 发请求拿到二级评论的具体内容：
    const hasComment = ref(false)
    const replyList = ref([])
    const getFloorComment = async () => {
      const { code, data } = await proxy.$api.getFloorComment(props.replyCommentId)
      if (code === 200 && data.list.length !== 0) {
        replyList.value = data.list
        hasComment.value = false
      } else {
        replyList.value = []
        hasComment.value = true
      }
    }
    const watch = watchEffect(() => {
      if (props.isShow) {
        getFloorComment()
      }
    })
    const replyFloor = (userNickName, commentId) => {
      // 1 说明是二级评论，将遮罩层去掉
      emit('replyFloor', userNickName, commentId, 1)
    }
    // 删除自己的评论：
    const deleteSelfComment = (commentId) => {
      Dialog.confirm({
        message: '确定删除该条评论吗？每一条评论都是你在该星球的留言呢'
      })
        .then(async () => {
          const { code } = await proxy.$api.deleteSelfComment(commentId)
          if (code === 200) {
            Toast.success('删除评论成功！')
            getFloorComment()
          } else {
            Toast.fail('删除评论失败！')
          }
        })
        .catch(() => {})
    }
    return {
      watch,
      replyList,
      changeUserPage,
      replyFloor,
      userId,
      deleteSelfComment,
      hasComment
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: .3rem;
  height: .3rem;
}
.bgcComment{
  color: #1e80ff;
  text-align: center;
  &__icon{
    font-size: 1rem;
  }
  &__letter{
    padding-top: .1rem;
    letter-spacing: .01rem;
  }
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
    }
  }
  &__content{
    display: flex;
    padding: .15rem .18rem 0 .18rem;
    &__img{
      margin-top: .05rem;
      width: .4rem;
      height: .4rem;
      img{
        width: .4rem;
        height: .4rem;
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
        &__delete{
          position: absolute;
          right: .2rem;
        }
      }
    }
  }
  &__main{
    margin-bottom: .2rem;
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
