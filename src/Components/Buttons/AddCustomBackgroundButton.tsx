import React from 'react';
import { FileSelector } from '../Generics/FileSelector';
import App from '../../Model/App';
import { useDispatch } from 'react-redux';
import { setApp } from './../../Store/Reducer';
import { useTranslation } from "react-i18next";
import { CUSTOM_PROTOCOL_LOADFILE } from '../../Constants';


interface AddCustomBackgroundButtonProps {
    app: App;
}

export const AddCustomBackgroundButton = ({app}: AddCustomBackgroundButtonProps) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const fileTypes = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".apng"];

    const onFileSelectorChange = (event: any) => {
        const file: File = event.target.files[0];
        const backgroundImage = `${CUSTOM_PROTOCOL_LOADFILE}://${file.path}`;
        dispatch(setApp({id: app.id, custom_image: backgroundImage}));
    }

    return (
        <FileSelector label={t('SettingsAddCustomBackgroundLabel')} onChangeAction={(event) => onFileSelectorChange(event)} fileTypes={fileTypes}></FileSelector>
    )
}