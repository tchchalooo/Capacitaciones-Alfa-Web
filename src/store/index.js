import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import Swal from "sweetalert2";
Vue.use(Vuex);

const totalCupos = (cursos) =>
  cursos.reduce(
    (totalCupos, cursoIteracion) => totalCupos + parseInt(cursoIteracion.cupos),
    0
  );

const totalInscritos = (cursos) =>
  cursos.reduce(
    (totalInscritos, cursoIteracion) =>
      totalInscritos + parseInt(cursoIteracion.inscritos),
    0
  );

export default new Vuex.Store({
  state: {
    usuario: undefined,
    cursos: [],
  },
  mutations: {
    AGREGA_USUARIO(state, usuario) {
      state.usuario = usuario;
    },
    LOGOUT(state) {
      state.usuario = undefined;
    },
    CARGAR_CURSOS(state, cursos) {
      state.cursos = cursos;
    },
  },
  actions: {
    inicioSesion({ commit }, usuario) {
      commit("AGREGA_USUARIO", usuario);
    },
    logOut({ commit }) {
      commit("LOGOUT");
    },
    traerCursos({ commit }) {
      firebase
        .firestore()
        .collection("cursos")
        .onSnapshot((result) => {
          let cursos = [];
          result.forEach((element) => {
            cursos.push({
              cupos: element.data().cupos,
              duracion: element.data().duracion,
              imagen: element.data().imagen,
              nombre: element.data().nombre,
              costo: element.data().costo,
              fecharegistro: element.data().fecharegistro,
              estado: element.data().estado,
              codigo: element.data().codigo,
              descripcion: element.data().descripcion,
              inscritos: element.data().inscritos,
              idDoc: element.id,
            });
          });
          commit("CARGAR_CURSOS", cursos);
        });
    },
    async borrarCurso(context, curso) {
      /* Delete */
      firebase
        .firestore()
        .collection("cursos")
        .doc(curso.idDoc) //id del curso
        .delete()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Eliminando usuario.",
            text: `Se ha eliminado correctamente el curso ${curso.nombre}`,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Se ha generado un problema al intentar eliminar el curso ${curso.nombre}:`,
            footer: err,
          });
        });
    },
    async actualizarCurso(context, curso) {
      /* Update */
      firebase
        .firestore()
        .collection("cursos")
        .doc(curso.idDoc)
        .set(curso)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Editando usuario.",
            text: "Registro actualizado correctamente.",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              "Se ha generado un problema al intentar actualizar el registro:",
            footer: err,
          });
        });
    },
    async agregarCurso(context, curso) {
      return new Promise((resolve, reject) => {
        /* Create */
        firebase
          .firestore()
          .collection("cursos")
          .add(curso)
          .then(() => {
            alert("Curso agregado satisfactoriamente");
            resolve();
          })
          .catch((err) => {
            alert(
              "Error al agregar el curso respectivo, informe al administrador de la web."
            );
            console.log(err);
            reject();
          });
      });
    },
    async Registrar({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log(userCredential);
            const { email } = userCredential.user;
            commit("AGREGA_USUARIO", email);
            Swal.fire({
              icon: "success",
              title: "Registrando usuario.",
              text: "Registro de usuario exitoso.",
            });
            resolve();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Se ha generado un problema al intentar el registro:",
              footer: err,
            });
            reject();
          });
      });
    },
    auth_State_Change({ commit }) {
      firebase.auth().onAuthStateChanged((userCredential) => {
        if (userCredential) {
          const { email } = userCredential;
          commit("AGREGA_USUARIO", email);
          Swal.fire({
            icon: "success",
            title: "Login exitoso.",
            text: "Inicio de usuario exitoso.",
          });
        } else {
          commit("AGREGA_USUARIO", undefined);
        }
      });
    },
  },
  modules: {},
  getters: {
    usuario(state) {
      return state.usuario;
    },
    alumnosPermitidos({ cursos }) {
      /* total de cupos*/
      return totalCupos(cursos);
    },
    alumnosInscritos({ cursos }) {
      /* total alumnos inscritos*/
      return totalInscritos(cursos);
    },
    cuposRestantes({ cursos }) {
      // cantidad de cupos - alumnos inscritos
      return totalCupos(cursos) - totalInscritos(cursos);
    },
    cursosTerminados({ cursos }) {
      /* cantidad de cursos con true */
      return cursos.filter((cursoIteracion) => {
        return cursoIteracion.estado == true;
      }).length;
    },
    cursosActivos({ cursos }) {
      /* cantidad de cursos con false */
      return cursos.filter((cursoIteracion) => {
        return cursoIteracion.estado == false;
      }).length;
    },
    cantidadTotalCursos({ cursos }) {
      return cursos.length;
    },
  },
});
