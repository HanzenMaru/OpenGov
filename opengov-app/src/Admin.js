import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import './Admin.css';
import { BiPlus, BiEdit, BiTrash, BiDownload, BiGridAlt, BiBarChartAlt2, BiQrScan, BiLogOut } from 'react-icons/bi';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

const AdminPanel = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [projects, setProjects] = useState([]);

    // NEW: Form State for adding projects
    const [newProj, setNewProj] = useState({
        title: '',
        location: '',
        status: 'Planned',
        total_budget: '',
        is_published: 0
    });

    // --- DATABASE CONNECTION: FETCH PROJECTS ---
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async() => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    const stats = {
        total: projects.length,
        budget: projects.reduce((acc, curr) => acc + parseFloat(curr.total_budget || 0), 0),
        ongoing: projects.filter(p => p.status === 'Ongoing').length,
        completed: projects.filter(p => p.status === 'Completed').length
    };

    const downloadQR = (id) => {
        const canvas = document.getElementById(`qr-${id}`);
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `project-qr-${id}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return ( <
        div className = "admin-container" >
        <
        aside className = "admin-sidebar" >
        <
        div className = "admin-logo" > Admin < span > GOV < /span></div >
        <
        nav >
        <
        button className = { activeTab === 'dashboard' ? 'active' : '' }
        onClick = {
            () => setActiveTab('dashboard')
        } > < BiBarChartAlt2 / > Dashboard < /button> <
        button className = { activeTab === 'manage' ? 'active' : '' }
        onClick = {
            () => setActiveTab('manage')
        } > < BiGridAlt / > Manage Projects < /button> <
        button className = { activeTab === 'qr' ? 'active' : '' }
        onClick = {
            () => setActiveTab('qr')
        } > < BiQrScan / > QR Generator < /button> <
        button className = "logout-btn"
        onClick = { onLogout } > < BiLogOut / > Logout < /button> < /
        nav > <
        /aside>

        <
        main className = "admin-main" > {
            activeTab === 'dashboard' && ( <
                div className = "admin-view" >
                <
                header > < h2 > Dashboard Summary < /h2></header >
                <
                div className = "stats-grid" >
                <
                div className = "admin-stat-card" > < h3 > { stats.total } < /h3><p>Total Projects</p > < /div> <
                div className = "admin-stat-card" > < h3 > ₱{ stats.budget.toLocaleString() } < /h3><p>Allocated Budget</p > < /div> <
                div className = "admin-stat-card" > < h3 > { stats.ongoing } < /h3><p>Ongoing</p > < /div> <
                div className = "admin-stat-card" > < h3 > { stats.completed } < /h3><p>Completed</p > < /div> < /
                div > <
                /div>
            )
        }

        {
            activeTab === 'manage' && ( <
                div className = "admin-view" >
                <
                header className = "flex-header" >
                <
                h2 > Project Management < /h2> <
                button className = "btn-add" > < BiPlus / > Add Project < /button> < /
                header > <
                table className = "admin-table" >
                <
                thead >
                <
                tr >
                <
                th > Title < /th> <
                th > Location < /th> <
                th > Status < /th> <
                th > Budget < /th> <
                th > Actions < /th> < /
                tr > <
                /thead> <
                tbody > {
                    projects.map(p => ( <
                        tr key = { p.project_id } >
                        <
                        td > { p.title } < /td> <
                        td > { p.location } < /td> <
                        td > < span className = { `badge ${p.status.toLowerCase()}` } > { p.status } < /span></td >
                        <
                        td > ₱{ parseFloat(p.total_budget).toLocaleString() } < /td> <
                        td >
                        <
                        button className = "action-btn edit" > < BiEdit / > < /button> <
                        button className = "action-btn delete" > < BiTrash / > < /button> < /
                        td > <
                        /tr>
                    ))
                } <
                /tbody> < /
                table > <
                /div>
            )
        }

        {
            activeTab === 'qr' && ( <
                div className = "admin-view" >
                <
                header > < h2 > QR Code Generator < /h2></header >
                <
                div className = "qr-grid" > {
                    projects.map(p => ( <
                        div className = "qr-card"
                        key = { p.project_id } >
                        <
                        QRCodeCanvas id = { `qr-${p.project_id}` }
                        value = { `https://opengov.ph/project/${p.project_id}` }
                        size = { 150 }
                        level = { "H" }
                        /> <
                        p > { p.title } < /p> <
                        button onClick = {
                            () => downloadQR(p.project_id)
                        } > < BiDownload / > Download < /button> < /
                        div >
                    ))
                } <
                /div> < /
                div >
            )
        } <
        /main> < /
        div >
    );
};

export default AdminPanel;