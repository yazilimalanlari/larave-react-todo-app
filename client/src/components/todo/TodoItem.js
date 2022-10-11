import { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/images/icons/delete_icon.svg';
import { ReactComponent as EditIcon } from '../../assets/images/icons/edit_icon.svg';
import api from '../../app/api';
import Modal from '../global/Modal';
import TodoAdd from './TodoAdd';

function TodoItem({ content, done: _done, id, removeTask, editTask }) {
    const [done, setDone] = useState(_done);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setDone(_done);
    }, [_done]);

    const onChange = () => {
        api.put(`todo/${id}`, { done: !done })
            .then(result => {
                if (result.status === 'success') setDone(!done);
            });
    }

    const onDelete = () => {
        api.delete(`todo/${id}`)
            .then(() => {
                removeTask(id);
                setIsDelete(false);
            });
    }

    return (
        <li>
            <label>
                <input type="checkbox" onChange={onChange} checked={done} />
                <span className="checkmark"></span>
            </label>
            <div className="task-content" style={{ textDecoration: done ? 'line-through' : 'none' }}>{content}</div>
            <div className="action">
                <span className="edit-button" onClick={() => setIsEdit(true)}>
                    <EditIcon />
                </span>
                <span className="delete-button" onClick={() => setIsDelete(true)}>
                    <DeleteIcon />
                </span>
            </div>
            <Modal
                title="Edit Task"
                open={isEdit}
                onClose={() => setIsEdit(false)}>
                <TodoAdd 
                    editMode={true} 
                    editData={{ id, content }}
                    onClose={content => {
                        editTask(id, content);
                        setIsEdit(false);
                    }} />
            </Modal>
            <Modal
                title="Delete Task"
                open={isDelete}
                onClose={() => setIsDelete(false)}>
                <h4>Are you sure you want to delete this task?</h4>
                <button 
                    style={{ 
                        padding: 12,
                        width: '100%', 
                        marginTop: 24 
                    }}
                    onClick={onDelete}>Yes</button>
            </Modal>
        </li>
    )
}

export default TodoItem;