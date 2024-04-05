import './App.css';
import TodoList from './components/TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';
const theme = createTheme({
    typography: {
        fontFamily: ['Alexandria'],
    },
    palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#388e3c',
        },
    },
});

const initialTodos = [
    {
        id: uuidv4(),
        title: 'القيام بالصلوات الخمس',
        description:
            'القيام بأداء الصلوات الخمس في أوقاتها المحددة وفقًا لتعاليم الإسلام.',
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: 'قراءة القرآن',
        description:
            'تخصيص بعض الوقت لقراءة القرآن الكريم والتأمل في معانيه وتطبيقها في الحياة اليومية.',
        isCompleted: false,
    },
];
function App() {
    const [todos, setTodos] = useState(initialTodos);
    return (
        <ThemeProvider theme={theme}>
            <div
                className="App"
                style={{
                    direction: 'rtl',
                }}>
                <TodosContext.Provider value={{ todos, setTodos }}>
                    <TodoList />
                </TodosContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
