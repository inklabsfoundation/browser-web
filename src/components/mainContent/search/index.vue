<template>
    <div class="container search-container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
                <div class="form-group">
                    <input type="text" class="form-control search-field"
                           aria-describedby="basic-addon2"
                           placeholder="Search by Address / Txhash / Block"
                           v-on:keyup.enter="searchBlock"
                           v-model="search_text" >
                    <span v-on:click="searchBlock" class="glyphicon glyphicon-search search-icon" aria-hidden="true"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {
                search_text: '',
            }
        },

        methods: {
            get_transaction_detail() {
                //获取交易详情
                this.$fetch.api_transaction_info.get_transaction_info_data(this.search_text)
                    .then(({data}) => {
                        this.$router.push({path: '/tx/'+this.search_text});
                    })
                    .catch((e) => {
                        this.$router.push({path: '/block/'+this.search_text});
                    })
            },

            searchBlock(event) {
                if(this.search_text.length >= 34){
                    if(this.search_text.length == 34) {
                        //搜索地址
                        this.$router.push({path: '/address/'+this.search_text});
                    }else {
                        this.get_transaction_detail();
                    }
                }
            }
        },
        components: {

        }
    }
</script>
