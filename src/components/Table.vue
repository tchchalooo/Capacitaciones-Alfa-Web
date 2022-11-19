<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="arrayCursos"
      sort-by="codigo"
      class="elevation-1"
    >
    <template v-slot:[`item.estado`]= "{item}">
      <v-chip :color="getColor(item.estado)" dark>
        {{estados(item.estado)}}
      </v-chip>
    </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo curso
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre Curso"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.imagen"
                        label="URL Imagen"
                      ></v-text-field>

                      <v-text-field
                        type="number"
                        v-model="editedItem.cupos"
                        label="Cupos"
                      ></v-text-field>

                      <v-text-field
                        type="number"
                        v-model="editedItem.inscritos"
                        label="Inscritos"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.duracion"
                        label="Duracion"
                      ></v-text-field>

                      <v-text-field
                        type="number"
                        v-model="editedItem.costo"
                        label="Costo"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.codigo"
                        label="Codigo"
                      ></v-text-field>

                      <v-textarea
                        outlined
                        v-model="editedItem.descripcion"
                        label="descripcion"
                      ></v-textarea>

                      <v-text-field
                        v-model="editedItem.fecharegistro"
                        label="Fecha"
                      ></v-text-field>

                      <v-switch
                        v-model="editedItem.estado"
                        :label="`Terminado: ${editedItem.estado ? 'Si' : 'No'}`"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-4" @click="validate">
                  AGREGAR
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  LIMPIAR FORMULARIO
                </v-btn>

                <v-btn color="warning" class="mr-4" @click="resetValidation">
                  LIMPIAR VALIDACION
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Seguro que quieres eliminar este curso?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Table0",
  props: {
    cursos: Array,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Codigo",
        align: "start",
        value: "codigo",
      },
      { text: "Cursos", value: "nombre" },
      { text: "Cupos", value: "cupos" },
      { text: "Inscritos", value: "inscritos" },
      { text: "Duracion", value: "duracion" },
      { text: "Costos", value: "costo" },
      { text: "Terminado", value: "estado", sortable: false },
      { text: "Fecha", value: "fecharegistro" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    arrayCursos: [],
    editedIndex: -1,
    editedItem: {
      cupos: 0,
      duracion: "",
      imagen: "",
      nombre: "",
      costo: 0,
      fecharegistro: "",
      estado: false,
      codigo: "",
      descripcion: "",
      inscritos: 0,
    },
    defaultItem: {
      codigo: "",
      cursos: "",
      estado: false,
      costo: 0,
      duracion: "",
      descripcion: "",
      cupos: 0,
      inscritos: 0,
      imagen: "",
    },
    estado: "false",
    valid: true,
  }),

  computed: {
    formTitle() {
      return this.editedIndex ? "Nuevo curso" : "Editar curso";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "actualizarCurso",
      "agregarCurso",
      "borrarCurso",
      "traerCursos",
    ]),

    initialize() {
      this.arrayCursos = this.cursos;
    },

    validate() {
      this.agregarCurso(this.editedItem)
        .then(() => {
          this.traerCursos();
          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    editItem(item) {
      this.$router.push({ name: "Editando", params: { id: item.idDoc } });
    },

    deleteItem(item) {
      this.editedIndex = this.arrayCursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let cursoEliminar = this.arrayCursos.splice(this.editedIndex, 1);
      this.borrarCurso(cursoEliminar[0]);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    getColor(item) {
      if (item) {
        return "primary";
      } else {
        return "secondary";
      }
    },
    estados(item) {
      if(item) {
        return 'Si'
      }else{
        return 'No'
      }
    }
  },
};
</script>