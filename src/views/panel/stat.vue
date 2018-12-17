<template>
    <div style="width: 100%;height: 100%;">
        <div class="bg" style="height:290px;padding:20px 25px">
            <div class="stat_tit">
                <i class="iconfont icon-alarm2"></i>
                统计概况
            </div>
            <div style="height:90px;display:flex;justify-content: center;align-items:center">
                <div class="pull-left count">
                    <div>设备总数</div>
                    <div><span class="sum">300</span>台</div>
                </div>
                <div class="pull-left line_"></div>
                <div class="pull-left count">
                    <div>在线数量</div>
                    <div><span class="sum">250</span>台</div>
                </div>
            </div>
            <div style="line-height:26px;font-size:14px;">
                <div class="clearfix" style="border-bottom:1px solid #CED2E8;padding-bottom:5px">
                    <div class="pull-left name_d">标段名称</div>
                    <div class="pull-right sum_d" style="font-size:14px">在线设备/总数(台)</div>
                </div>
                <div class="clearfix" style="margin-top:10px;">
                    <div class="pull-left name_d">联络线01标段</div>
                    <div class="pull-right sum_d"><b>200</b> / 600</div>
                </div>
                <div class="clearfix" style="margin-top:10px;">
                    <div class="pull-left name_d">联络线01标段</div>
                    <div class="pull-right sum_d"><b>200</b> / 600</div>
                </div>
                <div class="clearfix" style="margin-top:10px;">
                    <div class="pull-left name_d">联络线01标段</div>
                    <div class="pull-right sum_d"><b>200</b> / 600</div>
                </div>
                <div class="clearfix" style="margin-top:10px;">
                    <div class="pull-left name_d">联络线01标段</div>
                    <div class="pull-right sum_d"><b>200</b> / 600</div>
                </div>
                
            </div>
        </div>
        <div class="bg" style="height:110px;margin-top:20px">

        </div>
    </div>
</template>
<script>
import panel from '@/api/panel/index'
import {formatDate} from '@/common/formatDate.js';

export default {
    props:['interval'],
    data(){
        return{
            list:[]
        }
    },
    components:{
        
    },
    filters: {
        filterDate(time){
            let date = new Date(parseInt(time));
            return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
        }
    },
    created(){

    },
    mounted(){
        this.getList()
    },
    methods:{
        getList(){
            panel.alarm({projectId:this.$route.query.id}).then(res => {
                this.list = res.result
            })
        }
        
    },
    watch:{

    }
}
</script>
<style scoped>
.clearfix::after{
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
.pull-left{
    float: left
}
.pull-right{
    float: right
}
.bg{
    background: rgba(31,44,64,0.3);
}
.stat_tit{
    font-size:20px;
    font-weight:600;
    line-height:28px;
    height: 28px;
}
.icon-alarm2{
    font-size:20px;
    font-weight:100;
    padding-right:20px;
    
}
.count{
    font-weight:500;
    line-height:26px;
    color: #CED2E8;
    font-size: 14px
}
.sum{
    font-size: 30px;
    font-weight: bold
}
.line_{
    height: 26px;
    width: 2px;
    background: #CED2E8;
    margin: 15px 60px 0
}
.name_d{
    width:250px;
}
.sum_d{
    width:130px;
    font-size: 16px;
}
</style>
