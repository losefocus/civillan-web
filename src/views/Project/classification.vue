<template>
  <div style="padding-left: 3%">
    <waterfall
      :line-gap="300"
      :min-line-gap="250"
      :max-line-gap="350"
      :single-max-width="350"
      :watch="items">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="240"
        :height="320"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="jump(item.name)">
          <div class="pj-img" :style="{ 'background-image': 'url(' + item.ImgUrl + ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
            <div class="pj-mask" >
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="pj-data">
            <ul>
              <li class="equipment">设备</li>
              <li class="online">在线</li>
              <li class="statistics">统计</li>
            </ul>
            <ul v-for="(list,index) in item.lists" :key="index">
              <li class="equipment">{{list.a}}</li>
              <li class="online">{{list.b}}</li>
              <li class="statistics">{{list.c}}</li>
            </ul>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="p-box">
      <div class="p-item" style="width: 300px;margin-bottom: 30px;">
        <h1>杭州市余杭区G80标段项目</h1>
        <div class="pj-details">
          <p>
            杭州高新战略科技城项目是由杭州市政府主导的一个高新战略科技项目，项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情目详情项目详情项目详情项目详情项目详情项目详情
          </p>
        </div>
      </div>
      <div class="p-item" style="width: 200px;margin-bottom: 30px;">
        <div class="t-limit">
          <el-progress type="circle" :percentage="20" color="#F03E41"></el-progress>
          <p class="t-interval">2018-04-08 至 2018-06-06</p>
        </div>
      </div>

      <div class="i-box p-item" style="margin-bottom: 30px;">
        <div style="width: 150px">
          <div class="c-info c-infoM">
            <h2>业主单位</h2>
            <p>浙江科技有限公司</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
          <div class="c-info">
            <h2>监理单位</h2>
            <p>杭州市城管局</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
        </div>
        <div style="width:150px">
          <div class="c-info c-infoM">
            <h2>建设单位</h2>
            <p>浙江科技有限公司</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
          <div class="c-info">
            <h2>设计单位</h2>
            <p>杭州市城管局</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
        </div>
      </div>

      <div class="p-item" style="width: 250px;margin-bottom: 30px;"><div id="AMap"></div></div>
    </div>
  </div>
</template>

<script>
  import deviceGrouping from '@/api/project/deviceGrouping'


  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import Bus from '@/assets/eventBus'
  import softBase from '@/assets/project/softBase.png'
  import subgradePavement from '@/assets/project/subgradePavement.png'
  import bridgeEngineering from '@/assets/project/bridgeEngineering.png'
  import testRoom from '@/assets/project/testRoom.png'
  import mixingStation from '@/assets/project/mixingStation.png'
  export default {
    name: "project",
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        line: 'v',
        imgArr:[
          softBase,
          subgradePavement,
          bridgeEngineering,
          testRoom,
          mixingStation,
        ],
        /*items: [
          { id:1,
            title:'软基处理',
            path:'/project/softBase',
            ImgUrl:softBase,
            lists:[{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:2,
            title:'路基路面',
            path:'/project/softBase',
            ImgUrl:subgradePavement,
            lists:[{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:3,
            title:'桥梁工程',
            path:'/project/softBase',
            ImgUrl:bridgeEngineering,
            lists:[{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:4,
          title:'实验室',
          path:'/project/softBase',
          ImgUrl:testRoom,
          lists:[{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          }]
        },
          { id:5,
          title:'拌和站',
          path:'/project/softBase',
          ImgUrl:mixingStation,
          lists:[{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          }]
        }
        ],*/
        items:[],
        isBusy: false
      };
    },
    mounted(){
      this.init();
    },
    created(){
      deviceGrouping.list().then(res=>{
        console.log(res);
        this.items=res.result.items
      })
    },
    methods: {
      init:function () {
        let map = new AMap.Map('AMap', {
          center: [116.397428, 39.90923],
          zoom: 6
        });
      },
      jump(title){
        this.$router.push('/project/softBase');
        Bus.$emit('Title', title);
      }
    }
  }
</script>

<style scoped lang="scss">

  .el-mian{

  }
  .item-move {
    transition: all .4s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .item {
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 30px;
    bottom: 30px;
    font-size: 0.9em;
    color: #666666;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .pj-img{
      width: 100%;
      height: 160px;
      line-height: 160px;
      color: #ffffff;
      text-align: center;
      font-size: 26px;
      .pj-mask{
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.4);
      }
    }
    .pj-data {
      ul{
        font-weight: bold;
        font-size: 14px;
        padding-left: 25px;
        height: 15px;
        margin-top: 6%;
        clear: both;
      }
    }
    .equipment{
      width: 50%;
      float: left;
      color: #666666;
    }
    .online{
      width: 25%;
      float: left;
      color: #333333;
    }
    .statistics{
      width: 25%;
      float: left;
      color: #666666;
    }
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }

  .p-box {
    width: 94%;
    padding: 30px 30px 0  30px;
    background: #ffffff;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-flow:row  wrap;

    .pj-details{
      margin-top: 16px;
      width:285px;
      height:120px;
      font-size:12px;
      color:rgba(153,153,153,1);
      line-height:24px;
    }
    .t-limit{
      text-align: center;
      .t-title{
        position: absolute;
        left:10px;
        top:10px;
      }
      .t-interval{
        font-size: 14px;
        color: #666666;
      }
    }
    .i-box{
      display: flex;
      justify-content: space-between;
      .c-info{
        p{
          margin-top: 8px;
          font-size:12px;
          color:rgba(102,102,102,1);
          line-height:17px;
        }
      }
      .c-infoM{
        margin-bottom: 24px;
      }
      .l-man{
        margin-right: 12px;
      }
    }


    #AMap{
      width: 100%;
      height: 180px;
    }
  }
</style>
