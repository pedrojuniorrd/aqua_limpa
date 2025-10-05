// src/app/dashboard/page.tsx
'use client';

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Report {
    _id: string;
    description: string;
    type: string;
    createdAt: string;
}

/**
 * Componente da Página do Painel - Conteúdo PRIVADO
 * Só deve ser renderizado na rota /dashboard e para usuários logados.
 */
export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    // O SWR só vai tentar buscar os dados se o usuário estiver autenticado
    const { data: myReports, error, isLoading, mutate } = useSWR<Report[]>(
        status === 'authenticated' ? '/api/user/reports' : null,
        fetcher
    );

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status !== 'authenticated' || isLoading) {
        return <div className="container" style={{padding: '2rem 0'}}>Carregando...</div>;
    }
    
    if (error) return <div className="container" style={{padding: '2rem 0'}}>Falha ao carregar seus reports.</div>;

    const handleDelete = async (reportId: string) => {
        if (!confirm('Tem certeza que deseja excluir este report?')) return;

        try {
            await fetch(`/api/reports/${reportId}`, { method: 'DELETE' });
            mutate();
        } catch (err) {
            alert('Falha ao excluir o report.');
        }
    };

    return (
        <main style={{ padding: '2rem 0' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>Painel de Controle</h1>
                <h2>Olá, {session.user?.name}!</h2>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Meus Reports</h3>
                
                {myReports && myReports.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myReports.map((report) => (
                            <div key={report._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p><strong>Descrição:</strong> {report.description}</p>
                                    <p><strong>Tipo:</strong> {report.type}</p>
                                    <small>Reportado em: {new Date(report.createdAt).toLocaleDateString('pt-BR')}</small>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn" onClick={() => alert('Função de editar a ser implementada!')}>Editar</button>
                                    <button className="btn" style={{ backgroundColor: '#e53e3e' }} onClick={() => handleDelete(report._id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Você ainda não fez nenhum report.</p>
                )}
            </div>
        </main>
    );
}