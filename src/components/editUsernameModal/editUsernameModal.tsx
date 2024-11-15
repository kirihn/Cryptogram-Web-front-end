import { useState } from "react";
import { Props } from "./types";
import closeIcon from '@icons/clearIcon.svg'

export function EditNameModal(props: Props){

    return (
        <div className="modalContainer">
            <div className="modalWindow">
                <button className="closeModal">
                    <img src={closeIcon} alt="Close" />sadasdas
                </button>
            </div>
        </div>
        
    )
}