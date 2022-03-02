import React, {memo} from "react";
import {Link, Disc, Archive, Users,Layers, Hash} from 'react-feather';
const SideBox = (props: any) => {
    return(
        <div className="side-box bg-white">
            <ul className="dashboard__links">
                <li>
                    <a href="#!">
                    <span>
                      <Link size={20} />  Connections
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li className="active">
                    <a href="#!">
                    <span>
                     <Disc size={20} />  Invitations
                    </span>
                        <p className="count_update show">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <Archive size={20} />  Teammates
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <Users size={20} />  Groups
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <Layers size={20} />  Pages
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <Hash size={20} />  Hashtags
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default memo(SideBox)
