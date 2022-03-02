import React, {memo} from "react";
import {observer} from "mobx-react";
import {useConnectionsContext} from "../../stores/connections.store";

const Sent = observer((props: any) => {
    const {sent} = useConnectionsContext();
    return(
        <div className="col-12">
            {sent.map((item, index) => (
                <div key={index} className="card connection_request">
                    <div className="media align-items-center">
                        <img
                            src={item.image_url}
                            className="align-self-center mr-3"
                            alt="user avatar"
                        />
                        <div className="media-body">
                            <h3 className="mt-0">{item.name}</h3>
                            <h5>{item.title}</h5>
                            <a href="!#">{item.connections} Connections</a>
                        </div>
                    </div>
                    <div className="message">
                        <p>{item.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )
})

export default memo(Sent);
