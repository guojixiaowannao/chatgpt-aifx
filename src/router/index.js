import VueRouter from 'vue-router'

import ChatHome from '../view/pages/chatHome/index.vue'
import Setting from '../view/pages/setting.vue'

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/ChatHome",
            meta: { title: "AI分享" }
        },
        {
            path: "/ChatHome",
            name: "ChatHome",
            component: ChatHome,
            meta: { title: "AI分享" }
        },
        {
            path: "/Setting",
            name: "Setting",
            component: Setting,
            meta: { title: "公告" }
        },
    ],
})

