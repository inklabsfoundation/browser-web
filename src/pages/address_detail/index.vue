<template>
    <div id="J-main-content" class="main-content address-detail-page">
        <with-search-header></with-search-header>
        <div class="pageContent">
            <search class="hidden-md hidden-lg"></search>
            <div class="container block-detail-container">
                <div class="col-xs-12 block-detail-box">
                    <div class="content">
                        <div class="title-box">
                            <img class="icon-svg" src="../../assets/images/svg/icon_address.svg" alt="ICON">
                            <span class="title">Address Details</span>
                        </div>

                        <div class="block-id-box row">
                            <span class="tx-id">
                                <div class="col-xs-2">
                                    Address:
                                </div>
                                <div class="col-xs-10">
                                    <span v-text="tmp_address_hash" style="word-break: break-all;"></span>
                                </div>
                            </span>
                        </div>

                        <div class="details-container">
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Qtum Balance:
                                </div>
                                <div v-if="typeof tmp_address_detail.qtum_balance != 'object'" class="col-xs-12 col-md-10 col-sm-9 text"><span v-text="formatQtumAmount(tmp_address_detail.qtum_balance)"></span></div>
                                <div v-else class="col-xs-12 col-md-10 col-sm-9 text"><span v-text="0"></span></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">INK Balance:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="formatINKAmount(tmp_address_detail.erc20_balance)"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Total transactions:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_address_transaction_amount"></div>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="container">
                            <div class="table-box col-xs-12">
                                <table class="table">
                                    <thead>
                                    <tr class="table-th-tr">
                                        <td class="table-th-td">TXHash</td>
                                        <td class="table-th-td">Block</td>
                                        <td class="table-th-td">Age</td>
                                        <td class="table-th-td">Type</td>
                                        <!--<td class="table-th-td">From</td>-->
                                        <td class="table-th-td">From / To</td>
                                        <td class="table-th-td">Value</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-if="tmp_address_transaction_amount > 0" v-for="transaction in tmp_address_transaction_data" class="table-tb-tr">
                                        <td class="table-tb-td" style="cursor: pointer;">
                                            <router-link :to="'/tx/' + transaction.tx_id" tag="span">
                                                <span v-text="transaction.tx_id.substring(45)"></span><span>...</span>
                                            </router-link>
                                        </td>
                                        <td class="table-tb-td" style="cursor:pointer;">
                                            <router-link :to="'/block/' + transaction.block_hash" tag="span">
                                                <span v-text="transaction.block_hash.substring(45)"></span><span>...</span>
                                            </router-link>
                                        </td>
                                        <td class="table-tb-td">
                                            <span class='time' style="display:inline-block;width: 100px;margin-top: -5px;">
                                                <span v-text="formatDate(transaction.block_time)"></span>
                                            </span>
                                        </td>
                                        <td class="table-tb-td">
                                            <span v-if="transaction.sender_address_qtum == tmp_address_hash" class='tx-type-out'>
                                                <span>OUT</span>
                                            </span>
                                            <span v-else class='tx-type-in'>
                                                <span>IN</span>
                                            </span>
                                        <!--</td>-->
                                        <!--<td class="table-tb-td" style="cursor:pointer;">-->
                                            <!--<router-link :to="'/address/' + transaction.sender_address_qtum" tag="span">-->
                                                <!--<span v-text="transaction.sender_address_qtum"></span>-->
                                            <!--</router-link>-->
                                        <!--</td>-->
                                        <td class="table-tb-td" style="cursor:pointer;">
                                            <router-link v-if="transaction.sender_address_qtum == tmp_address_hash" :to="'/address/' + transaction.receiver_address_qtum" tag="span">
                                                <span class="glyphicon glyphicon-arrow-right" v-text="' ' + transaction.receiver_address_qtum"></span>
                                            </router-link>
                                            <router-link v-else :to="'/address/' + transaction.sender_address_qtum" tag="span">
                                                <span class="glyphicon glyphicon-arrow-left"  v-text="' ' + transaction.sender_address_qtum"></span>
                                            </router-link>
                                        </td>
                                        <td class="table-tb-td" v-text="formatINKAmount(transaction.erc20_value) +' '+ transaction.erc20_symbol"></td>
                                    </tr>
                                    <tr v-if="tmp_address_transaction_amount == 0">
                                        <td colspan="6" class="no-data-td">no transaction data</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="paginate-box">
                            <button v-if="prev_page_url" class="page" v-on:click="paginate_transaction(first_page_url)">First</button>
                            <button v-if="prev_page_url" class="page" v-on:click="paginate_transaction(prev_page_url)">Prev</button>
                            <button v-if="next_page_url" class="page" v-on:click="paginate_transaction(next_page_url)">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style>
    @media (max-width: 1200px) {
        .address-detail-page .table {
            min-width: 1080px;
        }
    }

    .address-detail-page .col-xs-12 {
        padding-left: 0;
        padding-right: 0;
    }



</style>
<script type="text/javascript">
    import withSearchHeader from '../../components/mainContent/with_search_header/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';
    import formatDate from '../../common/tools/format_date'
    import formatINKAmount from '../../common/tools/transform_amount'

    export default {
        name: 'page_content',

        data() {
            return {
                address_hash: this.$route.params.address_hash,
                tmp_address_detail: '',
                tmp_address_hash: '',
                tmp_address_transaction_data: [],
                tmp_address_transaction_amount: 0,

                first_page_url: '',
                prev_page_url: '',
                next_page_url: '',

            }
        },

        watch: {
            '$route' (to, from) {
                // 获取最新的id 调用获取数据方法
                if(to.name == from.name && to.params.address_hash !== from.params.address_hash) {
                    this.address_hash = to.params.address_hash;
                    this.get_address_detail();
                    this.get_address_transaction_detail()
                }
            }
        },

        created() {

        },

        methods: {
            get_address_detail() {
                //获取地址详情
                this.$fetch.api_address_info.get_address_info_data(this.address_hash)
                    .then(({data}) => {
                        this.tmp_address_detail = data.address_obj;
                        this.tmp_address_hash = this.tmp_address_detail.address_qtum;
                    })
                    .catch((e) => {
                        this.$router.push({path: '/404'});
                    })
            },

            get_address_transaction_detail() {
                //获取地址的INK交易详情
                this.$fetch.api_address_info.get_address_transaction_info_data(this.address_hash)
                    .then(({data}) => {
                        this.tmp_address_transaction_data = data.transaction_arr.data;
                        this.tmp_address_transaction_amount = data.transaction_arr.total;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                    })
                    .catch((e) => {
//                        this.$router.push({path: '/404'});
                    })
            },

            paginate_transaction(url) {
                this.$fetch.api_address_info.get_address_transaction_paginate_data(url)
                    .then(({data}) => {
                        this.tmp_address_transaction_data = data.transaction_arr.data;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },


            formatDate(timestamp){
                return formatDate.showTime(timestamp);
            },

            formatINKAmount(value) {
                return formatINKAmount.INKAmount(value);
            },

            formatQtumAmount(value) {
                return formatINKAmount.QTUMAmount(value);
            }
        },

        mounted() {
            this.get_address_detail();
            this.get_address_transaction_detail();
        },

        components: {
            withSearchHeader,
            vFooter,
            Search,
        }
    }
</script>
