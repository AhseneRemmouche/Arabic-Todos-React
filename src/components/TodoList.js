import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

import { useState, useContext, useEffect, useMemo } from 'react';
import { TodosContext } from '../contexts/todosContext';

// toggle buttons dependence
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';

export default function TodoList() {
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [displayedTodosType, setDisplayedTodosType] = useState('all');

    const { todos, setTodos } = useContext(TodosContext);

    // filetration arrays
    const unCompletedTodos = useMemo(() => {
        todos.filter((t) => {
            return !t.isCompleted;
        });
    }, [todos]);

    const completedTodos = useMemo(() => {
        todos.filter((t) => t.isCompleted);
    }, [todos]);

    let todosTobeRandered = todos;
    if (displayedTodosType === 'completed') {
        todosTobeRandered = completedTodos;
    } else if (displayedTodosType === 'uncompleted') {
        todosTobeRandered = unCompletedTodos;
    }
    const todoList = todosTobeRandered.map((todo) => {
        return (
            <Todo
                key={todo.id}
                todo={todo}
            />
        );
    });

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    function changeDisplayedType(event) {
        setDisplayedTodosType(event.target.value);
    }

    function handleAddClick() {
        // add new todo to the list
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            description: descriptionInput,
            isCompleted: false,
        };

        setTodos([...todos, newTodo]);
        setTitleInput('');
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        setDescriptionInput('');
    }

    return (
        <>
            <Container maxWidth="sm">
                <Card
                    sx={{ minWidth: 275 }}
                    style={{ maxHeight: '90vh', overflow: 'scroll' }}>
                    <CardContent>
                        <Typography variant="h1">مهامي</Typography>
                        <Divider style={{ margin: '10px' }} />
                        {/* filter buttons */}
                        <ToggleButtonGroup
                            style={{
                                direction: 'ltr',
                                marginTop: '10px',
                            }}
                            color="primary"
                            value={displayedTodosType}
                            exclusive
                            onChange={changeDisplayedType}
                            aria-label="text alignment">
                            <ToggleButton value="uncompleted">
                                غير المنجز
                            </ToggleButton>
                            <ToggleButton value="completed">
                                المنجز
                            </ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {/* end filter buttons */}
                        {/* All Todos Component  */}

                        {todoList}
                        {/* End All Todos Component  */}
                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: '30px' }}>
                            <Grid xs={8}>
                                <TextField
                                    id="outlined-basic"
                                    label="عنوان المهمة"
                                    variant="outlined"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={titleInput}
                                    onChange={(e) => {
                                        setTitleInput(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                xs={4}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    disabled: 'true',
                                }}>
                                <Button
                                    onClick={handleAddClick}
                                    style={{
                                        Padding: '10px',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    disabled={titleInput === ''}
                                    variant="contained">
                                    إضافة مهمة
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            // spacing={1}
                            style={{ marginTop: '30px' }}>
                            <Grid xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="وصف المهمة"
                                    variant="outlined"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={descriptionInput}
                                    onChange={(e) => {
                                        setDescriptionInput(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
