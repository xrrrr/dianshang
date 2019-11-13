<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="购物车"
      left-text
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 购物车为空时 -->
    <div class="car">
     <img src="../../assets/images/car-none_02.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // checked: "",
      // value: "",

    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang=""scoped>
.van-nav-bar {
  background: #ff9900;
}
.van-icon-arrow-left:before,
.van-nav-bar__title {
  color: white;
}
.car{
  /* position: relative; */
}
.car img{
  width: 100%;
  max-width: 10rem /* 750/75 */;
  height: 100%;
}
</style>