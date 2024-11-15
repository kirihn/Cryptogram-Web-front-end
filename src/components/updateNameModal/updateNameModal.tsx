import { useState } from "react";
import { Props } from "./types";
import closeIcon from '@icons/clearIcon.svg'

export function UpdateModal(props: Props){
    const [switchModal, setSwitchModal] = useState<string|null>(null)

    const handleSwitchModal = (modal: string|null) => {
        setSwitchModal(modal);
    }
    return (
        <div className="modalContainer">
            <div className="modalWindow">
                <button className="closeModal">
                    <img src={closeIcon} alt="" />
                </button>
            </div>
        </div>
    )
}