import React, { createContext, useReducer, useContext } from 'react';

const initialState: State = {
    movies: [],
    moviesState: 'EMPTY',
    filter: null
}


const reducer = (state: State, action: IAction): State => {
    switch(action.type) {
        case 'LOADING':
            return {
                ...state,
                movies: []
            }
        case 'LOADED':
            return {
                ...state,
                movies: action.payload
            }
        case 'SEARCHING':
            return {
                ...state
            }
        case 'SEARCHED':
            return {
                ...state,
                movies: action.payload
            }
        case 'FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            throw new Error('Unsuported action');
    }
}


const StoreContext = createContext<IMovieContext>({ state: initialState, dispatch: null });


const Store = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
    <StoreContext.Provider value={{state, dispatch}}>
        {children}
    </StoreContext.Provider>)
};


export default Store;

export const useStore = () => useContext(StoreContext);