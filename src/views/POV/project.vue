<template>
  <div>
    <!--<ul class="pj-box">
      <li class="pj-body">
        <div class="pj-img">
          <span>软基处理</span>
        </div>
        <div class="pj-data">
          <ul>
            <li class="equipment">设备</li>
            <li class="online">在线</li>
            <li class="statistics">统计</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
        </div>
      </li>
      <li class="pj-body">
        <div class="pj-img">
          <span>软基处理</span>
        </div>
        <div class="pj-data">
          <ul>
            <li class="equipment">设备</li>
            <li class="online">在线</li>
            <li class="statistics">统计</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
        </div>
      </li>
      <li class="pj-body">
        <div class="pj-img">
          <span>软基处理</span>
        </div>
        <div class="pj-data">
          <ul>
            <li class="equipment">设备</li>
            <li class="online">在线</li>
            <li class="statistics">统计</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
        </div>
      </li>
      <li class="pj-body">
        <div class="pj-img">
          <span>软基处理</span>
        </div>
        <div class="pj-data">
          <ul>
            <li class="equipment">设备</li>
            <li class="online">在线</li>
            <li class="statistics">统计</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
        </div>
      </li>
      <li class="pj-body">
        <div class="pj-img">
          <span>软基处理</span>
        </div>
        <div class="pj-data">
          <ul>
            <li class="equipment">设备</li>
            <li class="online">在线</li>
            <li class="statistics">统计</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
          <ul>
            <li class="equipment">双头搅拌桩</li>
            <li class="online">6</li>
            <li class="statistics">10</li>
          </ul>
        </div>
      </li>
    </ul>-->
    <waterfall
      :line-gap="300"
      :min-line-gap="250"
      :max-line-gap="350"
      :single-max-width="400"
      :watch="items">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <!--
          your component
        -->
        <ul class="item pj-box" :style="item.style" :index="item.id">
          <div class="pj-img">
            <span>软基处理</span>
          </div>
          <div class="pj-data">
            <ul>
              <li class="equipment">设备</li>
              <li class="online">在线</li>
              <li class="statistics">统计</li>
            </ul>
            <ul>
              <li class="equipment">双头搅拌桩</li>
              <li class="online">6</li>
              <li class="statistics">10</li>
            </ul>
            <ul>
              <li class="equipment">双头搅拌桩</li>
              <li class="online">6</li>
              <li class="statistics">10</li>
            </ul>
            <ul>
              <li class="equipment">双头搅拌桩</li>
              <li class="online">6</li>
              <li class="statistics">10</li>
            </ul>
            <ul>
              <li class="equipment">双头搅拌桩</li>
              <li class="online">6</li>
              <li class="statistics">10</li>
            </ul>
            <ul>
              <li class="equipment">双头搅拌桩</li>
              <li class="online">6</li>
              <li class="statistics">10</li>
            </ul>
          </div>
        </ul>
      </waterfall-slot>
    </waterfall>
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
        line: 'h',
        items: [
          {id:1,width:260,height:360},
          {id:2,width:260,height:360},
          {id:3,width:260,height:360},
          {id:4,width:260,height:360},
          {id:5,width:260,height:360},
          {id:7,width:260,height:360},
          {id:8,width:260,height:360},
          {id:9,width:260,height:360},
          {id:10,width:260,height:360},
          {id:11,width:260,height:360},
        ],
        isBusy: false
      };
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  /*.pj-box{
    .pj-body{
      float: left;
      margin-left: 50px;
      width:260px;
      height:400px;
      background:rgba(255,255,255,1);
      box-shadow:0 0 5px rgba(144,164,183,0.3);
      .pj-img{
        width: 100%;
        height: 160px;
        line-height: 160px;
        color: #ffffff;
        background: #000000;
        text-align: center;
        font-size: 26px;
      }
      .pj-data ul{
        padding-left: 25px;
        height: 15px;
        margin-top: 20px;
        clear: both;
      }
      .equipment{
        width: 125px;

        float: left;
      }
      .online{
        width: 50px;
        float: left;
      }
      .statistics{
        width: 50px;
        float: left;
      }
    }
  }*/
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  waterfall-slot{
    background: black;
  }
  .item {
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    bottom: 20px;
    font-size: 0.9em;
    color: #666666;
    box-shadow:0px 5px 7px 0px rgba(144,164,183,0.3);
    .pj-img{
      width: 100%;
      height: 160px;
      line-height: 160px;
      color: #ffffff;
      background: #000000;
      text-align: center;
      font-size: 26px;
    }
    .pj-data ul{
      padding-left: 25px;
      height: 15px;
      margin-top: 7%;
      clear: both;
    }
    .equipment{
      width: 50%;
      float: left;
    }
    .online{
      width: 25%;
      float: left;
    }
    .statistics{
      width: 25%;
      float: left;
    }
  }
  /*.item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }*/
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
</style>
