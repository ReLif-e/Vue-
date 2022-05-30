<template>
  <div>
    这个数字是{{ count }}
    <button @click="$emit('update:count',count + 2)">+1</button>
  </div>
</template>

<script>
export default {
  props: ['count']
}
</script>

<style>

</style>
