import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import TextField from '@mui/material/TextField';

import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/todosContext';

export default function Todo({ todo, showDeleteDialog, showEditDialog }) {
    const { todos, setTodos } = useContext(TodosContext);

    const [titleInput, setTitleInput] = useState(todo.title);
    const [descriptionInput, setDescriptionInput] = useState(todo.description);

    function handleCheck() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return {
                    ...t,
                    isCompleted: !t.isCompleted,
                };
            } else {
                return t;
            }
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    function handleOpenDeleteDialog() {
        showDeleteDialog(todo);
    }
    function handleOpenEditDialog() {
        showEditDialog(todo);
    }
    return (
        <>
            <Card
                //style={{ backgroundColor: 'primary' }}
                className="card"
                sx={{
                    minWidth: 275,
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    marginTop: '15px',
                }}>
                <CardContent>
                    <Grid
                        container
                        spacing={2}>
                        <Grid xs={8}>
                            <Typography
                                variant="h5"
                                sx={{ textAlign: 'right' }}>
                                {todo.title}
                                {/* المهمة الاولى */}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'right',
                                    fontWeight: 200,
                                    fontSize: '1rem',
                                }}>
                                {todo.description}
                                {/* المهمة الاولى التي تم انشائها من قبل المطورين */}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={4}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center">
                            {/* Check button */}
                            <IconButton
                                onClick={() => handleCheck()}
                                className="iconButton"
                                style={{
                                    color: todo.isCompleted
                                        ? 'white'
                                        : '#8bc34a',
                                    backgroundColor: todo.isCompleted
                                        ? '#8bc34a'
                                        : 'white',
                                    border: 'solid #8bc34a 3px',
                                    borderColor: todo.isCompleted
                                        ? 'white'
                                        : '#8bc34a',
                                }}
                                aria-label="delete">
                                <CheckOutlinedIcon />
                            </IconButton>
                            {/* Edit Button */}
                            <IconButton
                                onClick={() => handleOpenEditDialog()}
                                className="iconButton"
                                style={{
                                    color: '#1769aa',
                                    backgroundColor: 'white',
                                    border: 'solid #1769aa 3px',
                                }}
                                aria-label="delete">
                                <ModeEditOutlineOutlinedIcon />
                            </IconButton>
                            {/* Delete Button */}
                            <IconButton
                                onClick={() => handleOpenDeleteDialog()}
                                className="iconButton"
                                style={{
                                    color: '#b23c17',
                                    backgroundColor: 'white',
                                    border: 'solid #b23c17 3px',
                                }}
                                aria-label="delete">
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
