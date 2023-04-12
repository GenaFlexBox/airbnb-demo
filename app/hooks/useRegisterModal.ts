import { handlerOpen } from "../store/reducers/registerModal.reducer"
import { useAppDispatch } from "./redux/redux.hooks"

export default function useRegisterModal() {
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



