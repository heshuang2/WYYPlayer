import Vue from "vue";
import {
    Carousel,
    CarouselItem,
    Pagination,
    Tabs,
    TabPane,
    Message,
    MessageBox,
    Button,
    Input,
    Menu,
    MenuItem,
    Table,
    TableColumn,
    Image,
    Notification,
    Tooltip,
    Dialog,
    Container,
    Header,
    Row,
    Col,
    Avatar,
    Main
} from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Input);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Container);
Vue.use(Header);
Vue.use(Row);
Vue.use(Col);
Vue.use(Avatar);
Vue.use(Main);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
