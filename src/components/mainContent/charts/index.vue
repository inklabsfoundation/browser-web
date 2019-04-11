<template>
    <div class="container chart-container">
        <div class="col-xs-12 chart-box">
            <div class="content">
                <div id="main" style="width: 100%;height:244px;"></div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import echarts from 'echarts';

    export default {
        data() {
            return {
                tmp_days_ary: [],
                tmp_data_ary: [],
                tmp_chart_interval: '',
            }
        },

        created() {
            this.get_days_chart_data();
        },

        methods: {
            transformDate(str) {
                var pattern = /(\d{4})(\d{2})(\d{2})/;
                var format_date = str.replace(pattern, '$2-$3');
                return format_date;
            },
            get_days_chart_data() {
                var that = this;
                that.tmp_days_ary = [];
                that.tmp_data_ary = [];
                that.$fetch.api_other_info.get_days_chart_data()
                    .then(({data}) => {
                        _(data.transaction_amount_arr).forEach(function(transaction) {
                            that.tmp_days_ary.push(that.transformDate(transaction.dates));
                            that.tmp_data_ary.push(transaction.amount);
                        });
                        that.initChart();
                    })
                    .catch((e) => {
                        console.log('get data failed');
                    })
            },

            initChart() {
                var that  = this;
                var my_chart = echarts.init(document.getElementById('main'));
                var option = {
                    title: {
                        text: '14 Days INK Transaction History',
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '14'
                        }
                    },
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '14'
                    },

                    xAxis: {
                        type: 'category',
                        color: '#fff',
                        boundaryGap: false,
                        data: that.tmp_days_ary,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [{
                        data: that.tmp_data_ary,
                        smooth: true,
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: "#204662",
                            }
                        },
                        itemStyle : {
                            normal : {
                                color:'#6dbeff',  //圈圈的颜色
                                lineStyle:{
                                    color:'#6dbeff'  //线的颜色
                                }
                            }
                        },
                    }]
                };

                my_chart.setOption(option);
            },
        },

        mounted() {
            var that = this;
            //刷新数据，每5秒钟请求一次数据
            that.tmp_chart_interval = window.setInterval(function() {
                that.get_days_chart_data();
            }, 5000);
        },

        beforeDestroy() {
            window.clearInterval(this.tmp_chart_interval);
        },

        components: {

        }
    }
</script>
