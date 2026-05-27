import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import AdminPanel from './Admin';
import { IoMdHome, IoMdArrowBack } from 'react-icons/io';
import { BiScan, BiGridAlt } from 'react-icons/bi';

// --- SUB-COMPONENTS ---
const MobileNav = ({ setView }) => ( <
    div className = "mobile-nav" >
    <
    button className = "nav-item"
    onClick = {
        () => setView('dashboard') } > < IoMdHome size = { 28 }
    /><span>Home</span > < /button> <
    button className = "nav-item"
    onClick = {
        () => alert("Scanner Initializing...") } > < BiScan size = { 28 }
    /><span>Scan</span > < /button> <
    button className = "nav-item"
    onClick = {
        () => setView('projects') } > < BiGridAlt size = { 28 }
    /><span>Projects</span > < /button> <
    /div>
);

const StatCard = ({ icon, num, p, t, s }) => ( <
    div className = "stat-row" >
    <
    div className = "stat-icon-circle" > { icon } < /div> <
    div className = "stat-info" >
    <
    div className = "stat-main" >
    <
    span className = "stat-number" > { num } < /span> <
    span className = "stat-percent" > ({ p }) < /span> <
    /div> <
    div className = "stat-label" > { t } < /div> <
    div className = "stat-sublabel" > { s } < /div> <
    /div> <
    /div>
);

const ProjectCard = ({ project, onViewDetails }) => ( <
    div className = "project-card" >
    <
    div className = "project-header" >
    <
    span className = "project-title-text" > { project.name } < /span> <
    span className = "project-id-badge" > { project.id_code } < /span> <
    /div> <
    div className = "project-body" >
    <
    div className = "project-icon-box" >
    <
    span className = "project-emoji" > { project.icon } < /span> <
    div className = "project-meta" > < span className = "status-label" > { project.status } < /span></div >
    <
    /div> <
    button className = "view-details-btn"
    onClick = {
        () => onViewDetails(project) } > View Details < /button> <
    /div> <
    div className = "progress-section" >
    <
    div className = "progress-bar-container" >
    <
    div className = "progress-fill physical"
    style = {
        { width: project.progress1 } } > < /div> <
    span className = "progress-text" > { project.progress1 }
    Physical < /span> <
    /div> <
    div className = "progress-bar-container" >
    <
    div className = "progress-fill financial"
    style = {
        { width: project.progress2 } } > < /div> <
    span className = "progress-text" > { project.progress2 }
    Financial < /span> <
    /div> <
    /div> <
    /div>
);

// --- MAIN APP ---
function App() {
    const [view, setView] = useState('landing');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [fullNameInput, setFullNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");

    const [projectFilter, setProjectFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const projectData = [
        { id: 1, name: "Daycare Repair", id_code: "PRJ-001", status: "Completed", icon: "🏫", progress1: "100%", progress2: "100%", category: "Completed" },
        { id: 2, name: "Road Improvement", id_code: "PRJ-002", status: "Ongoing", icon: "🚜", progress1: "45%", progress2: "60%", category: "Ongoing" },
        { id: 3, name: "Solar Street Lights", id_code: "PRJ-003", status: "Ongoing", icon: "💡", progress1: "15%", progress2: "100%", category: "Ongoing" },
    ];

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email: emailInput, password: passInput });
            if (response.data && response.data.success) {
                setUserEmail(response.data.user.email);
                setUserName(response.data.user.full_name);
                setView(response.data.user.role === 'admin' ? 'admin_dashboard' : 'dashboard');
            }
        } catch (error) {
            const msg = (error.response && error.response.data && error.response.data.message) ? error.response.data.message : "Login failed.";
            alert(msg);
        }
    };

    const handleSignup = async() => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', { full_name: fullNameInput, email: emailInput, password: passInput });
            if (response.data && response.data.success) {
                alert("Account created! You can now log in.");
                setView('login');
            }
        } catch (error) {
            alert("Registration Error: " + (error.response && error.response.data ? error.response.data.message : "Error"));
        }
    };

    if (view === 'admin_dashboard') return <AdminPanel onLogout = {
        () => setView('landing') }
    />;

    return ( <
        div className = "app-shell" > {
            isMenuOpen && < div className = "menu-overlay"
            onClick = {
                () => setIsMenuOpen(false) }
            />}

            <
            div className = { `side-menu ${isMenuOpen ? 'open' : ''}` } >
            <
            div className = "menu-profile" >
            <
            div className = "avatar-circle" > { userName ? userName.charAt(0).toUpperCase() : 'U' } < /div> <
            h3 className = "menu-user-name" > { userName || "Guest" } < /h3> <
            p className = "menu-user-email" > { userEmail || "Not logged in" } < /p> <
            /div> <
            nav className = "menu-links" > {
                ['mandate', 'mission', 'vision', 'privacy', 'about'].map(item => ( <
                    button key = { item }
                    onClick = {
                        () => { setView(item);
                            setIsMenuOpen(false); } } > { item.toUpperCase() } < /button>
                ))
            } <
            /nav> <
            button className = "menu-logout"
            onClick = {
                () => setView('landing') } > Log out < /button> <
            /div>

            <
            main className = "view-container" > {
                view === 'landing' && ( <
                    div className = "glass-card centered-content" >
                    <
                    h1 className = "logo-text main" > Open < span className = "gov-red" > GOV < /span> 24/
                    7 < /h1> <
                    p className = "hero-text" > Connecting Citizens to Government Day and Night < /p> <
                    div className = "btn-group" >
                    <
                    button className = "btn-primary"
                    onClick = {
                        () => setView('signup') } > Sign up < /button> <
                    button className = "btn-outline"
                    onClick = {
                        () => setView('login') } > Login < /button> <
                    /div> <
                    /div>
                )
            }

            { /* --- ADDED SIGNUP VIEW --- */ } {
                view === 'signup' && ( <
                    div className = "glass-card login-style centered-content" >
                    <
                    h2 > Create Account < /h2> <
                    div className = "form-container" >
                    <
                    label > Full Name < /label> <
                    input type = "text"
                    className = "line-input"
                    value = { fullNameInput }
                    onChange = {
                        (e) => setFullNameInput(e.target.value) }
                    /> <
                    label > Email < /label> <
                    input type = "email"
                    className = "line-input"
                    value = { emailInput }
                    onChange = {
                        (e) => setEmailInput(e.target.value) }
                    /> <
                    label > Password < /label> <
                    input type = "password"
                    className = "line-input"
                    value = { passInput }
                    onChange = {
                        (e) => setPassInput(e.target.value) }
                    /> <
                    button className = "btn-white-round"
                    onClick = { handleSignup } > Sign Up < /button> <
                    p className = "footer-text" > Already have an account ? < span className = "link-text"
                    onClick = {
                        () => setView('login') } > Login < /span></p >
                    <
                    /div> <
                    /div>
                )
            }

            {
                view === 'login' && ( <
                    div className = "glass-card login-style centered-content" >
                    <
                    h2 > Login < /h2> <
                    div className = "form-container" >
                    <
                    label > Email < /label> <
                    input type = "email"
                    className = "line-input"
                    value = { emailInput }
                    onChange = {
                        (e) => setEmailInput(e.target.value) }
                    /> <
                    label > Password < /label> <
                    input type = "password"
                    className = "line-input"
                    value = { passInput }
                    onChange = {
                        (e) => setPassInput(e.target.value) }
                    /> <
                    button className = "btn-white-round"
                    onClick = { handleLogin } > Log In < /button> <
                    p className = "footer-text" > Dont have an account ? < span className = "link-text"
                    onClick = {
                        () => setView('signup') } > Register < /span></p >
                    <
                    /div> <
                    /div>
                )
            }

            {
                view === 'dashboard' && ( <
                    div className = "dashboard-wrapper" >
                    <
                    header className = "dash-header" >
                    <
                    button className = "menu-icon"
                    onClick = {
                        () => setIsMenuOpen(true) } > ☰ < /button> <
                    h1 className = "logo-text-dash" > Open < span className = "gov-red" > GOV < /span> 24/
                    7 < /h1> <
                    /header> <
                    div className = "stat-list" >
                    <
                    StatCard icon = "📝"
                    num = "1,427"
                    p = "3.2%"
                    t = "For Procurement"
                    s = "Bidding Phase" / >
                    <
                    StatCard icon = "✅"
                    num = "1,546"
                    p = "83%"
                    t = "Completed Contracts"
                    s = "Built as Specified" / >
                    <
                    StatCard icon = "⏳"
                    num = "2,648"
                    p = "10%"
                    t = "Ongoing Contracts"
                    s = "In Progress" / >
                    <
                    /div> <
                    MobileNav setView = { setView }
                    /> <
                    /div>
                )
            }

            {
                view === 'projects' && ( <
                    div className = "dashboard-wrapper projects-page" >
                    <
                    div className = "page-header" >
                    <
                    IoMdArrowBack className = "back-btn"
                    onClick = {
                        () => setView('dashboard') }
                    /> <
                    h2 > Projects < /h2> <
                    /div> <
                    div className = "filter-bar" > {
                        ['All', 'Ongoing', 'Completed'].map(f => ( <
                            button key = { f }
                            className = { projectFilter === f ? 'active' : '' }
                            onClick = {
                                () => setProjectFilter(f) } > { f } < /button>
                        ))
                    } <
                    /div> <
                    div className = "project-list-container" > {
                        projectData.filter(p => projectFilter === 'All' || p.category === projectFilter).map(proj => ( <
                            ProjectCard key = { proj.id }
                            project = { proj }
                            onViewDetails = {
                                (p) => { setSelectedProject(p);
                                    setView('project_details'); } }
                            />
                        ))
                    } <
                    /div> <
                    MobileNav setView = { setView }
                    /> <
                    /div>
                )
            }

            {
                view === 'project_details' && selectedProject && ( <
                    div className = "dashboard-wrapper details-page" >
                    <
                    div className = "page-header" >
                    <
                    IoMdArrowBack className = "back-btn"
                    onClick = {
                        () => setView('projects') }
                    /> <
                    h2 > Project Details < /h2> <
                    /div> <
                    div className = "details-scroll-area" >
                    <
                    ProjectCard project = { selectedProject }
                    onViewDetails = {
                        () => {} }
                    /> <
                    div className = "project-image-box" >
                    <
                    img src = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=400"
                    alt = "site" / >
                    <
                    /div> <
                    h3 > Budget Breakdown < /h3> <
                    table className = "budget-table" >
                    <
                    thead >
                    <
                    tr > < th > Category < /th><th>Allocated</th > < th > Actual < /th></tr >
                    <
                    /thead> <
                    tbody >
                    <
                    tr > < td > Materials < /td><td>₱500,000</td > < td > ₱480, 000 < /td></tr >
                    <
                    tr > < td > Labor < /td><td>₱200,000</td > < td > ₱195, 000 < /td></tr >
                    <
                    tr > < td > Equipment < /td><td>₱150,000</td > < td > ₱150, 000 < /td></tr >
                    <
                    /tbody> <
                    /table> <
                    /div> <
                    MobileNav setView = { setView }
                    /> <
                    /div>
                )
            } <
            /main> <
            /div>
        );
    }

    export default App;