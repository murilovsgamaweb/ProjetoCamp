const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('src/pages/PageLogin.vue') },
      { path: 'register', name: 'register', component: () => import('src/pages/PageRegister.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('src/pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('src/pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('src/pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('src/pages/MePage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
