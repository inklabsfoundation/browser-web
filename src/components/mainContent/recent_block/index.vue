<template>
    <div class="container recent-block-container" v-cloak>
        <div class="col-xs-12 recent-block-box">
            <div class="content">
                <div class="title-box">
                    <span class="pull-left title">Latest Blocks</span>
                    <router-link :to="{name: 'inkBlock'}" tag="span" class="pull-right check">
                        View all
                        <img class="icon-svg" src="../../../assets/images/svg/icon_right.svg" alt="Check">
                    </router-link>
                </div>
                <div class="line"></div>
                <!--<p class="today">TODAY</p>-->
                <div v-for="(block, index) in blockData" class="row block-box">
                    <div :class="'col-xs-2 time-box time-box-' + index">
                        <p class="seconds">
                            <span v-text="'Block ' + block.block_height"></span>
                        </p>
                        <p class="time" v-text="formatDate(block.block_time)"></p>
                    </div>
                    <div class="col-xs-10 details-box">
                        <span class="hash-box box">
                            <router-link :to="'/block/'+block.block_hash" tag="span">
                                <span class="title">Block hash:</span>
                                <span class="hash-id" v-text="block.block_hash"></span>
                            </router-link>
                        </span>
                        <span class="money-box box">
                            <span class="title">TXs (INK):</span>
                            <span class="num" v-text="block.transaction_obj_arr.length"></span>
                        </span>
                        <span class="block-size-box box">
                            <span class="title">Block Size:</span>
                            <span class="num" v-text="block.block_size"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .recent-block-container {
        min-width: 1080px;
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

    export default {
        props: {
            blockData: {type: Array, required: false},
        },

        data() {
            return {

            }
        },

        methods: {
            formatDate(timestamp){
                return formatDate.showTime(timestamp);
            },

            transformTimestamp(timestamp) {
                return formatDate.convertTimestamp(timestamp)
            }

        },

        components: {

        }
    }
</script>
