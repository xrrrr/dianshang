<template>
  <div>
    <!-- 头部搜索框 -->

    <div class="banner">
      <div class="head">
        <div class="headmain">
          <van-search
            placeholder="Montagne jeunesse"
            v-model="value"
            input-align="left"
            background="fb85a6"
            right-icon="search"
            left-icon="none"
          />
        </div>
      </div>
      <div class="bg">
        <img src="../../assets/images/banner_02.jpg" alt />
      </div>
    </div>
    <!-- 下面主体部分内容 -->
    <div class="contain">
      <div class="hot" v-for="(item,index) in hot" :key="index">
        <h2>{{item.name}}</h2>
        <ul>
          <li v-for="(ite) in item.list" :key="ite.id" @click="goDetail(ite.id)">
            <img :src="ite.thumbnail" alt="">
            <p class="first">
              <span class="price">￥{{ite.reduct_price}}</span>
              <i>￥{{ite.original_price}}</i>
            </p>
            <p>{{ite.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      hot:[
          // {
          //   id:1,
	        // name:'美国/SUPER MILD沐浴露500ml',
	        // original_price:'￥96',
	        // reduct_price: '￥88',
	        // thumbnail:require('../../assets/images/hot1_03.jpg'),
	        // product_id: '产品id' , 
          // },{
      ]
    };
  },
  methods: {
    goDetail(id){
     this.$router.push({
       path:'/detail',
      // name:'detail',
       query:{
         id,
       }
     })
    }
  },
  mounted() {
    this.$axios({
      url:'http://yd.msword.top/getIndexData'
    })
    .then(res=>{
      console.log(res,'首页数据请求结果')
      this.hot=res.data.data;
    })
    .catch(err=>{
      console.log(err,'首页数据错误')
    })
  },
};
</script>
<style lang="" scoped>
.banner {
  width: 100%;

  /* position: relative; */
}
.bg {
  width: 100%;
  max-width: 10rem; /* 750/75 */
}
.contain{
  padding-left: .23rem /* 17/75 */;
}
.bg img {
  width: 100% /* 750/75 */;
  max-width: 10rem /* 750/75 */;
  height: 5.33rem; /* 400/75 */;
}
div.van-search {
  padding: 0;
}
.head {
  background: #fb85a6;
  position: relative;
}
.headmain {
  width: 6.87rem /* 515/75 */;
  height: 1.31rem;
  /* background: #fb85a6; */
  /* display: flex; */
  position: absolute;
  top: 0.4rem /* 30/75 */;
  left: 1.55rem /* 116/75 */;
}
/* 内容部分 */
.hot ul{
    display: flex;
    padding-left: .24rem /* 18/75 */;
}
.hot ul li{
    width: 4.32rem /* 324/75 */;
   
    margin-right: .24rem /* 18/75 */;
    border: 2px solid #eeeeee;
}
.hot ul li img{
    width: 4.32rem;
    height: 3.05rem /* 229/75 */;
    margin-top: .67rem /* 50/75 */;
    margin-bottom: .72rem;
}
.hot h2{
    height: 1.23rem /* 92/75 */;
    font-size: .37rem /* 28/75 */;
    line-height: 1.23rem /* 28/75 */;
    padding-left: .24rem /* 18/75 */;
}
.hot .first{
    margin-bottom: .17rem /* 13/75 */;
}
.hot p{
    color: #666666;
    font-size: .37rem /* 28/75 */;
    line-height: .51rem /* 38/75 */;
    padding: .13rem  0;
    margin: 0 .13rem /* 10/75 */;
}
.hot .price{
    color: #e60012;
    font-size: .37rem /* 28/75 */;

}
.hot p i{
    float: right;
    margin-right: .53rem /* 40/75 */;
    text-decoration: line-through;
}
</style>