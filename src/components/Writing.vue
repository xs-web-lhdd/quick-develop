<template>
  <div class="writing iconfont" @click="changeWriting">
    &#xe674;
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const changeWriting = () => {
      router.push('/writing')
    }
    return { changeWriting }
  }
}
</script>

<style lang="scss" scoped>
.writing{
  position: fixed;
  top: 6.3rem;
  right: .3rem;
  background-color: #1e80ff;
  color: #fff;
  font-size: .4rem;
  width: .6rem;
  height: .6rem;
  text-align: center;
  line-height: .6rem;
  border-radius: 50%;
  z-index: 9999;
}
</style>
