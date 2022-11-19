import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		alias: "/home",
		meta: {
		login: true
		}
	},
	{
		path: '/administracion',
		name: 'Administracion',
		meta: {
			login: true
		},
		component: () => import( /* webpackChunkName: "about" */ '../views/Administracion.vue')
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
	},
	{
		path: '/Registro',
		name: 'Registro',
		component: () => import( /* webpackChunkName: "about" */ '../views/Registro.vue')
	},
	{
		path: '/Editando/:id',
		name: 'Editando',
		component: () => import( /* webpackChunkName: "editando" */ '../views/Editando.vue'),
		meta: {
			login: true
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let usuario = Store.getters.usuario;
	let reqLogin = to.matched.some(res => res.meta.login);

	if (!usuario && reqLogin) {
		next({
			name: 'Login'
		});
	} else if (usuario && !reqLogin) {
		next();
	} else {
		next();
	}
})

export default router