import { useEffect, useState } from 'react';
import api from '../../app/api';

function TodoAdd({ onClose, editMode, editData = {} }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editMode) setContent(editData.content);
    }, [editMode, editData]);

    const onClick = () => {
        if (!editMode) {
            api.post('todo', { content })
                .then(result => {
                    if (result.status === 'success') {
                        onClose({ id: result.data.id, content, done: false });
                        setContent('');
                    }
                });
        } else {
            api.put(`todo/${editData.id}`, { content }).then(result => {
                if (result.status === 'success') {
                    onClose(content);
                }
            });
        }
    }

    return (
        <div className="add-task">
            <input type="text" placeholder="Content" onChange={e => setContent(e.target.value)} value={content} />
            <button onClick={onClick} disabled={!Boolean(content)}>Save</button>
        </div>
    )
}

export default TodoAdd;