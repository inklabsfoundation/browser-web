<template>
    <div id="J-main-content" class="main-content transaction-page holder-page">
        <h-header></h-header>
        <div class="pageContent">
            <search></search>
            <div class="recentTransactionContent">
                <holder :holder-data="tmp_holder_data" :current-holder-page="tmp_holder_current_page"></holder>

            </div>
            <div class="paginate-box">
                <button v-if="prev_page_url" class="page" v-on:click="paginate_holder(first_page_url)">First</button>
                <button v-if="prev_page_url" class="page" v-on:click="paginate_holder(prev_page_url)">Prev</button>
                <button v-if="next_page_url" class="page" v-on:click="paginate_holder(next_page_url)">Next</button>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style>
    .transaction-page .check {
        display: none;
    }
</style>
<script type="text/javascript">
    import hHeader from '../../components/mainContent/header/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import Holder from '../../components/mainContent/holders/index.vue';

    export default{
        name: 'page_content',
        data() {
            return {
                tmp_holder_data: [],
                tmp_holder_current_page: 1,
                first_page_url: '',
                prev_page_url: '',
                next_page_url: '',
            }
        },

        created() {
            this.get_holders_data();
        },
        methods: {
            get_holders_data() {
                this.$fetch.api_holder_info.get_holder_data()
                    .then(({data}) => {
                        this.tmp_holder_current_page = data.address_obj_arr.current_page;
                        this.tmp_holder_data = data.address_obj_arr.data;
                        this.first_page_url = data.address_obj_arr.first_page_url;
                        this.prev_page_url = data.address_obj_arr.prev_page_url;
                        this.next_page_url = data.address_obj_arr.next_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            paginate_holder(url) {
                this.$fetch.api_holder_info.get_holder_paginate_data(url)
                    .then(({data}) => {
                        this.tmp_holder_current_page = data.address_obj_arr.current_page;
                        this.tmp_holder_data = data.address_obj_arr.data;
                        this.first_page_url = data.address_obj_arr.first_page_url;
                        this.prev_page_url = data.address_obj_arr.prev_page_url;
                        this.next_page_url = data.address_obj_arr.next_page_url;
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
            Holder,
        }
    }
</script>
