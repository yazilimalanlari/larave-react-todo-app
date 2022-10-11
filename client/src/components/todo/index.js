import { useEffect, useState } from 'react';
import api from '../../app/api';
import TodoItem from './TodoItem';
import Modal from '../global/Modal';
import TodoAdd from './TodoAdd';

function Todo() {
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    
    useEffect(() => {
        api.get('todo', { page, searchText })
            .then(result => {
                setTasks(result.data);
                setTotalCount(result.totalCount);
            })
            .catch(() => setError('Unauthorized'));
    }, [page, searchText]);

    const removeTask = id => {
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        setTasks([...tasks]);
    }

    const editTask = (id, content) => {
        const index = tasks.findIndex(task => task.id === id);
        tasks[index] = { ...tasks[index], content };
        setTasks([...tasks].slice(0, 10));
    }

    return (
        <div className="todo-app">
            <div className="header">
                <h1>To Do List</h1>
                <input 
                    type="text" 
                    placeholder="Search"
                    onChange={e => setSearchText(e.target.value)} />
                <button onClick={() => setIsAdd(true)}>Add Task</button>
            </div>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <ul>
                {tasks.map(task => <TodoItem key={task.id} {...task} removeTask={removeTask} editTask={editTask} />)}
            </ul>
            <Modal 
                title="Add Task"
                open={isAdd}
                onClose={() => setIsAdd(false)}>
                <TodoAdd onClose={data => {
                    setIsAdd(false);
                    setTasks([data, ...tasks]);
                    setTotalCount(totalCount + 1);
                }} />
            </Modal>
            <div className="pagination">
                {[...new Array(Math.ceil(totalCount / 10))].map((_, i) => (
                    <span 
                        key={i} 
                        className={i === page ? 'active' : null}
                        onClick={() => setPage(i)}>{i + 1}</span>
                ))}
            </div>
        </div>
    )
}

export default Todo;