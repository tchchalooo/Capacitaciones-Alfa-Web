<template>
  <v-app>
    <Navbar />
  </v-app>
</template>
<script>
import { mapActions } from 'vuex';
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    
  }),
  mounted() {
  this.auth_State_Change();

  },
  methods: {
    ...mapActions(['auth_State_Change'])
  }
};
</script>
