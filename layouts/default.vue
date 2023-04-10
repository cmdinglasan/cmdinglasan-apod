<script setup>
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="relative z-50 flex flex-col">
    <NuxtPage />
  </div>
</template>
