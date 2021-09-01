import React from 'react';
import "../../assets/styles/_loader.scss";

export default function Loader() {
    return (
        <div className="loader-div">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
