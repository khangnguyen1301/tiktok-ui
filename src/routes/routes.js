//Layouts
import { DetailVideoLayout, HeaderOnly, UploadLayout } from '~/layouts';

import config from '~/config';
//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import DetailVideo from '~/pages/DetailVideo';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
    { path: config.routes.upload, component: Upload, layout: UploadLayout },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.detailVideo, component: DetailVideo, layout: DetailVideoLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
