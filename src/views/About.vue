<template>
  <div class="wrapper">
    <img class="img" src="../assets/img/bgc.png" alt="">
    <div class="wrapper__title">猫颜团队</div>
    <h1 class="wrapper__us">联系我们</h1>
    <div class="wrapper__tag">
      <img class="wrapper__tag__img" src="../assets/img/us.png" alt="">
      <div class="wrapper__tag__phone">17739229159</div>
    </div>
    <h1>加入我们</h1>
    <div class="wrapper__add">每一个星球都有一个驱动核心，<br/>
      每一种思想都有影响力的种子。<br/>
      感受世界的温度，<br/>
      年轻的你也能成为改变世界的动力，<br/>
      猫颜团队珍惜你所有的潜力。<br/>
      你的潜力，是改变世界的动力！<br/>
      每一个贫瘠的土地都需要坚定的挖掘者！<br/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper{
  color: #fff;
  background-color: #3c8cff;
  height: 100vh;
  text-align: center;
  letter-spacing: .02rem;
  &__title{
    font-size: .16rem;
    letter-spacing: .04rem;
    font-weight: 600;
  }
  &__us{
  }
  &__tag{
    &__img{
      width: 1.5rem;
    }
    &__phone{
      padding-top: .1rem;
    }
  }
  &__add{
    max-width: 2.5rem;
    margin: 0 auto;
    padding: .05rem .08rem;
    letter-spacing: .03rem;
  }
}
.img{
  width: 100%;
  padding-bottom: 15%;
}
</style>
