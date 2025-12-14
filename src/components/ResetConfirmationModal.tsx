import React, { useState, useEffect } from 'react';

interface ResetConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            setInputValue('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const isValid = inputValue.trim().toLowerCase() === 'reiniciar';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--color-surface, #1e1e1e)',
                padding: '2rem',
                borderRadius: '1rem',
                maxWidth: '400px',
                width: '90%',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#ef4444' }}>⚠️ Acción Peligrosa</h3>
                <p style={{ color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                    Esta acción eliminará <strong>permanentemente</strong> todo el progreso del sorteo actual.
                    Esta acción no se puede deshacer.
                </p>
                <p style={{ fontSize: '0.9rem' }}>
                    Introduce la contraseña de administrador para continuar:
                </p>

                <input
                    type="password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Contraseña"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                    }}
                    autoFocus
                />

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--color-border)',
                            background: 'transparent',
                            color: 'var(--color-text)',
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!isValid}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: isValid ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                            color: isValid ? 'white' : 'rgba(255, 255, 255, 0.3)',
                            cursor: isValid ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetConfirmationModal;
