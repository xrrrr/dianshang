<template>
  <div>
    <div class="main">
      <div class="banner">
        <div class="nav">
          <span class="nav_return" @click="$router.go(-1)"></span>
          <span class="nav_car"></span>
          <span class="nav_set"></span>
        </div>
        <!-- 商品轮播图 -->
        <swiper v-if="swiperimg" :swiperimg='swiperimg'></swiper>
        <!-- 商品信息 -->
        <div class="info">
          <van-card
            :price="title.reduct_price"
            desc
            :title="title.name"
            :origin-price="title.original_price"
          >
            <div slot="tags">
              <van-tag plain type="danger" v-for="(item,i) in dec" :key="i">{{item}}</van-tag>
            </div>
            <div slot="footer"></div>
          </van-card>
        </div>
      </div>
      <!-- 商品详情内容 -->
      <div class="maincon">
        <van-tabs @click="onClick">
          <!-- 商品详情 -->
          <van-tab title="商品详情">
            <div class="shopban" v-for="(ban,banId) in ban" :key="banId">
              <img :src="ban" alt />
            </div>
            
          </van-tab>
          <!-- 买家口碑 -->
          <van-tab title="买家口碑">
            <ul class="kind">
            <li :class="[num==staId?'select':'']" @click="num=staId" v-for="(sta,staId) in state" :key="staId">{{sta}}</li>
              <!-- <li :class="[num==1?'select':'']" @click="num=1">好评</li>
              <li :class="[num==2?'select':'']" @click="num=2">差评</li>
              <li :class="[num==3?'select':'']" @click="num=3">晒单</li> -->
            </ul>
            <!-- 口碑详情 -->
            <!-- 全部评价 -->
            <ul class="assesment" v-if='num == s'  v-for="(list,i,s) in review" :key='i'>
              <li  v-for="(item,index) in list" :key="index">
                <div>
                  <span>{{item.buyerName}}</span>
                  <span>{{item.createTime | toTime}}</span>
                </div>
                <div class="ass-img">
                   <div v-for="(a,b) in item.postImg" :key="b" >
                   <img :src="a" alt />
                </div>
                </div>
               
               
                <p>{{item.postDescribe}}</p>
                <div class="ans">
                  <p>{{item.adminReviews}}</p>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
        <!-- 底部部分 -->
        <div class="foot">
          <div class="price">
            <span>总价：</span>
            <span class="sum">
              ￥
              <span>0.00</span>
            </span>
          </div>
          <div class="btn">
            <button @click="goCar()">加入购物车</button>
            <button @click="goBuy()">立即购买</button>
          </div>
          <!-- 点击加入购物车   弹出窗口 -->
          <div class="buy" v-show="isShow">
            <div class="num">
              <div class="num_img">
                <img :src="pro" alt />
              </div>

              <div class="count">
                <span>
                  ￥
                  <span>{{title.reduct_price}}</span>
                </span>
                <p>库存{{title.total}}件</p>
                <p>请选择商品属性</p>
              </div>
              <div class="close" @click="goClose()">x</div>
            </div>
            <!-- 购买数量 -->
            <div class="plus">
              <span>购买数量</span>
              <div>
                <button @click="goMinus()">-</button>
                <input type="num" v-model="value" min="1" disabled />
                <button @click="goPlus()">+</button>
              </div>
            </div>
            <!-- 大小 -->
            <div class="size">
              <p>{{size.name}}</p>
              <ul>
                <li
                v-if='size'
                  v-for="(it,ind) in size.list"
                  :key="ind"
                  :class="[su==ind?'select':'']"
                  @click="su=ind"
                >{{it}}</li>
              </ul>
            </div>
            <!-- 年龄段 -->
            <div class="age">
              <p>{{age.name}}</p>
              <ul>
                <li
                v-if="age"
                  v-for="(ite,inde) in age.list"
                  :key="inde"
                  :class="[ag==inde?'select':'']"
                  @click="ag=inde"
                >{{ite}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 遮罩 -->
      <div class="bg" v-show="isShow"></div>
    </div>
  </div>
</template>
<script>
import swiper from "./common/mySwiper";
export default {
  data() {
    return {
      num:0,
      state:['全部评价','好评','差评','晒单'],
      name: 0,
      su: 0,
      ag: 0,
      dec:'',
      pro:'',
      isShow: false,
      value: 1,
      aId:'',
      title:'',
      review:'',
      all:'',
      good:'',
      bad:'',
      postForm:'',
      ban:'',
      swiperimg:'',
      list1: [ 
      ],
      list2: [
        {

        }
      ],
      size: [
      
      ],
      age: [
        
      ]
    };
  },
  mounted(){
    // 调取详情接口
  this.aId=this.$route.query.id
  // console.log(this.aId,'iiiii')
    this.$axios({
        url: "http://yd.msword.top/getDetails",
          params:{
          pid: this.aId
        }
      })
        .then(res => {
          console.log(res, "详情请求到的数据");
          this.title=res.data.data
        this.dec=this.title.describe
        this.size=this.title.buySelect[0]
        this.age=this.title.buySelect[1]
        this.review=this.title.buyerReviews
        this.ban=res.data.data.shopDes
        this.swiperimg=res.data.data.swiperImgArr
        // console.log(this.swiperimg,'ggggggg')
        this.pro=res.data.data.swiperImgArr[0]
        // this.all=this.review.all
        // this.good=this.review.good
        // this.bad=this.review.bad
        // this.postForm=this.review.postForm
        })
        .catch(err => {
          console.log(err, "详情错误信息");
        });
  },
  methods: {
    // 购物车逻辑：通过判断本地存储是否有值   有值取出来给arr   再追加  如果没有值  直接存储
    goBuy(){
      let arr=[]
      let obj={
        size:this.size.list[this.su],
        age:this.age.list[this.ag],
        img:this.pro,
        num:this.value,
        shop:this.title.name,
        price:this.title.reduct_price,
        check:false,
      }
      console.log(obj,'ooooooo')
      if(localStorage.getItem('arrCar')){
        arr=JSON.parse(localStorage.getItem('arrCar'))
        console.log(arr,'存储有值')
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
      }else{
        console.log('没有值')
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
      }
      // 存储完值之后跳转到购物车页面
      this.$router.push('/car')
    },
    onClick(name, title) {
      this.$toast(title);
    },
    goCar() {
      this.isShow = true;
    },
    goClose() {
      this.isShow = false;
    },
    goPlus() {
      this.value++;
    },
    goMinus() {
      if (this.value <= 1) {
        this.value == 1;
      } else {
        this.value--;
      }
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="" scoped>
.banner .nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 99;
}

.banner .nav span {
  width: 0.8rem /* 60/75 */;
  height: 0.8rem /* 60/75 */;
  display: inline-block;
  margin-top: 0.27rem /* 20/75 */;
}
.banner .nav span.nav_return {
  background: url(../assets/images/nav_03.jpg) no-repeat;
  background-size: 0.8rem, 0.8rem;
  margin-left: 0.33rem /* 25/75 */;
  margin-right: 6rem /* 495/75 */;
}
.banner .nav span.nav_car {
  background: url(../assets/images/nav_06.jpg) no-repeat;
  background-size: 0.8rem, 0.8rem;
  margin-right: 0.59rem /* 44/75 */;
}
.banner .nav span.nav_set {
  background: url(../assets/images/nav_08.jpg) no-repeat;
  background-size: 0.8rem, 0.8rem;
}
/* 点击加入购物车会出现遮罩和商品加入详情 */
.main {
  position: relative;
}
.bg {
  background: #333333;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
}
/* 购买弹出框 购买商品详情 */
.foot {
  z-index: 9999;
}
.foot .buy {
  width: 100%;
  height: 7.65rem /* 574/75 */;
  background: white;
  z-index: 9999;
  position: absolute;
  top: -7.68rem /* 584/75 */;
  left: 0;
  padding: 0 0.53rem /* 40/75 */;
}

.foot .buy img {
  width: 2.72rem /* 204/75 */;
  height: 2.56rem /* 192/75 */;
  position: absolute;
  top: -0.4rem /* 30/75 */;
  border: 2px solid #999999;
  border-radius: 0.07rem /* 5/75 */;
  float: left;
}
.foot .buy .num {
  height: 2.51rem /* 188/75 */;
}
.foot .buy .num div.count {
  height: 1.33rem /* 100/75 */;
  float: left;
  margin-left: 3.13rem /* 235/75 */;
  margin-top: 0.8rem /* 60/75 */;
}

.foot .buy .num div.close {
  width: 0.6rem /* 45/75 */;
  height: 0.6rem /* 45/75 */;
  text-align: center;
  line-height: 0.6rem /* 45/75 */;
  float: left;
  margin-left: 2.75rem /* 206/75 */;
  font-size: 0.53rem /* 40/75 */;
  border: 1px solid #999999;
  border-radius: 50%;
  margin-top: 0.51rem /* 38/75 */;
}
.foot .buy .num div.count span {
  color: #eb2222;
  font-size: 0.43rem /* 32/75 */;
}
.foot .buy .num div.count {
  font-size: 0.37rem /* 28/75 */;
  line-height: 0.4rem /* 30/75 */;
}
.foot .buy .plus {
  display: flex;
}
.foot .buy .plus span {
  float: left;
}
.foot .buy .plus div {
  /* float: right; */
  margin-left: 4.61rem /* 346/75 */;
}
.foot .buy .plus div input {
  width: 1.33rem /* 100/75 */;
  height: 0.67rem /* 50/75 */;
  background: white;
  outline: none;
  text-align: center;
  border: 1px solid #999999;
}
.foot .buy .plus div button {
  width: 0.64rem /* 48/75 */;
  height: 0.64rem /* 48/75 */;
  margin: 0;
}

.foot .buy .size p,
.foot .buy .age p {
  line-height: 0.56rem /* 42/75 */;
  font-size: 0.37rem /* 28/75 */;
  margin-top: 0.27rem /* 20/75 */;
  margin-bottom: 0.27rem /* 20/75 */;
}
.select {
  background: #ff9900 !important;
}
.foot .buy .size ul,
.foot .buy .age ul {
  display: flex;
}
.foot .buy .size li,
.foot .buy .age li {
  width: 1.53rem /* 115/75 */;
  height: 0.61rem /* 46/75 */;
  color: white;
  background: #999999;
  text-align: center;
  line-height: 0.61rem /* 46/75 */;
  float: left;
  margin-right: 0.27rem /* 20/75 */;
  border-radius: 0.2rem /* 15/75 */;
}
/* 年龄 */
.foot .buy .age li {
  width: 2.33rem /* 175/75 */;
}

.maincon {
  position: relative;
}
.info {
}
.info .con {
  display: flex;
}
.info .con p {
  border-right: 1px solid #eeeeee;
  line-height: 0.53rem /* 40/75 */;
  padding: 0 0.13rem /* 10/75 */;
  font-size: 0.4rem /* 30/75 */;
}
.info .con span {
  float: left;
}
.van-card__title {
  line-height: 1rem /* 30/75 */;
}
.info .con span b {
  margin-top: 0.2rem /* 15/75 */;
}
img {
  width: 100%;
  max-width: 10rem /* 750/75 */;
  /* height: ; */
}
/* 底部购买 */
.foot {
  width: 100%;
  height: 1.33rem /* 100/75 */;
  background: white;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
}
.foot .price {
  margin-left: 0.4rem /* 30/75 */;
}
.foot .price span {
  font-size: 0.4rem /* 30/75 */;
  line-height: 1.33rem /* 100/75 */;
}
.foot .price span:nth-child(2) {
  color: #eb2222;
}
.foot .btn {
  width: 5.33rem /* 400/75 */;
  float: right;
  height: 100%;
  display: flex;
  position: absolute;
  right: 0;
}
.foot .btn button {
  width: 2.67rem /* 200/75 */;
  height: 1.33rem /* 100/75 */;
  border: none;
  float: right;
  color: white;
}

.foot .btn button:nth-child(2) {
  background: #eb2222;
}
.foot .btn button:nth-child(1) {
  background: #ff9900;
}
/* 买家口碑 */
.kind {
  display: flex;
  border-top: 1px solid #999999;
  border-bottom: 1px solid #999999;
  width: 9.31rem /* 698/75 */;
  margin: auto;
}
.kind li {
  width: 1.76rem /* 132/75 */;
  height: 0.67rem /* 50/75 */;
  text-align: center;
  line-height: 0.67rem /* 50/75 */;
  font-size: 0.32rem /* 24/75 */;
  color: white;
  background: #999999;
  border-radius: 0.27rem /* 20/75 */;
  margin: 0.13rem /* 10/75 */ 0.37rem /* 28/75 */;
}
.select {
  background: #ff9900 !important;
}
.assesment {
  border-bottom: 1px solid #333333;
}
.assesment li {
  width: 9.31rem /* 698/75 */;
  margin: 0.27rem /* 20/75 */ auto;
  border-bottom: 1px solid #999999;
  padding-bottom: 0.13rem /* 10/75 */;
}
.assesment div:nth-child(1) {
  height: 0.8rem /* 60/75 */;
}
.assesment div span:nth-child(1) {
  color: #ff9900;
  font-size: 0.45rem /* 34/75 */;
  float: left;
}
.assesment div span:nth-child(2) {
  color: #999999;
  font-size: 0.32rem /* 24/75 */;
  float: right;
}
.assesment .ass-img{
  
  display: flex;
}
.assesment img {
  width: 2.03rem /* 152/75 */;
  height: 2.03rem /* 152/75 */;
  float: left;
}
.assesment p {
  line-height: 0.48rem /* 36/75 */;
  color: #999999;
  font-size: 0.32rem /* 24/75 */;
}
.assesment div.ans {
  background: #dddddd;
  border-radius: 0.13rem /* 10/75 */;
}
.assesment .ans p {
  line-height: 0.5rem /* 30/75 */;
  color: #999999;
  margin: 0.27rem /* 20/75 */ 0.13rem /* 10/75 */;
}
</style>