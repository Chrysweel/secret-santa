import React, { useState } from 'react';
import { Assignment } from '../utils/secretSanta';
import RevealModal from './RevealModal';

interface AssignmentDisplayProps {
    assignments: Assignment[];
    onReset: () => void;
}

const UNLOCK_THRESHOLD = 4;

const AssignmentDisplay: React.FC<AssignmentDisplayProps> = ({ assignments, onReset }) => {
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [, setUnlockClicks] = useState<Record<string, number>>({});

    const handleCardClick = (assignment: Assignment) => {
        const isLocked = revealedIds.has(assignment.giver.id);

        if (isLocked) {
            // Count clicks to unlock
            setUnlockClicks(prev => {
                const currentClicks = (prev[assignment.giver.id] || 0) + 1;
                if (currentClicks >= UNLOCK_THRESHOLD) {
                    // Unlock
                    const newRevealedIds = new Set(revealedIds);
                    newRevealedIds.delete(assignment.giver.id);
                    setRevealedIds(newRevealedIds);

                    // Reset clicks
                    const newClicks = { ...prev };
                    delete newClicks[assignment.giver.id];
                    return newClicks;
                }
                return { ...prev, [assignment.giver.id]: currentClicks };
            });
        } else {
            setSelectedAssignment(assignment);
        }
    };

    const handleRevealComplete = () => {
        if (selectedAssignment) {
            setRevealedIds(prev => new Set(prev).add(selectedAssignment.giver.id));
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                    🎁 Selecciona tu nombre
                </h2>
                <button
                    onClick={onReset}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-border)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        color: 'var(--color-text-dim)',
                        cursor: 'pointer'
                    }}
                >
                    Reiniciar Sorteo
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1.5rem',
                justifyContent: 'center'
            }}>
                {assignments.map((assignment) => {
                    const isLocked = revealedIds.has(assignment.giver.id);
                    return (
                        <button
                            key={assignment.giver.id}
                            onClick={() => handleCardClick(assignment)}
                            className="glass-panel"
                            style={{
                                padding: '2rem 1rem',
                                border: '1px solid var(--color-border)',
                                background: isLocked ? 'rgba(0, 0, 0, 0.2)' : 'var(--color-surface)',
                                color: isLocked ? 'var(--color-text-dim)' : 'var(--color-text)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'transform 0.2s, background 0.2s',
                                textAlign: 'center',
                                opacity: isLocked ? 0.6 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isLocked) {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = isLocked ? 'rgba(0, 0, 0, 0.2)' : 'var(--color-surface)';
                            }}
                        >
                            <div style={{ fontSize: '2rem' }}>{isLocked ? '🔒' : '👤'}</div>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                {assignment.giver.name}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                                {isLocked ? 'Completado' : 'Toca para descubrir'}
                            </span>
                        </button>
                    );
                })}
            </div>

            {selectedAssignment && (
                <RevealModal
                    assignment={selectedAssignment}
                    onClose={() => setSelectedAssignment(null)}
                    onComplete={handleRevealComplete}
                />
            )}
        </div>
    );
};

export default AssignmentDisplay;
