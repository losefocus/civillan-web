<template>
    <div style="width: 100%;height: 100%;">
        <div class="alarm_tit">
            <i class="iconfont icon-alarm2"></i>
            实时警报
        </div>
        <div id="alarm">
            <!-- <marquee direction="up" style="height:100%" vspace="0" loop="-1"> -->
                <ul>
                    <li class="clearfix" v-for="(item,index) in list" :key="index">
                        <div class="pull-left text">{{item.message}}</div>
                        <div class="pull-right">{{item.ts | filterDate}}</div>
                    </li>
                    <!-- <li class="clearfix">
                        <div class="pull-left text">2飞阳建设搅拌桩4号-流量传感器异常</div>
                        <div class="pull-right">12-6 15:30</div>
                    </li> -->
                    
                </ul>
            <!-- </marquee> -->
            
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
        setInterval(this.getList,this.interval)
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
.pull-left{
    float: left
}
.pull-right{
    float: right
}
#alarm{
    width: 100%;
    height: calc(100% - 28px);
}
.alarm_tit{
    font-size:20px;
    font-weight:600;
    line-height:28px;
    height: 28px;
    padding-bottom: 10px;
}
.icon-alarm2{
    font-size:20px;
    font-weight:100;
    padding-right:20px;
    
}
#alarm li{
    line-height: 40px;
    height: 40px;
    color: #CED2E8;
}
.text{
    width:300px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
