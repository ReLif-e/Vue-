<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="app-breadcrumb">
      {{ $t('companyName') }}
      <span class="breadBtn">远古版</span>

    </div>

    <div class="right-menu">
      <ScreenFull />

      <Lang />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="staffPhoto" class="user-avatar"> -->
          <ImageHolder :src="staffPhoto" class="user-avatar" />
          <span>{{ username }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username',
      'staffPhoto'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定退出吗？', '提示', { type: 'warning' })
        .then(() => {
          // 调用清除user/actions里面的方法
          this.$store.dispatch('user/quit')
          // 跳转到登入页面
          // this.$router.push('/login')
          this.$router.push({
            path: '/login',
            query: {
              return_url: this.$route.fullPath // 路由会自动转码
            }
          })
          // 提醒退出成功
          this.$message.success('退出成功')
          resetRouter()
        })
        .catch(() => {
          console.log(1)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
 background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      // vertical-align: top;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          text-align: center;
          background-repeat: no-repeat;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 15px;
          vertical-align: middle;

        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.app-breadcrumb {
  display: inline-block;
  font-size: 18px;
  line-height: 50px;
  margin-left: 10px;
  color: #ffffff;
  cursor: text;
  .breadBtn {
    background: #84a9fe;
    font-size: 14px;
    padding: 0 10px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin-left: 15px;
  }
}
</style>
