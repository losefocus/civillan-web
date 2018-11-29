<template>
  <div class="mycanvas">
    <div class="bg">
      <div class="top"></div>
      <div class="bot"></div>
    </div>
    <div class="item" :class="{visible:dataInfo.rpipe_sta<0}">
      <div class="top">
        <div class="stake"></div>
      </div>
      <div class="bot">
        <div class="hole hole_1">
        </div>
        <div class="depth_design">设计桩长 <span style="font-size:14px;font-weight:bold;color:#4dbce6">{{dataInfo.depth_design || 20}}</span> m</div>
      </div>
    </div>
    <div class="item" :class="{visible:dataInfo.rpipe_sta<1}">
      <div class="top" :style="tiem_1.style_stake">
        <div class="stake">
          <div class="nozzle_sta" v-if="dataInfo.nozzle_sta == 1 && dataInfo.rpipe_sta == 1"></div>
        </div>
        <div class="info1"  v-show="dataInfo.rpipe_sta >= 2">初搅深度 <span style="font-size:14px;font-weight:bold;color:#4dbce6">{{d_deep}}</span> m</div>
        <div class="info" v-show="dataInfo.rpipe_sta == 1">
          <p v-if="dataInfo.record_sta == 3" style="font-size:16px;line-height:20px;font-weight:bold;color:#4dbce6">已完成</p>
          <p class="status-title">下钻</p>
          <p>深度 <span :style="dataInfo.rdeep>dataInfo.depth_design?'color:red':''">{{dataInfo.rdeep}}</span> m</p>
          <p>钻速 <span>{{dataInfo.rspeed | formatZ}}</span> cm/min</p>
          <p>电流 <span>{{dataInfo.rcurrent | formatZ}}</span> A</p>
          <p>流量 <span>{{dataInfo.rflow | formatZ}}</span> L/min</p>
        </div>
        <i v-show="dataInfo.rpipe_sta == 1 && dataInfo.rspeed!=0" class="iconfont icon-jiantou-down icon_down" style="color:#4dbce6;font-size:20px;"></i>
        <div class="img_down"></div>
      </div>
      <div class="bot">
        <div class="hole"></div>
      </div>
    </div>
    <div class="item" :class="{visible:dataInfo.rpipe_sta<2}">
      <div class="top" :style="tiem_2.style_stake">
        <div class="stake">
          <div class="nozzle_sta" v-if="dataInfo.nozzle_sta == 1 && dataInfo.rpipe_sta == 2"></div>
        </div>
        <div class="info1"  v-show="dataInfo.rpipe_sta >= 3">复位深度1 <span style="font-size:14px;font-weight:bold;color:#4dbce6">{{u_deep}}</span> m</div>
        <div class="info" v-show="dataInfo.rpipe_sta == 2">
          <p v-if="dataInfo.record_sta == 3" style="font-size:16px;line-height:20px;font-weight:bold;color:#4dbce6">已完成</p>
          <p class="status-title">提钻</p>
          <p>深度 <span :style="dataInfo.rdeep>dataInfo.depth_design?'color:red':''">{{dataInfo.rdeep}}</span> m</p>
          <p>钻速 <span>{{dataInfo.rspeed | formatZ}}</span> cm/min</p>
          <p>电流 <span>{{dataInfo.rcurrent | formatZ}}</span> A</p>
          <p>流量 <span>{{dataInfo.rflow | formatZ}}</span> L/min</p>
        </div>
        <i v-show="dataInfo.rpipe_sta == 2 && dataInfo.rspeed!=0" class="iconfont icon-jiantou-up icon_up" style="color:#4dbce6;font-size:20px;"></i>
      </div>
      <div class="bot">
        <div class="hole">
          <div class="hole_bg" :style="tiem_2.style_hole"></div>
        </div>
      </div>
    </div>
    <div class="item" :class="{visible:dataInfo.rpipe_sta<3}">
      <div class="top" :style="tiem_3.style_stake">
        <div class="stake">
          <div class="nozzle_sta" v-if="dataInfo.nozzle_sta == 1 && dataInfo.rpipe_sta == 3"></div>
        </div>
        <div class="info1"  v-show="dataInfo.rpipe_sta >= 4">复搅深度 <span style="font-size:14px;font-weight:bold;color:#4dbce6">{{rd_deep}}</span> m</div>
        <div class="info" v-show="dataInfo.rpipe_sta == 3">
          <p v-if="dataInfo.record_sta == 3" style="font-size:16px;line-height:20px;font-weight:bold;color:#4dbce6">已完成</p>
          <p class="status-title">复下</p>
          <p>深度 <span :style="dataInfo.rdeep>dataInfo.depth_design?'color:red':''">{{dataInfo.rdeep}}</span> m</p>
          <p>钻速 <span>{{dataInfo.rspeed | formatZ}}</span> cm/min</p>
          <p>电流 <span>{{dataInfo.rcurrent | formatZ}}</span> A</p>
          <p>流量 <span>{{dataInfo.rflow | formatZ}}</span> L/min</p>
        </div>
        <i v-show="dataInfo.rpipe_sta == 3 && dataInfo.rspeed!=0" class="iconfont icon-jiantou-down icon_down" style="color:#4dbce6;font-size:20px;"></i>
      </div>
      <div class="bot">
        <div class="hole">
          <div class="hole_bg" :style="tiem_3.style_hole"></div>
        </div>
      </div>
    </div>
    <div class="item" :class="{visible:dataInfo.rpipe_sta<4}">
      <div class="top" :style="tiem_4.style_stake">
        <div class="stake">
          <div class="nozzle_sta" v-if="dataInfo.nozzle_sta == 1 && dataInfo.rpipe_sta == 4 && parseInt(tiem_4.style_stake.bottom)>=12"></div>
        </div>
        <div class="info" v-show="dataInfo.rpipe_sta == 4||dataInfo.rpipe_sta == 5">
          <p v-if="dataInfo.record_sta == 3" style="font-size:16px;line-height:20px;font-weight:bold;color:#4dbce6;margin: 80px 0 0 10px;">已完成</p>
          <div v-else>
            <p class="status-title">复提</p>
            <p>深度 <span :style="dataInfo.rdeep>dataInfo.depth_design?'color:red':''">{{dataInfo.rdeep}}</span> m</p>
            <p>钻速 <span>{{dataInfo.rspeed | formatZ}}</span> cm/min</p>
            <p>电流 <span>{{dataInfo.rcurrent | formatZ}}</span> A</p>
            <p>流量 <span>{{dataInfo.rflow | formatZ}}</span> L/min</p>
          </div>
        </div>
        <i v-if="dataInfo.rpipe_sta == 4 && dataInfo.rspeed!=0 && dataInfo.record_sta != 3" class="iconfont icon-jiantou-up icon_up" style="color:#4dbce6;font-size:20px;"></i>
      </div>
      <div class="bot">
        <div class="hole">
          <div class="hole_bg" :style="tiem_4.style_hole"></div>
          <div class="hole_bg_over" :style="tiem_4.style_hole_over"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import deviceData from '@/api/device/deviceData'
  export default {
    props:["dataInfo"],
    data(){
      return{
        tiem_1:{
          style_stake:{bottom:'5%'}
        },
        tiem_2:{
          style_stake:{bottom:'40%'},
          style_hole:{height:'100%'}
        },
        tiem_3:{
          style_stake:{bottom:'5%'},
          style_hole:{height:'100%'}
        },
        tiem_4:{
          style_stake:{bottom:'40%'},
          style_hole:{height:'100%'},
          style_hole_over:{height:'100%'},
        },
        d_deep:0,
        u_deep:20,
        rd_deep:0,
        ru_deep:0,
        onOff:false,
        tData:{},
      }
    },
    created(){
      this.history();
    },
    mounted(){
      this.init(this.dataInfo)
    },
    methods:{
      init(dataInfo){
        this.running(dataInfo)
      },
      history(){
        deviceData.history({key:this.$store.state.project.deviceKey}).then(res => {
          if(res.success&&res.result!=[]){
            let a=0;
            let b=20;
            let c=0;
            let d=20;
            res.result.forEach(item=>{
              item=JSON.parse(item);
              let rdeep=Number(item.rdeep).toFixed(2);
              rdeep=Number(rdeep);
              item.depth_design=this.dataInfo.depth_design;
              if(item.rpipe_sta == 1){
                if(rdeep>=a){
                  a=rdeep;
                }
                this.d_deep=a;
              }else if(item.rpipe_sta == 2){
                if(rdeep<=b){
                  b=rdeep;
                }
                this.u_deep=b;
              }else if(item.rpipe_sta == 3){
                if(rdeep>=c){
                  c=rdeep;
                }
                this.rd_deep=c;
              }else if(item.rpipe_sta == 4){
                if(rdeep<=d){
                  d=rdeep;
                }
                this.ru_deep=d;
              }
            });
          }
        }).catch(e=>{

        });
      },
      running(data){
        data.rdeep=parseFloat(data.rdeep).toFixed(2);
        if( !('rpipe_sta' in data) || data.rpipe_sta == 0 ){

        }else if(data.rpipe_sta == 1){

          this.d_deep=data.rdeep;
          if(data.depth_design!=0&&data.rdeep<=data.depth_design){
            let d0 = data.rdeep/data.depth_design;
            let l = 35*(1-d0)+5;
            this.tiem_1.style_stake = {bottom:l+'%'}
          }
        }else if((data.rpipe_sta == 2)){
          this.u_deep=data.rdeep;

          if(data.depth_design!=0&&data.rdeep<=data.depth_design){
            //记录下钻的深度
            let d_deep = this.d_deep/data.depth_design;
            let l1 = 35*(1-d_deep)+5;
            this.tiem_1.style_stake = {bottom:l1+'%'};

            let d0 = data.rdeep/data.depth_design;
            let l = 35*(1-d0)+5;
            this.tiem_2.style_stake = {bottom:l+'%'};
            this.tiem_2.style_hole = {height:(1-d0)*100+'%'}
          }
        }else if((data.rpipe_sta == 3)){
          this.rd_deep=data.rdeep;
          if(data.depth_design!=0&&data.rdeep<=data.depth_design){
            //记录下钻的深度
            let d_deep = this.d_deep/data.depth_design;
            let l1 = 35*(1-d_deep)+5;
            this.tiem_1.style_stake = {bottom:l1+'%'};
            // 记录提钻的深度
            let u_deep = this.u_deep/data.depth_design;
            let l2 = 35*(1-u_deep)+5;
            this.tiem_2.style_stake = {bottom:l2+'%'};
            this.tiem_2.style_hole = {height:(1-u_deep)*100+'%'};

            let d0 = data.rdeep/data.depth_design;
            let l = 35*(1-d0)+5;
            this.tiem_3.style_stake = {bottom:l+'%'};
            this.tiem_3.style_hole = {height:'100%'}
          }
        }else if((data.rpipe_sta == 4)){
          this.ru_deep=data.rdeep;
          if(data.depth_design!=0&&data.rdeep<=data.depth_design){
            //记录下钻的深度
            let d_deep = this.d_deep/data.depth_design;
            let l1 = 35*(1-d_deep)+5;
            this.tiem_1.style_stake = {bottom:l1+'%'};
            // 记录提钻的深度
            let u_deep = this.u_deep/data.depth_design;
            let l2 = 35*(1-u_deep)+5;
            this.tiem_2.style_stake = {bottom:l2+'%'};
            this.tiem_2.style_hole = {height:(1-u_deep)*100+'%'};

            //记录复下的深度
            let rd_deep = this.rd_deep/data.depth_design;
            let l3 = 35*(1-rd_deep)+5;
            this.tiem_3.style_stake = {bottom:l3+'%'};
            this.tiem_3.style_hole = {height:'100%'};

            let d0 = data.rdeep/data.depth_design;
            let l = 35*(1-d0)+5;
            this.tiem_4.style_stake = {bottom:l+'%'};
            this.tiem_4.style_hole = {height:'100%'};
            this.tiem_4.style_hole_over = {height:(1-d0)*100+'%'}
          }
        }else if((data.rpipe_sta == 5)){
          if(data.depth_design!=0&&deep<=data.depth_design){
            this.tiem_1.style_stake = {bottom:'5%'}
            this.tiem_2= {style_stake:{bottom:'40%'},style_hole:{height:'100%'}}
            this.tiem_3= {style_stake:{bottom:'5%'},style_hole:{height:'100%'}}
            this.tiem_4= {style_stake:{bottom:'40%'},style_hole:{height:'100%'},style_hole_over:{height:'100%'}}
          }
        }
      }
    },
    watch:{
      dataInfo:{ //深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          if(val.record_sta==3){
            val.rpipe_sta=4;
            this.init(val)
          }else{
            this.init(val);
          }
        },
      },
      d_deep:{
        handler(val, oldVal){
          val=Number(val);
          oldVal=Number(oldVal);
          if(val>=oldVal){
            this.d_deep=val;
          }else{
            this.d_deep=oldVal;
          }
        },
        deep:true
      },
      u_deep:{
        handler(val, oldVal){
          val=Number(val);
          oldVal=Number(oldVal);
          if (val <= oldVal) {
            this.u_deep = val
          } else {
            this.u_deep = oldVal
          }
        }
      },
      rd_deep:{
        handler(val, oldVal){
          val=Number(val);
          oldVal=Number(oldVal);
          if (val >= oldVal) {
            this.rd_deep = val
          } else {
            this.rd_deep = oldVal
          }
        },
      },
      ru_deep:{
        handler(val, oldVal){
          val=Number(val);
          oldVal=Number(oldVal);
          if (val <= oldVal) {
            this.ru_deep = val
          } else {
            this.ru_deep = oldVal
          }
        },
      },

    }
  }
</script>
<style scoped>
  .mycanvas{
    width: calc(100% - 60px);
    height: 100%;
    padding: 0 30px;
    margin: auto;
    display: flex;
    flex-wrap:wrap ;
    align-items: center;
    justify-content: space-around;
    position: relative;
    color: #666
  }
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1
  }
  .bg .top{
    width: 100%;
    height: 60%;
    background: #fff;
  }
  .bg .bot{
    width: 100%;
    height: 40%;
    background: #e9e2d0;
  }
  .item{
    width: 16%;
    height: 100%;
    position: relative;
  }
  .item.visible{
    visibility : hidden
  }
  .item .top{
    width: 100%;
    height: 60%;
    padding-top: 20%;
    box-sizing: border-box;
    position: absolute;
    bottom: 40%;
    left: 0;
    z-index: 9;
  }
  .item .top .info{
    position: absolute;
    top: 25%;
    left: 50%;
    width: 115px;
    height: 120px;
    background: url(../../../../assets/RState/stake-03.png)no-repeat center bottom;
    background-size: contain;
    font-size: 12px;
    padding-left: 15px;
    line-height: 16px;
    text-align: left
  }
  .item .top .info1{
    position: absolute;
    top: 80%;
    left: 50%;
    width: 115px;
    height: 40px;
    background: url(../../../../assets/RState/stake-03.png)no-repeat center bottom;
    background-size: contain;
    font-size: 12px;
    padding-left: 15px;
    line-height: 16px;
    text-align: left
  }
  .item .top .info .status-title{
    color:#4dbce6;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item .top .info p{
    margin: 0;
  }
  .item .top .info p span{
    font-size:14px;
    font-weight:bold;
    color:#4dbce6;
  }
  .item .top .nozzle_sta{
    width: 20%;
    height: 10%;
    position: absolute;
    left: 39%;
    bottom: -10%;
    background: url(../../../../assets/RState/liquid-01.png)no-repeat center bottom;
    background-size: contain;
    animation:nozzle 1s infinite;
    -moz-animation:nozzle 1s infinite; /* Firefox */
    -webkit-animation:nozzle 1s infinite; /* Safari and Chrome */
    -o-animation:nozzle 1s infinite; /* Opera */
  }
  @keyframes nozzle{
    0%   { opacity: 0}
    50%   { opacity: 1}
    100%  { opacity:0;}
  }
  @-moz-keyframes nozzle{ /* Firefox */
    0%   { opacity: 0}
    50%   { opacity: 1}
    100%  { opacity:0;}
  }
  @-webkit-keyframes nozzle {/* Safari and Chrome */
    0%   { opacity: 0}
    50%   { opacity: 1}
    100%  { opacity:0;}
  }
  @-o-keyframes nozzle {/* Opera */
    0%   { opacity: 0}
    50%   { opacity: 1}
    100%  { opacity:0;}
  }

  @keyframes stakeup{
    0%   { top:15%;}
    100%  { top:13%;}
  }
  @-moz-keyframes stakeup{ /* Firefox */
    0%   { top:15%;}
    100%  { top:13%;}
  }
  @-webkit-keyframes stakeup {/* Safari and Chrome */
    0%   { top:15%;}
    100%  { top:13%;}
  }
  @-o-keyframes stakeup {/* Opera */
    0%   { top:15%;}
    100%  { top:13%;}
  }
  @keyframes stakedown{
    0%   { top:15%;}
    100%  { top:17%;}
  }
  @-moz-keyframes stakedown{ /* Firefox */
    0%   { top:15%;}
    100%  { top:17%;}
  }
  @-webkit-keyframes stakedown {/* Safari and Chrome */
    0%   { top:15%;}
    100%  { top:17%;}
  }
  @-o-keyframes stakedown {/* Opera */
    0%   { top:15%;}
    100%  { top:17%;}
  }
  .item .top .icon_up{
    position: absolute;
    top: 15%;
    left: 25%;
    animation:stakeup 1s infinite;
    -moz-animation:stakeup 1s infinite; /* Firefox */
    -webkit-animation:stakeup 1s infinite; /* Safari and Chrome */
    -o-animation:stakeup 1s infinite; /* Opera */
  }
  .item .top .icon_down{
    position: absolute;
    top: 15%;
    left: 25%;
    animation:stakedown 1s infinite;
    -moz-animation:stakedown 1s infinite; /* Firefox */
    -webkit-animation:stakedown 1s infinite; /* Safari and Chrome */
    -o-animation:stakedown 1s infinite; /* Opera */
  }
  /* .img_down{
      position: absolute;
      top: 15%;
      left: 25%;
      width:50px;
      height: 50px;
      background: url(../assets/down.gif)no-repeat;
      background-size: contain
  } */
  .item .bot{
    width: 100%;
    height: 35%;
    position: absolute;
    top: 60%;
    left: 0;
    z-index: 2;
  }
  .item .bot .depth_design{
    position: absolute;
    left: 55%;
    top: 30%;
    width: 100px;
    height: 35px;
    font-size: 12px;
    line-height: 16px;
    padding-left: 15px;
    text-align: left;
    background: url(../../../../assets/RState/stake-03.png)no-repeat center bottom;
    background-size: contain
  }
  .item .stake{
    width: 100%;
    height: 100%;
    background: url(../../../../assets/RState/stake-01.png)no-repeat center bottom;
    background-size: contain;
  }
  .item .hole{
    width: 25%;
    height: 100%;
    margin: auto;
    background: url(../../../../assets/RState/stake-02.png)no-repeat center bottom;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
  .item .hole .hole_bg{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    background-image: -webkit-linear-gradient(0deg, #a5a192, #dedbd1 73%,#b9b3a4);
    opacity: 0.75;
  }
  .item .hole .hole_bg_over{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 4;
    background-image: -webkit-linear-gradient(0deg, #928f85, #c3c0b5 73%,#928e84);
  }
  .item .hole_1{
    border: 1px dashed #737373;
    border-top: none;
    background:none;
    overflow: visible
  }
  .item .hole_5{
    background-image: -webkit-linear-gradient(0deg, #989483, #dedbd1 73%,#c3bda4);
    /* #928f85, #c3c0b5 73%,#928e84 */
  }

</style>
