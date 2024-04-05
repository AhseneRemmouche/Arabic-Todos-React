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

// Modal import dependencies
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Todo({ todo }) {
    const { todos, setTodos } = useContext(TodosContext);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
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

    function handleDeleteTodo() {
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        //setOpenDeleteDialog(false);
    }

    function handleEditTodo() {
        setTodos(() => {
            return todos.map((t) => {
                if (t.id === todo.id) {
                    return {
                        ...t,
                        title: titleInput,
                        description: descriptionInput,
                    };
                } else {
                    return t;
                }
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        setOpenEditDialog(false);
    }

    function handleOpenDeleteDialog() {
        setOpenDeleteDialog(true);
    }

    function handleCloseDeleteDialog() {
        setOpenDeleteDialog(false);
    }
    function handleOpenEditDialog() {
        setOpenEditDialog(true);
    }

    function handleCloseEditDialog() {
        setOpenEditDialog(false);
    }

    return (
        <>
            {/*  Delete Modal  */}
            <Dialog
                style={{ direction: 'rtl' }}
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف هاذه المهمة؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        عند حذف المهمة سوف تفقد جميع التفاصيل الخاصة بها, وسوف
                        لا يمكنك التراجع عن هذه الإجراء
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
                    <Button
                        onClick={handleDeleteTodo}
                        autoFocus>
                        نعم, إحدف المهمة
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Delete Modal */}

            {/* Update Modal */}
            <Dialog
                style={{ direction: 'rtl', width: '100%' }}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
                <DialogContent style={{ width: '520px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="titleInput"
                        label="العنوان"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="descriptionInput"
                        label="التفاصيل"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>إلغاء</Button>
                    <Button
                        onClick={handleEditTodo}
                        autoFocus>
                        تعديل المهمة
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Update Modal */}

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
