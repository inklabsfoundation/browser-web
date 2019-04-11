<template>
    <div class="view-page">
        <main-content>
            <router-view></router-view>
        </main-content>
    </div>
</template>
<script type="text/javascript">
    import  mainContent  from './home/index.vue'
    export default {
        name: 'page',
        components: {
            mainContent,
        },
    }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
