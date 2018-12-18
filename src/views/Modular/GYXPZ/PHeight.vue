<template>
  <!--高压旋喷桩-->
  <div style="position: relative;height: 100%">
    <transition name="fade">
      <div class="b-device" v-if="noDevice">
        <div class="t-device">
          <div class="d-text">
            {{typeName}}
          </div>
        </div>
      </div>
    </transition>
    <div class="r-box">
      <div class="t-box">
        <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
        <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
      </div>
      <ul class="s-box1">
        <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
          <div class="i-id">
            <div v-if="RT_data.pile_name" class="d-model" :title="RT_data.pile_name">{{RT_data.pile_name}}</div>
            <div v-else class="d-model">暂无作业</div>
            <ul class="d-kind" v-if="isPile">
              <li v-for="(list,index) in deviceHead" @click="deviceChange(index)" :key="list" :class="{'deviceActive':index==deviceIndex}" :title="headTitle[index]">{{list}}</li>
            </ul>
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
            </div>
            <div class="i-body">
              <div class="i-company">{{productName}}</div>
              <div class="i-state">
                <span class="s-title">
                  <span v-if="RT_data.record_sta==1">记录中</span>
                  <span v-else-if="RT_data.record_sta==2">暂停记录</span>
                  <span v-else-if="RT_data.record_sta==3">记录已完成</span>
                  <span v-else>未记录</span>
                </span>
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
            <div class="b-angle">
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
        </li>
        <li class="s-info" :class="{'s-info1':classChange==1}" v-else>
          <div class="d-name">
            <i class="iconfont icon-pie"></i>
            <span>桩设计参考值</span>
          </div>
          <div class="noConfig" v-if="noConfig">未找到当前作业的配置参数</div>
          <div v-else class="d-box">
            <template>
              <el-table
                :data="config_data"
                border
                style="width: 100%;height: calc(100% - 30px);overflow: auto">
                <el-table-column
                  prop="name"
                  align="center"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="value"
                  align="center"
                  :show-overflow-tooltip="true"
                  label="值">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </li>
        <li class="b-statistics">
          <ul class="b-dashboard">
            <li class="c-dashboard">
              <chart :options="polar1" :auto-resize=true></chart>
            </li>
            <li class="c-dashboard">
              <chart :options="polar2" :auto-resize=true></chart>
            </li>
            <li class="c-statistics">
              <ul class="s-box">
                <li class="s-body">
                  <p class="s-num" v-if="RT_data.ash_total">{{Number(RT_data.ash_total).toFixed(2)}}</p>
                  <p class="s-num" v-else>0</p>
                  <p class="s-text">累计灰量(kg)</p>
                </li>
                <li class="s-body">
                  <p class="s-num" v-if="RT_data.slurry_part">{{Number(RT_data.slurry_part).toFixed(2)}}</p>
                  <p class="s-num" v-else>0</p>
                  <p class="s-text">区段浆量(L)</p>
                </li>
                <li class="s-body">
                  <p class="s-num" v-if="RT_data.slurry_total">{{Number(RT_data.slurry_total).toFixed(2)}}</p>
                  <p class="s-num" v-else>0</p>
                  <p class="s-text">累计浆量(L)</p>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="b-dashboard">
            <li class="c-dashboard">
              <chart :options="polar3" :auto-resize=true></chart>
            </li>
            <li class="c-dashboard">
              <chart :options="polar4" :auto-resize=true></chart>
            </li>
            <li class="c-statistics">
              <ul class="s1-box">
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.air_part">{{Number(RT_data.air_part).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">区段气量(m³)</p>
                </li>
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.air_total">{{Number(RT_data.air_total).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">累计气量(m³)</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="b-statistics">
          <ul class="b-dashboard">
            <li class="c-dashboard">
              <chart :options="polar5" :auto-resize=true></chart>
            </li>
            <li class="c-dashboard">
              <chart :options="polar6" :auto-resize=true></chart>
            </li>
            <li class="c-statistics">
              <ul class="s1-box">
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.water_part">{{Number(RT_data.water_part).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">区段水量(L)</p>
                </li>
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.water_total">{{Number(RT_data.water_total).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">累计水量(L)</p>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="b-dashboard">
            <li class="c-dashboard">
              <chart :options="polar7" :auto-resize=true></chart>
            </li>
            <li class="c-dashboard">
              <chart :options="polar8" :auto-resize=true></chart>
            </li>
            <li class="c-statistics">
              <ul class="s1-box">
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.return_part">{{Number(RT_data.return_part).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">区段返浆(L)</p>
                </li>
                <li class="s1-body">
                  <p class="s1-num" v-if="RT_data.return_total">{{Number(RT_data.return_total).toFixed(2)}}</p>
                  <p class="s1-num" v-else>0</p>
                  <p class="s1-text">累计返浆(L)</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="s-box2">
        <li class="s-progress">
          <div class="p-box" >
            <div class="p-echart" style="">
              <div class="p-progress" :style="{height:'75%'}">
                <div style="height: 100%;">
                  <div class="progressContainer">
                    <div class="progress" :style="{height:progressHeight}" style="font-size: 12px">
                      <div style="border-bottom: 3px solid #24BCF7;width: 23px;"></div>
                      <div style="margin-left: 25px;color: #24BCF7;margin-top: -9px;width: 60px"><!--{{ progress+'%'}}--><span style="font-size: 16px;font-weight: bold;">{{isNaN(progress)?0:progress}}</span></div>
                    </div>
                    <span style="margin-left: -25px">0米</span>
                    <span style="position: absolute;bottom: 0;left:-40px;">{{DesignDeep}}米</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-title">深度</div>
          </div>
          <div class="p-box">
            <ul class="p-echart1">
              <li class="b-state">
                <p class="s-title" v-if="1">
                  <span>喷浆中</span>
                </p>
              </li>
              <li  class="b-state">
                <p class="s-title" v-if="1">
                  <span>下钻中</span>
                </p>
              </li>
              <li  class="b-state">
                <p class="s-title1" v-if="1">
                  <span>三重管法</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="p-box">
            <div class="p-echart">
              <div id="upSpeed" style="width: 100%;height: 100%"></div>
            </div>
            <div class="p-title">提钻速度</div>
          </div>
          <div class="p-box">
            <div class="p-echart">
              <div id="rotationSpeed" style="width: 100%;height: 100%"></div>
            </div>
            <div class="p-title">回转速度</div>
          </div>
        </li>
        <li class="s-chart1">
          <div id="THCharts" style="width: 100%;height: 100%;"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import RadialProgressBar from 'vue-radial-progress'
  import {formatDate} from '@/common/formatDate.js';

  import deviceUser from '@/api/device/deviceUser.js'
  import deviceList from '@/api/project/deviceList'

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'

  import deviceInfo from '@/views/Modular/JBZ/RState/deviceInfo.vue'
  import deviceConfig from '@/api/device/deviceConfig.js'
  export default {
    name: "PHeight",
    components:{
      RadialProgressBar,
      deviceInfo,
    },
    data(){
      return {
        timer:null,//定时器,
        angelWidth:0,
        noDevice:false,
        deviceIndex:1,
        isShow:true,
        titleActive:'1',//设备样式切换
        classChange:1,//改变样式
        isRouterAlive: true, //ECharts刷新

        RT_data:{}, //实时数据

        progressNum:40,//深度进度
        progress:0,

        warmingText:'',

        isTab:false,//设备型号切换

        polar1:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'灰浆压力(MPa)'
            }]
          }]
        },
        polar2:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'灰浆流量(L/min)'
            }]
          }]
        },
        polar3:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'空气压力(MPa)'
            }]
          }]
        },
        polar4:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'空气流量(m3/min)'
            }]
          }]
        },
        polar5:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '60%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'清水压力(MPa)'
            }]
          }]
        },
        polar6:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '60%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'清水流量(L/min)'
            }]
          }]
        },
        polar7:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'返浆压力(MPa)'
            }]
          }]
        },
        polar8:{
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize:20,
              offsetCenter:[0, '30%']
            },
            data: [{
              value:0, name:'返浆流量(L/min)'
            }]
          }]
        },
        ctx:null,

        typeName:'',

        //deviceInfo
        productName:'',
        deviceName1:'',
        deviceUserName:'',
        deviceUserPhone:'',
        isWarming:true,//未发现问题显示
        warmingData:[],
        isAngle:false,
        timer2:null,
        deviceType:{},
        isReal:'',
        isPile:false,  //是否是攪拌桩
        deviceInfo1:{},
        workState:{},

        DesignDeep:100,
        progressHeight:'100%',

        /*upChart:null,
        rotationChart:null,*/

        designReturn:250,
        designUp:250,

        chartData:[]
      }
    },
    props:['dialogFullScreen','deviceKey','isClose','clientWidth'],
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
      }
    },
    created(){
      this.getConfig();
      this.getDeviceInfo();
      this.getDeviceConfig();
      let deviceKey=this.$store.state.project.deviceKey;
      this.getInfo(deviceKey);
      this.getAlarms(deviceKey);
      this.getData(deviceKey);
      this.timer=setInterval(()=>{
        this.getData(deviceKey);
      },2000);


    },
    mounted(){
      this.init();
      this.reload();
      this.myCharts();

      this.$nextTick(()=>{
        this.myChart.resize();
        if(this.upChart){
          this.upChart.resize();
        }
        if(this.rotationChart){
          this.rotationChart.resize();
        }

      });
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },

    methods:{
      init(){
        let clientWidth=document.body.clientWidth;
        /*this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)*/
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

      },

      //设备设计参数
      getDeviceConfig(){
        let deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        let id=deviceInfo.id;
        deviceConfig.sensor({page_index:1,page_size:1000,device_id:id}).then(res=>{
          if(res.success){
            if(res.result.items.length>0){

            }
          }else{

          }
        })
      },

      //提钻速度
      getUp(data,designData){
        let upSpeed=document.getElementById('upSpeed');
        this.upChart = this.$echarts.init(upSpeed);
        let tips=data;
        if(isNaN(tips)){
          tips='0.00'
        }
        let loading=()=> {
          if(tips>designData){
            return [{
              value: designData,
              itemStyle: {
                normal: {
                  color: '#F31A1A',
                }
              }
            }, {
              value: 0,
            }];
          }else{
            return [{
              value: tips,
              itemStyle: {
                normal: {
                  color: '#1FBDEE',
                }
              }
            }, {
              value: designData - tips,
            }];
          }
        };
        this.upChart.setOption({
          title: [{
            text: tips +' '+'/'+' ' + designData,
            left: 'center',
            top: '42%',
            textStyle: {
              color: '#333333',
              fontSize:'14',
            }
          }, {
            text: 'cm/min',
            left: 'center',
            top: '58%',
            textStyle: {
              color: '#999999',
              fontSize:'12'
            }
          }],
          color:'rgba(223,223,223,1)',
          series: [{
            name: 'loading',
            type: 'pie',
            radius: ['85%', '92%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              }
            },
            data: loading(),
          }]
        });
      },

      //回转速度
      getRotation(data,designData){
        let rotationSpeed=document.getElementById('rotationSpeed');
        this.rotationChart = this.$echarts.init(rotationSpeed);
        let tips=data;
        if(isNaN(tips)){
          tips='0.00'
        }
        let loading=()=> {
          if(tips>designData){
            return [{
              value: designData,
              itemStyle: {
                normal: {
                  color: '#F31A1A',
                }
              }
            }, {
              value: 0,
            }];
          }else{
            return [{
              value: tips,
              itemStyle: {
                normal: {
                  color: '#1FBDEE',
                }
              }
            }, {
              value: designData - tips,
            }];
          }
        };
        this.rotationChart.setOption({
          title: [{
            text: tips +' '+'/'+' ' + designData,
            left: 'center',
            top: '42%',
            textStyle: {
              color: '#333333',
              fontSize:'14',
            }
          }, {
            text: 'r/min',
            left: 'center',
            top: '58%',
            textStyle: {
              color: '#999999',
              fontSize:'12'
            }
          }],
          color:'rgba(223,223,223,1)',
          series: [{
            name: 'loading',
            type: 'pie',
            radius: ['85%', '92%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              }
            },
            data: loading(),
          }]
        });
      },

      //遮罩
      getDeviceState(){
        if(this.$store.state.project.changeTab==true){
          this.noDevice=false;
        }else{
          this.noDevice=false;
          this.RT_data.depth_design=20;
        }
      },

      //获取设备信息
      getInfo(key){
        deviceList.list({key:key}).then(res=>{
          let data=res.result.items[0];
          //设备类型

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

      //设备信息
      getDeviceInfo(){
        this.isReal='设备正常运行中';
        this.deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(this.deviceInfo.status==11){
          this.noDevice=false;
        }else if(this.deviceInfo.status==0){
          this.typeName='该设备未激活';
          this.getDeviceState()
        }else if(this.deviceInfo.status==1){
          this.typeName='该设备已离线';
          this.getDeviceState()
        }else if(this.deviceInfo.status==2){
          this.typeName='该设备已离场';
          this.getDeviceState()
        }else if(this.deviceInfo.status==21){
          this.typeName='该设备故障中';
          this.getDeviceState();
        }else{

        }
      },
      deviceChange(index){
        this.deviceIndex=index;
      },

      tabChange(x){
        if(x==0){
          this.isTab=false;
        }else {
          this.isTab=true;
        }
      },
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true))
      },


      //实时数据
      getData(key){
        deviceData.list({'key':'GP20184901'}).then(res=>{
          if(res.success){
            this.RT_data=res.result;
            let speed=Number(this.RT_data.speed).toFixed(2);
            let rspeed=Number(this.RT_data.rspeed).toFixed(2);
            this.getUp(speed,this.designUp);
            this.getRotation(rspeed,this.designReturn);

            this.polar1.series[0].data[0].value=Number(this.RT_data.slurry_pressure); //灰浆压力(MPa）
            this.polar2.series[0].data[0].value=Number(this.RT_data.slurry_flow).toFixed(2); //灰浆流量(L/min）
            this.polar3.series[0].data[0].value=Number(this.RT_data.air_pressure).toFixed(2); //空气压力(MPa）
            this.polar4.series[0].data[0].value=Number(this.RT_data.air_flow).toFixed(2); //空气流量(m3/min）
            this.polar5.series[0].data[0].value=Number(this.RT_data.water_pressure).toFixed(2); //清水压力(MPa）
            this.polar6.series[0].data[0].value=Number(this.RT_data.water_flow).toFixed(2); //清水流量(L/min）
            this.polar7.series[0].data[0].value=Number(this.RT_data.return_pressure).toFixed(2); //返浆压力(MPa）
            this.polar8.series[0].data[0].value=Number(this.RT_data.return_flow).toFixed(2); //返浆流量(L/min）


            let _this=this;
            function randomData() {
              now = new Date(+now + oneDay);
              return {
                value: [
                  [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
                  Math.round(Number(_this.RT_data.slurry_flow))
                ]
              }
            }

            this.chartData = [];
            let now = +new Date(1997, 9, 3);
            let oneDay = 24 * 3600 * 1000;
            let value = Math.random() * 1000;
            for (let i = 0; i < 10; i++) {
              this.chartData.push(randomData());
            }
            console.log(this.chartData);

            this.RT_data.depth_design=this.DesignDeep;
            this.progress=Math.abs(Number(this.RT_data.rdeep).toFixed(2));
            this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';
          }else {

          }
        }).catch(err=>{
        });
      },

      //项目配置参数
      getConfig(){
        let projectId=this.$cookies.get('projectId');
        config.list({'project_id':projectId,'name':'k2230_940_C18'}).then(res=>{
        })
      },

      //ECharts
      myCharts(){

        this.myChart = this.$echarts.init(document.getElementById('THCharts'));
        this.myChart.setOption({
          title: {
            text: '动态数据 + 时间坐标轴'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          dataZoom: [
            {
              start: 50,
              end:100,
            }, {
              type: 'inside',
            }
          ],
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.chartData
          }]
        });


      },
    },



    watch:{
      isClose(val,oldVal){
      },
      dialogFullScreen:function (val,oldVal) {
        this.myChart.resize();
        this.upChart.resize();
        this.rotationChart.resize();
      },
      clientWidth(val,oldVal){
        this.myChart.resize();
        this.upChart.resize();
        this.rotationChart.resize();
      }
    }
  }
</script>

<style scoped lang="scss">

  #c{
    margin: 0 auto;
    display: block;
  }
  #r{
    display: block;
    margin: 0 auto;
  }
  #r::before{
    color: black;
    content: attr(min);
    padding-right: 10px;
  }
  #r::after{
    color: black;
    content: attr(max);
    padding-left: 10px;
  }




  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .progressContainer{
    position: relative;
    height: 100%;
    width: 20px;
    background-color: #24BCF7;
  }
  .progress{
    background-color: #ddd;
    width:20px;
    line-height: 15px;
    position: absolute;
    bottom: 0;
    transition: 0.5s linear;
  }

  .p-title{

  }
  .echarts {
    width: 100%;
    height: calc(100% - 40px);
  }
  .b-device{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    //background: rgba(255,255,255,0.7);
    z-index: 10;
    overflow: hidden;
    text-align: center;
    display: table;
    .t-device{
      display: table-cell;
      vertical-align: middle;
      font-size: 25px;
      text-align: center;
      .d-text{
        margin: 0 auto;
        text-align: center;
        width: 320px;
        height: 50px;
        line-height: 50px;
        color: #ffffff;
        background: rgba(0,0,0,0.5);
      }
    }
  }
  .r-box{
    padding-left: 2%;
    height: 100%;
    position: relative;
    .t-box{
      cursor: pointer;
      width: 2%;
      position: absolute;
      left:0;
      .r-stateTab{
        padding: 18%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:4px 0 0 0;
        border:1px solid rgba(206,206,206,1);
      }
      .p-designTab{
        padding: 18%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:0 0 0 4px;
        border:1px solid rgba(206,206,206,1);
      }
      .tabActive{
        background: #828282;
        color: #fff;
        border: 1px solid #828282;
      }
    }
    .t-box1{
      .r-stateTab{
        font-size: 14px;
      }
      .p-designTab{
        font-size: 14px;
      }
    }

    .clear{
      clear: both;
    }
    .s-box1,.s-box2{
      height: 49%;
      background-color: #F5F5F9;
      overflow: hidden;
      .s-info{
        float: left;
        width:23%;
        height: 100%;
        padding:0 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);

        .deviceActive{
          font-size:20px;
          background: #24BCF7;
          color:#ffffff !important;
          border: 1px solid #24BCF7 !important;
        }
        .i-id{
          font-size: 20px;
          color: rgba(218,218,218,1);
          width:100%;
          height: 8%;
          min-height: 20px;
          margin-top: 10%;
          overflow: hidden;
          .d-model{
            float: left;
            width: 60%;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .d-kind{
            float: right;
            width: 30%;
            min-width: 60px;
            li{
              cursor: pointer;
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              margin-left: 10px;
              float: left;
              border-radius: 50%;
              border: 1px solid #90A4B7;
              font-size: 12px;
              color: #90A4B7;
            }
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
              .s-title1{
                vertical-align: middle;
                margin-right: 10px;
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
            background: url("../../../assets/Modular/JBZ/RState/angle.png") no-repeat;
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
          margin-top: 2%;
          height: 12%;
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

        .deviceActive{
          font-size:20px;
          background: #24BCF7;
          color:#ffffff;
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
          height: calc(100% - 60px);
          div{
            margin-top: 20px;
            float: left;
            text-align: center;
            width: 33%;
          }
        }
        .noConfig{
          width: 100%;
          height: calc(60% - 40px);
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          padding-top: 40%;
        }
      }
      .s-progress{
        float: left;
        width:23%;
        height: calc(100% - 20px);
        padding:10px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .p-box{
          width: 50%;
          height: 50%;
          float: left;
          .p-progress{
            .p-title{
              width: 50%;
              font-size: 12px;
              color: #999999;
              text-align: center;
              position: absolute;
              bottom: -20px;
              //position: relative;
            }
          }
          .p-name{
            width: 40px;
            position: absolute;
            bottom: -22px;

            font-size:12px;
            color:rgba(151,151,151,1);
          }
          .p-completedSteps{
            font-size: 25px;
            font-weight: bold;
          }
          .p-totalSteps{
            font-size: 12px;
          }
          .p-unit{
            font-size: 12px;
          }

          .p-title{
            text-align: center;
            width: 100%;
            height: 30px;
            font-size:14px;
            color:#000000;
          }
          .p-echart{
            width: 100%;
            overflow: hidden;
            height: calc( 100% - 30px);
            .p-progress{
              margin:15% 0 0 40%;
            }
          }
          .p-echart1{
            width: 100%;
            overflow: hidden;
            height: 100%;
            .b-state{
              width: 80%;
              height: 24%;
              margin: 8% auto;
              .s-title{
                width: 100%;
                height: 70%;
                background: #1FBDEE;
                color: #ffffff;
                position: relative;
                span{
                  position: absolute;
                  font-size: 14px;
                  width:100px;
                  height: 12px;
                  top:50%;
                  left:50%;
                  margin-left:-50px;
                  margin-top:-10px;
                  text-align: center;
                }
              }
              .s-title1{
                width: 100%;
                height: 70%;
                color: #000000;
                margin-top: 30%;
                position: relative;
                span{
                  position: absolute;
                  font-size: 14px;
                  width:100px;
                  height: 12px;
                  top:50%;
                  left:50%;
                  margin-left:-50px;
                  margin-top:-10px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .b-statistics{
        float: left;
        height: calc(100% - 20px);
        margin-left: 10px;
        width:calc( 38.5% - 50px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        padding: 10px;
        .b-dashboard{
          width: 100%;
          height: 50%;
          .c-dashboard{
            float: left;
            width: calc(38% - 5px);
            height: 100%;
            .c-option{
              width: 240px;
              margin: 30px auto;
              font-size: 14px;
              li{
                height: 30px;
                .c-name{
                  color: #999999;
                }
                .c-key{
                  color: #666666;
                  font-weight: bold;
                }
              }
            }

          }
          .c-statistics{
            float: left;
            padding-left: 4%;
            height: 100%;
            width: 20%;
            min-width: 70px;
            .s-box{
              width: 100%;
              height: 100%;
              .s-body{
                width: 100%;
                height: 33%;
                .s-num{
                  color: #333333;
                  font-size: 18px;
                  font-weight: bold;
                }
                .s-text{
                  margin-top: 2%;
                  color: #999999;
                  font-size: 12px;
                }
              }
            }
            .s1-box{
              width: 100%;
              height: 100%;
              .s1-body{
                width: 100%;
                height: 20%;
                padding-top: 30%;
                .s1-num{
                  color: #333333;
                  font-size: 16px;
                  font-weight: bold;
                }
                .s1-text{
                  margin-top: 2%;
                  color: #999999;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
      .s-chart{
        float: left;
        height: calc(100% - 40px);
        margin-left: 10px;
        padding: 20px;
        width:calc( 38.5% - 70px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .t-materiel{
          font-size: 18px;
          font-weight: bold;
        }

      }
      .s-chart1{
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 77% - 50px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        position: relative;
        .l-current{
          width: 320px;
          height: 20%;
          margin: 0 auto;
          .c-temperature{
            float: left;
            margin-right: 10px;
            .t-title{
              color: #666666;
              font-weight: bold;
            }
            .t-num{
              color: #F85959;
              font-size: 20px;
              font-weight: bold;
            }
            .t-unit{
              color: #F85959;
              font-size: 12px;
            }
          }
          .c-temperature:last-child{
            float: right;
            margin-right: 0;
          }
        }
      }
    }
    .s-box1{
      padding: 0 0 10px 0;
    }
  }
</style>
