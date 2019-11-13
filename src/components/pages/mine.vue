<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar
      title="个人中心"
      right-text="按钮"
      left-arrow
    >
      <van-icon name="setting-o" slot="left" color="white" @click="exist()"/>
      <van-icon name="comment-o" slot="right" color="white" />
    </van-nav-bar>
    <!-- 登录头像部分 -->
    <div class="user">
      <div class="userl">
        <img src="../../assets/images/hot1_03.jpg" alt />
      </div>
      <h2>
        <a href="#" @click="goLogin()">点击登录</a>
      </h2>
      <p>
        <van-icon name="like-o" color="red" />我的收藏
      </p>
    </div>
    <!-- =订单内容 -->
    <div class="order">
      <p>
        <span>我的订单</span>
        <span>
          <a href="#">查看全部订单</a>
        </span>
      </p>
      <!-- 个人商品管理 -->
      <router-view />

      <van-tabbar v-model="active" >
        <van-tabbar-item icon="home-o">待付款</van-tabbar-item>
        <van-tabbar-item icon="search" dot>待发货</van-tabbar-item>
        <van-tabbar-item icon="friends-o" info="5">待收货</van-tabbar-item>
        <van-tabbar-item icon="setting-o" info="2">待评价</van-tabbar-item>
        <van-tabbar-item icon="setting-o" info="2">退款/售后</van-tabbar-item>
      </van-tabbar>
    </div>
    <p class="address">收货地址管理</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    goLogin(){
      this.$router.push('/login')
    },
    exist(){
      this.$router.push('/login')
    }
  }
};
</script>
<style lang=""scoped>
.van-nav-bar {
  background: #ff9900;
}
.van-nav-bar__title{
  color: white;
}
.user {
  height: 3.2rem /* 240/75 */;
  background: #ff9900;
  padding-top: 1.6rem;
}
.user .userl {
  width: 2.47rem /* 185/75 */;
  height: 2.47rem /* 185/75 */;
  border: 5px solid white;
  border-radius: 50%;
  text-align: center;
  margin: auto;
}
.user img {
  width: 2.47rem /* 185/75 */;
  height: 2.47rem /* 185/75 */;
  border-radius: 50%;
  /* margin-top: 1.69rem ; */
}
.user h2 a {
  font-size: 0.44rem /* 33/75 */;
  color: #333333;
  margin-top: 0.6rem /* 30/75 */;
  text-align: center;
  display: block;
}
.user p {
  text-align: left;
  font-size: 0.45rem /* 34/75 */;
  line-height: 1.33rem /* 100/75 */;
  padding-left: 20px;
  padding-bottom: 0.47rem /* 35/75 */;
}

.van-icon-like-o:before {
  margin-right: 0.27rem /* 20/75 */;
}
/* 订单部分内容 */
.order {
  height: 4.13rem /* 310/75 */;
  margin-top: 1.73rem /* 130/75 */;
  border-top: 5px solid #efeeee;
  border-bottom: 5px solid #efeeee;
}
.order p {
  line-height: 1.68rem /* 126/75 */;
}
.order p span:nth-child(1) {
  float: left;
  font-size: 0.45rem /* 34/75 */;
  margin-left: 0.27rem /* 20/75 */;
}
.order p span:nth-child(2) {
  float: right;
  font-size: 0.45rem /* 34/75 */;
  margin-right: 0.4rem /* 20/75 */;
}
.order p span:nth-child(2) a {
  color: #333333;
}
.address {
  line-height: 1.65rem /* 124/75 */;
  font-size: 0.45rem /* 34/75 */;
  text-align: left;
  text-indent: 0.4rem /* 30/75 */;
}
/* 管理个人购物方面 */
.order{
  position: relative;
}
.van-tabbar--fixed {
  position: absolute;
  top: 2rem /* 150/75 */;
  left: 0;
}
</style>