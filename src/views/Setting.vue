<template>
  <Header />
  <div class="set">
    <h1>个人资料</h1>
    <div class="set__avatar">
      <div class="set__avatar__title">我的头像</div>
      <el-upload
        class="img"
        action="http://www.codeman.ink:8848/xiaopopan/eduoss/fileoss/upload/1413125531471233026?catalogue=/root/drawingBed"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload">
        <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="set__avatar__introduce">支持jpg格式大小5M以内的图片</div>
    </div>
    <div class="set__item">
      <div class="set__item__userName">用户名</div>
      <input v-model="userInfo.userName" class="set__item__input" type="text">
    </div>
    <div class="set__item">
      <div class="set__item__userName">昵称</div>
      <input v-model="userInfo.nickName" class="set__item__input" type="text">
    </div>
    <div class="set__item">
      <div class="set__item__userName">邮箱</div>
      <input v-model="userInfo.email" class="set__item__input" type="text">
    </div>
    <div class="set__item">
      <div class="set__item__userName">手机号</div>
      <input v-model="userInfo.phoneNumber" class="set__item__input" type="text">
    </div>
    <div class="set__item">
      <div class="set__item__userName">性别</div>
      <van-radio-group v-model="userInfo.sex" direction="horizontal">
        <van-radio name="1" icon-size="20px">男</van-radio>
        <van-radio name="2" icon-size="20px">女</van-radio>
        <van-radio name="0" icon-size="20px">保密</van-radio>
      </van-radio-group>
    </div>
    <div class="set__item">
      <div class="set__item__userName">个性签名</div>
      <input v-model="userInfo.signature" class="set__item__input" type="text">
    </div>
    <div class="set__save" @click="saveMessage">保存修改</div>
    <div @click="deleteMyself">
      <h1>注销账号</h1>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import { Toast, Dialog } from 'vant'

export default {
  name: 'Setting',
  components: { Header },
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const userAllInfo = proxy.$storage.getItem('userAllInfo')
    // 用户的相关信息:
    const userInfo = reactive({
      userName: '' || userAllInfo.userName,
      nickName: '' || userAllInfo.nickName,
      email: '' || userAllInfo.email,
      phoneNumber: '' || userAllInfo.phoneNumber,
      sex: '' || userAllInfo.sex,
      avatar: '' || userAllInfo.avatar,
      // password: '',
      signature: '' || userAllInfo.signature,
      userId: userAllInfo.userId
    })
    // 更新用户信息:
    const updateUserInfo = async () => {
      for (const item in userInfo) {
        if (userInfo[item] === '') {
          Toast.fail('请信息填写完整后再保存!')
          return
        }
      }
      const { code } = await proxy.$api.updateUserInfo({ ...userInfo })
      if (code === 200) {
        Toast('修改成功!')
        setTimeout(() => {
          router.push('/')
        }, 500)
      }
    }
    // 进行修改信息:
    const saveMessage = () => {
      updateUserInfo()
    }
    // 头像上传前:
    const beforeAvatarUpload = (file) => {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        Toast.fail('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        Toast.fail('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    }
    // 上传成功:
    const handleAvatarSuccess = (e) => {
      userInfo.avatar = e.data.file.url
      Toast.success('恭喜,头像上传成功!')
    }
    // 上传失败:
    const handleAvatarError = (e) => {
      console.log(e)
      Toast.fail('头像上传失败!')
    }
    // 注销账号-删除用户自己:
    const deleteMyself = async () => {
      Dialog.confirm({
        message: '确定注销吗？每一片贫瘠的土地都需要坚定的挖掘者！'
      })
        .then(async () => {
          const { code, msg } = await proxy.$api.deleteMyself()
          if (code === 200) {
            proxy.$storage.clearAll()
            Toast(msg)
            router.push('/login')
          } else {
            Toast('亲,上天不允许你从该星球消失哦!')
          }
        })
        .catch(() => {})
    }
    return {
      userInfo,
      saveMessage,
      beforeAvatarUpload,
      handleAvatarSuccess,
      handleAvatarError,
      deleteMyself
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload{
  img{
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
  }
}
.img{
  width: .5rem;
  height: .5rem;
  text-align: center;
  line-height: .5rem;
}
.set{
  margin: .2rem;
  margin-top: .7rem;
  &__avatar{
    &__title{
      margin-bottom: .1rem;
    }
    &__introduce{
      font-size: .12rem;
      color: darkgray;
    }
  }
  &__item{
    padding-bottom: .1rem;
    padding-top: .1rem;
    border-bottom: .01rem solid #eaeaea;
    &__userName{
      color: #333;
      margin-bottom: .1rem;
    }
    &__input{
      margin-left: .02rem;
      width: 3rem;
      padding: .05rem;
    }
  }
  &__save{
    margin: 0 auto;
    margin-top: .2rem;
    color: #fff;
    width: 3rem;
    height: .4rem;
    text-align: center;
    line-height: .4rem;
    border-radius: .04rem;
    background-color: #1d7dfa;
  }
}
</style>
