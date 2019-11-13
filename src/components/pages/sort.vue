<template>
  <div>
    <!-- 头部搜索框 -->
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
    <!-- 商品分类展示 -->
    <div class="contain">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="母婴专区" @click="a=0" />
        <van-sidebar-item title="美妆护肤" @click="a=1" />
        <van-sidebar-item title="家居生活" @click="a=2" />
        <van-sidebar-item title="食品营养" @click="a=3" />
        <van-sidebar-item title="全球直购" @click="a=4" />
      </van-sidebar>
      <div class="right">
        <!-- 母婴专区 -->
        <ul v-if="a==index" class="product" v-for="(item,index) in arr" :key='index'>
          <!-- <h2>miying</h2> -->
          <li v-for="ite in item.list" :key="ite.id">
            <img :src="ite.thumbnail" alt />
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
      activeKey: 0,
      a: 0,
      arr: [ ]
    };
  },
  mounted() {
    this.$axios({
      url:'http://yd.msword.top/getClassify'
    })
    .then(res=>{
      console.log(res,'分类请求到的成功数据')
      this.arr=res.data.data;

    })
    .catch(err=>{
      console.log(err,'分类请求错误数据')
    })
  },
};
</script>
<style lang=""scoped>
.head {
  background: #ff9900;
}
.headmain {
  width: 6.87rem /* 515/75 */;
  height: 1.31rem;
  margin-left: 1.55rem /* 116/75 */;
}
.contain {
  display: flex;
}
/* 右侧内容部分 */
.right {
  float: right;
  width: 6.8rem /* 510/75 */;
  margin-left:.67rem /* 50/75 */;
}
.right img {
  width: 1.33rem /* 100/75 */;
  height: 1.33rem /* 100/75 */;
}
/* 右侧内容切换显示部分 */
.product {
  /* display: flex; */
  padding-left: 0.27rem /* 20/75 */;
  padding-top: 0.27rem /* 20/75 */;
}
.product li {
  width: 2.93rem /* 220/75 */;
  border: 2px solid #1d84a7;
  border-radius: 0.13rem /* 10/75 */;
  float: left;
  text-align: center;
  margin-right: 0.2rem /* 15/75 */;
  margin-bottom: 0.27rem /* 20/75 */;
}
.product li p {
  height: 0.61rem /* 46/75 */;
  background: #1d84a7;
  color: white;
}
.product li img {
  width: 2.2rem /* 165/75 */;
  height: 2.29rem /* 172/75 */;
  margin-top: 0.19rem /* 14/75 */;
}
</style>