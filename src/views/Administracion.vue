<template>
  <div>
    <div class="d-flex justify-center pt-5">
      <h1>Administracion</h1>
    </div>

    <div>
      <Table :cursos="traerCursos" />
    </div>
    <div>
      <Alerts :cursos="cursos" />
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import Alerts from "../components/Alerts.vue";
import { mapState } from "vuex";
export default {
  name: "Administracion",
  components: {
    Table,
    Alerts,
  },
  computed: {
    ...mapState(["cursos"]),
    traerCursos(){
      return this.cursos
    }
  },

};
</script>