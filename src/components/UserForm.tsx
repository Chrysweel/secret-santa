import React, { useState } from 'react';

interface UserFormProps {
    onAddUser: (name: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddUser(name.trim());
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <input
                type="text"
                className="input-field"
                placeholder="Nombre del participante..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />
            <button type="submit" className="btn-primary">
                Añadir
            </button>
        </form>
    );
};

export default UserForm;
