import React from 'react';
import { useState, useEffect } from 'react';

const ApprovalQueue = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch access requests from an API
        const fetchRequests = async () => {
            const response = await fetch('/api/access-requests');
            const data = await response.json();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    const handleApproval = async (id) => {
        // Approve access request
        await fetch(`/api/access-requests/${id}/approve`, { method: 'POST' });
        setRequests(requests.filter(request => request.id !== id));
    };

    const handleRejection = async (id) => {
        // Reject access request
        await fetch(`/api/access-requests/${id}/reject`, { method: 'POST' });
        setRequests(requests.filter(request => request.id !== id));
    };

    return (
        <div>
            <h1>Approval Queue</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.name}</td>
                            <td>{request.department}</td>
                            <td>
                                <button onClick={() => handleApproval(request.id)}>Approve</button>
                                <button onClick={() => handleRejection(request.id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovalQueue;