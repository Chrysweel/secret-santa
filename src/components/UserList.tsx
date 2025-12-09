import React from 'react';
import { User } from '../utils/secretSanta';

interface UserListProps {
    users: User[];
    onRemoveUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onRemoveUser }) => {
    if (users.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                color: 'var(--color-text-dim)',
                fontStyle: 'italic',
                padding: '2rem',
                border: '1px dashed var(--color-border)',
                borderRadius: '0.5rem'
            }}>
                No hay participantes todavía. ¡Añade algunos!
            </div>
        );
    }

    return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {users.map((user) => (
                <li
                    key={user.id}
                    style={{
                        background: 'var(--color-surface)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid var(--color-border)'
                    }}
                >
                    <span style={{ fontWeight: 500 }}>{user.name}</span>
                    <button
                        onClick={() => onRemoveUser(user.id)}
                        style={{
                            background: 'transparent',
                            color: '#ef4444',
                            fontSize: '1.25rem',
                            opacity: 0.8,
                            transition: 'opacity 0.2s',
                            padding: '0.25rem'
                        }}
                        title="Eliminar"
                    >
                        &times;
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
