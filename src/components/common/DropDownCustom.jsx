
import React from 'react';
import { Dropdown } from 'primereact/dropdown';


export const DropdownCustom = (props) => {
    return (

        <div className="col-sm-12">
            <div className="input-group">
                <div className={`input-group-prepend ${props.myClass}`}>
                    
                    <span className="input-group-text">
                        <span className={props.leftIcon}></span>
                    </span>
                </div>
            <Dropdown  options={props.items} 
                     value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    itemTextStyle={{backgroundColor:"blue",textColor:"white"}}
                    className={`form-control   ${props.myClass} `}
                    />
            </div>
        </div>
    );
}
