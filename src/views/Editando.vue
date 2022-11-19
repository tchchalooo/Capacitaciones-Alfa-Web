<template>
  <div>
    <h1 class="text-center">Editando el cursos: {{ retornar.nombre }}</h1>
    <v-form ref="form">
      <v-container>
        <v-text-field v-model="editedItem.nombre" label="Nombre Curso">{{
          retornar.nombre
        }}</v-text-field>

        <v-text-field
          v-model="editedItem.imagen"
          label="URL Imagen"
        ></v-text-field>

        <v-text-field type="number" v-model="editedItem.cupos" label="Cupos">{{
          retornar.cupos
        }}</v-text-field>

        <v-text-field
          type="number"
          v-model="editedItem.inscritos"
          label="Inscritos"
          >{{ retornar.inscritos }}</v-text-field
        >

        <v-text-field
          v-model="editedItem.duracion"
          label="Duracion"
        ></v-text-field>

        <v-text-field type="number" v-model="editedItem.costo" label="Costo">{{
          retornar.costo
        }}</v-text-field>

        <v-text-field v-model="editedItem.codigo" label="Codigo">{{retornar.codigo}}</v-text-field>

        <v-textarea
          outlined
          v-model="editedItem.descripcion"
          label="descripcion"
          >{{ retornar.descripcion }}</v-textarea
        >

        <v-text-field v-model="editedItem.fecharegistro" label="Fecha">{{
          retornar.fecharegistro
        }}</v-text-field>

        <v-switch
          v-model="editedItem.estado"
          :label="`Terminado: ${retornar.estado ? 'Si' : 'No'}`"
          >{{ retornar.estado }}</v-switch
        >

        <v-container class="d-flex justify-center">
          <v-btn color="success" class="mr-4" @click="actualizarList">
            ACTUALIZAR
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            LIMPIAR FORMULARIO
          </v-btn>

          <v-btn color="warning" class="mr-4" @click="LimpiarForm">
            LIMPIAR VALIDACION
          </v-btn>

          <v-btn color="primary" class="mr-4" @click="regresar">
            REGRESAR
          </v-btn>
        </v-container>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Editando",
  data: () => ({
    editedItem: {
      codigo: "",
      costo: 0,
      cupos: 0,
      descripcion: "",
      duracion: "",
      estado: false,
      fecharegistro: "",
      idDoc: 0,
      imagen: "",
      inscritos: 0,
      nombre: "",
    },
    valid: true,
  }),
  computed: {
    ...mapState(["cursos"]),
    retornar() {
      return this.editedItem;
    },
  },
  methods: {
    ...mapActions(["actualizarCurso"]),

    actualizarList() {
		this.actualizarCurso(this.editedItem)
    },
    reset() {
      this.$refs.form.reset();
    },
    LimpiarForm() {},
    regresar() {
      this.$router.push({ name: "Administracion" });
    },
  },
  created() {
    this.editedItem = this.cursos.find(
      (element) => element.idDoc == this.$route.params.id
    );
  },
};
</script>

<style scoped>
</style>