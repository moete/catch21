<template>
  <v-container class="pa-0">
    <div class="labelIndicator">{{ this.label }}</div>
    <div class="valueIndicator">
      <!-- <img src="../assets/cards/Button.png" /> -->
      {{ this.value }}
    </div>
  </v-container>
</template>

<script>
export default {
  props: { label: String, value: [Number, String] },
};
</script>

<style scoped>
/* .labelIndicator {
  font-size: 1em;
  color: white;
} */
.labelIndicator {
  color: white;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
}
.valueIndicator {
  /* font-size: 1.5em;
  font-weight: 800;
  /* color: rgb(66, 63, 90); */
  /* border: solid; */
  /* border-color: rgb(66, 63, 90); */
  /* background-color: white; */
  /* border-width: 0.2em 0.3em 0.3em 0.2em;
  border-radius: 0.8em;  */
  background-image: url('../assets/cards/Button.png');
  object-fit: contain;
  background-position: center;
  background-size: contain;
  color: blueviolet;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 30px;
  margin-bottom: 15px;
}
</style>
