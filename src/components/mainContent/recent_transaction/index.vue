<template>
    <div class="container transaction-container">
        <div class="col-xs-12 transaction-box">
            <div class="content">
                <div class="title-box">
                    <span class="pull-left title">Latest Transactions</span>
                    <router-link :to="{name: 'inkTransaction'}" tag="span" class="pull-right check">
                        View all
                        <img class="icon-svg" src="../../../assets/images/svg/icon_right.svg" alt="Check">
                    </router-link>
                </div>
                <div class="table-box">
                    <table class="table">
                        <thead>
                            <tr class="table-th-tr">
                                <td class="table-th-td">No.</td>
                                <td class="table-th-td">Transaction ID</td>
                                <td class="table-th-td">
                                    <span style="position:relative;top:-6px">Amount(INK)</span>
                                    <img class="icon-svg" src="../../../assets/images/svg/icon_ink.svg" alt="ICON">
                                </td>
                                <td class="table-th-td">Block Height</td>
                                <td class="table-th-td">Timestamp</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(transaction, index) in transactionData" class="table-tb-tr">
                                <td class="table-tb-td" v-text="index+1"></td>
                                <td class="table-tb-td" style="cursor: pointer;">
                                    <router-link :to="'/tx/'+transaction.tx_id" tag="span">
                                        <span v-text="transaction.tx_id"></span>
                                    </router-link>
                                </td>
                                <td class="table-tb-td"style="">
                                    <span class="erc20-value" v-text="formatINKAmount(transaction.erc20_value)"></span>
                                </td>
                                <td class="table-tb-td" v-text="transaction.block_height"></td>
                                <td class="table-tb-td">
                                    <span class='time' style="display:inline-block;width: 100px;">
                                        <span v-text="formatDate(transaction.block_time)"></span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .transaction-container {
        min-width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-scrolling: touch;
        -o-overflow-scrolling: touch;
        -moz-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
</style>
<script>
    import formatDate from '../../../common/tools/format_date'
    import formatINKAmount from '../../../common/tools/transform_amount'

    export default {
        props: {
            transactionData: {type: Array, required: false},
        },

        data() {
            return {

            }
        },

        created() {

        },

        methods: {
            formatDate(timestamp){
                return formatDate.showTime(timestamp);
            },

            formatINKAmount(value) {
                return formatINKAmount.INKAmount(value);
            }
        },

        mounted: function () {
            this.$nextTick(function () {
            });
        },

        components: {

        }
    }
</script>
