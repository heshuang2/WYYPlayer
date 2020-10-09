import Vue from "vue";
import VueRouter from "vue-router";
// 导入对应的路由
import discovery from "../views/discovery.vue";
import playlists from "../views/playlists.vue";
import songs from "../views/songs.vue";
import mvs from "../views/mvs.vue";
import result from "../views/result.vue";
import playlist from "../views/playlist.vue";
import mv from "../views/mv.vue";
import likes from "../views/likes.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/discovery"
    },
    {
        // 发现音乐
        path: "/discovery",
        component: discovery
    },
    {
        // 推荐歌单
        path: "/playlists",
        component: playlists
    },
    {
        // 推荐歌单
        path: "/playlist",
        component: playlist
    },
    {
        // 最新音乐
        path: "/songs",
        component: songs
    },
    {
        // 最新音乐
        path: "/mvs",
        component: mvs
    },
    // mv详情
    {
        path: "/mv",
        component: mv
    },
    // 搜索结果页
    {
        path: "/result",
        component: result
    },
    {
        path: "/likes",
        component: likes
    }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
