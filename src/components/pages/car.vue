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
    <!-- 商品信息 -->
    <div class="car" v-if="flag==true">
      <ul>
        <li v-if="list" v-for="(item,i) in list" :key="i">
          <h2>
            <span>
              <van-icon name="shop-o" />
            </span>
            {{item.shop}}
          </h2>
          <ul class="list">
            <li>
              <van-swipe-cell>
                <div class="check">
                  <input type="checkbox" v-model="item.check" @click="checkOne(i)" />
                  <!-- <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <van-checkbox name="a" checked-color="#ff9900"></van-checkbox>
                  </van-checkbox-group>-->
                  <!-- <van-checkbox v-model="che" checked-color="#ff9900"></van-checkbox> -->
                </div>

                <img :src="item.img" alt />
                <div class="msg">
                  <p>{{item.shop}}</p>
                  <span>{{item.size}}{{item.age}}</span>
                  <!-- <van-stepper v-model="value" integer /> -->
                  <p>
                    <button @click="goMinus(i)">-</button>
                    <input type="number" disabled v-model="item.num" />
                    <button @click="goPlus(i)">+</button>
                  </p>
                </div>
                <p class="p1">{{item.price*item.num}}</p>
                <template slot="right">
                  <van-button square type="danger" text="删除" @click="delate(i)"/>
                </template>
              </van-swipe-cell>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车为空时 -->
    <div class="empty" v-if="flag==false">
      <img src="../../assets/images/car-none_02.jpg" alt />
    </div>
    <!-- 底部结算 -->
    <!-- 全选 -->
    <div class="bottom">
      <div class="inp">
        <input type="checkbox" v-model="checkA" @click="checkAll()" />
        <input type="text" placeholder="编辑" disabled class="edit" />
      </div>
      <div class="price">
        <p>合计：{{allPrice}}</p>
        <p>(不含运费)</p>
      </div>
      <button>去结算</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // one:false,
      checkA: false,
      checked: "",
      che: "",
      // value: 1,
      flag: "",
      tag: false,
      result: [],
      list: []
    };
  },
  mounted() {
    this.show();
    this.list = JSON.parse(localStorage.getItem("arrCar"));
    console.log(this.list, "ccccc");
  },
  methods: {
    // 删除一条列表
    delate(i){
      console.log(i,'iiiii')
      localStorage.removeItem(this.list.splice(i,1))
    localStorage.setItem('arrCar',JSON.stringify(this.list));
  
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    goPlus(i) {
      this.list[i].num++;
      // console.log(this.value,'vvvvv')
    },
    goMinus(i) {
      if (this.list[i].num <= 1) {
        this.list[i].num == 1;
      } else {
        this.list[i].num--;
      }
    },
    checkAll() {
      // 全选
      // 全选false时为选中    单选要为true
      // 全选为true时为未选中    单选为false
      if (this.checkA) {
        this.list.map((item, i) => {
          item.check = false;
        });
      } else {
        this.list.map((item, i) => {
          item.check = true;
        });
      }
    },
    checkOne(i) {
      // 单选false时为选中    全选为true
      // 单选为true时为未选中    全选为false
      // 通过单选方法初始对one的值取反
      this.list[i].check = !this.list[i].check;
      let result = this.list.map((item, i) => {
        return item.check;
      });
      let bool = result.every((item, i) => {
        return item == true;
      });
      if (bool) {
        this.checkA = true;
      } else {
        this.checkA = false;
      }
    },
    show() {
      if (localStorage.getItem("arrCar")) {
        console.log("有值");
        this.flag = true;
      } else {
        console.log("没有值");
        this.flag = false;
      }
    }
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.list.map((item, i) => {
        //如果单选选中就计算金额 否则 不计算
        if (item.check) {
          sum += item.price * item.num;
        }
      });
      return sum;
    }
  }
};
</script>
<style lang=""scoped>
.empty img {
  width: 100%;
  max-width: 10rem /* 750/75 */;
  height: 100%;
}
.van-nav-bar {
  background: #ff9900;
}
.van-icon-arrow-left:before,
.van-nav-bar__title {
  color: white;
}
.car {
  padding-left: 0.4rem /* 30/75 */;
}
.car h2 {
  line-height: 1.33rem /* 100/75 */;
  font-size: 0.37rem /* 28/75 */;
}
input {
  width: 0.47rem /* 35/75 */;
  height: 0.47rem /* 35/75 */;
  background: white;
}
.list .van-checkbox {
  float: left;
}
.list .check {
  float: left;
  margin-top: 0.77rem /* 58/75 */;
}
.list .msg {
  float: left;
  width: 3.87rem /* 290/75 */;
}
.list .msg button {
  width: 0.64rem /* 48/75 */;
  height: 0.64rem /* 48/75 */;
}
.list .msg input {
  text-align: center;
}
.list .msg p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list .p1 {
  /* float: ; */
  font-size: 0.43rem /* 32/75 */;
  color: #000;
  height: 2.13rem /* 160/75 */;
  line-height: 2.13rem /* 160/75 */;
  margin-left: 0.33rem /* 25/75 */;
}
.list li img {
  width: 2rem /* 150/75 */;
  height: 2rem /* 150/75 */;
  float: left;
}
/* 底部结算 */
.bottom {
  width: 100%;
  height: 1.53rem /* 115/75 */;
  position: fixed;
  bottom: 1.47rem /* 110/75 */;
  left: 0;
  background: white;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
  padding-left: 0.53rem /* 40/75 */;
}
.bottom input.edit {
  width: 0.8rem /* 50/75 */;
  height: 0.8rem /* 50/75 */;
  border: none;
  text-align: center;
  margin-left: 0.91rem /* 68/75 */;
  margin-right: 1.33rem /* 100/75 */;
}
.bottom input {
  margin-top: 0.4rem /* 30/75 */;
}
.bottom div {
  /* line-height: 100%; */
  float: left;
}
.bottom div.price {
  margin-top: 0.4rem /* 30/75 */;
}
.bottom button {
  width: 3.07rem /* 230/75 */;
  height: 100%;
  background: #ff9900;
  border: none;
  float: right;
  color: white;
  font-size: 0.37rem /* 28/75 */;
}
</style>