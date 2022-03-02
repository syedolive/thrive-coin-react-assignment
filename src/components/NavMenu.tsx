import React, {memo} from "react";
import {useUserContext} from "../stores/user.store";
import {Users, MessageSquare, Search} from 'react-feather';
const NavMenu = (props: any) => {
    const {destroySession} = useUserContext();
    const _logout = () => {
        destroySession().then(res => {
            props.logout();
        })
    }
    return(
        <section className="nav">
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <div className="col-12">
                        <div className="nav_wrapper shadow-sm">
                            <div className="nav-left">
                                <a href="#!">
                                    <img src="./img/logo_alternate.png" alt="logo" />
                                </a>
                            </div>
                            <div className="nav-right">
                                <button
                                    id="close-menu"
                                    className="d-block d-sm-none"
                                    type="button"
                                >
                                    <i className="fa-solid fa-circle-xmark" />
                                </button>
                                <div className="links">
                                    <ul className="nav__link">
                                        <li className="active__link">
                                            <a href="#!">
                                                {/*<i className="fa-solid fa-user-group" />*/}
                                                <Users color={'#0275B1'} />
                                                <p className="nav__text">Network</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="with-Ncount">
                                                <MessageSquare color={'#0275B1'} />
                                                <span className="notifBadge">2</span>
                                                <p className="nav__text">Chat</p>
                                            </a>
                                        </li>
                                        <li className="search_li">
                                            <form action="">
                                                <div className="search-wrapper">
                                                    <Search color={'#0275B1'} />
                                                    <input
                                                        type="text"
                                                        className="search_bar"
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                                <button onClick={_logout} type="button" className="gradient-button w_150 hc-50">
                                    Log out
                                </button>
                            </div>
                            <button id="open_menu" className="d-block d-sm-none">
                                <i className="fa-solid fa-bars" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NavMenu;
