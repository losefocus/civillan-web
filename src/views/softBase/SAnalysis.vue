<template>
  <div>
    <analysis :isShow="isShow"></analysis>
  </div>
</template>

<script>
  import analysis from '@/views/POV/analysis'
export default {
  name: "SAnalysis",
  components:{
    analysis
  },
  data(){
    return{
      isShow:true
    }
  }
}
</script>

<style scoped>

</style>
