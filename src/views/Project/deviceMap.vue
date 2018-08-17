<template>
<div style="width: 100%;height:100%;">
  <div id="container" style="width: 100%;height: 100%"  >

  </div>
</div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import marker from '@/assets/AMap/marker.png'
  import stateMarker from '@/assets/AMap/marker.png'
export default {
  name: "deviceMap",
  mounted: function () {
    this.init()
  },
  methods:{
    init(){
      let project_id=sessionStorage.getItem('projectId')
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        zoom: 5
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
      let sts=[
        {
          url:marker,
          size:new AMap.Size(32,32),
          offset:new AMap.Pixel(-16,-30)
        },
        {
          url:stateMarker,
          size:new AMap.Size(32,32),
          offset:new AMap.Pixel(-16,-30)
        },
        {
          url:marker,
          size:new AMap.Size(48,48),
          offset:new AMap.Pixel(-24,-45),
          textColor:'#CC0066'
        }
      ];

      deviceList.list({'project_id':project_id}).then(res=>{
        if(res.success){
          var lists=res.result.items;
          JSON.stringify();
          for(var i=0;i<lists.length;i++){
            //console.log(lists[i]);

            if(lists[i].position){
              var marker=new AMap.Marker({
                position:lists[i].position.split(','),
                content: '<div style="background:url('+stateMarker+') no-repeat; height: 40px; width: 30px; border-radius: 12px; "></div>',
                offset: new AMap.Pixel(-15,-15)
              });
              marker.on('click',function (e) {

              });
              // 设置label标签
              marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(-35, -25),//修改label相对于maker的位置
                content: "<div style='background: rgba(102,208,110,1);width: 100px;height: 20px;line-height: 20px;text-align: center;color:#ffffff;'>"+lists[i].product.productCategory.name+"</div>"
              });
              markers.push(marker)
            }else{
              //console.log('没有经纬度')
            }
          }
        }
        //console.log(markers);
        AMap.plugin(["AMap.MarkerClusterer"],function() {
          var cluster = new AMap.MarkerClusterer(map,markers,{styles:sts});
          var a=function(e){
            //console.log('好的')
          };
          cluster.on('click',a)
        });
        //this.items=res.result.items;

        /*this.items.forEach((item,i)=>{
          console.log(item.position.split(','));
          markers.push(new AMap.Marker({
            position:item.position,
            content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            offset: new AMap.Pixel(-15,-15)
          }))
        });*/
      });
      //console.log(markers);

    },
  }
}
</script>

<style scoped>

</style>
