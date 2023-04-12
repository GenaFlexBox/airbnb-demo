import { handlerOpen } from "../store/reducers/loginModal.reducer";
import { useAppDispatch } from "./redux/redux.hooks"

export default function useLoginModal() {
    const dispatch = useAppDispatch();

    const onClose = () => {
       dispatch(handlerOpen(false));
    }

    const onOpen = () => {
        dispatch(handlerOpen(true));
    }

    return {
        onClose,
        onOpen
    }
}