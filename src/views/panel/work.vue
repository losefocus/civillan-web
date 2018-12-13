<template>
    <div style="width: 100%;height: 100%;">
        <div class="work_tit">
            <i class="iconfont icon-zuoyechengxiao"></i>
            作业统计
        </div>
        <div id="work"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
export default {
    data(){
        return{
            
        }
    },
    components:{
        
    },
    created(){

    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.myChart = echarts.init(document.getElementById('work'));
            this.myChart.setOption({
                color:['#53A8E2'],
                grid: {
                    left: '2%',
                    right: '3%',
                    bottom: '2%',
                    top:'5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
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
                    splitLine:{
                        lineStyle:{
                            opacity:0.2
                        }
                    },
                },
                yAxis: {
                    type: 'category',
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
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        label:{
                            show:true,
                            position: 'right',
                            color:'#fff'
                        },
                        barWidth:'45%',
                        data: [70, 25, 90, 50, 70, 25,90,50]
                    },
                ]
            });
        }
    },
    watch:{

    }
}
</script>
<style scoped>
#work{
    width: 100%;
    height: calc(100% - 28px);
}
.work_tit{
    font-size:20px;
    font-weight:600;
    line-height:28px;
    height: 28px;
}
.icon-zuoyechengxiao{
    font-size:20px;
    font-weight:100;
    padding-right:20px;
}
</style>
