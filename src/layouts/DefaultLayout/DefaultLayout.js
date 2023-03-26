import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import GetApp from '~/components/GetApp';
import { useContext } from 'react';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { VideoPlayerModal } from '~/components/Modal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const context = useContext(VideoEnviroment);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <GetApp />
            {context.isVideoModalShow && <VideoPlayerModal onHideModal={context.hideVideoPlayer} />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
