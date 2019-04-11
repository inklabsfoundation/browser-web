<template>
    <div class="no-results-container">
        <h-header></h-header>
        <img class="nothing-img" src="../../assets/images/svg/img_nothing.svg" alt="Nothing">
        <p class="p1">
            暂未搜索到相关内容
        </p>
        <p class="p2">
            请确保您的交易ID等输入正确
        </p>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import hHeader from '../../components/mainContent/header/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';

    export default {
        data() {
            return {

            }
        },
        components: {
            hHeader,
            vFooter,
        }
    }
</script>
