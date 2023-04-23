import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import LiveLoading from '~/components/Loadings/LiveLoading';
const cx = classNames.bind(styles);

function Live() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <LiveLoading />
            </div>
        </div>
    );
}

export default Live;
