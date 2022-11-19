<template>
  <div>
    <h1>Home</h1>
    <Cards :cursos="cursos" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cards from "../components/Cards.vue";
export default {
  name: "Home",
  components: {
    Cards,
  },
  computed: {
    ...mapState(["cursos"]),
  },
  created: function () {
    this.$store.dispatch("traerCursos");
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>