<template>
    <div class="two">
        <!-- 2.监听子组件emit -->
      2..子组件传来的数据是：{{ msg }} <br />
      <childNew @abc="myget"></childNew>
      <!-- <childNew @sendMsg="sendMsg"></childNew>
      <div>2.父组件接收消息：{{ childMsg }}</div> -->
    </div>
</template>
<script>
import childNew from "./childNew.vue";
export default {
  components: { childNew },
  data() {
    return {
      msg: "",
      nameOne: "大美婧",
      //2.子传父
      childMsg: null,
    };
  },
  methods: {
    //2.父组件接收子组件消息的方法
    sendMsg(name, age) {
      this.childMsg = name + age;
    },
    //2.
    myget(mg) {
      this.msg = mg;
    },
  },
};
</script>