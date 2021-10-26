<template>
  <div class="header">
    <div class="header__img" @click="changeHome">
      <img class="header__img__img" src="../assets/img/logo.svg" alt="">
    </div>
    <div class="header__title">
      <div>首页</div>
      <div class="header__title__down">
        <img class="header__title__down__img" src="../assets/img/down.svg" alt="">
      </div>
    </div>
    <div class="header__input">
      <input type="text" placeholder="来吧，皮卡丘！">
    </div>
    <div class="header__userImg" @click="changeMine">
      <img class="header__userImg__img" :src="userAvatar" alt="">
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  setup () {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const { loginId } = proxy.$storage.getItem('userInfo')
    const changeMine = () => {
      router.push(`/mine/${loginId}`)
    }
    const changeHome = () => {
      router.push('/')
    }
    // 获取用户个人信息：
    const userAvatar = ref('')
    const getUserInfobyId = async () => {
      const { data } = await proxy.$api.getNowUserInfo()
      userAvatar.value = data.avatar
      store.commit('saveUserAllInfo', data)
    }
    onMounted(() => {
      getUserInfobyId()
    })
    return { changeMine, changeHome, getUserInfobyId, userAvatar }
  }
}
</script>

<style lang="scss" scoped>
.header{
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: .5rem;
  display: flex;
  &__img{
    margin: .15rem .1rem;
  }
  &__title{
    width: .66rem;
    color: #1e80ff;
    font-size: .13rem;
    line-height: .57rem;
    display: flex;
    &__down{
      margin: 0.02rem .06rem;
      img{
        width: auto;
        height: auto;
      }
    }
  }
  &__input{
    input{
      border: none;
      width: 1.6rem;
      padding: .06rem 0 .06rem .1rem;
      box-shadow: none;
      outline: none;
      font-size: .11rem;
      background-color: #fafafa !important;
      color: #666;
      background-color: transparent;
      transition: width .3s;
      margin: .15rem .2rem 0 0;
      border-radius: .02rem;
    }
    input:focus{
      border: .01rem solid #1e80ff;
      box-sizing: content-box;
    }
  }
  &__userImg{
    position: absolute;
    top: .11rem;
    right: .1rem;
    &__img{
      width: .3rem;
      display: block;
      border-radius: 50%;
    }
  }
}
</style>
