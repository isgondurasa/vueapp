<template>
  <div>
    <Grid
      class="grid"
      :rows="25"
      :cols="45"
    />
  </div>
</template>

<script>

import Grid from '../components/Grid.vue';

export default {
  name: 'Life',
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