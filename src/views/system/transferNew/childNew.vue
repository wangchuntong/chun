<template>
  <div class="two">
    <!--2.通过点击按钮向父组件传值 -->
    <input v-model="msg" />
    <button @click="doSend()">2.发送数据给父组件</button>
    <!-- <button @click="sendMsg(name, age)">2.子组件向父组件传值</button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      //2.子传父
      msg: "hello",
      //   name: "张三",
      //   age: 18,
    };
  },
  methods: {
    //2.
    doSend() {
      this.$emit("abc", this.msg);
    },
    //2.子传父方法
    // sendMsg(name, age) {
    //   this.$emit("sendMsg", name, age);
    // },
  },
};
</script>
<style scoped>
.two {
  width: 300px;
  height: auto;
  background-color: lightcoral;
}
</style>