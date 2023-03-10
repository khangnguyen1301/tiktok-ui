import PropTypes from 'prop-types';
import { useContext } from 'react';

import FormModal, { VideoPlayerModal } from '~/components/Modal';
import { ModalContext } from '~/components/ModalProvider';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import GetApp from '~/components/GetApp';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const context = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <GetApp />
            {context?.active && <FormModal onHide={context.handleHideModal} />}
            {context?.showVideoPlayer && <VideoPlayerModal />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
