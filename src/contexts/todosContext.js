import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";


export const TodosContext = createContext([]);

export default function TodosProvider({ children }) {
  
  const [todos, todosDispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos:todos, dispatch:todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext)