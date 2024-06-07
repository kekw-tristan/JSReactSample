import { CommentsContext } from "../context/CommentContext";
import { useContext } from "react";

export const useCommentsContext = () => {
    const context = useContext(CommentsContext)

    if (!context) {
        throw Error('useCommentsContext must be used inside a CommentsContextProvider')
    }

    return context
}