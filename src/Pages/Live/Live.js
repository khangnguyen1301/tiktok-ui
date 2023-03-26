import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import LiveLoading from '~/components/Loadings/LiveLoading';
import Sidebar from '~/layouts/components/Sidebar';
const cx = classNames.bind(styles);

function Live() {
    return (
        <div>
            <Sidebar className={cx('custom-sidebar')} />
            <div className={cx('wrapper')}>
                <LiveLoading />
            </div>
        </div>
    );
}

export default Live;
