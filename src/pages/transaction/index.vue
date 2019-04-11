<template>
    <div id="J-main-content" class="main-content transaction-page">
        <h-header></h-header>
        <div class="pageContent">
            <search></search>
            <div class="recentTransactionContent">
                <transaction :transaction-data="tmp_transaction_data"></transaction>
            </div>
            <div class="paginate-box">
                <button v-if="prev_page_url" class="page" v-on:click="paginate_transaction(first_page_url)">First</button>
                <button v-if="prev_page_url" class="page" v-on:click="paginate_transaction(prev_page_url)">Prev</button>
                <button v-if="next_page_url" class="page" v-on:click="paginate_transaction(next_page_url)">Next</button>
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
    import Transaction from '../../components/mainContent/recent_transaction/index.vue';

    export default{
        name: 'page_content',
        data() {
            return {
                tmp_transaction_data: [],
                first_page_url: '',
                prev_page_url: '',
                next_page_url: '',
            }
        },

        created() {
            this.get_transaction_amount();
        },
        methods: {
            get_transaction_amount() {
                this.$fetch.api_transaction_info.get_transaction_data()
                    .then(({data}) => {
                        this.tmp_transaction_data = data.transaction_arr.data;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            paginate_transaction(url) {
                this.$fetch.api_transaction_info.get_transaction_paginate_data(url)
                    .then(({data}) => {
                        this.tmp_transaction_data = data.transaction_arr.data;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
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
            Transaction,
        }
    }
</script>
