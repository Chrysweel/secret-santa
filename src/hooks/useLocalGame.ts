import { useState } from 'react';
import { assignSecretSanta, User, Assignment } from '../utils/secretSanta';

export const useLocalGame = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [revealed, setRevealed] = useState<Set<string>>(new Set());

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
            setRevealed(new Set());
        } catch (error: any) {
            alert(error.message);
        }
    };

    const reset = () => {
        setAssignments([]);
        setRevealed(new Set());
    };

    const markAsRevealed = (userId: string) => {
        setRevealed(prev => new Set(prev).add(userId));
    };

    return {
        users,
        assignments,
        revealed,
        addUser,
        removeUser,
        assign,
        reset,
        markAsRevealed,
        loading: false
    };
};
