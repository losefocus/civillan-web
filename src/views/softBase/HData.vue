<template>
 <div>
   <h-pile :is="currentView"></h-pile>
   <!--<historical :isShow="isShow" :newStyle="newStyle"></historical>-->
 </div>
</template>

<script>
  import HPile from '@/views/softBase/HPile'
  import HFoam from '@/views/FConcrete/HFoam'
export default {
  name: "SHistory",
  components:{
    HPile,
    HFoam
  },
  props:['deviceType','deviceKey'],
  data(){
    return{
      isShow:true,
      newStyle:{
        'padding':'0',
        'margin-top':'-15px'
      },
      currentView:'HPile',
    }
  },
  created(){
    if(this.deviceType=='JBZ'){
      this.currentView='HPile'
    }else if(this.deviceType=='FPJ'){
      this.currentView='HFoam'
    }else{
      this.currentView='HFoam'
    }
  }/*,
  watch:{
    deviceType:{
      handler(val, oldVal){
        if(val=='JBZ'){
          this.currentView='HPile'
        }else if(val=='FPJ'){
          this.currentView='HFoam'
        }else{
          this.currentView='HFoam'
        }
      },
    }
  }*/
}
</script>

<style scoped>

</style>
