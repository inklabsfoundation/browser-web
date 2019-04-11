<template>
    <div class="container footer-container">
        <div class="col-md-4 col-sm-6 col-sx-12 box">
            <img src="../../../assets/images/svg/logo_title.svg" alt="LOGO">
        </div>
        <div class="col-md-4 col-sm-6 col-sx-12 box">
            <span class="copyright">
                Copyright©<span v-text="(new Date()).getFullYear()"></span> | Ink Labs Foundation Ltd.
            </span>
        </div>
        <div class="col-md-4 col-sm-6 col-sx-12 box">
            <span class="contact">
                <span class="wechat">
                    <img src="../../../assets/images/svg/icon_wechat_s.svg" alt="Wechat">
                    <img class="two-dimensional" src="../../../assets/images/img/img_wechat.png" alt="Wechat">
                </span>
                <span class="github">
                    <a href="https://github.com/inklabsfoundation" target="_blank"><img src="../../../assets/images/svg/icon_github_s.svg" alt="Zhihu"></a>
                </span>
            </span>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {

            }
        },
        components: {

        }
    }
</script>
