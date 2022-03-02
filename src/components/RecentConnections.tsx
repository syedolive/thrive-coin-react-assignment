import React, {memo} from 'react';
import {observer} from 'mobx-react-lite'
import {useConnectionsContext} from "../stores/connections.store";
import dayjs from 'dayjs'
const RecentConnections = observer((props: any) => {
    const {recent} = useConnectionsContext();
    return(
        <div className="row">
            <div className="col-12 my-4 text-center">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="line-left" />
                    <p className="new-connection">Recent Connections</p>
                    <div className="line-right" />
                </div>
            </div>
            {recent.map((recentConnections, index) => (
                <div key={index.toString()} className="col-md-6 mb-3">
                    <div className="card connection_request flex-column">
                        <div className="media align-items-center">
                            <img
                                src={recentConnections.image_url}
                                className="align-self-center mr-3"
                                alt="user avatar"
                            />
                            <div className="media-body">
                                <h3 className="mt-0">{recentConnections.name}</h3>
                                <h5>{recentConnections.title}</h5>
                            </div>
                        </div>
                        <span className="text-center text-xl-right lightgrey connected-time">
                            {dayjs(recentConnections.connection_date).format('MM MMM, dddd')}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
})

export default memo(RecentConnections)
