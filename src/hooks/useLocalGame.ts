import { useState } from 'react';
import { assignSecretSanta, User, Assignment } from '../utils/secretSanta';

export const useLocalGame = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const addUser = (name: string) => {
        setUsers([...users, { id: generateId(), name }]);
    };

    const removeUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const assign = () => {
        try {
            const newAssignments = assignSecretSanta(users);
            setAssignments(newAssignments);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const reset = () => {
        setAssignments([]);
    };

    return {
        users,
        assignments,
        addUser,
        removeUser,
        assign,
        reset,
        loading: false // Consistency with useFirebaseGame
    };
};
