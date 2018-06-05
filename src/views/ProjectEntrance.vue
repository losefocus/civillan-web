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
            <div @click="close(list,index)" class="list-title"  :class="{isBorder:list.show}">{{ list.city }}</div>
            <li :id=list.id   v-show="list.show" class="list-body" ref="listBody" @click="getDom($event)"></li>
          </ul>
          <!--<li class="list-header" v-for="(list,index) in lists" :key="index" >
            <div @click="close(list,index)" >{{ list.city }}</div>
            <ul v-if="list.child" v-show="list.show">
              <li :class="" v-for="(childLIst,cIndex) in list.child" :key="cIndex" @click="showMap(childLIst,cIndex)">
                {{ childLIst.desc}}
              </li>
            </ul>
          </li>-->
        </ul>
      </div>
    </el-container>
  </div>
</template>

<script>
  import zHeader from '@/components/zHeader'
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
              position: [116.405125, 39.904989],
              desc: '北京'
            },{
              id: 'B',
              position: [116.789456, 39.904989],
              desc: '上海'
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
              position: [116.405345, 39.904989],
              desc: '广州'
            },{
              id: 'D',
              position: [116.784506, 39.904989],
              desc: '天津'
            },{
              id: 'E',
              position: [116.787606, 39.904989],
              desc: '安徽'
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
              position: [116.408985, 39.904989],
              desc: '合肥'
            },{
              id: 'G',
              position: [116.781206, 39.904989],
              desc: '深圳'
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
            name: "北京",
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
            name: "北京",
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
        var _this=this;
        console.log(this)
        let map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          zoom: 6
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale())
        });

        /*this.$api.list.list().then(res=>{
          console.log(res.data.result);
          var data=res.data.result;
        }
        ).catch( err=>
          console.log('asd')
        );*/
        //console.log(this.data2);
        var data=this.data2

        //console.log(toTree(data));
        var _MList=[];
        var _lists= this.lists
        this.lists.forEach(function (item,i) {
          AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
            function(MarkerList, SimpleMarker, SimpleInfoWindow) {
              var markerList = new MarkerList({
                //关联的map对象
                map: map,
                //列表的dom容器的id
                listContainer: item.id,

                //需要监听的列表节点事件
                listElementEvents: ['click', 'mouseenter', 'mouseleave'],

                //需要监听的marker事件
                markerEvents: ['click', 'mouseover', 'mouseout'],

                //需要监听的infoWindow事件
                infoWindowEvents: ['click', 'mouseover', 'mouseout'],

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

                  var content = '标注: ' + (context.index + 1) + '';
                  var label = {
                    offset: new AMap.Pixel(-6, -23), //修改label相对于marker的位置
                    content: content
                  };

                  //存在可回收利用的marker
                  /*if (recycledMarker) {
                    //直接更新内容返回
                    recycledMarker.setIconLabel(label);
                    return recycledMarker;
                  }*/

                  //返回一个新的Marker
                  return new SimpleMarker({
                    //前景文字
                    iconLabel: 'A',
                    label: label,
                    //图标主题
                    iconTheme: 'default',

                    //背景图标样式
                    iconStyle: 'red',
                    //...其他Marker选项...，不包括content
                    map: map,
                    position: [116.405285, 39.904989],
                    id:'123'
                  });
                },
                //返回数据项对应的列表节点
                getListElement: function(dataItem, context, recycledListElement) {
                  var tpl = '<p style="height: 35px;line-height: 35px"><%- dataItem.id %>：<%- dataItem.desc %>';

                  var content = MarkerList.utils.template(tpl, {
                    dataItem: dataItem,
                    dataIndex: context.index
                  });

                  /*if (recycledListElement) {
                    //存在可回收利用的listElement, 直接更新内容返回
                    recycledListElement.innerHTML = content;
                    return recycledListElement;
                  }*/

                  //返回一段html，MarkerList将利用此html构建一个新的dom节点
                  return '<li>' + content + '</li>';
                },
                getInfoWindow: function(dataItem, context, recycledInfoWindow) {

                  //返回一个新的InfoWindow
                  return new SimpleInfoWindow({
                    offset: new AMap.Pixel(0, -57),
                    infoTitle:dataItem.id,
                    infoBody: '<p class="my-desc">'+dataItem.desc +'<strong>这里是内容。</strong> <br/> 高德地图 JavaScript API，是由 JavaScript 语言编写的应用程序接口，' +
                    '它能够帮助您在网站或移动端中构建功能丰富、交互性强的地图应用程序</p>'+'<img src="../assets/info.png">',
                  });
                }
              });

              markerList.on('listElementClick listElementMouseenter listElementMouseleave ' +
                'markerClick markerMouseover markerMouseout ' +
                'infoWindowClick infoWindowMouseover infoWindowMouseout',
                function(event, record) {
                  var $ = MarkerList.utils.$,
                    template = MarkerList.utils.template;
                  /*$('#eventInfo').html(template('<%- record.id%>: <%- record.data.desc %>' +
                    '<div class="eventType"><%- event.type %></div>', {
                    event: event,
                    record: record
                  }));*/
                });

              //监听选中改变
              //console.log(markerList);
              markerList.on('selectedChanged', function(event, record) {
                //console.log(event,info);
                //console.log(this._opts)
              });
              markerList.on('infoWindowClick',function (event,info) {
                //console.log(event);
                _this.$router.push('project')
              });


              markerList.on('markerClick',function (event,info) {
                console.log(event)
                console.log($('#my-list ul li li').length);
                var n=0;
                var arr=[]
                for (var i=0;i<$('#my-list ul li li').length;i++){
                  if($('#my-list ul li li').eq(i).hasClass('selected')){
                    console.log(i);
                    arr.push(i);
                  }
                }
                console.log(arr);

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
          };
        });
        list.show = !list.show;
        console.log(list);
        this.isShow=list;
      },
      getDom:function (e) {
        if(e.target.parentNode.className.indexOf('selected') ==-1){
          this.$refs.listBody.forEach(item => {
            //console.log(item)
            item.childNodes.forEach(i => {
              function removeClass( elements,cName ) {
                elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
              }
              removeClass(i,'selected');
              //console.log(i)
            })
          })
        }else{
          console.log('okkkk')
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
    position: relative;
  }
  #my-list{
    position: absolute;
    z-index: 99999;
    background: #E71919;
    border-radius: 5px;
    top: 35px;
    right: 40px;
    width: 260px;
    color: #ffffff;
    padding: 30px;
    .pj-title{
      width: 100%;
      height: 40px;
      font-size: 26px;
      text-align: center;
    }
    .list-title{
      height: 30px;
      border-bottom: 1px solid rgba(255,255,255,.5);
      margin-top: 10px;
    }
    .list-body{
      width: 220px;
      margin-left: -30px;
      padding: 5px 50px;
      background:rgba(0,0,0,.1);
    }
    .isBorder{
      border: none;
    }
  }
</style>
