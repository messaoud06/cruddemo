import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

export const CustomSwitchInput = (props) => {
    return (
        <div className="input-group">
            <InputSwitch checked={props.check} onChange={props.onChange} /> &nbsp;<span>{props.label}</span>
        </div>
    );
}