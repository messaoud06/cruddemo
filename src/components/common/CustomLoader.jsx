import React from "react";

export const CustomLoader = (props) => {
    return (
        <>
            <div className="spinner-border" role="status" style={{ color: '#ed1c24', animation: 'spinner-border .535s linear infinite' }}>
                <span className="sr-only"></span>
            
            </div>  

            <span style={{ color: "white", margin: "0.5rem" }}>{props?.label ? props.label : 'loading...'}</span>
            
            
        </>

    );
}