<template>
    <div>
        <div id="container"></div>
        <div class="device">设备总数：{{device.total}} <span style="margin:0 25px">在线数量：{{device.online}}</span> 未激活：{{device.nonactivated}}</div>
    </div>
    
</template>
<script>
export default {
    // props:['stationData'],
    data(){
        return{
            device:{
                total:'300',
                online:'300',
                nonactivated:'300',
            },
            stationData:[]
        }
    },
    components:{
        
    },
    created(){

    },
    mounted(){
        this.initMap()
    },
    methods:{
        initMap(){
            var map = new AMap.Map('container', {
                resizeEnable: true,
                zoom:13,
                center: [120.120248,30.336083],
                mapStyle: "amap://styles/darkblue"
            });
            map.clearMap();  // 清除地图覆盖物

            var markers = []
            this.stationData.forEach(function(data) {
                if(data.position == '') return true
                let item = {
                    position:[data.position.split(',')[0],data.position.split(',')[1]],
                    title:data.name,
                    beginAt:parseTime(data.beginAt,'{y}-{m}-{d}'),
                    endAt:parseTime(data.endAt,'{y}-{m}-{d}'),
                    adminer:data.adminer,
                    url:data.thumbnailUrl+data.thumbnailPath
                }
                let position = [data.position.split(',')[0],data.position.split(',')[1]]
                markers.push(item)
            })

            var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            markers.forEach(function(item,index) {
                let marker = new AMap.Marker({
                    map: map,
                    position: [item.position[0], item.position[1]],
                    offset: new AMap.Pixel(-12, -36),
                    title:item.title,
                });
                marker.content =`<div style="width:290px;height:200px;background:#fff;">
                    <div style="position:relative;width: 290px;height: 130px;background: url('${item.url}');background-size:100% 100%">
                        <div class="info-time">${item.beginAt}<span class="info-Interval"> 至 </span>${item.endAt}</div>
                    </div>
                    <div class="info-title" style="padding-left:15px;line-height:40px;height:40px;">${item.title}</div>
                    <ul class="info-group"><li>软基</li><li>路面</li><li>桥梁</li><li>试验室</li><li>拌和站</li></ul>
                    </div>`

                marker.on('click', markerClick);
            });
            
            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
                map.setZoomAndCenter(14, e.target.getPosition());
            }
            map.setFitView();
        }
    },
    watch:{

    }
}
</script>
<style scoped>
#container{
    width: 900px;height: 460px;
}
.device{
    position: absolute;
    left: 0;
    right: 0;
    top: 410px;
    margin: auto;
    text-align: center
}
</style>
