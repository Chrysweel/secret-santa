import React, { useState } from 'react';
import { Assignment } from '../utils/secretSanta';

interface AssignmentDisplayProps {
    assignments: Assignment[];
    onReset: () => void;
}

const AssignmentDisplay: React.FC<AssignmentDisplayProps> = ({ assignments, onReset }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    const currentAssignment = assignments[currentIndex];
    const isLast = currentIndex === assignments.length - 1;

    const handleNext = () => {
        setIsRevealed(false);
        if (isLast) {
            onReset();
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>
                Turno de: <br />
                <span style={{ fontSize: '2rem', color: 'var(--color-text)' }}>
                    {currentAssignment.giver.name}
                </span>
            </h3>

            {!isRevealed ? (
                <button
                    className="btn-primary"
                    onClick={() => setIsRevealed(true)}
                    style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                >
                    🎁 Revelar a quién regalas
                </button>
            ) : (
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', background: 'rgba(139, 92, 246, 0.2)' }}>
                    <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-dim)' }}>Tu Amigo Invisible es:</p>
                    <h2 style={{ fontSize: '2.5rem', margin: '1rem 0', color: 'var(--color-secondary)' }}>
                        {currentAssignment.receiver.name}
                    </h2>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        style={{ marginTop: '1rem' }}
                    >
                        {isLast ? 'Terminar Juego' : 'Siguiente Turno'}
                    </button>
                </div>
            )}

            {!isRevealed && (
                <p style={{ marginTop: '2rem', color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
                    Asegúrate de que solo {currentAssignment.giver.name} esté mirando la pantalla.
                </p>
            )}
        </div>
    );
};

export default AssignmentDisplay;
