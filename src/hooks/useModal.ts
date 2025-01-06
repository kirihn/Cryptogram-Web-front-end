import { EditNameModal } from '@components/modals/editNameModal/editNameModal';
import { useState } from 'react';
import React from 'react';

export function useModal(){
    const [switchModal, setSwitchModal] = useState<string | null>(null);

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

    const handleCloseModal = () => setSwitchModal(null);

    return {
        switchModal,
        handleSwitchModal,
        handleCloseModal,
    };
}
