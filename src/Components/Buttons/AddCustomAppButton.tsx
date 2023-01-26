import React from 'react';
import styled from 'styled-components';
import { FileSelector } from '../Generics/FileSelector';
import App from '../../Model/App';
import { useDispatch } from 'react-redux';
import { addApp, setApp, togglePopin } from '../../Store/Reducer';
import { useTranslation } from "react-i18next";
import { CUSTOM_PROTOCOL_LOADFILE, SHOW_POPIN_APP_ACTION } from '../../Constants';

interface AddCustomAppButtonProps {
    
}

export const AddCustomAppButton = ({}: AddCustomAppButtonProps) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onFileSelectorChange = (event: any) => {
        const file: File = event.target.files[0];
        const appName:string = (file.name.substring(0, file.name.lastIndexOf(".")));
        // @ts-ignore => bug otherwise
        const randomUUID:string = self.crypto.randomUUID();
        const app:App = new App({id: randomUUID, title: appName, launch: file.path});
        dispatch(addApp(app)); // the spread is here to serialize the object to send it to redux (error if not)
        dispatch(togglePopin({id: SHOW_POPIN_APP_ACTION, context: app.id}));

        // fetch for background image mostly
        window.ShadowApi.fetchOnlineMetada([app], (updatedApps: Array<App>) => {
            if (updatedApps.length > 0) {
                dispatch(setApp(updatedApps[0]));
            }
        })
    }

    return (
        <FileSelector label={t('SettingsAddCustomAppLabel')} onChangeAction={(event) => onFileSelectorChange(event)} fileTypes={[".lnk", ".exe", ".url"]}></FileSelector>
    )
}
