import { APP_PLATFORM_MANUAL } from "../Constants";

export default class App {
    readonly id: string;
    title: string;
    launch: string;
    icon?: string;
    platform?: string; // steam, manual, ...
    favourite?: boolean;
    hidden?: boolean;
    installed?: boolean;
    background_image?: string;
    custom_image?: string;
    rawgSlug?: string;

    constructor({id, title, launch, icon = "", platform = APP_PLATFORM_MANUAL, favourite = false, hidden = false, background_image = "", custom_image = "", rawgSlug = "", installed = false}: any) {

        this.id = id;
        this.title = title;
        this.launch = launch;
        this.icon = icon;
        this.platform = platform;
        this.favourite = favourite;
        this.installed = installed;
        this.hidden = hidden;
        this.background_image = background_image;
        this.custom_image = custom_image;
        this.rawgSlug = rawgSlug;
    }

    
    public static getBackground(app:App): string {
        return app.custom_image? app.custom_image : app.background_image
    }

}