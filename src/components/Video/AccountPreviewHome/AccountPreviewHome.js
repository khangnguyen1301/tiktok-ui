import PropTypes from 'prop-types';

import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestAccounts/AccountPreview';

function AccountPreviewHome({ children, data }) {
    return (
        <div>
            <Tippy
                interactive
                zIndex="999999"
                hideOnClick={false}
                delay={[800, 600]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <AccountPreview data={data?.user} outlineButton={true} bioDescription={true} />
                        </PopperWrapper>
                    </div>
                )}
                // /appendTo={document.body}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                placement={'bottom-start'}
            >
                {children}
            </Tippy>
        </div>
    );
}

AccountPreviewHome.propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
};

export default AccountPreviewHome;
