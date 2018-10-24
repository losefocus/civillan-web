<template>
  <div>
    <analysis :isShow="isShow" :newStyle="newStyle"></analysis>
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
      isShow:true,
      newStyle:{
        'padding':'0',
        'margin-top':'0'
      },
    }
  }
}
</script>

<style scoped>

</style>
