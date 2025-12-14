import React, { useState } from 'react';
import { Assignment } from '../utils/secretSanta';
import RevealModal from './RevealModal';
import ResetConfirmationModal from './ResetConfirmationModal';

interface AssignmentDisplayProps {
    assignments: Assignment[];
    revealed: Set<string>;
    onMarkAsRevealed: (id: string) => void;
    onReset: () => void;
}

const UNLOCK_THRESHOLD = 4;

const AssignmentDisplay: React.FC<AssignmentDisplayProps> = ({ assignments, revealed, onMarkAsRevealed, onReset }) => {
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [, setUnlockClicks] = useState<{ id: string | null; count: number }>({ id: null, count: 0 });

    // Better implementation for the unlock trick with props:
    // We need a local state for 'temporarily unlocked' cards.
    const [localUnlocks, setLocalUnlocks] = useState<Set<string>>(new Set());

    const handleCardClick = (assignment: Assignment) => {
        const isPersistedLocked = revealed.has(assignment.giver.id);
        const isLocallyUnlocked = localUnlocks.has(assignment.giver.id);
        const isLocked = isPersistedLocked && !isLocallyUnlocked;

        if (isLocked) {
            setUnlockClicks(prev => {
                // If clicking the same card, increment count
                if (prev.id === assignment.giver.id) {
                    const newCount = prev.count + 1;
                    if (newCount >= UNLOCK_THRESHOLD) {
                        setLocalUnlocks(prevUnlock => new Set(prevUnlock).add(assignment.giver.id));
                        return { id: null, count: 0 };
                    }
                    return { ...prev, count: newCount };
                }
                // If clicking a different card, reset count to 1 for new card
                return { id: assignment.giver.id, count: 1 };
            });
        } else {
            setSelectedAssignment(assignment);
        }
    }

    const handleRevealComplete = () => {
        if (selectedAssignment) {
            onMarkAsRevealed(selectedAssignment.giver.id);
            // Also ensure it's not locally unlocked anymore if we just revealed it? 
            // Or maybe it stays unlocked? Let's keep it simple.
        }
    };

    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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
                    onClick={() => setIsResetModalOpen(true)}
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
                    const isPersistedLocked = revealed.has(assignment.giver.id);
                    const isLocallyUnlocked = localUnlocks.has(assignment.giver.id);
                    const isLocked = isPersistedLocked && !isLocallyUnlocked;

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

            <ResetConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={() => {
                    onReset();
                    setIsResetModalOpen(false);
                }}
            />
        </div>
    );
};

export default AssignmentDisplay;
