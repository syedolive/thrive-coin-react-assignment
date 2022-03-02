import React, {memo} from "react";

const SideBox = (props: any) => {
    return(
        <div className="side-box bg-white">
            <ul className="dashboard__links">
                <li>
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-link" /> Connections
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li className="active">
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-circle-stop" /> Invitations
                    </span>
                        <p className="count_update show">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-square" /> Teammates
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-user-group" /> Groups
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-layer-group" /> Pages
                    </span>
                        <p className="count_update">
                            2 <i className="fa-solid fa-circle ml-2" />
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#!">
                    <span>
                      <i className="fa-solid fa-hashtag" /> Hashtags
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
