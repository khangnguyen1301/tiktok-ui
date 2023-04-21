import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import * as searchService from '~/services/searchService';
import Image from '~/components/Image';

import styles from './Search.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ChevronDownIcon } from '~/components/Icons';
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading/HomeAccountLoading';
import TiktokLoading from '~/components/Loadings/TiktokLoading';

const cx = classNames.bind(styles);

const LIST_TAB = {
    TOP_TAB: '-120px',
    ACCOUNTS_TAB: '0px',
    VIDEO_TAB: '120px',
    LIVE_TAB: '240px',
};

const { TOP_TAB, ACCOUNTS_TAB, VIDEO_TAB, LIVE_TAB } = LIST_TAB;

function Search() {
    const [listAccounts, setListAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const activeBarRef = useRef();

    const navigate = useNavigate();
    const searchQuery = useSelector((state) => state.video?.searchQuery);
    const isSearching = useSelector((state) => state.video?.isSearching);

    useEffect(() => {
        setListAccounts([]);
        setPage(1);
    }, [isSearching]);

    const searchMoreAccounts = async () => {
        setLoading(true);
        const result = await searchService.search(searchQuery, 'more', page);
        setListAccounts((prev) => [...prev, ...result]);
        setLoading(false);
    };

    useEffect(() => {
        searchQuery ? searchMoreAccounts() : navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isSearching]);

    const showMoreAccounts = () => {
        setPage((prev) => prev + 1);
    };

    const handleActiveBarTranslate = (tab) => {
        activeBarRef.current.style.translate = tab;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-accounts-container')}>
                <div className={cx('tab-container')}>
                    <div
                        className={cx('tab-item')}
                        onMouseOver={() => handleActiveBarTranslate(TOP_TAB)}
                        onMouseOut={() => handleActiveBarTranslate(ACCOUNTS_TAB)}
                    >
                        Top
                    </div>
                    <div className={cx('tab-item', { active: true })}>Accounts</div>
                    <div
                        className={cx('tab-item')}
                        onMouseOver={() => handleActiveBarTranslate(VIDEO_TAB)}
                        onMouseOut={() => handleActiveBarTranslate(ACCOUNTS_TAB)}
                    >
                        Videos
                    </div>
                    <div
                        className={cx('tab-item')}
                        onMouseOver={() => handleActiveBarTranslate(LIVE_TAB)}
                        onMouseOut={() => handleActiveBarTranslate(ACCOUNTS_TAB)}
                    >
                        LIVE
                    </div>
                    <div className={cx('active-bar', { activeBar: true })} ref={activeBarRef}></div>
                </div>
                <div className={cx('accounts-container')}>
                    {listAccounts.length === 0
                        ? [...Array(10)].map((res, index) => (
                              <div className={cx('accounts-items')} key={index}>
                                  <HomeAccountLoading />
                              </div>
                          ))
                        : listAccounts.map((account) => (
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
                {loading ? (
                    <div className={cx('load-more')}>
                        <TiktokLoading small />
                    </div>
                ) : (
                    <div className={cx('load-more')} onClick={showMoreAccounts}>
                        Load more
                        <span>
                            <ChevronDownIcon width="1.6rem" height="1.6rem" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
