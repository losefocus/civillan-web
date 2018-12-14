<template>
    <div style="width: 100%;height: 100%;">
        <div class="device_tit">
            <i class="iconfont icon-quanbushebei"></i>
            设备统计
        </div>
        <div id="device"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
import panel from '@/api/panel/index'

export default {
    data(){
        return{
            option:{
                color:['#53A8E2','#0574C0'],
                legend: {
                    show:true,
                    left:15,
                    top:10,
                    textStyle:{
                        color:'#DEE1F3'
                    }
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '2%',
                    top:'60',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    // nameTextStyle:{
                    //     color:'#fff'
                    // },
                    axisLine:{
                        lineStyle:{
                            color:'#C1C5DB',
                            width:0
                        }
                    },
                    axisTick:{
                        lineStyle:{
                            width:0
                        }
                    },
                    
                    data: ['其他','水泥发泡机','喷凝养护','压浆','张拉','泡沫混凝土','高压旋喷','搅拌桩']
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#C1C5DB',
                            width:0
                        }
                    },
                    axisTick:{
                        lineStyle:{
                            width:0
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            opacity:0.2
                        }
                    },
                },
                series: [
                    {
                        name: '设备总数',
                        type: 'bar',
                        barWidth:'30%',
                        label:{
                            show:true,
                            position: 'top',
                            color:'#fff'
                        },
                        data: [60, 35, 60, 30, 20, 65,80,90]
                    },
                    {
                        name: '在线设备',
                        type: 'bar',
                        barGap: 0,
                        barWidth:'30%',
                        label:{
                            show:true,
                            position: 'top',
                            color:'#fff'
                        },
                        data: [70, 25, 90, 50, 70, 25,90,50]
                    },
                    
                ]
            }
        }
    },
    components:{
        
    },
    created(){

    },
    mounted(){
        this.init()
        this.getDevice()
    },
    methods:{
        init(){
            this.myChart = echarts.init(document.getElementById('device'));
            this.getDevice();
        },
        getDevice(){
            panel.count({projectId:this.$cookies.get('panel_id')}).then(res => {
                let data_xAxis = [],data_1=[],data_2=[]
                for (let key in res.result.all) {
                    data_xAxis.push(key);
                    data_1.push(res.result.all[key]);
                }
                for (let key in res.result.online) {
                    data_2.push(res.result.online[key]);
                }

                // data_xAxis.forEach(r => {
                //     if(r in res.result.online){
                //         data_2.push(res.result.online[r])
                //     }else{
                //         data_2.push(null)
                //     }
                // })

                this.option.xAxis.data = data_xAxis
                this.option.series= [
                    {
                        name: '设备总数',
                        type: 'bar',
                        barWidth:'30%',
                        label:{
                            show:true,
                            position: 'top',
                            color:'#fff'
                        },
                        data: data_1
                    },
                    {
                        name: '在线设备',
                        type: 'bar',
                        barGap: 0,
                        barWidth:'30%',
                        label:{
                            show:true,
                            position: 'top',
                            color:'#fff'
                        },
                        data: data_2
                    },
                    
                ]
                this.myChart.setOption(this.option);
            })
        }
    },
    watch:{

    }
}
</script>
<style scoped>
#device{
    width: 100%;
    height: calc(100% - 28px);
}
.device_tit{
    font-size:20px;
    font-weight:600;
    line-height:28px;
    height: 28px;
}
.icon-quanbushebei{
    font-size:20px;
    font-weight:100;
    padding-right:20px;
}
</style>
