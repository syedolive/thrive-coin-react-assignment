import React, {memo} from 'react';
const ValidationError = ({validationError, field}: {validationError: { [key: string]: any } | null, field: string}) => {
    
    if(validationError !== null && validationError[field] !== undefined){
        console.log(validationError === null);
        return(
            <div className="validation__error">
            <p>
              <i className="fa-solid fa-circle-exclamation mr-1"></i>{validationError[field].join()}
            </p>
          </div>
        )
    }
    return null;
    
}

export default memo(ValidationError);