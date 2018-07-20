<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="70px">
        <z-header></z-header>
      </el-header>
      <div id="container" style="width: 100%;height: 100%">
        <ul id="my-list">
          <div class="pj-title">项目列表</div>
          <ul v-for="(list,index) in lists" :key="index">
            <div @click="close(list,index)" class="list-title"  :class="{isBorder:list.show}">
              <div class="l-name">{{ list.name }}</div>
              <div>
                <i :class="{'el-icon-caret-bottom':!list.show,'el-icon-caret-top':list.show}"></i>
              </div>
            </div>
            <li :id=list.listId   v-show="list.show" class="list-body" ref="listBody" @click="getDom($event)"></li>
          </ul>
        </ul>
      </div>
    </el-container>
  </div>
</template>

<script>
  import { mapActions , mapState} from 'vuex'
  import project from '@/api/userCenter/project'
  import zHeader from '@/components/zHeader'
  import zImg from '@/assets/AMap/info.png'
  import state from '@/assets/AMap/stateMarker.png'
  import toTree from '@/common/toTree'
  import $ from 'jquery'
  export default {
    name: "ProjectEntrance",
    components:{
      zHeader
    },
    data () {
      return {
        isShow:{},
        lists:[]
      };
    },
    mounted: function () {
      this.init()
    },
    created:function(){

    },
    methods: {
      init: function () {
        let _this=this;
        //console.log(sessionStorage.getItem('isActive'));
        sessionStorage.setItem('isActive',0);
        let map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          zoom: 10
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.MapType',], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale());
          map.addControl(new AMap.MapType(
            {defaultType:0,showTraffic:false,position:{top:'100px'}}
          ))
        });

        project.list().then(res=>{
          //console.log(toTree(res.result.items));
          let lists=toTree(res.result.items);
          lists.forEach(function (item) {
            item.show=false;
            item.listId='id'+item.id;
            if(item.children){
              item.children.forEach(function (x) {
                x.listId='id'+x.id
              })
            }
          });
          this.lists=lists;
          this.lists.forEach(function (item) {

            AMapUI.define("polyfill/require/require-css/css!plug/ext/font-awesome/css/font-awesome", [], function () {
              //留空即可
            });
            AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SvgMarker'],
              function(MarkerList, SimpleMarker ,SvgMarker) {

                if (!SvgMarker.supportSvg) {
                  alert('当前环境不支持SVG');
                }
                var markerList = new MarkerList({
                  //关联的map对象
                  map: map,
                  //列表的dom容器的id
                  listContainer: item.listId,

                  //需要监听的列表节点事件
                  listElementEvents: ['click'],

                  //需要监听的marker事件
                  markerEvents: ['click'],

                  //需要监听的infoWindow事件
                  infoWindowEvents: ['click'],

                  //返回数据项的Id
                  getDataId: function(dataItem, index) {
                    //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                    return dataItem.id;
                  },
                  //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                  getPosition: function(dataItem) {
                    return dataItem.position.split(',');
                  },
                  //返回数据项对应的Marker
                  getMarker: function(dataItem, context, recycledMarker) {

                    var content = '<div style="width: 150px;\n' +'text-overflow:ellipsis;'
                    +'overflow:hidden;'
                    +'white-space:nowrap;'+
                      'background:rgba(243,26,26,1);\n' +
                      'border-radius:6px;\n' +
                      'opacity:0.75;font-size:12px;\n' +
                      'color:rgba(255,255,255,1);\n' +
                      'text-align: center;'+
                      'padding: 10px;'+
                      '">' +dataItem.name+
                      '</div>';
                    var label = {
                      offset: new AMap.Pixel(-65, -40), //修改label相对于marker的位置
                      content: content
                    };
                    //返回一个新的Marker
                    return new SimpleMarker({
                      //前景文字
                      label: label,
                      showPositionPoint: true,
                      iconStyle:{
                        src:state
                      },
                      offset: new AMap.Pixel(-19, -50),
                      map: map,
                      id:dataItem.id
                    });
                  },
                  //返回数据项对应的列表节点
                  getListElement: function(dataItem, context, recycledListElement) {
                    var tpl ='<p class=<%- dataItem.listId %> style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">'+'<i class="iconfont icon-circularPoint" style="font-size: 30px;margin-right: 10px;vertical-align: middle;"></i>'+'<span style="width: 260px;height: 42px;line-height: 42px; text-overflow:ellipsis;white-space:nowrap; overflow: hidden;font-size: 14px;vertical-align: middle;" class=<%- dataItem.listId %>><%- dataItem.name %>'+'</span>'+'</p>';

                    var content = MarkerList.utils.template(tpl, {
                      dataItem: dataItem,
                      dataIndex: context.index
                    });

                    if (recycledListElement) {
                      //存在可回收利用的listElement, 直接更新内容返回
                      recycledListElement.innerHTML = content;
                      return recycledListElement;
                    }

                    //返回一段html，MarkerList将利用此html构建一个新的dom节点
                    return '<li>' + content + '</li>';
                  },
                  getInfoWindow: function(dataItem, context, recycledInfoWindow) {
                    let projectLogo=dataItem.thumbnailUrl+dataItem.thumbnailPath;
                    _this.$store.dispatch('incrementLogo',projectLogo);
                    //console.log(dataItem);
                    let content='<div style="width:290px;\n' +
                      'height:195px;\n' +
                      'background:rgba(255,255,255,1);\n' +
                      'cursor:pointer;\n'+
                      'box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(0,0,0,0.2);">' +
                      '<div style=" position: relative; width: 290px;height: 130px;background: url(' +dataItem.thumbnailUrl+dataItem.thumbnailPath+
                      ');background-size:100% 100%">' +
                      '<div class="info-time">2018-10-21 12:00</div>'+
                      '</div>'+
                      '<div style="width: 90%;padding-left: 15px">' +
                      '<div class="info-title">' +dataItem.name+
                      '</div>'+
                      '<div class="info-box">' +
                      '<div class="info-type">软基</div>'+'<div class="info-type">路面</div>'+'<div class="info-type">桥梁</div>'+'<div class="info-type">试验室</div>'+'<div class="info-type">拌和站</div>' +
                      '</div>'
                    '</div>'

                    '</div>';

                    //返回一个新的InfoWindow
                    return new AMap.InfoWindow({
                      autoMove: true,
                      offset: new AMap.Pixel(-5, -34),
                      content: content,
                    });
                  }
                });

                markerList.on('listElementClick listElementMouseenter listElementMouseleave ' +
                  'markerClick markerMouseover markerMouseout ' +
                  'infoWindowClick infoWindowMouseover infoWindowMouseout',
                  function(event, record) {
                    var $ = MarkerList.utils.$,
                      template = MarkerList.utils.template;
                  });

                var svgMarker = new SvgMarker(
                  new SvgMarker.Shape.IconFont({
                    symbolJs: '//at.alicdn.com/t/font_716432_na8vly768ks.js',
                    icon:'icon-track1',
                    strokeWidth: 1,
                    size:50,
                  }), {
                    containerClassNames: 'my-svg-marker',
                    showPositionPoint: true
                  });


                markerList.on('selectedChanged', function(event, changedInfo) {

                });

                markerList.on('infoWindowClick',function (event,info) {
                  console.log(info.data);
                  _this.$store.dispatch('incrementId',info.id);
                  _this.$store.dispatch('incrementTenant',info.data.tenant);
                  _this.$router.push('project')
                });

                markerList.on('markerClick',function (event,info) {
                  $('#my-list ul li li').removeClass('selected');
                  for (var i=0;i<$('#my-list p').length;i++){
                    let eventId='id'+event.target.opts.id;
                    if($('#my-list p').eq(i).hasClass(eventId)){
                      $('#my-list p').eq(i).parent().addClass('selected');
                    }
                  }
                  lists.forEach(function (i) {
                    if(item.id!==i.id){
                      i.show=false
                    }
                  });
                  item.show=true;
                  //$('#my-list').css('background','#000000');
                });
                //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
                //展示该数据

                if(item.children){
                  markerList.render(item.children);
                }else {
                  let arr=[];
                  arr.push(item);
                  markerList.render(arr);
                }
              });
          })
        }
        );
      },
      close:function (list,index) {
        this.lists.forEach(i => {
          if (i.show !== this.lists[index].show) {
            i.show = false;
          }
        });
        list.show = !list.show;
        this.isShow=list;
      },
      getDom:function (e) {
        console.log(e.target.className);
        $('#my-list ul li li').removeClass('selected');
        for (var i=0;i<$('#my-list p').length;i++){
            if($('#my-list p').eq(i).hasClass(e.target.className)){
            $('#my-list p').eq(i).parent().addClass('selected');
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-header{
    padding: 15px 20px 15px 40px;
  }
  .el-main{
    padding: 0;
  }

  .poi-title{
    color: black;
  }
  #container{
    border-top: 1px solid #e0e0e0;
    position: relative;
  }
  #my-list{

    cursor: pointer;
    position: absolute;
    z-index:200;
    background: rgba(231,25,25,0.85);
    box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(243,26,26,1);
    border-radius: 5px;
    top: 35px;
    right: 40px;
    width: 260px;
    color: #ffffff;
    padding: 30px;
    .pj-title{
      width: 100%;
      height: 40px;
      margin-bottom: 30px;
      font-size: 24px;
      text-align: center;
    }
    .list-title{
      height: 35px;
      border-bottom: 1px solid rgba(255,255,255,.5);
      margin-top: 20px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
    }
    .list-body{
      width: 260px;
      margin-left: -30px;
      padding: 0 30px;
      background:rgba(0,0,0,.1);
    }
    .l-name{
      width: 200px;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .isBorder{
      border: none;
    }
  }
</style>
