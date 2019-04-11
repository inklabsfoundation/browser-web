<template>
  <section class="body-warp">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>
<script type="text/javascript">
  export default {
      name: 'app',
      created () {
          this.get_latest_block();
      },

      mounted () {
          let that = this;
          setInterval(()=>{
              that.get_latest_block();
          }, 5000);
      },
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  @import '~assets/scss/main';

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
