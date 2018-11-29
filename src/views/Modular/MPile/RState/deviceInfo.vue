<template>
  <div class="s-infoBody">
    <div class="i-id">
      <div v-if="RT_data.pile_describe" class="d-model">{{RT_data.pile_describe}}</div>
      <div v-else class="d-model">暂无作业</div>
      <!--<div class="d-kind">
        <div v-for="(index,list) in deviceType" @click="deviceChange(index)" :class="{'deviceActive':index==deviceIndex}">{{index}}</div>
      </div>-->
    </div>
    <!--<div class="i-start">开始时间：<span>{{ RT_data.start_time/1 | formatDate }}</span></div>-->
    <div class="i-progress">
      <div class="i-progressName" style="width: 80px">作业进度：</div>
      <el-progress :stroke-width="15" :text-inside="true" :percentage="progressNum " color="#24BCF7" style="width: calc(100% - 80px)"></el-progress>
      <div class="clear"></div>
    </div>
    <div class="i-box">
      <div class="i-body">
        <div class="i-name">{{deviceName1}}</div>
        <div class="i-state">
          <span style="vertical-align: center">{{deviceType.state1}}</span>
          <div v-if="RT_data.nozzle_sta" :class="{'led-green':RT_data.nozzle_sta=='1','led-gray':RT_data.nozzle_sta==0}"></div>
          <div v-else class="led-gray"></div>
        </div>
      </div>
      <div class="i-body">
        <div class="i-company">{{productName}}</div>
        <div class="i-state">
          <span>{{deviceType.state2}}</span>
          <div v-if="RT_data.record_sta" :class="{'led-green':RT_data.record_sta==1,'led-skyBlue':RT_data.record_sta==2,'led-blue':RT_data.record_sta==3}"></div>
          <div v-else class="led-gray"></div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="clear"></div>
    <div class="h-box">
      <div class="b-info">
        <div class="b-infoName"><span class="iconfont icon-portrait"></span>
          <span v-if="deviceUserName" class="i-info">{{deviceUserName}}</span>
          <span v-else class="i-info">未绑定</span>
        </div>
        <div class="b-infoCall"><span class="iconfont icon-phonenew"></span>
          <span v-if="deviceUserPhone" class="i-info">{{deviceUserPhone}}</span>
          <span v-else class="i-info">暂无联系方式</span>
        </div>
      </div>
      <div class="b-angle" v-if="isAngle">
        <div class="a-spot"></div>
      </div>
    </div>
    <div class="i-normal" v-if="isWarming">
      <p>{{isReal}}</p>
    </div>
    <div class="i-warning" v-else>
      <ul class="w-box">
        <li class="w-list" v-for="item in warmingData" :key="item">
          <i class="iconfont icon-warming"></i>
          <div class="w-text">
            <p>{{item.message}}</p>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import deviceUser from '@/api/device/deviceUser.js'
  import deviceData from '@/api/device/deviceData'
  import deviceList from '@/api/project/deviceList'
  export default {
    name: "deviceInfo",
    data(){
      return {
        productName:'',
        deviceName1:'',
        deviceUserName:'',
        deviceUserPhone:'',
        progressNum:40,//深度进度
        isWarming:true,//未发现问题显示
        warmingData:[],
        RT_data:{},
        isAngle:false,
        timer2:null,
        deviceType:{},
        isReal:'',
      }
    },
    props:['realData'],
    created(){
      this.RT_data=this.realData;
    },
    mounted(){
      this.changeKey()
    },
    beforeDestroy(){
      clearInterval(this.timer2);
    },
    methods:{
      //判断是实时还是历史
      changeKey(){
        let key='';
        if(this.$store.state.project.changeTab==true){
          this.isReal='历史回放中';
          key=this.$store.state.project.historyKey
        }else{
          this.isReal='设备正常运行中';
          key=this.$store.state.project.deviceKey
        }
        this.getInfo(key);
        this.getAlarms(key);
        this.timer2=setInterval(()=>{
          this.getAlarms(key)
        },3000);
      },
      //获取设备信息
      getInfo(key){
        deviceList.list({key:key}).then(res=>{
          let data=res.result.items[0];
          //设备类型
          if(data.type=='PMHNT'){
            this.deviceType.state1='在线状态';
            this.deviceType.state2='出料状态';
          }else if(data.type=='JBZ'){
            this.deviceType.state1='喷浆状态';
            this.deviceType.state2='记录状态';
          }else if(data.type=='PLYH'){
            this.deviceType.state1='在线状态';
            this.deviceType.state2='养护状态';
          }else if(data.type=='YYLZL'){
            this.deviceType.state1='在线状态';
            this.deviceType.state2='张拉状态';
          }else if(data.type=='YYLYJ'){
            this.deviceType.state1='在线状态';
            this.deviceType.state2='压浆状态';
          }
          //设备信息
          if(data.status==11){
            this.noDevice=false;
          }else{
            this.noDevice=false;
          }
          if(data.type=='JBZ'){
            this.isAngle=true
          }else{
            this.isAngle=false
          }
          this.productName=data.product.name;
          this.deviceName1=data.name;
          deviceUser.list({device_id:data.id}).then(res=>{
            if(res.success){
              if(res.result.total){
                this.deviceUserName=res.result.items[0].projectUser.name;
                this.deviceUserPhone=res.result.items[0].projectUser.phone;
              }
            }
          })

        }).catch(e=>{

        })
      },

      //报警信息
      getAlarms(key){
        if(key){
          deviceData.alarms({'key':key}).then(res=>{
            if(res.success){
              if(res.result.length>0){
                this.isWarming=false;
                this.warmingData=res.result
              }else{
                this.isWarming=true;
              }
            }else{
              this.isWarming=true
            }
          }).catch(e=>{

          })
        }else{
        }

      }
    },
    watch:{
      realData:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.RT_data=val;
        },
      }
    }
  }
</script>

<style scoped lang="scss">
  .s-infoBody{
    width:100%;
    height: 100%;
    .deviceActive{
      font-size:20px;
      background: #24BCF7;
      color:#ffffff;
    }
    .i-id{
      font-size: 20px;
      color: rgba(218,218,218,1);
      width:100%;
      height: 10%;
      min-height: 30px;
      margin-top: 10%;
      overflow: hidden;
      .d-model{
        float: left;
        width: 50%;
        font-size: 25px;
        font-weight: bold;
        color: #333333;
      }
    }
    .i-box{
      height: 20%;
      .i-body{
        width: 100%;
        height: 40%;
        .i-name{
          float: left;
          font-size:15px;
          color:rgba(51,51,51,1);
          font-weight: bold;
        }
        .i-company{
          float: left;
          font-size:10px;
          color:#999999;
        }
        .i-state{
          float: right;
          font-size:10px;
          color:#999999;
          .led-green{
            vertical-align: middle;
            display: inline-block;
            background-color: #00ff00;
            width: 6px;
            height: 6px;
            box-shadow: 0px 0px 2px 4px #26c702;
            -moz-box-shadow: 0px 0px 2px 4px #26c702;
            -webkit-box-shadow: 0px 0px 2px 4px #26c702;
            border-radius: 50%;
          }
          .led-gray{
            display: inline-block;
            background-color: #c1c1c1;
            width: 6px;
            height: 6px;
            box-shadow: 0px 0px 2px 4px #858585;
            -moz-box-shadow: 0px 0px 2px 4px #858585;
            -webkit-box-shadow: 0px 0px 2px 4px #858585;
            border-radius: 50%;
          }
          .led-skyBlue{
            display: inline-block;
            background-color: #f7ef8a;
            width: 6px;
            height: 6px;
            box-shadow: 0px 0px 2px 4px #ffaa17;
            -moz-box-shadow: 0px 0px 2px 4px #ffaa17;
            -webkit-box-shadow: 0px 0px 2px 4px #ffaa17;
            border-radius: 50%;
          }
          .led-blue{
            display: inline-block;
            background-color: #12E7FF;
            width: 6px;
            height: 6px;
            box-shadow: 0px 0px 2px 4px #31C4F7;
            -moz-box-shadow: 0px 0px 2px 4px #31C4F7;
            -webkit-box-shadow: 0px 0px 2px 4px #31C4F7;
            border-radius: 50%;
          }
          span{
            vertical-align: middle;
            margin-right: 20px;
          }
        }
        .icon-portrait{
          color: #787F87;
        }
        .icon-phonenew{
          color: #787F87;
        }
      }
      .icon-state{
        font-size: 12px;
        color: #24BCF7;
      }
    }
    .h-box{
      width: 100%;
      height: 20%;
      overflow: hidden;
      .b-info{
        float: left;
        width: 60%;
        height: 80%;

        .i-infoName{
          margin-left: 10px;
        }
        .b-infoName{
          height: 50%;
          .i-info{
            margin-left: 10px;
            color: #999999;
          }
        }
        .b-infoCall{
          height: 50%;
          .i-info{
            margin-left: 10px;
            color: #999999;
          }
        }
        /*.icon-portrait{
          color: #787F87;
        }
        .icon-phonenew{
          color: #787F87;
        }*/
      }
      .b-angle{
        float: right;
        width: 60px;
        height: 60px;
        background: url("../../../../assets/RState/angle.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .a-spot{
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          left: 27px;
          top: 26px;
          background: red;
        }
      }
    }
    .i-progress{
      width: 100%;
      margin-top: 5%;
      height: 10%;
      overflow: hidden;
      div{
        float: left;
      }
      .i-progressName{
        color: #999999
      }
    }
    .i-normal{
      width:100%;
      text-align: center;
      height:15%;
      background:rgba(141,232,240,0.06);
      padding-top: 13%;
    }
    .i-warning{
      width:calc(100% - 40px);
      padding: 10px 20px;
      height:calc(25% - 20px);
      background:rgba(248,89,89,0.06);
      overflow: auto;
      .w-box{
        .w-list{
          margin-top: 5px;
          .icon-warming{
            vertical-align: top;
            color: #DF2A2A;
          }
          .w-text{
            margin-left: 10px;
            max-width: 80%;
            vertical-align: top;
            display: inline-block;
            text-align: left;
          }
        }
      }

    }

    .d-name{
      margin-top: 20px;
      span{
        margin-left: 5%;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .d-box{
      height: 60%;

      div{
        margin-top: 50px;
        float: left;
        text-align: center;
        width: 33%;
      }
      .d-key{
        font-size: 14px;
        color: #666666;
      }
      .d-value{
        margin-top: 10px;
        font-weight: bold;
        height: 30px;
        font-size: 25px;
        color: #333333;
      }
      .d-value1{
        margin-top: 10px;
        font-weight: bold;
        height: 30px;
        font-size: 25px;
        color: #333333;
      }
    }
  }

</style>
