<template>
    <div id="J-main-content" class="main-content block-detail-page">
        <with-search-header></with-search-header>
        <div class="pageContent">
            <search class="hidden-md hidden-lg"></search>
            <div class="container block-detail-container">
                <div class="col-xs-12 block-detail-box">
                    <div class="content">
                        <div class="title-box">
                            <img class="icon-svg" src="../../assets/images/svg/icon_block.svg" alt="ICON">
                            <span class="title">Block Details</span>
                        </div>
                        <div class="block-id-box row">
                            <span class="tx-id">
                                <div class="col-xs-2">
                                    Block Hash:
                                </div>
                                <div class="col-xs-10">
                                    <span v-text="tmp_block_hash" style="word-break: break-all;"></span>
                                </div>
                            </span>
                        </div>

                        <div class="details-container" v-if="tmp_block_detail != ''">
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Height:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_block_detail.block_height"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Block Size:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_block_detail.block_size"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Block Time:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="formatDate(tmp_block_detail.block_time)"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Prev Block Hash:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" style="cursor: pointer;">
                                    <router-link :to="'/block/' + tmp_block_detail.previous_block_hash" tag="span">
                                        <span class="hash-id block-hash" v-text="tmp_block_detail.previous_block_hash" style="word-break: break-all;"></span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Next Block Hash:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" style="cursor: pointer;">
                                    <router-link :to="'/block/' + tmp_block_detail.next_block_hash" tag="span">
                                        <span class="hash-id block-hash" v-text="tmp_block_detail.next_block_hash" style="word-break: break-all;"></span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Merkle Root:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_block_detail.merkleroot" style="word-break: break-all;"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Difficulty:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="TransformDecimalAmount(tmp_block_detail.difficulty)"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Nonce:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9text" v-text="tmp_block_detail.nonce"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Confirmations:</div>
                                <div v-if="computed_latest_block_height-tmp_block_detail.block_height>0" class="col-xs-12 col-md-10 col-sm-9 text" v-text="computed_latest_block_height-tmp_block_detail.block_height"></div>
                                <div v-else class="col-xs-12 col-md-10 col-sm-9 text red">UNCONFIRMED!!!</div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Transactions:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text-transaction-amount">
                                    <span v-text="tmp_ink_transaction_amount"></span>
                                    <span class="">INK Transactions</span>
                                </div>
                            </div>

                        </div>
                        <div class="line"></div>
                        <div class="container">
                            <div class="row">
                                <div class="table-box col-xs-12">
                                    <table class="table">
                                        <thead>
                                        <tr class="table-th-tr">
                                            <td class="table-th-td">TXHash</td>
                                            <td class="table-th-td">block</td>
                                            <td class="table-th-td">age</td>
                                            <td class="table-th-td">From</td>
                                            <td class="table-th-td">To</td>
                                            <td class="table-th-td">value</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="tmp_ink_transaction_amount > 0" v-for="transaction in tmp_transaction_data" class="table-tb-tr">
                                            <td class="table-tb-td" style="cursor: pointer;">
                                                <router-link :to="'/tx/' + transaction.tx_id" tag="span">
                                                    <span v-text="transaction.tx_id.substring(45)"></span><span>...</span>
                                                </router-link>
                                            </td>
                                            <td class="table-tb-td" style="cursor: pointer;">
                                                <router-link :to="'/block/' + transaction.block_hash" tag="span">
                                                    <span v-text="transaction.block_hash.substring(45)"></span><span>...</span>
                                                </router-link>

                                            </td>
                                            <td class="table-tb-td">
                                            <span class='time' style="display:inline-block;width: 100px;margin-top: -5px;">
                                                <span v-text="distanceToNow(tmp_block_detail.block_time)"></span>
                                            </span>
                                            </td>
                                            <td class="table-tb-td" style="cursor: pointer;">
                                                <router-link :to="'/address/' + transaction.sender_address_qtum" tag="span">
                                                    <span class="hash-id" v-text="transaction.sender_address_qtum"></span>
                                                </router-link>
                                            </td>
                                            <td class="table-tb-td" style="cursor: pointer;">
                                                <router-link :to="'/address/' + transaction.receiver_address_qtum" tag="span">
                                                    <span class="hash-id" v-text="transaction.receiver_address_qtum"></span>
                                                </router-link>
                                            </td>
                                            <td class="table-tb-td" v-text="formatINKAmount(transaction.erc20_value)"></td>
                                        </tr>
                                        <tr v-if="tmp_ink_transaction_amount == 0">
                                            <td colspan="6" class="no-data-td">no transaction data</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="paginate-box">
                            <button v-if="prev_page_url" class="page" v-on:click="paginate_block(first_page_url)">First</button>
                            <button v-if="prev_page_url" class="page" v-on:click="paginate_block(prev_page_url)">Prev</button>
                            <button v-if="next_page_url" class="page" v-on:click="paginate_block(next_page_url)">Next</button>
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
        .table-box {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            -ms-overflow-scrolling: touch;
            -o-overflow-scrolling: touch;
            -moz-overflow-scrolling: touch;
            overflow-scrolling: touch;
        }

        .table {
            min-width: 1080px;
        }
    }

    @media (min-width: 1200px) {
        .table-box {
            overflow-x: hidden;
        }
    }

    .block-detail-page .col-xs-12 {
        padding-left: 0;
        padding-right: 0;
    }

</style>
<script type="text/javascript">
    import vFooter from '../../components/mainContent/footer/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import withSearchHeader from '../../components/mainContent/with_search_header/index.vue';
    import formatDate from '../../common/tools/format_date'
    import formatINKAmount from '../../common/tools/transform_amount'

    export default {
        name: 'page_content',

        data() {
            return {
                block_hash: this.$route.params.block_hash,
                tmp_block_detail: '',
                tmp_block_hash: '',
                tmp_transaction_data: [],
                tmp_ink_transaction_amount: 0,

                first_page_url: '',
                prev_page_url: '',
                next_page_url: '',

            }
        },
        computed: {
            computed_latest_block_height(){
                if(typeof window.latest_block_obj == 'undefined'){
                    return tmp_block_detail.block_height;
                }
                return window.latest_block_obj.block_height;
            }
        },

        created() {},

        watch: {
            '$route' (to, from) {
                // 获取最新的id 调用获取数据方法
                if(to.name == from.name && to.params.block_hash !== from.params.block_hash) {
                    this.block_hash = to.params.block_hash;
                    this.get_block_detail();
                    this.get_block_transaction_detail();
                }
            }
        },

        methods: {
            get_block_detail() {
                //获取交易详情
                this.$fetch.api_block_info.get_block_info_data(this.block_hash)
                    .then(({data}) => {
                        this.tmp_block_detail = data.block_obj;
                        this.tmp_block_hash = this.tmp_block_detail.block_hash;
                    })
                    .catch((e) => {
                        this.$router.push({path: '/404'});
                    })
            },

            get_block_transaction_detail() {
                //获取地址的INK交易详情
                this.$fetch.api_block_info.get_block_transaction_info_data(this.block_hash)
                    .then(({data}) => {
                        this.tmp_transaction_data = data.transaction_arr.data;
                        this.tmp_ink_transaction_amount = data.transaction_arr.total;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                    })
                    .catch((e) => {
//                        this.$router.push({path: '/404'});
                    })
            },

            paginate_block(url) {
                this.$fetch.api_block_info.get_block_transaction_paginate_data(url)
                    .then(({data}) => {
                        this.tmp_transaction_data = data.transaction_arr.data;
                        this.first_page_url = data.transaction_arr.first_page_url;
                        this.next_page_url = data.transaction_arr.next_page_url;
                        this.prev_page_url = data.transaction_arr.prev_page_url;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            formatDate(timestamp) {
                return formatDate.convertTimestamp(timestamp);
            },

            distanceToNow(timestamp) {
                return formatDate.showTime(timestamp);
            },

            formatINKAmount(value) {
                return formatINKAmount.INKAmount(value);
            },

            TransformDecimalAmount(value) {
                return formatINKAmount.DifficultyAmount(value);
            }
        },

        mounted() {
            this.get_block_detail();
            this.get_block_transaction_detail();
        },

        components: {
            withSearchHeader,
            vFooter,
            Search,
        }
    }
</script>
