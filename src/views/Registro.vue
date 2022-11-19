<template>
<div>

   <v-container>
	<h1>Registro</h1>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="20"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-container
          class="
            mt-5
            d-flex
            justify-center
            align-content-center
            flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row
          "
        >
          <v-btn
            :disabled="!valid"
            color="success"
            class="mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="registro"
          >
            REGISTRAR
          </v-btn>

          <v-btn
            color="error"
            class="mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="reset"
          >
            LIMPIAR FORMULARIO
          </v-btn>
        </v-container>
      </v-form>
    </div>
  </v-container>
</div>
</template>

<script>
import {mapActions} from "vuex";
  export default {
    name: 'Registro',
    data() {
    return {
      valid: true,
      password: "",
      passwordRules: [
        (v) => !!v || "La contraseña es requerida",
        (v) =>
          (v && v.length >= 6) ||
          "La contraseña debe ser mayor o igual que 6 caracteres.",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "El correo Electrónico es requerido",
        (v) => /.+@.+\..+/.test(v) || "Debe ingresar un E-mail válido.",
      ],
    };
  },

    computed: {
      
    },
    methods: {
      ...mapActions (['Registrar']),
      reset() {
      this.$refs.form.reset();
    },
    registro() {
      const datosRegistro = {email: this.email, password: this.password}
      this.Registrar(datosRegistro)

    }
    }
  }
</script>