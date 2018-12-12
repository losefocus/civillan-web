<template>
    <div class="info">
        <div class="tit">杭宁高速公路父子岭至南庄兜路段改扩建工程 —— 第三标段 </div>
        <div class="time">项目工期：2018-10-21至2019-10-21</div>
        <div class="com">工程概况是指在施工程项目的基本情况。其主要内容包括：工程名称、规模、性质、用途、投资额、开竣工日期、
            建设单位、设计单位、工程建筑面用途设计单位、工程建筑面用途设计单位、工程建筑面用途设计单位、工程建筑、工程建筑、工程建筑、
            工程建筑、工程建筑、工程概况是指在施工程项目的基本情况。其开竣工日投资额、结构形式、图纸设计完成情况、承包合同等。</div>
        <ul class="org clearfix">
            <li>
                <div class="org_tit">建设单位</div>
                <div class="org_name">浙江工程股份科技有限公司</div>
            </li>
            <li>
                <div class="org_tit">施工单位</div>
                <div class="org_name">浙江建设工程有限公司</div>
            </li>
            <li>
                <div class="org_tit">监理单位</div>
                <div class="org_name">杭州市城管局</div>
            </li>
            <li>
                <div class="org_tit">设计单位</div>
                <div class="org_name">浙江杭州市设计院</div>
            </li>
        </ul>
    </div>
</template>
<script>
import info from "@/api/panel/index";

export default {
    data(){
        return{

        }
    },
    components:{
        
    },
    created(){

    },
    mounted(){
        this.getInfo()
    },
    methods:{
        getInfo(){
            this.loading = true
            let data = {
                project_id:15
            }
            info.info(data).then(res => {
                this.info = res.data.result
                let nowTm = Math.round(new Date().getTime()/1000)
                this.percentage = (nowTm > this.info.endAt)?100:Math.round((nowTm - this.info.beginAt) / (this.info.endAt - this.info.beginAt) * 100)
                let OList = res.data.result.organTypeList
                OList.forEach(ele => {
                    ele.organList.forEach(elm => {
                        this.organList.push({organName:ele.name,contact:elm.contact,name:elm.name,phone:elm.phone,})
                    })
                });
                this.loading = false
            })
        },
    },
    watch:{

    }
}
</script>
<style scoped>
.tit{
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
}
.time{
    line-height: 24px;
    margin-bottom: 25px;
}
.com{
    color: #CED2E8;
    line-height: 23px;
}
.org{
    position: absolute;
    bottom: 20px;
    width: calc(100% - 50px);
}
.org li{
    padding-left: 15px;
    position: relative;
    line-height: 22px;
    width: 50%;
    float: left;
    margin-top: 25px;
    box-sizing: border-box;
}
.org li::before{
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    width: 4px;
    height: 15px;
    background: #DEE1F3
}
.org_tit{
    font-size: 16px;
    padding-bottom: 4px;
    color: #DEE1F3;
    font-weight: 500
}
.org_name{
    width: 100%;
    color: #CED2E8;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
