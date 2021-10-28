<template>
  <div class="comment">
    <div class="comment__top">
      <textarea class="comment__area" v-model="commentContent" cols="52" rows="10" placeholder="留下你的评论"></textarea>
      <button class="comment__button" @click="addComment">发表评论</button>
    </div>
    <div class="comment__all">
      <span class="comment__all__title">全部评论({{commentsNum}})</span>
      <template v-for="item in commentsList" :key="item.commentId">
        <div class="comment__all__item" v-if="item.commentType === '1'">
          <img v-if="item.commentUserAvatar !== '发表评论的用户的头像'" class="comment__all__item__left" :src="item.commentUserAvatar" alt="" @click="() => changeUserPage(item.commentUserId)" />
          <img v-else class="comment__all__item__left" src="../assets/img/defaultAvatar.jpg" alt="" @click="() => changeUserPage(item.commentUserId)" />
          <div class="comment__all__item__right">
            <div class="comment__all__item__right__top">
              <div class="comment__all__item__right__top__one">{{item.commentUserNickName}}</div>
              <div class="comment__all__item__right__top__two">|</div>
              <div class="comment__all__item__right__top__three">time:xxxx-xx-xx</div>
            </div>
            <div class="comment__all__item__right__main">
              {{item.content}}
            </div>
            <div class="comment__all__item__right__bottom">
              <div class="iconfont comment__all__item__right__bottom__support">&#xe611;&nbsp;点赞</div>
              <div class="iconfont comment__all__item__right__bottom__comment">&#xe6a7;&nbsp;评论</div>
            </div>
            <!-- 评论区中的二级评论 -->
            <div class="comment__all">
              <template v-for="item in commentsList" :key="item.commentId">
                <div class="comment__all__item" style="border-bottom: none;" v-if="item.commentType === '2'">
                  <img v-if="item.commentUserAvatar !== '发表评论的用户的头像'" class="comment__all__item__left" :src="item.commentUserAvatar" alt="" @click="() => changeUserPage(item.commentUserId)" />
                  <img v-else class="comment__all__item__left" src="../assets/img/defaultAvatar.jpg" alt="" @click="() => changeUserPage(item.commentUserId)" />
                  <div class="comment__all__item__right">
                    <div class="comment__all__item__right__top">
                      <div class="comment__all__item__right__top__one">{{item.commentUserNickName}}</div>
                      <div class="comment__all__item__right__top__two">|</div>
                      <div class="comment__all__item__right__top__three">time:xxxx-xx-xx</div>
                    </div>
                    <div class="comment__all__item__right__main">
                      {{item.content}}
                    </div>
                    <div class="comment__all__item__right__bottom">
                      <div class="iconfont comment__all__item__right__bottom__support">&#xe611;&nbsp;点赞</div>
                      <div class="iconfont comment__all__item__right__bottom__comment">&#xe6a7;&nbsp;评论</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup () {
    // 实例化:
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const currentArticleId = route.params.id
    // 得到本篇文章的所有评论
    const commentParams = reactive({
      articleId: currentArticleId
    })
    const commentsNum = ref(null)
    const commentsList = ref([])
    const getArticleComments = async () => {
      const { code, data } = await proxy.$api.getArticleComments({ ...commentParams })
      if (code === 200) {
        commentsList.value = data.list
        commentsNum.value = data.list.length
      } else if (code === 404) { // 评论数量为 0
        commentsList.value = []
        commentsNum.value = 0
      }
    }
    // 点击用户头像跳转到用户对应界面：
    const changeUserPage = (userId) => {
      router.push(`/mine/${userId}`)
    }
    // 评论框里的内容:
    const commentContent = ref('')
    // 发表评论:
    const addComment = async () => {
      const res = await proxy.$api.addComment({
        content: commentContent.value,
        articleId: currentArticleId,
        replyId: 0
      })
      if (res.code === 200) {
        commentContent.value = ''
        getArticleComments()
      }
    }
    onMounted(() => {
      getArticleComments()
    })
    return {
      changeUserPage,
      commentsList,
      commentsNum,
      commentContent,
      addComment
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  &__top{
    height: 0.9rem;
    padding-bottom: .6rem;
    border-bottom: .01rem solid #e5e6eb;
  }
  &__area{
    font-size: .14rem;
    max-height: .6rem;
    min-height: .6rem;
    max-width: 3.24rem;
    min-width: 3.24rem;
    border: none;
    border-radius: .02rem;
    background-color: #f4f5f5;
    padding: .08rem;
    border: .01rem solid #f4f5f5;
  }
  &__area:focus{
    box-sizing: content-box;
    border: .01rem solid #1e80ff;
    background-color: #fff;
    transition: all .2s;
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
    margin-top: .1rem;
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
