<template>
  <v-container>
    <v-row no-gutters width="400px">
      <v-col cols="4" v-for="(curso, index) in cursos" :key="index">
        <v-card class="mx-3 my-3">
          <!--<div>
          <v-img height="200px" width="400px" :src="curso.imagen"></v-img>
        </div>-->
          <div class="wrapper_img">
            <img :src="curso.imagen" alt="i" />
          </div>

          <v-card-text>
            <h2 class="mt-3">{{ curso.nombre }}</h2>
            <div class="font-weight-bold ml-8 mb-2 mt-3">Informacion</div>

            <v-timeline align-top dense>
              <v-timeline-item small color="success">
                <div>
                  <div class="font-weight-normal">
                    <strong>Costo: </strong> {{ curso.Costo }}
                  </div>
                  <div>Duración {{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="purple">
                <div>
                  <div class="font-weight-normal">
                    <strong>Cupos: </strong> {{ curso.cupos }}
                  </div>
                  <div>Completados: {{ curso.completado }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="success">
                <div>
                  <div class="font-weight-normal">
                    <strong>Fecha de registro: </strong>
                  </div>
                  <div>{{ curso.fecharegistro }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="purple">
                <div>
                  <div class="font-weight-normal">
                    <strong>Descripcion: </strong>
                  </div>
                  <div>{{ curso.descripcion }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "Cards",
  props: {
    cursos: Array
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(['traerCursos'])
  }
};
</script>
<style scoped>
img {
  padding-top: 20px;
  width: 200px;
  height: 200px;
}

.wrapper_img {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>