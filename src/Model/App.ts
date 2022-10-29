import { APP_PLATFORM_MANUAL } from "../Constants";

export default class App {
    readonly id: string;
    title: string;
    launch: string;
    icon?: string;
    platform?: string; // steam, manual, ...
    favourite?: boolean;
    hidden?: boolean;
    background_image?: string;

    constructor({id, title, launch, icon = "", platform = APP_PLATFORM_MANUAL, favourite = false, hidden = false, background_image = ""}: App) {
        this.id = id;
        this.title = title;
        this.launch = launch;
        this.icon = icon;
        this.platform = platform;
        this.favourite = favourite;
        this.hidden = hidden;
        this.background_image = background_image;
    }
}