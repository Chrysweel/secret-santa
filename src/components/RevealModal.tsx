import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Assignment } from '../utils/secretSanta';

interface RevealModalProps {
    assignment: Assignment;
    onClose: () => void;
    onComplete?: () => void;
}

const RevealModal: React.FC<RevealModalProps> = ({ assignment, onClose, onComplete }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="glass-panel" style={{
                maxWidth: '500px',
                width: '100%',
                padding: '2rem',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text)',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>

                {!isConfirmed ? (
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                            Confirmación de Identidad
                        </h3>
                        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
                            ¿Eres realmente <strong style={{ color: 'var(--color-primary)' }}>{assignment.giver.name}</strong>?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="btn-primary"
                                onClick={() => setIsConfirmed(true)}
                            >
                                Sí, soy yo
                            </button>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--color-border)',
                                    background: 'transparent',
                                    color: 'var(--color-text)',
                                    cursor: 'pointer'
                                }}
                            >
                                No, cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>
                            Tu Amigo Invisible es:
                        </h3>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'var(--color-primary)',
                            marginBottom: '3rem',
                            animation: 'fadeIn 0.5s ease-out'
                        }}>
                            {assignment.receiver.name}
                        </div>
                        <p style={{ color: 'var(--color-text-dim)', marginBottom: '2rem' }}>
                            ¡Shhh! No se lo digas a nadie. 🤫
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                if (onComplete) onComplete();
                                onClose();
                            }}
                        >
                            Entendido
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default RevealModal;
