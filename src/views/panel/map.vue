<template>
    <div>
        <div id="container"></div>
        <div class="device" v-show="showsum">设备总数：{{device.total}} <span style="margin:0 25px">在线数量：{{device.online}}</span> 未激活：{{device.nonactivated}}</div>
    </div>
    
</template>
<script>
import panel from '@/api/panel/index'
import JBZ from '@/assets/panel/JBZ.png'
import PMHNT from '@/assets/panel/PMHNT.png'
import GYXPZ from '@/assets/panel/GYXPZ.png'
import PLYH from '@/assets/panel/PLYH.png'
import YYLYJ from '@/assets/panel/YYLYJ.png'
import YYLZL from '@/assets/panel/YYLZL.png'

export default {
    props:['interval','showsum'],
    data(){
        return{
            iconType:{
                JBZ:JBZ,
                PMHNT:PMHNT,
                GYXPZ:GYXPZ,
                PLYH:PLYH,
                YYLYJ:YYLYJ,
                YYLZL:YYLZL,
            },
            device:{
                total:'0',
                online:'0',
                nonactivated:'0',
            },
            stationData:[],
            map:null
        }
    },
    components:{
        
    },
    created(){
        
    },
    mounted(){
        this.initMap()
        setInterval(this.getList,this.interval)
    },
    methods:{
        initMap(){
            this.map = new AMap.Map('container', {
                resizeEnable: true,
                zoom:13,
                center: [120.120248,30.336083],
                mapStyle: "amap://styles/darkblue"
            });
            this.map.clearMap();  // 清除地图覆盖物
            this.getList()
            
        },
        getList(){
            
            panel.list({projectId:this.$route.query.id}).then(res => {
                this.map.clearMap();  // 清除地图覆盖物
                this.stationData = res.result.data
                this.device = {
                    total:res.result.statusCount.total,
                    online:res.result.statusCount['11'] | 0,
                    nonactivated:res.result.statusCount['0'] | 0,
                }
                var markers = []
                this.stationData.forEach((data) => {
                    if(data.position == '') return true
                    let item = {
                        position:[data.position.split(',')[0],data.position.split(',')[1]],
                        title:data.name,
                        type:data.type
                    }
                    markers.push(item)
                })
                markers.forEach((item,index) => {
                    var icon = new AMap.Icon({
                        size: new AMap.Size(34, 34),
                        image: this.iconType[item.type],
                        imageSize: new AMap.Size(34, 34),
                    });
                    let marker = new AMap.Marker({
                        map: this.map,
                        icon: icon,
                        position: [item.position[0], item.position[1]],
                        offset: new AMap.Pixel(-17, -17),
                        title:item.title,
                    });
                });
                this.map.setFitView();
            })
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
