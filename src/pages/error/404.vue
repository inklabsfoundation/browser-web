<template>
    <div class="error-page">
        <h-header></h-header>
        <div class="container">
            <div class="col-xs-12">
                <img class="error-img" src="./images/img_404.svg" alt='404'/>
                <p v-if="desc" class="title" v-text="desc"></p>
                <p v-if="!desc" class="title" v-text="title"></p>
                <router-link :to="path" class="backBtn" tag="span">GO TO HOME</router-link>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script type="text/javascript">
    import hHeader from '../../components/mainContent/header/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';

    export default {
        name: 'noPage',
        data() {
            return {
                title: 'Sorry, that page can\'t be found',
                path: '/',
                desc: this.$route.params.desc,
            }
        },

        components: {
            hHeader,
            vFooter,
        }
    }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
    .error-page {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #0D131B;
        text-align: center;

        .error-img {
            margin-top: 130px;
            width: 100%;
        }

        .title {
            margin-top: -50px;
            color: #fff;
            font-size: 24px;
        }

        .backBtn {
            display: inline-block;
            color: #fff;
            background: #279cf4;
            margin-bottom: 20px;
            margin-top: 50px;
            padding: 10px 20px;
            border: 1px solid #279cf4;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background: #6dbeff;
             }
        }

        .footer-container {
            position: absolute;
            bottom: 0;
        }
    }
</style>
