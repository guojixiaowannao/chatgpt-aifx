<template>
  <div class="setting">
    <el-container>
      <el-header>
        <transition name="el-zoom-in-top">
          <div v-show="show" class="transition-box">
            <h3>AI分享</h3>
          </div>
        </transition>
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
          <div v-show="show" class="transition-box">
            <span>
              很感谢大家对我的支持。
            </span>
            <div>
              <!-- <a href="">BliBili</a>---<a href="">GitHub</a> -->
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
};
</script>

<style>
.transition-box {
  text-align: center;
  margin-top: 5%;
  color: #F2F6FC;
  font-size: 30px;
}

h1 {
  color: aliceblue;
  font-size: 80px;
}

a {
  text-decoration: none;
  color: #67C23A;
}
</style>
