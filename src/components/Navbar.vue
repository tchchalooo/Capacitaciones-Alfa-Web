<template>
  <div>
    <v-card class="overflow-hidden navbar" height="100%">
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>AlfaWeb</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn right text v-show="usuario" @click="salir">
          <span class="mr-2">{{ usuario }}</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item :to="{ name: 'Home' }">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item :to="{ name: 'Login' }" v-show="!usuario">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>

            <v-list-item :to="{ name: 'Administracion' }" v-show="usuario">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Administración</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'Registro' }" v-show="!usuario">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Registro</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
import firebase from "firebase";
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapActions(["logOut"]),
    salir() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log Out con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.$router.push({ name: "Login" }).catch(() => {});
          }, 1000);
          this.logOut();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.navbar{
	min-height: 100vh;
}
</style>