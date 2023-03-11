<template>
  <div>
    <h1>
      Product handle: {{ route.params.handle }}
    </h1>
  </div>
</template>

<script setup>
const route = useRoute()
</script>
