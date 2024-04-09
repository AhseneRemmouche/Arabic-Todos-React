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

// Modal import dependencies
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useContext, useEffect, useMemo } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { CustomSnackBarContext } from '../contexts/customSnackBarContext';

// toggle buttons dependence
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';

export default function TodoList() {
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [displayedTodosType, setDisplayedTodosType] = useState('all');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [todoFromDeleteBtn, setTodoFromDeleteBtn] = useState({});
    const [todoFromEditBtn, setTodoFromEditBtn] = useState({});
    const [editDialogTitleInput, setEditDialogTitleInput] = useState(
        todoFromEditBtn.title
    );
    const [editDialogDescriptionInput, setEditDialogDescriptionInput] =
        useState(todoFromEditBtn.description);

    const { todos, setTodos } = useContext(TodosContext);
    const {
        showHideCustomSnackbar,
        openCustomSnackBar,
        setOpenCustomSnackBar,
    } = useContext(CustomSnackBarContext);

    // filetration arrays
    const unCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted;
        });
    }, [todos]);

    const completedTodos = useMemo(() => {
        return todos.filter((t) => t.isCompleted);
    }, [todos]);

    let todosTobeRendered = todos;
    if (displayedTodosType === 'completed') {
        todosTobeRendered = completedTodos;
    } else if (displayedTodosType === 'uncompleted') {
        todosTobeRendered = unCompletedTodos;
    } else {
        todosTobeRendered = todos;
    }

    const todoList = todosTobeRendered.map((todo) => {
        return (
            <Todo
                key={todo.id}
                todo={todo}
                showDeleteDialog={showDeleteDialog}
                showEditDialog={showEditDialog}
            />
        );
    });

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    function handleDeleteTodo() {
        const updatedTodos = todos.filter((t) => t.id !== todoFromDeleteBtn.id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setOpenDeleteDialog(false);

        showHideCustomSnackbar('تم الحذف بنجاح', 'error');
    }

    function showDeleteDialog(t) {
        setOpenDeleteDialog(true);
        setTodoFromDeleteBtn(t);
    }

    function showEditDialog(t) {
        setTodoFromEditBtn(t);
        setEditDialogTitleInput(t.title);
        setEditDialogDescriptionInput(t.description);
        setOpenEditDialog(true);
    }

    function handleCloseEditDialog() {
        setOpenEditDialog(false);
    }

    function handleEditTodo() {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoFromEditBtn.id) {
                return {
                    ...todo,
                    title: editDialogTitleInput,
                    description: editDialogDescriptionInput,
                };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(todos));
        setOpenEditDialog(false);
        showHideCustomSnackbar('تم التعديل بنجاح', 'success');
    }

    function handleCloseDeleteDialog() {
        setOpenDeleteDialog(false);
    }

    function changeDisplayedType(event) {
        setDisplayedTodosType(event.target.value);
    }
    // Add new todo
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
        setDescriptionInput('');
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        showHideCustomSnackbar('تمت الإضافة بنجاح', 'success');
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
                        value={editDialogTitleInput}
                        onChange={(e) =>
                            setEditDialogTitleInput(e.target.value)
                        }
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
                        value={editDialogDescriptionInput}
                        onChange={(e) =>
                            setEditDialogDescriptionInput(e.target.value)
                        }
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
