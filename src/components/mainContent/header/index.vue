<template>
    <div id="header-container" class="navbar navbar-fixed-top header-container">
        <div class="header-content clearfix">
            <div class="navbar-header" style="width: 100%;">
                <a href="/" class="navbar-brand logo">
                    <img src="../../../assets/images/svg/logo_title.svg" alt="LOGO">
                </a>
                <span class="date-text hidden-xs" v-text="format"></span>
            </div>
            <!--<div class="navbar-collapse collapse header-ul-box" role="navigation" aria-expanded="false" style="height: 1px;">-->
                <!--<ul class="nav navbar-nav">-->
                    <!--<li class="dropdown" style="cursor: pointer;">-->
                        <!--<ul class="dropdown-menu sub-menu" style="background: rgb(238, 238, 238);">-->
                            <!--<li><a class="header-language header-link" href="{!! url_secure('/locale/zh-CN') !!}">中文/CH</a></li>-->
                            <!--<li><a class="header-language header-link" href="{!! url_secure('/locale/en') !!}">English/EN</a></li>-->
                            <!--<li><a class="header-language header-link" href="{!! url_secure('/locale/ja') !!}">日本語/JA</a></li>-->
                            <!--<li><a class="header-language header-link" href="{!! url_secure('/locale/ko') !!}">한국어/KO</a></li>-->
                        <!--</ul>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                Y: '',
                M: '',
                D: '',
                h: '',
                m: '',
                s: '',
                format: '',
            }
        },

        methods: {
            formatDate: function() {
                let date = new Date(Date.now());
                this.Y = date.getFullYear() + '.';
                this.M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                this.D = date.getDate() + '. ';
                this.h = date.getHours() + '.';
                this.m = date.getMinutes() + ' ';
                this.s = date.getSeconds() + '\'';
                this.format = this.Y + this.M + this.D + this.h + this.m + this.s;
            }
        },

        mounted() {
            var that = this;
            window.setInterval(function() {
                that.formatDate();
            }, 1000);
        }
    }
</script>
