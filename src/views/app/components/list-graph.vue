<template>
<div>
    <b-row>

                <b-col lg="3" md="3" sm="3" v-for="item in datae" :key="item.name">

                    <b-card class="card-icon text-center mb-30 " style="margin-bottom: 10px">
                        <!--<i class="i-Data-Upload"></i>-->

                        <p class="text-muted mt-2 mb-2">{{item.name}}</p> <!--{{$t('veh_ins')}}-->
                        <p class="text-primary text-24 line-height-1 m-0">{{item.value}}</p>
                    </b-card>

                </b-col>
    </b-row>

    <br>

    <b-row style="margin-top:10px">
        <b-col lg="8" md="12" sm="12">
            <b-card class=" mb-30">
                <h4 class="card-title m-0">{{$t(name_graph)}}</h4>
                <div class="chart-wrapper" style="height: 300px ; width:100% ">
                    <v-chart
                            id="echartbar"
                            :options="echartBar"
                            :autoresize="true"
                    ></v-chart>
                </div>
            </b-card>
        </b-col>


        <b-col col lg="4" md="12" sm="12">
            <b-card class=" mb-30">
                <h4 class="card-title m-0"></h4>
                <div class="chart-wrapper" style="height: 300px ; width:100%">
                    <v-chart :options="echartPie" :autoresize="true"></v-chart>
                </div>
            </b-card>
        </b-col>
    </b-row>


</div>
</template>
<script>

    export default{

        display: "ListGraph",
        props:{
            name_graph:String,
            datae:Array,
            listhisto:Array,
            abcis:Array,
        },
        computed:{
            chartData: function() {
                return this.datae;
            },
            chartHistData:function(){
                return this.listhisto;
            }
        },
        updated(){
            this.renderPieChart()
            this.renderHistChart()
            console.log('chartData1')
        },

        data(){
            return {
                emphasis:{},
                dark_heading :"#c2c6dc",

                echartPie:{

                        color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
                        tooltip: {
                            show: true,
                            backgroundColor: 'rgba(0, 0, 0, .8)'
                        },
                        series:[{
                            name: this.name_graph,
                            type: 'pie',
                            radius: '50%',
                            center: '50%',
                            data: this.datae,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                },
                echartBar:{

                    legend: {
                        borderRadius: 0,
                        orient: 'horizontal',
                        x: 'right',
                    },
                    grid: {
                        left: '8px',
                        right: '8px',
                        bottom: '0',
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
                        backgroundColor: 'rgba(0, 0, 0, .8)'
                    },
                    xAxis: [{

                        type: 'category',
                        data: ['ta tete', 'Fev', 'Mars', 'Avril', 'Mai', 'Jun', 'Jul', 'Aout','Sep','Oct','Nov','Dec'],
                        axisTick: {
                            alignWithLabel: true,

                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            color: this.dark_heading,
                        },
                        axisLine: {
                            show:true,
                            color: this.dark_heading,

                            lineStyle: {
                                color: this.dark_heading,

                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            color: this.dark_heading,
                            formatter: '${value}'
                        },
                        axisLine: {
                            show:false,
                            color: this.dark_heading,

                            lineStyle: {
                                color: this.dark_heading,

                            }
                        },
                        min: 0,
                        max: 10,
                        interval: 10/4,

                        splitLine: {
                            show: true,
                            interval: 'auto'
                        }
                    }],


                    series: [
                        {
                            data: this.listhisto,
                            label: { show: false, color: '#639' },
                            type: 'bar',
                            color: '#7569b3',
                            smooth: true,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: -2,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            }
                        }

                    ]}
            }
        },

        methods:{

            renderPieChart: function() {

                this.echartPie.color = ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af']
                this.echartPie.tooltip = {show: true,backgroundColor: 'rgba(0, 0, 0, .8)'}

                this.emphasis = {shadowBlur: 10,shadowOffsetX: 0,shadowColor: 'rgba(0, 0, 0, 0.5)'}


                this.echartPie.series = [
                    {name: this.name_graph,
                        type: 'pie',
                        radius: '50%',
                        center: '50%',
                        data: this.chartData,
                    itemStyle:{emphasis:this.emphasis} }]

                console.log('item',this.echartPie)

                return this.echartPie
            },
            renderHistChart:function() {

                this.legend = {borderRadius: 0, orient: 'horizontal', x: 'right'}
                this.grid = {left: '8px', right: '8px', bottom: '0', containLabel: true}

                this.xAxis = [{

                    type: 'category',
                    data: this.abcis,
                    axisTick: {
                        alignWithLabel: true,

                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: this.dark_heading,
                    },
                    axisLine: {
                        show: true,
                        color: this.dark_heading,

                        lineStyle: {
                            color: this.dark_heading,

                        }
                    }
                }],
                    this.yAxis = [{
                        type: 'value',
                        axisLabel: {
                            color: this.dark_heading,
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: false,
                            color: this.dark_heading,

                            lineStyle: {
                                color: this.dark_heading,

                            }
                        },
                        min: 0,
                        max: 100,
                        interval: 25,

                        splitLine: {
                            show: true,
                            interval: 'auto'
                        }
                    }]
                this.series = [
                    {
                        data: this.listhisto,
                        label: {show: false, color: '#639'},
                        type: 'bar',
                        color: '#7569b3',
                        smooth: true,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: -2,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }

                ],
                    this.echartBar.legend = this.legend
                this.echartBar.grid = this.grid
                this.echartBar.xAxis = this.xAxis
                this.echartBar.yAxis = this.yAxis
                this.echartBar.series = this.series

                return this.echartBar
            }
        },
        watch: {
            data: function() {
                this._chart.destroy();
                this.renderPieChart();
                this.renderHistChart();
            }
        }
    }
</script>
<style scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>