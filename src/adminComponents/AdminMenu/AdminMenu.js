import React from 'react';
import {Link} from 'react-router-dom';
import './AdminMenu.css';

// this class renders the menu for the admin page
// it shows all the changable operations
class AdminMenu extends React.Component{

    
    render(){
        return(
            <div className="admin-menu">
               <ul className="admin-menu-items">
                    <li><Link to="/admin-stuff/items">Add/Edit/Remove Items</Link></li>
                    <li><Link to="/admin-stuff/work">Porfolio</Link></li>
                    <li><Link to="/admin-stuff/landingpage">Landing Page</Link></li>
                    <li><Link to="/admin-stuff/highlights">High Lights</Link></li>
                    <li><Link to="/admin-stuff/letters">Create/Send Letters</Link></li>
                    <li><Link to="/admin-stuff/stats">View Info Requests</Link></li>
               </ul>
            </div>
        )
    }
}

export default AdminMenu;