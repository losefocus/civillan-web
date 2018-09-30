<template>
 <div>
   <historical :isShow="isShow" :newStyle="newStyle"></historical>
 </div>
</template>

<script>
  import historical from '@/views/POV/historical'
export default {
  name: "SHistory",
  components:{
    historical
  },
  data(){
    return{
      isShow:true,
      newStyle:{
        'padding':'0',
        'margin-top':'-15px'
      },
    }
  }
}
</script>

<style scoped>

</style>
