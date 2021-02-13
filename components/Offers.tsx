import { useReducer, useContext, createContext, Dispatch } from 'react'
import { Offer } from '../types';

type State = {
  offers: Offer[];
};

type Action = { type: 'OFFERS_FETCHED', payload: Offer[], };

const initialState = {
  offers: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OFFERS_FETCHED':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action}`)
  };
};

export const StateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {}
});

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  )
}

export const useStore = () => useContext(StateContext);
