<template>
 <div>
   <historical :isShow="isShow"></historical>
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
      isShow:false
    }
  }
}
</script>

<style scoped>

</style>
