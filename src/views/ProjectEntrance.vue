<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="70px">
        <z-header></z-header>
      </el-header>
      <div id="container" style="width:100%; height:100%">
        <ul id="my-list">
          <div class="pj-title">项目列表</div>
          <ul v-for="(list,index) in lists" :key="index">
            <div @click="close(list,index)" class="list-title"  :class="{isBorder:list.show}">
              <div>{{ list.city }}</div>
              <div>
                <i :class="{'el-icon-caret-bottom':!list.show,'el-icon-caret-top':list.show}"></i>
              </div>
            </div>
            <li :id=list.id   v-show="list.show" class="list-body" ref="listBody" @click="getDom($event)"></li>
          </ul>
        </ul>
      </div>
    </el-container>
  </div>
</template>

<script>
  import zHeader from '@/components/zHeader'
  import zImg from '@/assets/AMap/info.png'
  import state from '@/assets/AMap/stateMarker.png'
  import location from '@/assets/AMap/location.png'
  import toTree from '@/assets/toTree'
  import $ from 'jquery'
  export default {
    name: "ProjectEntrance",
    components:{
      zHeader
    },
    data () {
      return {
        isShow:{},
        lists:[{
          id: 'A',
          position: [116.025764, 39.904989],
          desc: '数据_1',
          city:'杭州项目',
          show:true,
          child:[
            {
              id: 'A',
              position: [120.203358,30.258216],
              desc: '杭州高新战略科技城区'
            },{
              id: 'B',
              position: [121.472279,31.230749],
              desc: '上海高新战略科技城区'
            },{
              id: 'B1',
              position: [87.573963,43.776682],
              desc: '乌鲁木齐高新战略科技城区'
            }
          ]
        }, {
          id: 'B',
          position: [116.405285, 39.904989],
          desc: '数据_2',
          city:'上海项目',
          show:false,
          child:[
            {
              id: 'C',
              position: [112.886463,28.332528],
              desc: '长沙高新战略科技城区'
            },{
              id: 'D',
              position: [117.1162,39.171895],
              desc: '天津高新战略科技城区'
            },{
              id: 'E',
              position: [116.325184,39.883694],
              desc: '北京高新战略科技城区'
            }
          ]
        }, {
          id: 'C',
          city:'北京项目',
          position: [116.789806, 39.904989],
          desc: '数据_3',
          show:false,
          child:[
            {
              id: 'F',
              position: [117.160145,31.867391],
              desc: '安徽高新战略科技城区'
            },{
              id: 'G',
              position: [114.072987,22.572528],
              desc: '深圳高新战略科技城区'
            }
          ]
        }],
        data2:[
          { adminer: "1",
            beginAt: 1,
            comment: "1",
            createdAt: 1,
            createdBy: 1,
            endAt: 1,
            id: 1,
            name: "北京高新战略科技城区",
            parentId: 0,
            position: "120.128857,30.229929",
            status: 1,
            tags: "1",
            tenant: "21fe87251b01541399c7c1a8cec741c5",
            updatedAt: 1,
            updatedBy: 1
          },
          { adminer: "2",
            beginAt: 1,
            comment: "1",
            createdAt: 1,
            createdBy: 1,
            endAt: 1,
            id: 2,
            name: "北京高新战略科技城区",
            parentId: 1,
            position: "120.128857,30.229929",
            status: 1,
            tags: "1",
            tenant: "21fe87251b01541399c7c1a8cec741c5",
            updatedAt: 1,
            updatedBy: 1
          },
          { adminer: "3",
            beginAt: 1,
            comment: "1",
            createdAt: 1,
            createdBy: 1,
            endAt: 1,
            id: 3,
            name: "北京",
            parentId: 2,
            position: "120.128857,30.229929",
            status: 1,
            tags: "1",
            tenant: "21fe87251b01541399c7c1a8cec741c5",
            updatedAt: 1,
            updatedBy: 1
          },
          { adminer: "4",
            beginAt: 1,
            comment: "1",
            createdAt: 1,
            createdBy: 1,
            endAt: 1,
            id: 4,
            name: "北京",
            parentId: 1,
            position: "120.128857,30.229929",
            status: 1,
            tags: "1",
            tenant: "21fe87251b01541399c7c1a8cec741c5",
            updatedAt: 1,
            updatedBy: 1
          },{ adminer: "5",
            beginAt: 1,
            comment: "1",
            createdAt: 1,
            createdBy: 1,
            endAt: 1,
            id: 5,
            name: "北京",
            parentId: 4,
            position: "120.128857,30.229929",
            status: 1,
            tags: "1",
            tenant: "21fe87251b01541399c7c1a8cec741c5",
            updatedAt: 1,
            updatedBy: 1
          }
        ]
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


        /*this.$api.list.list().then(res=>{
          console.log(res.data.result);
          var data=res.data.result;
        }
        ).catch( err=>
          console.log('asd')
        );*/
        //console.log(this.data2);
        var data=this.data2;

        //console.log(toTree(data));
        var _MList=[];

        var _unSelected={};
        var _markerShow={};
        var _lists= this.lists;
        this.lists.forEach(function (item) {
          AMapUI.define("polyfill/require/require-css/css!plug/ext/font-awesome/css/font-awesome", [], function () {
            //留空即可
          });
          AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SvgMarker'],
            function(MarkerList, SimpleMarker ,SvgMarker) {

              if (!SvgMarker.supportSvg) {
                alert('当前环境不支持SVG');
              }
              /*map.addControl(new BasicControl.LayerSwitcher({
                position: 'rb' //right top，右上角
              }));*/
              var markerList = new MarkerList({
                //关联的map对象
                map: map,
                //列表的dom容器的id
                listContainer: item.id,

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
                  return dataItem.position;
                },
                //返回数据项对应的Marker
                getMarker: function(dataItem, context, recycledMarker) {

                  var content = '<div style="width: auto;\n' +
                    'background:rgba(243,26,26,1);\n' +
                    'border-radius:6px;\n' +
                    'opacity:0.75;font-size:12px;\n' +
                    'color:rgba(255,255,255,1);\n' +
                    'text-align: center;'+
                    'padding: 10px;'+
                    '">' +dataItem.desc+
                    '</div>';
                  var label = {
                    offset: new AMap.Pixel(-40, -40), //修改label相对于marker的位置
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
                  var tpl ='<p class=<%- dataItem.id %>>'+'<i class="iconfont icon-circularPoint" style="font-size: 30px;margin-right: 10px;vertical-align: middle;"></i>'+'<span style="width: 260px;height: 42px;line-height: 42px; text-overflow:ellipsis;white-space:nowrap; overflow: hidden;font-size: 16px;vertical-align: middle;" class=<%- dataItem.id %>><%- dataItem.desc %>'+'</span>'+'</p>';

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
                  let content='<div style="width:290px;\n' +
                    'height:195px;\n' +

                    'background:rgba(255,255,255,1);\n' +
                    'cursor:pointer;\n'+
                    'box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(0,0,0,0.2);">' +
                    '<div style=" position: relative; width: 290px;height: 130px;background: url(' +zImg+
                    ')">' +

                    '<div style="width:120px;\n' +
                    'height:27px;\n' +
                    'background:rgba(243,26,26,0.8);\n' +
                    'border-radius:100px 0px 0px 100px;\n' +
                    'position:absolute;right: 0;bottom: 10px;color: #ffffff;text-align: center;line-height: 27px;font-size: 12px;">2018-10-21 12:00</div>'+
                    '</div>'+
                    '<div style="width: 90%;padding-left: 15px">' +
                    '<div style="width: 230px;height: 36px;font-size:16px;line-height: 36px;font-weight: bold;font-family:PingFangSC-Medium;">' +dataItem.desc+
                    '</div>'+
                    '<div style="display: flex;justify-content: space-between;width: 100%;">' +
                    '<div style="width:46px;\n' +
                    'height:19px;\n' +
                    'font-size :12px;\n' +
                    'text-align :center;\n' +
                    'line-height :19px;\n' +
                    'color :#ffffff;\n' +
                    'background:rgba(233,78,78,1);\n' +
                    'border-radius:2px;">软基</div>'+'<div style="width:46px;\n' +
                    'height:19px;\n' +
                    'font-size :12px;\n' +
                    'text-align :center;\n' +
                    'line-height :19px;\n' +
                    'color :#ffffff;\n' +
                    'background:rgba(173,173,173,1);\n' +
                    'border-radius:2px;">路面</div>'+'<div style="width:46px;\n' +
                    'height:19px;\n' +
                    'font-size :12px;\n' +
                    'text-align :center;\n' +
                    'line-height :19px;\n' +
                    'color :#ffffff;\n' +
                    'background:rgba(173,173,173,1);\n' +
                    'border-radius:2px;">桥梁</div>'+'<div style="width:46px;\n' +
                    'height:19px;\n' +
                    'font-size :12px;\n' +
                    'text-align :center;\n' +
                    'line-height :19px;\n' +
                    'color :#ffffff;\n' +
                    'background:rgba(173,173,173,1);\n' +
                    'border-radius:2px;">试验室</div>'+'<div style="width:46px;\n' +
                    'height:19px;\n' +
                    'font-size :12px;\n' +
                    'text-align :center;\n' +
                    'line-height :19px;\n' +
                    'color :#ffffff;\n' +
                    'background:rgba(173,173,173,1);\n' +
                    'border-radius:2px;">拌和站</div>' +
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

              //监听选中改变
              //创建一个SquarePin，显示在选中的Marker位置
              /*var svgMarker = new SvgMarker(
                new SvgMarker.Shape.IconFont({

                  icon:'icon-track1',
                  size:50,
                }));*/
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

                /*var selectedRecord = changedInfo.selected,
                  marker;
                if(_unSelected.id){
                  map.remove(_unSelected);
                  marker = selectedRecord.marker;
                  marker.hide();
                  _markerShow.show();
                  svgMarker.setMap(marker.getMap());
                  svgMarker.setPosition(marker.getPosition());
                  //svgMarker.setIconLabel(selectedRecord.id);
                  svgMarker.show();

                  _markerShow=marker;
                  _unSelected=svgMarker;
                  _unSelected.id='0'
                }else{
                  marker = selectedRecord.marker;
                  marker.hide();
                  _markerShow=marker;

                  svgMarker.getOffset([-300,-100]);
                  svgMarker.setMap(marker.getMap());
                  svgMarker.setPosition(marker.getPosition());
                  //svgMarker.setIconLabel(selectedRecord.id);
                  svgMarker.show();

                  _unSelected=svgMarker;
                  _unSelected.id='1'
                }*/
              });

              markerList.on('infoWindowClick',function (event,info) {
                _this.$router.push('project')
              });

              markerList.on('markerClick',function (event,info) {
                /*$('#my-list ul li li').removeClass('selected');
                for (var i=0;i<$('#my-list p').length;i++){
                  if($('#my-list p').eq(i).hasClass(event.target.opts.id)){
                    $('#my-list p').eq(i).parent().addClass('selected');
                  }
                }*/
                _lists.forEach(function (i) {
                  if(item.id!==i.id){
                    i.show=false
                  }
                });
                item.show=true;
                //$('#my-list').css('background','#000000');
              });
              //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
              //展示该数据
              markerList.render(item.child);
            });
        })
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
    padding: 15px 40px;
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
    z-index: 2;
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
      font-size: 26px;
      text-align: center;
    }
    .list-title{
      height: 35px;
      border-bottom: 1px solid rgba(255,255,255,.5);
      margin-top: 20px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
    }
    .list-body{
      width: 260px;
      margin-left: -30px;
      padding: 0 30px;
      background:rgba(0,0,0,.1);
    }
    .isBorder{
      border: none;
    }
  }
</style>
