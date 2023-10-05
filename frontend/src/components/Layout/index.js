import React from "react";
import './Layout.css';
import { useNavigate } from "react-router-dom";

const Layout = ({ Image, Content }) => {
    const navigate = useNavigate();

    // const clickHandler = () => {
    //     navigate('/');
    // }
    return (
        <div className="container">
            <div className="app-name" >WePlayChess (WPC)</div>
            <div className="inner-container">
                <Image />
                <div className="content">
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Layout;