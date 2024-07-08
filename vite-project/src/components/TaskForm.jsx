import React, { useState, useContext } from 'react';
import { CreateTask } from '../api';
import AuthContext from '../AuthContext';

const TaskForm = ({ onTaskCreated, closeModal }) => {
    const { token, userId } = useContext(AuthContext);
    const [task, setTask] = useState({
        titulo: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        priority: '',
        courseName: ''
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is null');
            return;
        }
        try {
            const response = await CreateTask(token, { ...task, userId });
            onTaskCreated(response);
            closeModal();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Título:
                <input type="text" name="titulo" value={task.titulo} onChange={handleChange} required />
            </label>
            <label>
                Descripción:
                <input type="text" name="descripcion" value={task.descripcion} onChange={handleChange} required />
            </label>
            <label>
                Fecha Inicio:
                <input type="date" name="fechaInicio" value={task.fechaInicio} onChange={handleChange} required />
            </label>
            <label>
                Fecha Fin:
                <input type="date" name="fechaFin" value={task.fechaFin} onChange={handleChange} required />
            </label>
            <label>
                Estado:
                <input type="text" name="estado" value={task.estado} onChange={handleChange} required />
            </label>
            <label>
                Prioridad:
                <input type="text" name="priority" value={task.priority} onChange={handleChange} required />
            </label>
            <label>
                Nombre del Curso:
                <input type="text" name="courseName" value={task.courseName} onChange={handleChange} required />
            </label>
            <button type="submit">Crear Tarea</button>
        </form>
    );
};

export default TaskForm;
