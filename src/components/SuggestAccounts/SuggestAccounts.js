import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from '~/components/SuggestAccounts/AccountItem';
import styles from './SuggestAccounts.module.scss';

import { useState } from 'react';
import AccountLoading from '../Loadings/AccountLoading/AccountLoading';

const cx = classNames.bind(styles);

function SuggestAccounts({ title, data, sideBarRef, noneFollow = false, follow = false }) {
    const [seeMore, setSeeMore] = useState(false);

    const scrollTop = () => {
        sideBarRef.current.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handleSeeMore = () => {
        if (seeMore) {
            setSeeMore(false);
            scrollTop();
        } else {
            setSeeMore(true);
        }
    };
    let classes = cx('wrapper-content', {
        more: seeMore,
        noneFollow,
        follow,
    });

    return (
        <div>
            <div className={cx('wrapper')}>
                {data?.length === 0 && !noneFollow ? (
                    <div className={classes}>
                        <p className={cx('title')}> {title} </p>
                        {[...Array(8)].map((res, index) => (
                            <AccountLoading key={index} />
                        ))}
                    </div>
                ) : (
                    <div className={classes}>
                        <p className={cx('title')}> {title} </p>
                        {data?.length > 0 ? (
                            data?.map((res) => <AccountItem data={res} key={res.id} />)
                        ) : (
                            <div className={cx('none-following')}>
                                <span>Accounts you follow will appear here</span>
                            </div>
                        )}
                    </div>
                )}
                {!noneFollow && (
                    <div>
                        {seeMore ? (
                            <span className={cx('more-btn')} onClick={handleSeeMore}>
                                See less
                            </span>
                        ) : (
                            <span className={cx('more-btn')} onClick={handleSeeMore}>
                                See all
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

SuggestAccounts.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    noneFollow: PropTypes.bool,
    follow: PropTypes.bool,
};

export default SuggestAccounts;
