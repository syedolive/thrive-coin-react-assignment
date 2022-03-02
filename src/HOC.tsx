import React from 'react';
import {useUserContext} from "./stores/user.store";

const ApplicationHoc = (WrappedComponent: React.FC) => (props: any) => {
    return (
        <React.Suspense fallback={<p>Please wait while we load the page. :)</p>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    )
}

export default ApplicationHoc;
