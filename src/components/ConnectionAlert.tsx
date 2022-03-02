import React,{memo} from "react";
import {observer} from "mobx-react";
import {useConnectionsContext} from "../stores/connections.store";

const ConnectionAlert = observer(() => {
    const {connectionsCount} = useConnectionsContext()
   return(
       <div className="col-12 my-4 text-center">
           <div className="d-flex align-items-center justify-content-center">
               <div className="line-left" />
               <p className="new-connection">
                   You have <span>{connectionsCount} new connections</span>
               </p>
               <div className="line-right" />
           </div>
       </div>
   )
});

export default memo(ConnectionAlert);
