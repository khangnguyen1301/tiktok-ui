//Layouts
import { FullScreenLayout, HeaderOnly, UploadLayout } from '~/layouts';

import config from '~/config';
//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import DetailVideo from '~/pages/DetailVideo';
import Message from '~/pages/Message';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: FullScreenLayout },
    { path: config.routes.following, component: Following, layout: FullScreenLayout },
    { path: config.routes.live, component: Live, layout: FullScreenLayout },
    { path: config.routes.profile, component: Profile, layout: FullScreenLayout },
    { path: config.routes.upload, component: Upload, layout: UploadLayout },
    { path: config.routes.search, component: Search, layout: FullScreenLayout },
    { path: config.routes.detailVideo, component: DetailVideo, layout: FullScreenLayout },
    { path: config.routes.message, component: Message, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
