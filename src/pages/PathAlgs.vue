<template>
  <div>
    <Grid
      class="grid"
      :rows="50"
      :cols="60"
    />
  </div>
</template>

<script>

import Grid from '../components/Grid.vue';


export default {
  name: 'PathAlgs',
  components: {
    Grid,
  },
};
</script>

<style scoped>
.grid {
  float: left;
  margin-top: 10px;
}
</style>
