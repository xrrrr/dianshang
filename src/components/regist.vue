<template>
  <div>
    <!-- 注册页面内容 -->
    <div class="nav">
      <span class="return">
        <van-icon name="arrow-left" />
      </span>
      <span class="login">注册</span>
      <span class="regist" @click="goLogin()">登录</span>
    </div>
    <!-- form表单部分 -->
    <!-- <form action="#"> -->
      <van-cell-group>
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        <!-- 验证码发送框 -->
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" color="#ff9900" @click="send()">{{this.code}}</van-button>
        </van-field>
      </van-cell-group>
    <!-- </form> -->
    <van-button color="#ff9900" size="large" @click="goRegist()">注册</van-button>
    <div class="gree">
      <van-checkbox v-model="checked" shape="square">我已阅读并同意使用条款和隐私政策</van-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      phone: "",
      sms: "",
      password: "",
      checked: false,
      cap: "",
      code:'获取验证码',
      num:60,
      timer:null,
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    // 注册
    goRegist() {
      console.log(this.checked,'同意协议值')
      // 验证码发送成功  进行验证
      this.$axios({
        url: "http://localhost:3000/captcha/verify",
        params: {
          phone: this.phone,
          captcha: this.sms
        }
      })
        .then(res => {
          console.log(res, "进行验证码验证请求到的数据");
          if(this.checked){
            this.$axios({
            url: "http://localhost:3000/register/cellphone",
            params: {
              captcha: this.sms,
              phone: this.phone,
              password: this.password,
              nickname: this.username
            }
          })
            .then(res => {
              console.log(res, "注册请求到的数据");
              this.$router.push('/login')
            })
            .catch(err => {
              console.log(err, "注册错误信息");
            });
          }else{
            alert('请同意协议之后再进行注册用户')
          }
          
        })
        .catch(err => {
          console.log(err, "进行验证码验证匹配错误信息");
        });
    },
    // 发送验证码
    
    send() {
      // let timer=''
      clearInterval(this.timer)  
    this.timer=setInterval(()=>{
        this.code=this.num-- +'后再获取'
        if(this.num<=0){
          clearInterval(this.timer)
        this.num==0
        this.code='获取验证码'
        
      }
      },1000)
      
      console.log(this.code,'num')
      this.$axios({
        url: "http://localhost:3000/captcha/sent",
        params: {
          phone: this.phone
        }
      })
        .then(res => {
          console.log(res, "发送验证码请求到的数据");
        })
        .catch(err => {
          console.log(err, "发送验证码错误信息");
        });
    }
  }
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
  margin-bottom: 2.2rem /* 165/75 */;
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
.gree {
  margin: auto;
  text-align: center;
  margin-top: 1rem;
}
.van-checkbox {
  padding-left: 1rem /* 15/75 */;
}
.van-checkbox[data-v-05b04686] {
  font-size: 0.37rem /* 28/75 */;
}
</style>