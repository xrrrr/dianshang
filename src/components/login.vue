<template>
  <div>
    <!-- 登录页面内容 -->
    <div class="nav">
      <span class="return">
        <van-icon name="arrow-left" />
      </span>
      <span class="login">登录</span>
      <span class="regist" @click="goRegist()">注册</span>
    </div>
    <!-- form表单部分 -->
    <form action="#">
      <van-cell-group>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="title1" />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error-message="title2"
        />
      </van-cell-group>
    </form>
    <div class="forget">
      <a href="#">忘记密码</a>
    </div>
    <van-button color="#ff9900" size="large" @click="goLogin()">登录</van-button>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      title1: "",
      title2: ""
    };
  },
  methods: {
    goRegist() {
      this.$router.push("/regist");
    },
    goLogin() {
      if (this.phone == "") {
        this.title1 = "手机号不能为空，请输入正确的手机号";
      } else if (this.password == "") {
        this.title2 = "密码不能为空，请输入正确的密码";
      }else{
        this.title1=''
        this.title2=''
         console.log('登录')
        this.$axios({
          url: "http://localhost:3000/login/cellphone",
          params: {
            phone: this.phone,
            password: this.password
          }
        })
          .then(res => {
            console.log(res, "登录请求的数据");
            console.log(this.$route.query, "qqqqqqqqqqq");
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err, "登录请求错误");
          });
          
      }
    }
  },
  mounted() {}
};
</script>
<style lang="" scoped>
/* 头部样式 */

.nav {
  position: relative;
  height: 1.23rem /* 92/75 */;
  line-height: 1.23rem /* 92/75 */;
  font-size: 0.5rem /* 37.5/75 */;
  background: #ff9900;
}

.login {
  margin-left: 3.76rem /* 282/75 */;
}
.regist {
  position: absolute;
  top: 0rem /* 30/75 */;
  right: 0.35rem /* 26/75 */;
  color: white;
  /* line-height: 1.23rem; */
}
.nav span {
  color: white;
  display: inline-block;
}
form {
  margin-top: 2.2rem; /* 165/75 */
}
.van-button {
  margin-top: 0.7rem;
}
.forget {
  text-align: right;
  margin-top: 0.6rem /* 45/75 */;
}
.forget a {
  margin-right: 1.2rem /* 90/75 */;
}
</style>