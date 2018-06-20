<template>
  <div>
    <waterfall
      :line-gap="300"
      :min-line-gap="290"
      :max-line-gap="330"
      :single-max-width="400"
      :watch="items">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="240"
        :height="330"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="jump(item.path)">
          <div class="pj-img">
            <div class="pj-mask">
              <span>{{item.title}}</span>
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
    <el-row>
      <el-col :span="6">
        <h1>杭州市余杭区G80标段项目</h1>
        <div class="pj-details">
          <p>
            杭州高新战略科技城项目是由杭州市政府主导的一个高新战略科技项目，项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情目详情项目详情项目详情项目详情项目详情项目详情
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="t-limit">

          <el-progress type="circle" :percentage="20" color="#F03E41"></el-progress>
          <p class="t-interval">2018-04-08 至 2018-06-06</p>
        </div>

      </el-col>
      <el-col :span="3">
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
      </el-col>
      <el-col :span="3">
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
      </el-col>
      <el-col :span="6"><div id="AMap"></div></el-col>
    </el-row>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: "project",
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        line: 'v',
        items: [
          { id:1,
            title:'软基处理',
            path:'/project/softBase',
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
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:2,
            title:'路基路面',
            path:'/project/softBase',
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
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:3,
            title:'桥梁工程',
            path:'/project/softBase',
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
            },{
              a:'双头搅拌桩',
              b:'6',
              c:'10'
            }]
          },
          { id:4,
          title:'实验室',
            path:'/project/softBase',
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
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          }]
        },
          { id:5,
          title:'拌和站',
          path:'/project/softBase',
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
          },{
            a:'双头搅拌桩',
            b:'6',
            c:'10'
          }]
        }
        ],
        isBusy: false
      };
    },
    mounted(){
      this.init()
    },
    methods: {
      init:function () {
        let map = new AMap.Map('AMap', {
          center: [116.397428, 39.90923],
          zoom: 6
        });
      },
      jump(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .item {
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 30px;
    bottom: 20px;
    font-size: 0.9em;
    color: #666666;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .pj-img{
      width: 100%;
      height: 160px;
      line-height: 160px;
      color: #ffffff;
      background: url(../../assets/project/softBase.png) no-repeat;
      background-size: 100% 100%;
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

  .el-row {
    width: 98.2%;
    padding: 30px;
    background: #ffffff;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
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
    #AMap{
      width: 100%;
      height: 180px;
    }
  }
</style>
