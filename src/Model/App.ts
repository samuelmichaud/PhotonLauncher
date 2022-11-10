import { APP_PLATFORM_MANUAL } from "../Constants";
// @ts-ignore
import default_background from '../Images/default_background.jpg';

export default class App {
    readonly id: string;
    title: string;
    launch: string;
    icon?: string;
    platform?: string; // steam, manual, ...
    favourite?: boolean;
    hidden?: boolean;
    background_image?: string;
    rawgSlug?: string;

    constructor({id, title, launch, icon = "", platform = APP_PLATFORM_MANUAL, favourite = false, hidden = false, background_image = "", rawgSlug = ""}: App) {
        
        background_image = (background_image === "")? default_background : background_image;

        this.id = id;
        this.title = title;
        this.launch = launch;
        this.icon = icon;
        this.platform = platform;
        this.favourite = favourite;
        this.hidden = hidden;
        this.background_image = background_image;
        this.rawgSlug = rawgSlug;
    }
}