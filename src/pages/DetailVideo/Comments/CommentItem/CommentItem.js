import classNames from 'classnames/bind';
import { HeartMiniIcon, ThreeDotIcon } from '~/components/Icons';
import Image from '~/components/Image';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';

import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <AccountPreviewHome data={data}>
                <div className={cx('avatar')}>
                    <Image src={data.user.avatar} alt={data.user.nickname} />
                </div>
            </AccountPreviewHome>

            <div className={cx('content')}>
                <AccountPreviewHome data={data}>
                    <span className={cx('full-name')}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                </AccountPreviewHome>
                <span className={cx('comment')}>{data.comment}</span>
                <div className={cx('description-comment')}>
                    <span className={cx('date-comment')}>{data.created_at.slice(0, 10)}</span>
                    <div className={cx('likes-comment')}>
                        <HeartMiniIcon width="2rem" height="2rem" className={cx('heart-icon')} />
                        <span className={cx('likes-count')}>{data.likes_count}</span>
                    </div>
                    <span className={cx('reply-comment')}>Reply</span>
                </div>
            </div>
            <div className={cx('report')}>
                <ThreeDotIcon />
            </div>
        </div>
    );
}

export default CommentItem;
