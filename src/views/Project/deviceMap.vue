<template>
<div style="width: 100%;height: 100%">
  <div id="container" style="width: 100%;height: 100%"  >

  </div>
</div>
</template>

<script>
export default {
  name: "deviceMap",
  mounted: function () {
    this.init()
  },
  methods:{
    init(){
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
    }
  }
}
</script>

<style scoped>

</style>
