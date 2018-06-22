<template>
 <div>
   <historical></historical>
 </div>
</template>

<script>
  import historical from '@/views/POV/historical'
export default {
  name: "SHistory",
  props:['data'],
  components:{
    historical
  }
}
</script>

<style scoped>

</style>
