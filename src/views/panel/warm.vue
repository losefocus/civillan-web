<template>
    <div style="width: 100%;height: 100%;">
        <div class="warm_tit">
            <i class="iconfont icon-alarm1"></i>
            预警分布
        </div>
        <div id="warm"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
import panel from '@/api/panel/index'

export default {
    
    data(){
        return{
            myChart:null,
            option:{
                color:['#034D80','#0061A4','#0574C0','#329AE2','#55BAFF','#89CFFF','#76DDFB','#DBECF8','#A6E2F4',],
                legend: {
                    bottom: 0,
                    left: 'center',
                    textStyle:{
                        color:'#fff'
                    }
                },
                series : [
                    {
                        name:'预警分布',
                        type:'pie',
                        radius : '55%',
                        selectedMode: 'single',
                        label:{
                            formatter(v) {
                                let text = Math.round(v.percent)+'%' + '' + v.name
                                if(text.length <= 6){
                                    return text;
                                }else if(text.length > 6 && text.length <= 16){
                                    return text = `${text.slice(0,6)}\n${text.slice(6)}`
                                }else if(text.length > 16 && text.length <= 24){
                                    return text = `${text.slice(0,6)}\n${text.slice(6,16)}\n${text.slice(16)}`
                                }else if(text.length > 24 && text.length <= 30){
                                    return text = `${text.slice(0,6)}\n${text.slice(6,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                                }else if(text.length > 30){
                                    return text = `${text.slice(0,6)}\n${text.slice(6,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                                }
                            },
                            color:'#fff',
                            align: 'left',
                        },
                        labelLine: {
                            lineStyle:{
                                color:'#fff',
                                width:1
                            }
                        },
                        center: ['50%', '45%'],
                        data: [],
                    },
                ]
            },
            i:0
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
            this.myChart = echarts.init(document.getElementById('warm'));
            this.getWarm();
        },
        getWarm(){
            panel.warm({projectId:this.$cookies.get('panel_id')}).then(res => {
                let data = res.result
                this.option.series[0].data = data.map(r => {
                    return {name:r._id,value:r.count}
                })
                this.myChart.setOption(this.option);
            })
        }
    },
    watch:{

    }
}
</script>
<style scoped>
#warm{
    width: 100%;
    height: 100%;
}
.warm_tit{
    font-size:20px;
    font-weight:600;
    line-height:28px;
    height: 28px;
    position: absolute;
    top: 20px;
    left:25px;
}
.icon-alarm1{
    font-size:20px;
    font-weight:100;
    padding-right:20px;
}
</style>
