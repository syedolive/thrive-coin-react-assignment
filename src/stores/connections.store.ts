import {makeObservable, action, observable, computed} from "mobx";
import React from "react";
class ConnectionStore {
  sent: Array<any> = [];
  received: Array<any> = [];
  recent: Array<any> = [];

  constructor() {
    makeObservable(this, {
      sent: observable,
      received: observable,
      recent: observable,
      setConnectionsData: action.bound,
      connectionsCount: computed
    });
  }
  setConnectionsData = (invitations: any, recent: any) => {
      this.sent = invitations.filter((item: any) => item.invitation_type === 'sent');
      this.received = invitations.filter((item: any) => item.invitation_type === 'received');
      this.recent = recent;
  }
  get connectionsCount(){
    return this.received.length;
  }
}

export const connectionStore = new ConnectionStore();

export const connectionContext = React.createContext(connectionStore);
export const useConnectionsContext = () => React.useContext(connectionContext);
