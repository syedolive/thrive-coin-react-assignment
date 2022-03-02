import React, {AnchorHTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import {instance} from "../api/api";
import {useUserContext} from "../stores/user.store";
import RecentConnections from "../components/RecentConnections";
import SideBox from "../components/SideBox";
import NavMenu from "../components/NavMenu";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useConnectionsContext} from "../stores/connections.store";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {setConnectionsData} = useConnectionsContext();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = useCallback(async () => {
        Promise.all([
            instance({
                url: 'users/invitations',
                method: 'GET',
            }),
            instance({
                url: 'users/recent_connections',
                method: 'GET',
            })
        ]).then(([invitations, recentConnections]) => {
            const {data: {data: {invitations: invitationsResponse}}} = invitations;
            const {data: {data: {connections}}} = recentConnections;
            setConnectionsData(invitationsResponse, connections);
        })
    }, []);
    const _onTabClick = useCallback((e) => {
        e.preventDefault();
        const url = e.target.getAttribute('href');
        navigate(url);
    }, []);
    return (
        <>
            {/*Nav Menu*/}
            <NavMenu/>
            <section className="content-section">
                <div className="overlay-content" />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="row">
                                <div className="col-xs-2 col-lg-3 mb-3 mb-lg-0">
                                {/*    SideBox*/}
                                <SideBox/>
                                </div>
                                <div className="col-xs-10 col-lg-9">
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="switch__tabs">
                                                <li className={location.pathname === '/invitations' ? 'active' : ''}>
                                                    <a href="/invitations" onClick={_onTabClick}>Received</a>
                                                </li>
                                                <li className={location.pathname === '/invitations/sent' ? 'active' : ''}>
                                                    <a href="/invitations/sent" onClick={_onTabClick}>Sent</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12 my-4 text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="line-left" />
                                                <p className="new-connection">
                                                    You have <span>2 new connections</span>
                                                </p>
                                                <div className="line-right" />
                                            </div>
                                        </div>
                                        <Outlet/>
                                    </div>
                                {/*    Recent Connections*/}
                                <RecentConnections/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
};

export default Home;
