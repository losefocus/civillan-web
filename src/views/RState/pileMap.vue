<template>
  <div class="mycanvas" style="width: 100%;height: 100%;">
    <!-- <div id="map" style="width:100%;height:100%;"></div> -->
    <canvas  id="canvas" width="100%" height="100%" ></canvas>
  </div>
</template>
<script>
  export default {
    props:["dataInfo"],
    data(){
      return{
        maxLon:null, minLon:null, maxLat:null, minLat:null,
        canvas:null,
        width:1,
        height:1,
      }
    },
    components:{

    },
    created(){},
    mounted(){
      this.init();
    },
    methods:{
      init(){
        var context;
        this.canvas = document.getElementById('canvas');
        context = this.canvas.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 800, 800);

        //桩数据
        let ps = this.dataInfo.ps;
        //当前桩
        var current = this.dataInfo.pile_id//{lon:120.042071817, lat:30.862442958,title:"A8"};
        //画布坐标显示范围
        let laglgn = current.content;
        let lng_,lat_,title
        laglgn.every(res=>{
          if(res.label == "pile_position"){
            this.minLon = parseFloat(res.value.split(",")[0]) - 0.00006;
            this.minLat = parseFloat(res.value.split(",")[1]) + 0.00006;
            this.maxLon = parseFloat(res.value.split(",")[0]) + 0.00006;
            this.maxLat = parseFloat(res.value.split(",")[1]) - 0.00006;
            lng_ = res.value.split(",")[0]
            lat_ = res.value.split(",")[1]
            title = current.name.split('_')[2]
            console.log(title)
            return false
          }
        });
        ps.forEach(ll => {

          let markerColor = "#726763"
          if(ll.status == 0) markerColor = '#72676333'
          else if(ll.status == 1) markerColor = '#726763'
          else if(ll.status == 2) markerColor = '#66D06E'
          ll.content.every(res=>{
            if(res.label == "pile_position"){
              drawPoint(this.mapToScreen(res.value.split(",")[0], res.value.split(",")[1],ll.name.split('_')[2]),markerColor, "#FFFFFF")
              return false
            }
          })
        });

        drawPoint(this.mapToScreen(lng_, lat_,title),"#66D06E", "#fff")
        document.onmousemove = this.mouseMove;

        //画桩位MARK
        function drawPoint(point,bgColor,fontColor) {
          //console.log(point);
          context.fillStyle = bgColor;
          context.beginPath();
          context.arc(point.x, point.y, 15, 0, Math.PI * 2, true);
          context.closePath();
          context.fill();

          context.fillStyle = fontColor;//颜色
          context.font = "normal 12px 微软雅黑";//字体
          context.textBaseline = "middle";//竖直对齐
          context.textAlign = "center";//水平对齐　
          context.fillText(point.title, point.x, point.y, 50);//绘制文字

        }
      },
      //地理坐标转换为屏幕坐标
      //longitude 经度  120.248333
      //latitude  纬度  30.340919
      mapToScreen(longitude, latitude, title) {
        var scaleX, scaleY, screenX, screenY, X, Y, minX, minY;

        scaleX = ((this.maxLon - this.minLon) * 3600) / this.width;
        scaleY = ((this.maxLat - this.minLat) * 3600) / this.height;

        screenX = longitude * 3600 / scaleX;
        screenY = latitude * 3600 / scaleY;

        minX = this.minLon * 3600 / scaleX;
        minY = this.minLat * 3600 / scaleY;

        X = (longitude - this.minLon) * 3600 / scaleX;
        Y = (this.maxLat - latitude) * 3600 / scaleY;

        let tit = (title)?title:''
        return { x: X, y: Y, title: tit };
      },
      mousePosition(ev) {
        if (ev.pageX || ev.pageY) {
          return { x: ev.pageX, y: ev.pageY };
        }
        return {
          x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
          y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
      },
      mouseMove(ev) {
        ev = ev || window.event;
        var mousePos = this.mousePosition(ev);
        // document.getElementById('x').innerHTML = "X:" + mousePos.x;
        // document.getElementById('y').innerHTML = "Y:" + mousePos.y;
      }
    },
    watch:{
      dataInfo:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.init()
        },
      }
    }
  }
</script>
<style scoped>
  .mycanvas{
    width: 100%;
    height: 100%;
    margin: auto;
  }


</style>
