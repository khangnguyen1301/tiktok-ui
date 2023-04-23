import classNames from 'classnames/bind';

import styles from './CommentLoading.module.scss';

const cx = classNames.bind(styles);

function CommentLoading() {
    return (
        <div className={cx('comment-loading')}>
            <p className={cx('avatar')}></p>
            <div className={cx('body')}>
                <p className={cx('line-1')}></p>
                <p className={cx('line-2')}></p>
                <p className={cx('line-3')}></p>
            </div>
        </div>
    );
}

export default CommentLoading;
