<template>
    <div id="J-main-content" class="main-content">
        <h-header></h-header>
        <div class="pageContent">
            <search></search>
            <div class="statisticsContent">
                <div class="container">
                    <div class="row item-box">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="item item-1">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <img class="icon-svg" src="../../assets/images/svg/Icon_qukuaigaodu.svg" alt="ICON">
                                    </div>
                                    <div class="col-xs-7 col-xs-offset-1">
                                        <p class="text-box">
                                            <span class="num" v-text="tmp_block_height"></span>
                                            <span class="tendency">
                                                <span class="glyphicon glyphicon-chevron-up icon-up" aria-hidden="true"></span>
                                            </span>
                                        </p>
                                        <p class="text">Block Height</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="item item-2">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <img class="icon-svg" src="../../assets/images/svg/Icon_jiedianshu.svg" alt="ICON">
                                    </div>
                                    <div class="col-xs-7 col-xs-offset-1">
                                        <p class="text-box">
                                            <span class="num" v-text="tmp_transaction_account"></span>
                                            <span class="tendency">
                                                <span class="glyphicon glyphicon-chevron-up icon-up" aria-hidden="true"></span>
                                            </span>
                                        </p>
                                        <p class="text">All Transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="item item-3">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <img class="icon-svg" src="../../assets/images/svg/Icon_zhibidizhishu.svg" alt="ICON">
                                    </div>
                                    <div class="col-xs-7 col-xs-offset-1">
                                        <p class="text-box">
                                            <span class="num" v-text="tmp_address_account"></span>
                                            <!--<span class="num">30021</span>-->
                                            <span class="tendency">
                                                <span class="glyphicon glyphicon-chevron-up icon-up" aria-hidden="true"></span>
                                            </span>
                                        </p>
                                        <p class="text">Addresses</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="item item-4">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <img class="icon-svg" src="../../assets/images/svg/Icon_jujia.svg" alt="ICON">
                                    </div>
                                    <div class="col-xs-7 col-xs-offset-1">
                                        <p class="text-box">
                                            <span class="num" v-text="tmp_price_account"></span>
                                            <span class="tendency">
                                                <span class="glyphicon glyphicon-chevron-up icon-up" aria-hidden="true"></span>
                                            </span>
                                        </p>
                                        <p class="text">Price</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chartContent">
                <chart></chart>
            </div>
            <div class="recentTransactionContent">
                <transaction :transaction-data="tmp_transaction_data"></transaction>
            </div>
            <div class="recentBlockContent">
                <recent-block :block-data="tmp_block_data"></recent-block>
            </div>

            <div class="holderContent">
                <holder :holder-data="tmp_holder_data" :current-holder-page="tmp_holder_current_page"></holder>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<style>
    .recentBlockContent, .recentTransactionContent {
        overflow-x: auto;
    }
</style>
<script type="text/javascript">
    import hHeader from '../../components/mainContent/header/index.vue';
    import vFooter from '../../components/mainContent/footer/index.vue';
    import Search from '../../components/mainContent/search/index.vue';
    import Chart from '../../components/mainContent/charts/index.vue';
    import Transaction from '../../components/mainContent/recent_transaction/index.vue';
    import RecentBlock from '../../components/mainContent/recent_block/index.vue';
    import Holder from '../../components/mainContent/holders/index.vue';

    export default{
        name: 'page_content',
        data() {
            return {
                tmp_block_height: '',
                tmp_transaction_account: '',
                tmp_address_account: '',
                tmp_price_account: '',
                tmp_holder_current_page: 1,

                tmp_transaction_data: [],
                tmp_holder_data: [],
                tmp_block_data: [],

                tmp_interval: '',
            }
        },

        created() {
            this.get_block_height();
            this.get_transaction_amount();
            this.get_address_amount();
            this.get_price_amount();
            this.get_transaction_data();
            this.get_block_data();
            this.get_holders_data();
        },

        methods: {
            get_block_height() {
                try {
                    this.tmp_block_height = window.latest_block_obj.block_height;
                }catch (e){
                    this.$fetch.api_block_info.get_block_height_data()
                        .then(({data}) => {
                            this.tmp_block_height = data.block_obj.block_height;
                        })
                        .catch((e) => {
                            console.log('get data failed');
                        })
                }
            },

            get_transaction_amount() {
                this.$fetch.api_transaction_info.get_transaction_amount_data()
                    .then(({data}) => {
                        this.tmp_transaction_account = data.transaction_amount;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            get_address_amount() {
                this.$fetch.api_address_info.get_address_amount_data()
                    .then(({data}) => {
                        this.tmp_address_account = data.address_amount;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            get_price_amount() {
                this.$fetch.api_other_info.get_price_amount_data()
                    .then(({data}) => {
                        this.tmp_price_account = '$'+ parseFloat(data.ticker_obj.price_usd).toFixed(2);
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            get_transaction_data() {
                this.$fetch.api_transaction_info.get_transaction_data()
                    .then(({data}) => {
                        this.tmp_transaction_data = data.transaction_arr.data;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            get_block_data() {
                this.$fetch.api_block_info.get_block_data()
                    .then(({data}) => {
                        this.tmp_block_data = data.block_obj_arr.data;
                    })
                    .catch((e) => {
                            console.log('get data failed');
                    })
            },

            get_holders_data() {
                this.$fetch.api_holder_info.get_holder_data()
                    .then(({data}) => {
                        this.tmp_holder_current_page = data.address_obj_arr.current_page;
                        this.tmp_holder_data = data.address_obj_arr.data;
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },
        },

        mounted() {
            var that = this;
            //刷新数据，每5秒钟请求一次数据
            that.tmp_interval = window.setInterval(function() {
                that.get_block_height();
                that.get_transaction_amount();
                that.get_address_amount();
                that.get_price_amount();
                that.get_transaction_data();
                that.get_block_data();
//                that.get_holders_data();
            }, 5000);
        },

        beforeDestroy() {
            window.clearInterval(this.tmp_interval);
        },

        components: {
            hHeader,
            vFooter,
            Search,
            Chart,
            Transaction,
            RecentBlock,
            Holder
        }
    }
</script>
