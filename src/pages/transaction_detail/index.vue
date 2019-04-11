<template>
    <div id="J-main-content" class="main-content transaction-detail-page">
        <with-search-header></with-search-header>
        <div class="pageContent">
            <search class="hidden-md hidden-lg"></search>
            <div class="container transaction-detail-container">
                <div class="col-xs-12 transaction-detail-box">
                    <div class="content">
                        <div class="title-box">
                            <img class="icon-svg" src="../../assets/images/svg/icon_transactions.svg" alt="ICON">
                            <span class="title">Transaction</span>
                        </div>
                        <div class="transaction-id-box row">
                            <span class="tx-id">
                                <div class="col-xs-2">
                                    TX ID:
                                </div>
                                <div class="col-xs-10">
                                    <span v-text="tx_id" style="word-break: break-all;"></span>
                                </div>
                            </span>
                        </div>

                        <div class="details-container" v-if="tmp_transaction_detail != ''">
                            <div class="row details-box">
                                <div class="row details-box">
                                    <div class="col-xs-12 col-md-2 col-sm-3  title">Block Height: </div>
                                    <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_transaction_detail.block_obj.block_height"></div>
                                </div>
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Block Hash:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" style="cursor: pointer;">
                                    <router-link :to="'/block/' + tmp_transaction_detail.block_hash" tag="span">
                                        <span class="hash-id block-hash" v-text="tmp_transaction_detail.block_hash" style="word-break: break-all;"></span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12  col-md-2 col-sm-3 title">From:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" style="cursor: pointer;">
                                    <router-link :to="'/address/' + tmp_transaction_detail.erc20_transaction_obj.sender_address_qtum" tag="span">
                                        <span class="hash-id address-hash" v-text="tmp_transaction_detail.erc20_transaction_obj.sender_address_qtum"></span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">To:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" style="cursor: pointer;">
                                    <router-link :to="'/address/' + tmp_transaction_detail.erc20_transaction_obj.receiver_address_qtum" tag="span">
                                        <span class="hash-id address-hash" v-text="tmp_transaction_detail.erc20_transaction_obj.receiver_address_qtum"></span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Value:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_value + ' '+tmp_symbol"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Fee:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_fee + ' Qtum'"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Timestamp:</div>
                                <div class="col-xs-12 col-md-10 col-sm-9 text" v-text="tmp_timestamp"></div>
                            </div>
                            <div class="row details-box">
                                <div class="col-xs-12 col-md-2 col-sm-3 title">Confirmations:</div>
                                <div v-if="computed_latest_block_height-tmp_transaction_detail.block_obj.block_height>0" class="col-xs-12 col-md-10 col-sm-9 text" v-text="computed_latest_block_height-tmp_transaction_detail.block_obj.block_height"></div>
                                <div v-else class="col-xs-12 col-md-10 col-sm-9 text red">UNCONFIRMED!!!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style>

</style>
<script type="text/javascript">
    import withSearchHeader from '../../components/mainContent/with_search_header/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';
    import formatDate from '../../common/tools/format_date'
    import formatAmount from '../../common/tools/transform_amount'

    export default {
        name: 'page_content',

        data() {
            return {
                tx_id: this.$route.params.tx_id,
                tmp_transaction_detail: '',
                tmp_value: 0,
                tmp_fee: 0,
                tmp_timestamp: '',
                tmp_symbol: '',
            }
        },
        computed: {
            computed_latest_block_height(){
                if(typeof window.latest_block_obj == 'undefined'){
                    return tmp_transaction_detail.block_obj.block_height;
                }
                return window.latest_block_obj.block_height;
            }
        },


        created() {},

        methods: {
            get_transaction_detail() {
                //获取交易详情
                this.$fetch.api_transaction_info.get_transaction_info_data(this.tx_id)
                    .then(({data}) => {
                        this.tmp_transaction_detail = data.transaction_obj;
                        this.tmp_value = formatAmount.INKAmount(this.tmp_transaction_detail.erc20_transaction_obj.erc20_value);
                        this.tmp_fee = formatAmount.QTUMAmount(this.tmp_transaction_detail.total_fee.toString());
                        this.tmp_symbol = this.tmp_transaction_detail.erc20_transaction_obj.erc20_symbol;
                        this.tmp_timestamp = formatDate.convertTimestamp(this.tmp_transaction_detail.block_obj.block_time);
//                        if(this.tmp_transaction_detail.erc20_transaction_obj == null){
//                            this.$router.push({path: '/404'});
//                        }
                    })
                    .catch((e) => {
                        this.$router.push({path: '/404'});
                    })
            }
        },

        mounted() {
            this.$nextTick(()=>{
                this.get_transaction_detail();
            });
        },

        components: {
            withSearchHeader,
            vFooter,
            Search,
        }
    }
</script>
