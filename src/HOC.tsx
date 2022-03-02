import React from 'react';
import {useUserContext} from "./stores/user.store";

const ApplicationHoc = (WrappedComponent: React.FC) => (props: any) => {
    return (
        <React.Suspense fallback={<p>unable to loading page</p>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    )
}

export default ApplicationHoc;
