<template>
   <div id="pileMap" style="width: 100%;height: 100%"></div>
</template>

<script>
  import config from '@/api/configure/config.js'
export default {
  name: "pileMap",
  data(){
    return{
      post_data:{ //主列表请求参数
        page_index:1,
        page_size:50
      }
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(post_data){
      let _this=this;
      /*this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });*/
      let map = new AMap.Map('pileMap', {
        center: [116.397428, 39.90923],
        zoom: 20
      });
      /*AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.MapType'], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.MapType(
          {defaultType:0,showTraffic:false,position:{top:'100px'}}
        ))
      });*/
      //获取设备列表
      let cluster, markers = [];
      let marker;

      config.list(this.post_data).then(res=>{
        //console.log(res);
        if(res.success){
          res.result.items.forEach(item=>{
            let content=JSON.parse(item.content);

            for(let i=0;i<content.length;i++){
              if(content[i].label=='pile_position'){
                marker=new AMap.Marker({
                  position:content[i].value.split(','),
                  offset: new AMap.Pixel(-15,-15),
                });
                break;
              }
            }
            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
              offset: new AMap.Pixel(-140, -25),//修改label相对于maker的位置
            });
            map.add(marker);
            map.setFitView();
          })
        }else{
          console.log('CAD数据获取失败')
        }
      })

      /*deviceList.list(post_data).then(res=>{
        //接口成功
        if(res.success){
          let lists=res.result.items;
          let infoWindow= new AMap.InfoWindow({offset: new AMap.Pixel(0, 5)});
          for(let i=0;i<lists.length;i++){
            //console.log(lists[i]);
            //判断设备是否有经纬度
            if(lists[i].position){
              //设备的运行状态
              deviceData.list({key:lists[i].key}).then(res =>{
                if(res.success){
                  let changeMarker = null;
                  let changeBackground= null;
                  let changeColor=null;
                  if(res.success){
                    changeMarker = runningMarker;
                    changeBackground = 'runningBackground';
                    changeColor = 'runningColor'
                  }else{
                    changeMarker = deviceMarker;
                    changeBackground = 'noBackground';
                    changeColor = 'noColor'
                  }
                  marker=new AMap.Marker({
                    position:lists[i].position.split(','),
                    content: '<div style="background:url('+changeMarker+') no-repeat; height: 40px; width: 32px; border-radius: 12px; "></div>',
                    offset: new AMap.Pixel(-15,-15),
                    lists:lists[i]
                  });
                  marker.on('click',function (e) {
                    console.log(e.target);
                    let items=e.target.G.lists;

                    let content='<div class="info-container device_details">' +
                      '<div style=" position: relative; width: 200px;height: 150px;background: url(' +items.thumbnailBaseUrl+items.thumbnailPath+
                      ');background-size:100% 100%">' +
                      '</div>'+
                      '<div class="info-content">' +
                      '<div class="info-title1">' +items.name+
                      '</div>'+
                      '<span class='+changeColor+'></span>'+
                      '</div>'+
                      '</div>';
                    AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                      infoWindow = new SimpleInfoWindow({
                        infoBody: content,
                        //基点指向marker的头部位置
                        offset: new AMap.Pixel(-4, -10)
                      });

                      infoWindow.get$InfoBody().on('click', '.device_details', function(event) {
                        //阻止冒泡
                        event.stopPropagation();
                        _this.dialogVisible=true;
                        _this.deviceName=items.name;
                        sessionStorage.setItem('deviceName',items.name);
                        _this.deviceKey=items.key;
                        console.log(items.name)
                      });
                      infoWindow.open(map, e.target.getPosition());
                    });
                    console.log(e.target.G.lists);

                    //console.log(e.target.getPosition());
                    //infoWindow.setContent(content);
                    infoWindow.open(map, e.target.getPosition());
                    map.setCenter(e.target.getPosition());
                  });
                  // 设置label标签
                  marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(-140, -25),//修改label相对于maker的位置
                    content:"<div class='deviceLabelBox'>"+"<span class="+changeBackground+">"+lists[i].name+"</span>"+"</div>"
                  });
                  map.add(marker);
                  map.setFitView();
                  markers.push(marker);
                  this.loading.close();
                }else{
                  //_this.$message.error(res.message);
                  _this.loading.close();
                }
              });
            }else{
              //console.log('没有经纬度')
              _this.loading.close();
            }
          }
        }else {
          _this.loading.close();
          that.$message.error(res.message)
        }
      });*/
    }
  }
}
</script>

<style scoped>

</style>
