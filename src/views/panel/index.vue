<template>
    <div class="panel">
        <div class="top">
            <div class="weather" style="float:left">
                <i class="iconfont icon-shizhong" style="padding-right:10px;"></i>
                <span style="padding-right:10px">{{time.date}}</span>
                <span style="padding-right:10px">{{time.hour}}</span>
                <span>{{time.day}}</span>
            </div>
            <div class="tips" style="float:right">
                <marquee>热烈欢迎xxx公司领导一行莅临指导工作</marquee>
            </div>
        </div>
        <div class="bot">
            <div class="item">
                <div class="item_">
                    <info></info>
                </div>
            </div>
            <div class="item item_l">
                <div class="item_" style="padding:0">
                    <my-map></my-map>
                </div>
            </div>
            <div class="item item_s">
                <div class="item_">
                    <warm></warm>
                </div>
            </div>
            <div class="item item_h margin_top">
                <div class="item_">
                    <work></work>
                </div>
            </div>
            <div class="item item_l item_h margin_top">
                <div class="item_">
                    <device></device>
                </div>
            </div>
            <div class="item item_h margin_top item_s">
                <div class="item_">
                    <alarm></alarm>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import info from "./info";
  import myMap from "./map";
  import warm from "./warm";
  import work from "./work";
  import device from "./device";
  import alarm from "./alarm";
import {formatDate} from '@/common/formatDate.js';

export default {
    data(){
        return{
            time:{}
        }
    },
    components:{
        info,
        myMap,
        warm,
        work,
        device,
        alarm,
    },
    filters: {
    },
    created(){

    },
    mounted(){
        this.getTimes()
        setInterval(this.getTimes,1000)
    },
    methods:{
        getTimes(){
            let newDate = new Date()
            this.time={
                date:formatDate(newDate,'yyyy-MM-dd'),
                hour:formatDate(newDate,'hh:mm:ss'),
            }
            let day = newDate.getDay()
            switch (day){
                case 1:this.time.day = '周一';break;
                case 2:this.time.day = '周二';break;
                case 3:this.time.day = '周三';break;
                case 4:this.time.day = '周四';break;
                case 5:this.time.day = '周五';break;
                case 6:this.time.day = '周六';break;
                default :this.time.day = '周日'
            }
        }
    },
    watch:{

    }
}
</script>
<style scoped>
.panel{
    height: 1080px;
    width: 1920px;
    color:#fff;
    background: url(../../assets/panel/bg.png)no-repeat center
}
.top{
    height:65px;
    padding-top: 65px;
    line-height: 65px;
    padding: 65px 25px 0;
    overflow: hidden;
}
.tips{
    width: 540px;
    font-size: 18px;
    color:#EB9461;
}
.bot{
    padding: 0 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
}
.item{
    width: 480px;
    height: 460px;
    background: rgba(31,44,64,0.3);
    position: relative;
}
.item::after{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: block;
    content: '';
    height: 20px;
    width: 20px;
    border-top:3px solid #67A2ED;
    border-left:3px solid #67A2ED;
}
.item::before{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: block;
    content: '';
    height: 20px;
    width: 20px;
    border-top:3px solid #67A2ED;
    border-right:3px solid #67A2ED;
}
.item_{
    width: 100%;
    height: 100%;
    padding: 25px;
    box-sizing: border-box;
}
.item_::after{
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: block;
    content: '';
    height: 20px;
    width: 20px;
    border-bottom:3px solid #67A2ED;
    border-left:3px solid #67A2ED;
}
.item_::before{
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    display: block;
    content: '';
    height: 20px;
    width: 20px;
    border-bottom:3px solid #67A2ED;
    border-right:3px solid #67A2ED;
}
.item_s{
    width: 450px;
}
.item_l{
    width:900px;
}
.item_h{
    height: 440px;
}
.margin_top{
    margin-top: 20px;
}
</style>
