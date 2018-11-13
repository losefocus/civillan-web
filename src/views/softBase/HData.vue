<template>
 <div>
   <h-pile :is="currentView"></h-pile>
   <!--<historical :isShow="isShow" :newStyle="newStyle"></historical>-->
 </div>
</template>

<script>
  import HPile from '@/views/softBase/HPile'
  import HFoam from '@/views/FConcrete/HFoam'
  import HTensile from '@/views/TTensile/HTensile'
export default {
  name: "SHistory",
  components:{
    HPile,
    HFoam,
    HTensile
  },
  props:['deviceType','deviceKey'],
  data(){
    return{
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
    }else if(this.deviceType=='YYLZL'){
      this.currentView='HTensile'
    }else{
      this.currentView='HTensile'
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
