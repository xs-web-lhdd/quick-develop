<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>

    <van-form ref="loginForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userName"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="passWord"
          type="password"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import { reactive, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const loginForm = reactive({
      userName: '',
      passWord: ''
    })
    console.log(proxy.$api)
    const { userName, passWord } = toRefs(loginForm)

    // 提交时进行校验：
    const onSubmit = () => {
      proxy.$refs.loginForm.validate().then(async () => {
        const { code } = await proxy.$api.login({ ...loginForm })
        if (code === 200) {
          console.log('登录成功')
          router.push('/home')
        } else {
          console.log('登陆失败')
        }
      })
    }
    return {
      userName,
      passWord,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
}
</style>
