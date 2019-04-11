<template>
    <div class="container transaction-container holders-container">
        <div class="col-xs-12 transaction-box">
            <div class="content">
                <div class="title-box">
                    <span class="pull-left title">Holders</span>
                    <router-link :to="{name: 'inkHolders'}" tag="span" class="pull-right check">
                        View all
                        <img class="icon-svg" src="../../../assets/images/svg/icon_right.svg" alt="Check">
                    </router-link>
                </div>
                <div class="table-box">
                    <table class="table">
                        <thead>
                        <tr class="table-th-tr">
                            <td class="table-th-td">Rank</td>
                            <td class="table-th-td">Address</td>
                            <td class="table-th-td">
                                <span style="position:relative;top:-6px">Amount(INK)</span>
                                <img class="icon-svg" src="../../../assets/images/svg/icon_ink.svg" alt="ICON">
                            </td>
                            <td class="table-th-td">Percentage</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(holder, index) in holderData" class="table-tb-tr">
                            <td class="table-tb-td" v-text="index+1 + (currentHolderPage-1) * 10"></td>
                            <td class="table-tb-td" style="cursor: pointer;">
                                <router-link :to="'/address/'+holder.address_qtum" tag="span">
                                    <span v-text="holder.address_qtum"></span>
                                </router-link>
                            </td>
                            <td class="table-tb-td">
                                <span class="erc20-value" v-text="formatINKAmount(holder.erc20_balance)"></span>
                            </td>
                            <td class="table-tb-td" v-text="(formatINKAmount(holder.erc20_balance)/1000000000*100).toFixed(2) + '%'"></td>
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
    import formatINKAmount from '../../../common/tools/transform_amount'

    export default {
        props: {
            holderData: {type: Array, required: false},
            currentHolderPage : {type: Number, required: false}
        },

        data() {
            return {

            }
        },

        created() {

        },

        methods: {
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
