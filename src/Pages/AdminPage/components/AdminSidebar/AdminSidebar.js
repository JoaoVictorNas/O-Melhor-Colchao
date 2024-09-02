import React from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ setSelectedSection }) => {
    const menuItems = [
        { name: 'Home', section: 'home' },
        { name: 'Critérios de Marca', section: 'criterios' },
        { name: 'Critérios do Colchão', section: 'slider' },
        { name: 'Órgãos Regulamentadores', section: 'orgaos' },
        { name: 'Ranking', section: 'compare' },
        { name: 'Desconto', section: 'desconto' },
        { name: 'Blogs', section: 'blogs' },
        { name: 'FAQs', section: 'faq' },
        { name: 'Review', section: 'review'}
    ];

    return (
        <aside className="admin-sidebar">
            <ul className="admin-menu">
                {menuItems.map((item) => (
                    <li 
                        key={item.section} 
                        onClick={() => setSelectedSection(item.section)}
                        className="admin-menu-item"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default AdminSidebar;