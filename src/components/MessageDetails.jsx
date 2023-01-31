import {
    createContext,
    useContext,
    useReducer,
} from "react";
import {AuthDetails} from "./AuthDetails";

export const MessageDetails = createContext();

export const MessageInfo = ({ children }) => {
    const { loggedUser } = useContext(AuthDetails);
    const INITIAL_STATE = {
        messageId: "null",
        user: {},
    };

    const messageReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    messageId:
                        loggedUser.uid > action.payload.uid
                            ? loggedUser.uid + action.payload.uid
                            : action.payload.uid + loggedUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(messageReducer, INITIAL_STATE);

    return (
        <MessageDetails.Provider value={{ data:state, dispatch }}>
            {children}
        </MessageDetails.Provider>
    );
};