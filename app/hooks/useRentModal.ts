
import { handlerOpen } from "../store/reducers/rentModal.reducer";
import { useAppDispatch } from "./redux/redux.hooks"

export default function useRentModal() {
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
