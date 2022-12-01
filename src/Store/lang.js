import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANG_OPTION_ENGLISH, LANG_LIST_OPTIONS } from '../Constants';

// compute initial language based on the "browser" (embed Chome in electron)
let initialLanguageFromSystem = LANG_OPTION_ENGLISH; // English by default
navigator.languages.every(lang => {
    let foundLanguage = LANG_LIST_OPTIONS.find(langOption => langOption.value === lang);

    if (foundLanguage) {
        initialLanguageFromSystem = foundLanguage;
        return false; // We have found a first language, we can stop here
    }
    return true;
});

export const defaultLanguage = initialLanguageFromSystem;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
            EmptyLibraryTitle: "Welcome home!",
            EmptyLibraryIntro: "This app can launch any apps or games installed on your system whether you use a mouse, a gamepad or a keyboard.",
            EmptyLibrarySecurity: "<strong>Important!</strong><br/> Your apps, your eyes only. We can automatically scan your system but NO data is ever transfered doing so except its very own name for image fetching. The scan process is open source so every one can review how it works. More info in help section.",
            EmptyLibraryNextStep: "Your library is empty, first things to do is...",
            EmptyLibraryLabelButton: "Scan your system for games",
            EmptyLibraryOr: "or",
            ButtonShowHiddenApps: "Show hidden apps",
            ButtonHideHiddenApps: "Hide apps",
            TitleContentGridHiddenApps: "Hidden apps",
            LoadingMessage: "Loading...",
            MenuSettings: "Settings",
            MenuQuit: "Quit",
            NavHelperLaunch: "Launch",
            NavHelperFavourite: "Favourite",
            NavHelperHide: "Hide / Unhide",
            NavHelperActions: "Actions Menu",
            NavHelperSelectButton: "Select",
            NavHelperClosePopin: "Save and close",
            NavHelperEscapeButton: "Escape",
            NavHelperEnterButton: "Enter",
            SettingsPopinTitle: "Settings",
            SettingsPopinRefreshButton: "Relaunch a scan",
            SettingsPopinCloseButton: "Save and close",
            ScanPopinTitle: "Scan in progress...",
            ScanPopinCloseButton: "Close",
            SettingsLanguageLabel: "Language",
            SettingsLaunchLabel: "Startup mode",
            SettingsLaunchStartup: "Launch with Windows",
            SettingsLaunchNone: "No automatic startup",
            SettingsAddCustomAppLabel: "Add a custom app (mouse only)",
            AppActionLaunchButton: "Open application",
            AppActionAddToFavouriteButton: "Add to favourite",
            AppActionRemoveFromFavouriteButton: "Remove from favourite",
            AppActionHideButton: "Hide the app",
            AppActionShowButton: "Show the app",
            AppActionPopinCloseButton: "Close",
            AppActionPopinCredit: "Image from",
            HelpPopinTitle: "Help",
            HelpPopinCloseButton: "Close",
            FAQ1Title: "How to switch between windows (or apps) with a gamepad (alt + tab equivalent)?",
            FAQ1Text: "Switch windows (alt + tab keyboard equivalent) even after another app has been launched",
            FAQ2Title: "How to display hidden apps? Where are they?",
            FAQ2Text: "At the end of the app list, you can toggle the display of hidden apps.",
            FAQ3Title: "Some of my games/apps are not found by the scan?",
            FAQ3Text: "You can add them manually in the global menu. A mouse is required to select the app. Accepted extensions are .exe, .lnk and .url.",
            FAQ4Title: "Credits / Which open source libraries do you use?",
            FAQ4Line1: "for the local scan system",
            FAQ4Line2: "to get images for games. We do not claim ownership of any of the images or data provided by the RAWG © API. ",
        }
      },
      fr: {
        translation: {
            EmptyLibraryTitle: "Bienvenue chez vous !",
            EmptyLibraryIntro: "Lancez d'ici facilement n'importe quelle application ou jeu installé, que vous utilisiez une souris, une manette ou un clavier.",
            EmptyLibrarySecurity: "<strong>Important!</strong><br/> Nous pouvons scanner votre système à la recherche d'application mais AUCUNE donnée n'est transférée à l'exception de son simple nom pour récupération automatique d'une éventuelle image. Le processus de scan est open source et chacun est libre de regarder son fonctionnement. Plus d'information dans la section d'aide.",
            EmptyLibraryNextStep: "Votre librairie est vide, la première chose à faire est donc de...",
            EmptyLibraryLabelButton: "Scanner le système pour trouver des jeux",
            EmptyLibraryOr: "ou",
            ButtonShowHiddenApps: "Afficher les applications masquées",
            ButtonHideHiddenApps: "Cacher les applications masquées",
            TitleContentGridHiddenApps: "Applications masquées",
            LoadingMessage: "Chargement...",
            MenuSettings: "Paramètres",
            MenuQuit: "Quitter",
            NavHelperLaunch: "Lancer",
            NavHelperFavourite: "Favoris",
            NavHelperHide: "Masquer/Réafficher",
            NavHelperActions: "Actions",
            NavHelperSelectButton: "Sélectionner",
            NavHelperClosePopin: "Sauveguarder et fermer",
            NavHelperEscapeButton: "Echap",
            NavHelperEnterButton: "Entrée",
            SettingsPopinTitle: "Paramètres",
            SettingsPopinRefreshButton: "Relancer un scan",
            SettingsPopinCloseButton: "Sauvegarder et fermer",
            ScanPopinTitle: "Scan en cours...",
            ScanPopinCloseButton: "Fermer",
            SettingsLanguageLabel: "Langue",
            SettingsLaunchLabel: "Mode de lancement",
            SettingsLaunchStartup: "Démarrer avec Windows",
            SettingsLaunchNone: "Pas de démarrage automatique",
            SettingsAddCustomAppLabel: "Ajouter une app manuellement (souris requise)",
            AppActionLaunchButton: "Lancer l'application",
            AppActionAddToFavouriteButton: "Ajouter au favoris",
            AppActionRemoveFromFavouriteButton: "Supprimer des favoris",
            AppActionHideButton: "Masquer l'application",
            AppActionShowButton: "Rendre visible l'application",
            AppActionPopinCloseButton: "Fermer",
            AppActionPopinCredit: "Image de",
            HelpPopinTitle: "Aide / FAQ",
            HelpPopinCloseButton: "Fermer",
            FAQ1Title: "Comment passer d'une fenêtre à une autre avec le gamepad (équivalent du alt + tab)?",
            FAQ1Text: "Permet de sélectionner la fenêtre à mettre en avant (équivalent du alt + tab au clavier). Le raccourcis fonctionne même si l'application n'est plus au premier plan.",
            FAQ2Title: "Comment réafficher les applications cachées ? Où sont-elles ?",
            FAQ2Text: "Sur l'écran d'accueil, à la fin de la liste, un bouton permet d'afficher ou cacher les applications.",
            FAQ3Title: "Que faire si certains jeux ou applications ne sont pas détectées par le scan automatique ?",
            FAQ3Text: "Il est tout à fait possible d'ajouter manuellement des applications via le menu. Une souris est requise en revanche. Est accepté les .exe, .lnk et .url.",
            FAQ4Title: "Credits / Quelles sont les librairies open source utilisée et les sources d'images ?",
            FAQ4Line1: "Pour le système de scan local et automatique.",
            FAQ4Line2: "Pour récupérer les images automatiquement. Ces images ne nous appartienent pas et sont fournies par l'API RAWG ©.",
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });