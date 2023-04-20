import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import * as searchService from '~/services/searchService';
import Image from '~/components/Image';

import styles from './Search.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ChevronDownIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const LIST_TAB = {
    TOP_TAB: 1,
    ACCOUNTS_TAB: 2,
    VIDEO_TAB: 3,
    LIVE_TAB: 4,
};

const { TOP_TAB, ACCOUNTS_TAB, VIDEO_TAB, LIVE_TAB } = LIST_TAB;

function Search() {
    const [listAccounts, setListAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [selectTab, setSelectTab] = useState(ACCOUNTS_TAB);
    const [activeBar, setActiveBar] = useState(ACCOUNTS_TAB);

    const searchQuery = useSelector((state) => state.video.searchQuery);
    const isSearching = useSelector((state) => state.video.isSearching);

    useEffect(() => {
        setListAccounts([]);
    }, [isSearching]);

    const searchMoreAccounts = async () => {
        const result = await searchService.search(searchQuery, 'more', page);
        setListAccounts((prev) => [...prev, ...result]);
    };

    useEffect(() => {
        searchMoreAccounts();
    }, [page, isSearching]);

    const showMoreAccounts = () => {
        setPage((prev) => prev + 1);
    };

    const handleSelectTab = (tab) => {
        setSelectTab(tab);
    };

    const handleActiveBarShow = (tab) => {
        setActiveBar(tab);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-accounts-container')}>
                <div className={cx('tab-container')}>
                    <div className={cx('tab-item')}>Top</div>
                    <div className={cx('tab-item', { active: true })}>Accounts</div>
                    <div className={cx('tab-item')}>Videos</div>
                    <div className={cx('tab-item')}>LIVE</div>
                    <div className={cx('active-bar', { activeBar: activeBar === selectTab })}></div>
                </div>
                <div className={cx('accounts-container')}>
                    {listAccounts?.map((account) => (
                        <Link to={`/@${account.nickname}`} key={account.id}>
                            <div className={cx('accounts-items')}>
                                <div className={cx('avatar')}>
                                    <Image src={account.avatar} alt={account.nickname} />
                                </div>
                                <div className={cx('accounts-info')}>
                                    <p className={cx('nickname')}>
                                        {account.nickname}
                                        {account.tick && (
                                            <span>
                                                <FontAwesomeIcon icon={faCircleCheck} />
                                            </span>
                                        )}
                                    </p>
                                    <strong className={cx('followers')}>
                                        {account.followers_count} <span>Followers</span>
                                    </strong>
                                    <p className={cx('bio')}>{account.bio}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={cx('load-more')} onClick={showMoreAccounts}>
                    Load more
                    <span>
                        <ChevronDownIcon width="1.6rem" height="1.6rem" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Search;
