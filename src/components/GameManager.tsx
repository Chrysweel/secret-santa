
import UserForm from './UserForm';
import UserList from './UserList';
import AssignmentDisplay from './AssignmentDisplay';
import { useGame } from '../hooks/useGame';

const GameManager = () => {
    const { users, assignments, revealed, addUser, removeUser, assign, reset, markAsRevealed, loading } = useGame();

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando...</div>;
    }

    if (assignments.length > 0) {
        return (
            <AssignmentDisplay
                assignments={assignments}
                revealed={revealed}
                onMarkAsRevealed={markAsRevealed}
                onReset={reset}
            />
        );
    }

    return (
        <div style={{ width: '100%' }}>
            <UserForm onAddUser={addUser} />
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                    Participantes ({users.length})
                </h3>
                <UserList users={users} onRemoveUser={removeUser} />
            </div>

            {users.length > 1 && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        className="btn-primary"
                        onClick={assign}
                        style={{ fontSize: '1.2rem', width: '100%' }}
                    >
                        🎲 Realizar Sorteo
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameManager;
