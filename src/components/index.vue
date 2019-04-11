<template>
    <div id="J-main-content" class="main-content">
        <h-header></h-header>
        <div class="pageContent">
            <search></search>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script type="text/javascript">
    import hHeader from './mainContent/header/index.vue';
    import vFooter from './mainContent/footer/index.vue';
    import Search from './mainContent/search/index.vue';

    export default{
        name: 'page_content',
        components: {
            hHeader,
            vFooter,
            Search
        }
    }
</script>
