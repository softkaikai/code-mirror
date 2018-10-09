<template>
  <section class="login-outer">
    <div class="login-box">
      <div class="m-b-20">
        <label>
          账号：
          <input type="text">
        </label>
      </div>
      <div class="m-b-20">
        <label>
          密码：
          <input type="password">
        </label>
      </div>
      <button type="button" @click="goToTeam">登录</button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    goToTeam () {
      this.$router.push({
        path: '/team'
      })
    }
  }
}
</script>

<style lang="less">
  .login-outer {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .login-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    width: 400px;
    height: 250px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: auto;
    padding: 20px;
  }

</style>
