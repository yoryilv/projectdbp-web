import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { ListTasks } from '../api';
import AuthContext from '../AuthContext';
import TaskForm from './TaskForm';
import '../styles/Tasks.css';

Modal.setAppElement('#root');

const Tasks = () => {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await ListTasks(token, page);
                console.log('Fetched tasks:', data);
                setTasks(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.log('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [token, page]);

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="task-container">
            <button onClick={openModal}>Crear Tarea</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Crear Tarea"
            >
                <TaskForm onTaskCreated={handleTaskCreated} closeModal={closeModal} />
            </Modal>
            {tasks.length === 0 ? (
                <div>No hay tareas disponibles.</div>
            ) : (
                <div className="task-list">
                    {tasks.map(task => (
                        task && task.titulo ? (
                            <div 
                                key={task.id} 
                                className="task-item"
                            >
                                <h3>{task.titulo}</h3>
                                <p>{task.descripcion}</p>
                                <p>Fecha Inicio: {task.fechaInicio}</p>
                                <p>Fecha Fin: {task.fechaFin}</p>
                                <p>Estado: {task.estado}</p>
                                <p>Nombre del Curso: {task.courseName}</p>
                                <p>Prioridad: {task.priority}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                <span>{page + 1} / {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default Tasks;
