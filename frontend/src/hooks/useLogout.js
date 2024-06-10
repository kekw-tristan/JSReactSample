import {useAuthContext} from "./useAuthContext"
import {usePostsContext} from "./usePostsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: postsDispatch } = usePostsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        postsDispatch({type: 'SET_POSTS', payload: null})
    }

    return {logout}
}