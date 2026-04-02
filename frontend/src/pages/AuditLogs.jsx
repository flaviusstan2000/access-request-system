import React from 'react';

const AuditLogs = () => {
    const [logs, setLogs] = React.useState([]);

    React.useEffect(() => {
        // Fetch logs from an API
        fetch('/api/audit-logs')
            .then(response => response.json())
            .then(data => setLogs(data));
    }, []);

    const exportLogs = () => {
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit-logs.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>Audit Logs</h1>
            <button onClick={exportLogs}>Export Logs</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.date}</td>
                            <td>{log.user}</td>
                            <td>{log.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLogs;