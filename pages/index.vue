<template>
  <section class="login-outer">
    <div class="login-box">
      <div class="m-b-20">
        <label>
          账号：
          <input type="text" v-model="apiData.account">
        </label>
      </div>
      <div class="">
        <label>
          密码：
          <input type="password" v-model="apiData.password">
        </label>
      </div>
      <div class="m-t-20" v-show="page !== 'login'">
        <label>
          邀请：
          <input type="password" v-model="apiData.code">
        </label>
      </div>
      <div class="c-blue m-t-10 m-b-10 ">
        <span class="cursor-p" v-show="page === 'login'" @click="switchPage">前往注册</span>
        <span class="cursor-p" v-show="page !== 'login'" @click="switchPage">前往登录</span>
      </div>

      <div>
        <button v-show="page === 'login'" type="button" @click="login">登录</button>
        <button v-show="page !== 'login'" type="button" @click="register">注册</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo
  },
  data () {
    return {
      page: 'login', // login register
      apiData: {
        account: '',
        password: '',
        code: '',
      }
    }
  },
  methods: {
    switchPage() {
      this.page = this.page === 'login' ? 'register':'login';
    },
    register () {
      api.register(this.apiData).then(res => {
        let data = res.data;
        if (data.code === '0') {
          this.$notify({ group: 'code-mirror', type: 'success', text: '注册成功'});
          this.page = 'login';
        } else {
          this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
        }
      })
    },
    login () {
      api.login(this.apiData).then(res => {
        let data = res.data;
        if (data.code === '0') {
          this.$notify({ group: 'code-mirror', type: 'success', text: '登录成功'});
          this.$store.commit('setAccount', this.apiData.account);
          localStorage.setItem('account', this.apiData.account)
          this.$router.push({
            path: '/team'
          })
        } else {
          this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
        }
      })
    },
    goToTeam () {
      /*this.$router.push({
        path: '/team'
      })*/
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
