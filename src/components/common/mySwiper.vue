<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-if="swiperimg" v-for='(item,index) in swiperimg' :key="index">
          <a href="#">
            <img :src="item" alt />
          </a>
        </div>
        
      </div>
      <!-- 添加下面的小圆圈 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import "../../../node_modules/swiper/js/swiper.min.js";
import Swiper from "swiper";
export default {
  data(){
    return{
      // bannerimg:'',
      
    }
  },
  props:['swiperimg'],
  mounted() {
    this.mySwiper();
  },
  // mounted() {
  //   // 调取axios接口获取banner数据
  //    this.$axios({
  //     url: "http://localhost:3000/banner"
  //   })
  //     .then(res => {
  //       console.log(res, "rrrr");
  //       this.bannerimg = res.data.banners;
  //       //延迟加载 $nextTick()
  //       //将回调延迟到下次dom更新循环之后执行
  //       this.$nextTick(() => {
  //         this.mySwiper();
  //       });
  //     })
  //     .catch(err => {});
  // },
  methods: {
    mySwiper(){
      let swiper = new Swiper(".swiper-container", {
      loop:true,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
    }
  },
};
</script>
<style lang="">
@import "./mySwiper.css";
@import "../../../node_modules/swiper/css/swiper.min.css";
.swiper-container {
  width: 100%;
  height: 100%;
  padding-top: 1.17rem /* 88/75 */;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  width: 100%;
  height: 7.25rem /* 544/75 */;
}
</style>