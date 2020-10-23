<template>
  <div>
    <h1>welcome</h1>
    <button @click="send">发送请求</button>
    <button @click="abort">发送中断请求</button>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  methods: {
    send() {
      getLoginLog(this).then(res => {
        console.log(res);
      });
    },
    abort() {
      // console.log(this.cancel);
      if (typeof this.cancel === "function") {
        this.cancel();
      }
    }
  }
};
</script>
