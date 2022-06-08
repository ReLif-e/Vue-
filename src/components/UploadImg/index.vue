<template>
  <div>
    <!-- action头像存储的地址 -->
    <!-- show-file-list是否显示上传文件列表 -->
    <!-- on-success上传成功的回调函数 -->
    <!-- before-upload上传前的回调函数 -->
    <!-- http-request覆盖默认的上传行为，自定义发送请求 -->

    <!-- startsWith:判断字符串是否以上面开头 -->

    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <el-progress v-if=" progress && progress < 100 " type="circle" :percentage="progress" />
      <img v-if="value && progress === 0" :src="value" class="avatar">
      <i v-show="!progress" v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)t6
const cos = new COS({
  SecretId: 'AKIDuc4FAoCJNHuHNClAPP8iTxA5k7D2bt1t', // 身份识别ID
  SecretKey: 'gphNmvmMfhRv97dsqY0B6k7D2bA5oOku' // 身份秘钥
})
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // imageUrl: '', // 显示的图片 判断有没有图片，但是现在有父组件传递来的图片数据可以不要
      progress: 0
    }
  },
  methods: {
    UI() {
      if (this.progress >= 0 && this.progress <= 100) {
        return true
      } else {
        return false
      }
    },
    upload(res) {
      console.log(res) // 这是上传成功后的的数据
      if (res.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'web-75-1312367913', /* 存储桶 */
          Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
          Key: res.file.name, /* 文件名 */
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => { // 进度条
            // console.log(progressData)
            // console.log(this.value)  打印父组件传递来的数据
            this.progress = parseInt(progressData.percent * 100)
          }
        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
            this.progress = 0
            // this.imageUrl = `https:${data.Location}`
            this.$emit('input', `https:${data.Location}`)
          }
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像只能是图片格式文件!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-progress-circle{
    width: 178px !important;
    height: 178px !important;
}
</style>
