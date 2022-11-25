<script setup lang="ts">
defineProps({
  label: String,
  value: String,
});
</script>

<template>
  <div class="my-1">
    <span class="font-bold text-orange-900">{{ label }}</span>
    <span class="ml-2">{{ value }}</span>
  </div>
</template>
