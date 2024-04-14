import { v4 as uuidv4 } from 'uuid';

export default function todosReducer(currentTodos, action) {
    switch (action.type) {
        case 'addTodo': {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                isCompleted: false,
            };
            console.log(newTodo);
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case 'editTodo': {
            console.log(action.payload);
            const updatedTodos = currentTodos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        title: action.payload.title,
                        description: action.payload.description,
                    };
                } else {
                    return todo;
                }
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        case 'deleteTodo': {
            const updatedTodos = currentTodos.filter(
                (t) => t.id !== action.payload.id
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }

        case 'get': {
            const storageTodos =
                JSON.parse(localStorage.getItem('todos')) ?? [];
            console.log(storageTodos);
            return storageTodos;
        }
            
            case 'toggledCompleted': {
                const updatedTodos = currentTodos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            isCompleted: !todo.isCompleted,
                        };
                    } else {
                        return todo;
                    }
                });
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return updatedTodos;
            }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
    return [];
}
