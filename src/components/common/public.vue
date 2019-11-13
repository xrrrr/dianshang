<template>
  <div>
    <!-- 中间如有显示部分 -->

      <router-view />  

    
    <!-- <div class="bottom"> -->
      <!-- 底部导航栏 -->
      <van-tabbar route fixed active-color="#ff9900" v-model="active" >
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/sort" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item replace to="/car" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="friends-o">我</van-tabbar-item>
      </van-tabbar>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      username: ""
    };
  }
};
</script>
<style lang="" scoped>
/* .bottom{
    position: fixed;
    bottom: 0;
    left: 0;
} */
</style>