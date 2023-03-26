import ModalContext from './ModalContext/ModalContext';
import VideoContext from './VideoContext/VideoContext';

function ContextProvider({ children }) {
    return (
        <ModalContext>
            <VideoContext>{children}</VideoContext>
        </ModalContext>
    );
}

export default ContextProvider;
