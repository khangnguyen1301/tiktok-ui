import classNames from 'classnames/bind';
import styles from './SearchAccountLoading.module.scss';

const cx = classNames.bind(styles);

function SearchAccountLoading() {
    return (
        <div className={cx('search-loading')}>
            <div className={cx('avatar')}></div>
            <div className={cx('body')}>
                <p className={cx('line-1')}></p>
                <p className={cx('line-2')}></p>
            </div>
        </div>
    );
}

export default SearchAccountLoading;
