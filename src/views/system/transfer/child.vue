<template>
  <div>
    <div class="one">
      <!-- 1.父传子 -->
      <!-- <h4>1.接收姓名：{{ nameOne }}</h4> -->
    </div>
    <div class="two">
      <!--2.子传父-->
      <input v-model="msg" />
      <button @click="doSend()">2.发送数据给父组件</button>
    </div>
    <div class="three">
      <!-- 3.路由跳转 -->
      <!-- {{ text }}<input v-model="text" /> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //2.子传父
      msg: "hello",
      //3.路由跳转
      text: this.$route.query.text,
    };
  },
  //1.父传子
  props: ["nameOne"],
  methods: {
    //2.子传父
    doSend() {
      this.$emit("abc", this.msg);
    },
  },
};
</script>
<style scoped>
.one {
  width: 300px;
  height: auto;
  background-color: lightblue;
}
.two {
  width: 300px;
  height: auto;
  background-color: lightpink;
}
.three {
  width: 300px;
  height: auto;
  background-color: lightgrey;
}
</style>