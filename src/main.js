import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDDONyCr7mtSz7Od1hn5hPr0TnvwfCFDDI",
  authDomain: "pruebacursoalfaweb.firebaseapp.com",
  projectId: "pruebacursoalfaweb",
  storageBucket: "pruebacursoalfaweb.appspot.com",
  messagingSenderId: "1074384915592",
  appId: "1:1074384915592:web:aa756d26448f0988e1a33d"
};
// user: juanito@perez.cl
// pass: 123456

firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')