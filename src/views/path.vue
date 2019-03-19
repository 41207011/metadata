<template>
    <el-row :gutter="250" style="   margin-left: 0px !important;
            margin-right: 0px !important;top:20%" >
        <el-col>
            <div style="padding: 14px;    font-weight: bold;
    color: lightblue;
    font-style: italic;">
                <span>选择您要进入的系统：</span>
            </div>
        </el-col>
        <el-col :span="8">

            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="testCard" >
                <div  @click="aaa">
                    <img src="../../static/image/aaa.png" class="image">
                    <div style="padding: 14px;text-align: center">
                        <span>元数据管理</span>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover" class="testCard">
                <div  @click="bbb">
                    <img src="../../static/image/logo_new.png" class="image">
                    <div style="padding: 14px;text-align: center">
                        <span>数据湖</span>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover" class="testCard">
                <div @click="ccc">
                <img src="../../static/image/ccc.png" class="image">
                <div style="padding: 14px;text-align: center">
                    <span>BI系统</span>
                </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>


<style scoped>

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .testCard{
        transition:  transform 2s;
        cursor: pointer;
    }
    .testCard:hover{
        transform: scale(1.1);
    }
</style>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            aaa(){
                var open;
                window.open('http://192.168.24.246:7070/#/home')
            },
            bbb(){
                var open;
                window.open("http://192.168.23.125:8400")
            },
            ccc(){
                var open;
                window.open("http://192.168.23.40:8440")
            },

        },
        mounted() {
        }
    }
</script>
