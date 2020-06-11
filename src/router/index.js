import Vue from 'vue'
import VueRouter from 'vue-router'
const Register = () => import('../views/register/Register')
const Login = () => import('../views/login/Login')

const Main = () => import('../views/content/Main')
const System = () => import('../views/content/System')
const SystemHome = () => import('../views/content/SystemHome')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/register',

  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/system',
    children: [{
        path: '/system',
        name: 'System',
        component: System
      },
      {
        path: '/systemhome',
        name: ' SystemHome',
        component: SystemHome
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router