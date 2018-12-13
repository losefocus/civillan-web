<template>
    <div class="info">
        <div class="tit">{{data.name}}</div>
        <div class="time">项目工期：{{data.beginAt*1000 | formatDate}} 至 {{data.endAt*1000 | formatDate}}</div>
        <div class="com">{{data.comment == ''?'暂无介绍':data.comment}}</div>
        <ul class="org clearfix">
            <li v-for="(item,index) in data.organTypeList"  :key="index">
                <div class="org_tit">{{item.name}}</div>
                <div class="org_name">{{item.organList[0].name}}</div>
            </li>
            <!-- <li>
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
            </li> -->
        </ul>
    </div>
</template>
<script>
import project from '@/api/userCenter/project'
import {formatDate} from '@/common/formatDate.js';
export default {
    data(){
        return{
            data:{
                beginAt:new Date()/1000,
                endAt:new Date()/1000,
            }
        }
    },
    components:{

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
      }
    },
    created(){

    },
    mounted(){
        this.getInfo()
    },
    methods:{
        getInfo(id){
            let tenant=this.$cookies.get('tenant');
            let panel_id=this.$cookies.get('panel_id'); 
            project.info({'project_id':panel_id,tenant:tenant}).then(res=>{
                this.data = res.result
                // if(res.success){
                //     this.info=res.result;
                //     sessionStorage.setItem('projectInfo',JSON.stringify(res.result));
                //     this.organTypeList=res.result.organTypeList;
                //     this.loading.close();
                // }else{
                //     this.loading.close();
                // }
                // }).catch(err => {
                // this.loading.close();
            });
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    overflow: hidden;
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
