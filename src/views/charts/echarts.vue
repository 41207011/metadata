<template>
    <section class="chart-container" style="margin-top: 10px">

        <el-row>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="业务地图" name="first">

                    <el-col :span="24">
                        <div id="chartColumn" style="width:100%;height: 600px; ;"></div>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="数据改动" name="second">
                    <el-form labelWidth="80px" style="margin-bottom: 0px;margin-left: 10px">
                        <el-form-item label="时间范围">
                            <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    align="right"
                                    @change="getTime"
                                    placeholder="选择日期范围"
                                    :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-col :span="12">
                        <el-table :data="tableData" style="height: 550px;overflow-y:auto"  id="demo1">
                            <el-table-column prop="name" label="名称">

                            </el-table-column>
                            <el-table-column prop="operator" label="修改人">

                            </el-table-column>
                            <el-table-column prop="modificationTime" label="修改时间" >

                            </el-table-column>
                            <el-table-column prop="influence" label="影响">

                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <div id="chartLine" style="width:650px; height:550px;"></div>
                    </el-col>
                </el-tab-pane>
            </el-tabs>


        </el-row>
        <!--关联信息模态框-->
        <el-dialog :title="series.name" v-model="relationShipModal" :close-on-click-modal="false" style="width: 40%;float: left;">
            <el-form>
            <el-input v-model="searchName" placeholder="搜索实体"></el-input>
            </el-form>
            <ol>
                <li>table1</li>
                <li>table12</li>
            </ol>
        </el-dialog>
    </section>

</template>

<style scoped="">
    .el-form-item{
        margin-bottom: 0px !important;
        margin-top: 10px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>

<script>
    import echarts from 'echarts'
    import {getMainTable,getMainChart} from '../../api/api'
    export default {
        data() {
            return {
                activeName2:"first",
                chartColumn: null,
                chartLine: null,
                relationShipModal:false,
                option:{
                    title: {
                        text: 'Graph关系图'
                    },
                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [

                        {
                            force: {
                                repulsion: 3000
                            },
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 60,
                            roam: true,
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            edgeSymbol: ['circle', 'arrow'],//节点形状和箭头形状
                            edgeSymbolSize: [4, 6],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            data: [{
                                name: 'erzi',
                                draggable:true
                            }, {
                                name: 'baba',
                                draggable:true
                            }, {
                                name: 'yeye',
                                draggable:true
                            }, {
                                // symbol:'image://static/image/file.png',
                                name: 'nainai',
                                draggable:true
                            }],
                            // links: [],
                            links: [ {
                                source: 'erzi',
                                target: 'baba',
                                label: {
                                    normal: {
                                        //show: true,
                                    }
                                },
                                lineStyle: {
                                    normal: { curveness:0 ,width:2,color:'#c9ced5'},
                                }
                            }, {
                                source: 'baba',
                                target: 'yeye'
                            }, {
                                source: 'baba',
                                target: 'nainai'
                            },{
                                source:'yeye',
                                target:'nainai'
                            }],
                            lineStyle: {
                                normal: {
                                    opacity: 0.9,
                                    width:2,
                                    curveness:0,
                                    color:'#c9ced5'
                                }
                            }
                        }
                    ],
                },
                option2:{
                    title: {
                        text: 'Line Chart'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['修改数量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '修改数量',
                            type: 'line',
                            stack: '总量',
                            data: []
                        }
                    ]
                },
                searchName:'',
                MyMar:'',
                series:{
                  name:'',
                },
                //元数据实时变化记录表
                tableData:[
                   /* {
                        name:'',
                        changer:'',
                        changeDate:'',
                        number:''
                    }*/
                ],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                time:'',
            }
        },

        methods: {
            handleClick(){
                if(this.activeName2==='first'){

                }
                else{
                }
            },
            setDefaultTime(){
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                let params = {startTime:start.toLocaleDateString().replace(/\//g,'-'),endTime:end.toLocaleDateString().replace(/\//g,'-')};
                getMainTable(params).then(res=>{
                    this.tableData = res.data
                })
                getMainChart(params).then(res=>{
                    let arr = [...res.data]
                    let amount = arr.map(one=>one.amount);
                    let time = arr.map(one=>one.time);
                    this.option2.xAxis.data = time;
                    this.option2.series[0].data = amount
                    this.drawLineChart()
                })
            },
            //滚动方法
            scoller(){
                try{
                if(document.getElementById('demo1')){
                    if(document.getElementById('demo1').scrollTop === document.getElementById('demo1').scrollHeight-360){
                        document.getElementById('demo1').scrollTop = 0

                    }
                    else{
                        document.getElementById('demo1').scrollTop++
                    }
                }
            }
            catch(e){
                console.log('n')
            }



            },
            scoller2(){
                let that = this;
              this.MyMar =  setInterval(()=>{that.scoller()}, 50);
            },
            //元数据实时变化表假数据生成
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title: {text: 'Column Chart'},
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                let this_ = this
                this.chartLine.setOption(this_.option2);
            },

            getTime(val){
                let startTime = val.split(' - ')[0]
                let endTime = val.split(' - ')[1]
                console.log(startTime);
                console.log(endTime);
                clearInterval(this.MyMar)
                let params = {startTime:startTime,endTime:endTime};
                getMainTable(params).then(res=>{
                    this.tableData = res.data
                })
                getMainChart(params).then(res=>{
                    let arr = [...res.data]
                    let amount = arr.map(one=>one.amount);
                    let time = arr.map(one=>one.time);
                    console.log(amount)
                    console.log(time)
                    this.option2.xAxis.data = time;
                    this.option2.series[0].data = amount
                    this.drawLineChart()
                })
            },
            getDemo(){
                let myChart = echarts.init(document.getElementById('chartColumn'));
                myChart.showLoading();
                $.ajax({
                    url: "../../../static/testdata..gexf",
                    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "xml",
                    success:function (xml) {

                        myChart.hideLoading();
                        console.log(xml)
                        var graph = echarts.dataTool.gexf.parse(xml);

                        console.log(graph)
                        var categories = [];
                        for (var i = 0; i < 9; i++) {
                            categories[i] = {
                                name: '类目' + i
                            };
                        }
                        graph.nodes.forEach(function (node) {
                            node.itemStyle = null;
                            node.value = node.symbolSize;
                            node.symbolSize /= 1.5;
                            node.label = {
                                normal: {
                                    show: node.symbolSize > 30
                                }
                            };
                            node.category = node.attributes.modularity_class;
                        });
                        let   option = {
                            title: {
                                text: 'Les Miserables',
                                subtext: 'Default layout',
                                top: 'bottom',
                                left: 'right'
                            },
                            tooltip: {},
                            legend: [{
                                // selectedMode: 'single',
                                data: categories.map(function (a) {
                                    return a.name;
                                })
                            }],
                            animationDuration: 1500,
                            animationEasingUpdate: 'quinticInOut',
                            series : [
                                {
                                    name: 'Les Miserables',
                                    type: 'graph',
                                    layout: 'none',
                                    data: graph.nodes,
                                    links: graph.links,
                                    categories: categories,
                                    roam: true,
                                    focusNodeAdjacency: true,
                                    itemStyle: {
                                        normal: {
                                            borderColor: '#fff',
                                            borderWidth: 1,
                                            shadowBlur: 10,
                                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                                        }
                                    },
                                    label: {
                                        position: 'right',
                                        formatter: '{b}'
                                    },
                                    lineStyle: {
                                        color: 'source',
                                        curveness: 0.3
                                    },
                                    emphasis: {
                                        lineStyle: {
                                            width: 10
                                        }
                                    }
                                }
                            ]
                        };

                        myChart.setOption(option);

                    }
                });
            },

        },

        mounted: function () {
          /*  this.drawCharts()*/
            this.setDefaultTime()
            this.getDemo()
        },
        updated: function () {
            if(document.getElementById('demo1')){
                this.scoller2()
            }
        },
        beforeDestroy:function(){
            clearInterval(this.MyMar)
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
