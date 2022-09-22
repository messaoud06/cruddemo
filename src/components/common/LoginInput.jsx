

import React from 'react';

export const LoginInput = (props) => {
    return (
        <div className="col-sm-12">
            <div className={`input-group ${props.myClass}`}>
                <div className={`input-group-prepend ${props.myClass}`}>
                    
                    <span className="input-group-text">
                        <span className={props.leftIcon}></span>
                    </span>
                </div>
                <input type={props.type}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    className="form-control"
                    
                    />
            </div>
        </div>
    );
}