<template>
  <v-container>
    <div>
      <v-alert dense outlined color="purple" icon="mdi-account-group">
        Cantidad total de alumnos permitidos:{{ alumnosPermitidos }}
      </v-alert>

      <v-alert dense outlined color="blue" icon="mdi-account-multiple-check">
        Cantidad total de alumnos inscritos:{{ alumnosInscritos }}
      </v-alert>

      <v-alert dense outlined color="pink" icon="mdi-account-clock">
        Cantidad total de cupos restantes: {{ cuposRestantes }}
      </v-alert>

      <v-alert dense outlined color="red" icon="mdi-cancel">
        cantidad total de cursos terminados:{{ cursosTerminados }}
      </v-alert>

      <v-alert dense outlined color="teal" icon="mdi-bell-check">
        Cantidad total de cursos activos:{{ cursosActivos }}
      </v-alert>

      <v-alert dense outlined color="deep-orange" icon="mdi-bell-ring">
        Cantidad total de cursos:{{ cantidadTotalCursos }}
      </v-alert>
    </div>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "Table",
  props: {
    cursos: Array,
  },
  computed: {
    ...mapGetters([
      'alumnosPermitidos',
      'alumnosInscritos',
      'cuposRestantes',
      'cursosTerminados',
      'cursosActivos',
      'cantidadTotalCursos'
      ])
  },
};
</script>
