<template>
    <div id="J-main-content" class="main-content block-page">
        <h-header></h-header>
        <div class="pageContent">
            <search></search>
            <div class="recentBlockContent">
                <recent-block :block-data="tmp_block_data"></recent-block>
            </div>
            <div class="paginate-box">
                <button v-if="prev_page_url" class="page" v-on:click="paginate_block(first_page_url)">First</button>
                <button v-if="prev_page_url" class="page" v-on:click="paginate_block(prev_page_url)">Prev</button>
                <button v-if="next_page_url" class="page" v-on:click="paginate_block(next_page_url)">Next</button>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style>
    .block-page .check {
        display: none;
    }
</style>
<script type="text/javascript">
    import hHeader from '../../components/mainContent/header/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import RecentBlock from '../../components/mainContent/recent_block/index.vue';

    export default{
        name: 'page_content',
        data() {
            return {
                tmp_block_data: [],
                first_page_url: '',
                prev_page_url: '',
                next_page_url: '',
            }
        },

        created() {
        },

        mounted() {
            this.get_block_data();
        },

        methods: {
            get_block_data() {
                this.$fetch.api_block_info.get_block_data()
                    .then(({data}) => {
                        this.tmp_block_data = data.block_obj_arr.data;
                        this.first_page_url = data.block_obj_arr.first_page_url;
                        this.prev_page_url = data.block_obj_arr.prev_page_url;
                        this.next_page_url = data.block_obj_arr.next_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            paginate_block(url) {
                this.$fetch.api_block_info.get_block_paginate_data(url)
                    .then(({data}) => {
                        this.tmp_block_data = data.block_obj_arr.data;
                        this.first_page_url = data.block_obj_arr.first_page_url;
                        this.prev_page_url = data.block_obj_arr.prev_page_url;
                        this.next_page_url = data.block_obj_arr.next_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },
        },
        components: {
            hHeader,
            vFooter,
            Search,
            RecentBlock
        }
    }
</script>
