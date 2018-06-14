// const paginated = ({ query }) => ({ page: parseInt(query.page || 1, 10) })

export default [
    {
        meta: {
            icon: 'users',
            label: 'user.nav.list',
            auth: ['admin']
        },
        children: [
            {
                name: 'user_list',
                path: '/users',
                component: () => import(/* webpackChunkName: "user" */ '../pages/UserList'),
                meta: {
                    label: 'user.nav.list',
                    title: 'user.title.list',
                    auth: ['admin']
                },
                props: true,
                children: [
                    {
                        name: 'user_view',
                        path: '/users/:id',
                        component: () => import(/* webpackChunkName: "user" */ '../pages/UserView'),
                        meta: {
                            label: 'user.nav.view',
                            title: 'user.title.view',
                            auth: ['admin']
                        },
                        props: true
                    },
                    {
                        name: 'user_login_list',
                        path: '/users/:id/logins',
                        component: () => import(/* webpackChunkName: "user" */ '../pages/UserLoginList'),
                        meta: {
                            label: 'user.nav.login_history',
                            title: 'user.title.login_history',
                            auth: ['admin']
                        },
                        props: true
                    }
                ]
            },
            {
                name: 'user_role_list',
                path: '/roles',
                component: () => import(/* webpackChunkName: "user-role" */ '../pages/RoleList'),
                meta: {
                    label: 'role.nav.list',
                    title: 'role.title.list',
                    auth: ['admin']
                },
                children: [
                    {
                        name: 'user_role_view',
                        path: '/roles/:code',
                        component: () => import(/* webpackChunkName: "user-role" */ '../pages/RoleView'),
                        meta: {
                            label: 'role.nav.view',
                            title: 'role.title.view',
                            auth: ['admin']
                        },
                        props: true
                    }
                ]
            },
            {
                name: 'user_permission_list',
                path: '/permissions',
                component: () => import(/* webpackChunkName: "user-permission" */ '../pages/PermissionList'),
                meta: {
                    label: 'permission.nav.list',
                    title: 'permission.title.list',
                    auth: ['admin']
                }
            }
        ]
    },

    // Profile
    {
        name: 'profile',
        path: '/profile',
        component: () => import(/* webpackChunkName: "profile" */ '../pages/Profile'),
        meta: {
            label: 'profile.nav.view',
            title: 'profile.title.view',
            hidden: true,
            auth: true
        },
        children: [
            {
                name: 'profile_edit',
                path: '/profile/edit',
                component: () => import(/* webpackChunkName: "profile" */ '../pages/ProfileEdit'),
                meta: {
                    label: 'profile.nav.edit',
                    title: 'profile.title.edit',
                    hidden: true,
                    auth: true
                }
            },
            {
                name: 'profile_change_password',
                path: '/change-password',
                component: () => import(/* webpackChunkName: "profile" */ '../pages/ChangePassword'),
                meta: {
                    label: 'password.nav.change',
                    title: 'password.title.change',
                    hidden: true,
                    auth: true
                }
            }
        ]
    },

    // Login
    {
        name: 'login',
        path: '/login',
        component: () => import('../pages/Login'),
        meta: {
            hidden: true,
            auth: false
        }
    }
]
