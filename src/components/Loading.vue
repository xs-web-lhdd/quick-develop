<template>
  <van-loading v-if="isShow" class="show" vertical color="#0094ff">{{showMessage}}</van-loading>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Loading',
  props: {
    showMessage: {
      default: '加载中...'
    }
  },
  setup () {
    const store = useStore()
    const isShow = computed(() => {
      return store.state.loading
    })
    return { isShow }
  }
}
</script>

<style lang="scss" scoped>
.show{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
