<template>
  <div>
    <div class="one">
      <!-- 1.父传子 -->
      <!-- <child :nameOne="nameOne"></child>
      {{ nameOne }}<input v-model="nameOne" /> -->
    </div>
    <div class="two">
      <!--2.子传父-->
      2.子组件传来的数据是：{{ msg }} <br />
      <child @abc="myget"></child>
    </div>
    <div class="three">
      <!-- 3.路由跳转 -->
      <!-- {{ text }}<button @click="goTo">路由传参按钮</button> -->
    </div>
  </div>
</template>


<script>
import child from "./child.vue";
export default {
  components: { child },
  data() {
    return {
      //1.父传子
      nameOne: "大美婧",
      //2.子传父
      msg: "",
      //3.路由跳转
      text: "跳转",
    };
  },
  methods: {
    //3.路由跳转
    goTo() {
      this.$router.push({
        path: "/system/transfer/system/transfer/child",
        query: { text: this.text },
      });
    },
    //1.父传子
    myget(mg) {
      this.msg = mg;
    },
  },
};
</script>
<style scoped>
.one {
  width: 400px;
  height: auto;
  background-color: lightblue;
}
.two {
  width: 400px;
  height: auto;
  background-color: lightpink;
}
.three {
  width: 400px;
  height: auto;
  background-color: lightgrey;
}
</style>