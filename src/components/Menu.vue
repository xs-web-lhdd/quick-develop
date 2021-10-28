<template>
  <div class="menu" v-if="isShowMenu">
    <div class="menu__item iconfont" @click="changeWriting">&#xe652;&nbsp; 写文章</div>
    <div class="menu__item iconfont" @click="changeMine" >&#xe763;&nbsp; 我的主页</div>
    <div class="menu__item iconfont" @click="changeSetting">&#xe699;&nbsp; 设置</div>
    <div class="menu__item iconfont" @click="changeAbout">&#xe615;&nbsp; 关于</div>
    <div class="menu__logout iconfont" @click="logout">&#xe626;&nbsp; 退出</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { Dialog } from 'vant'

export default {
  name: 'Menu',
  props: ['isShowMenu', 'loginId'],
  setup (props) {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const changeMine = () => {
      router.push(`/mine/${props.loginId}`)
    }
    const changeWriting = () => {
      router.push('/writing')
    }
    const changeSetting = () => {
      router.push('/setting')
    }
    const changeAbout = () => {
      router.push('/about')
    }
    // 退出登录：
    const logout = () => {
      Dialog.confirm({
        message: '确认登出吗？每一片贫瘠的土地都需要坚定的挖掘者！'
      })
        .then(async () => {
          await proxy.$api.logout()
          proxy.$storage.clearAll()
          router.push('/login')
        })
        .catch(() => {})
    }
    return {
      changeMine,
      changeWriting,
      changeSetting,
      changeAbout,
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  position: fixed;
  top: .5rem;
  right: .1rem;
  z-index: 999;
  width: 1.25rem;
  background-color: #fff;
  border: .01rem solid rgba(177,180,185,.45);
  box-shadow: 0 .01rem .02rem 0 rgb(0 0 0 / 10%);
  border-radius: .04rem;
  font-size: .15rem;
  color: #4e5969;
  &__item{
    padding: .1rem .1rem;
    color: #86909c;
  }
  &__logout{
    padding: .15rem .1rem;
    border-top: .01rem solid rgba(177,180,185,.45);
    color: #86909c;
  }
}
</style>
