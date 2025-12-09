import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{
                    fontSize: '3rem',
                    background: 'linear-gradient(to right, #a78bfa, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    Amigo Invisible
                </h1>
                <p style={{ color: 'var(--color-text-dim)' }}>
                    ¡Organiza el mejor intercambio de regalos!
                </p>
            </header>
            <main className="glass-panel" style={{ padding: '2rem' }}>
                {children}
            </main>
            <footer style={{
                textAlign: 'center',
                marginTop: 'auto',
                paddingTop: '2rem',
                color: 'var(--color-text-dim)',
                fontSize: '0.875rem'
            }}>
                © {new Date().getFullYear()} Secret Santa App
            </footer>
        </div>
    );
};

export default Layout;
