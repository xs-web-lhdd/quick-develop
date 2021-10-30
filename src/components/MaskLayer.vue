<template>
  <div class="mask" v-if="maskIsShow"></div>
</template>

<script>
export default {
  name: 'MaskLayer',
  props: ['maskIsShow'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 4rem;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
}
</style>
