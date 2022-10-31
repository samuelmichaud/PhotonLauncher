import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
            EmptyLibraryTitle: "Launch a scan to see your apps...",
            EmptyLibraryLabelButton: "Launch a scan",
            ButtonShowHiddenApps: "Show hidden apps",
            ButtonHideHiddenApps: "Hide apps",
            TitleContentGridHiddenApps: "Hidden apps",
            LoadingMessage: "Loading...",
            MenuSettings: "Settings",
            MenuQuit: "Quit",
            NavHelperLaunch: "Launch",
            NavHelperFavourite: "Favourite",
            NavHelperHide: "Hide",
            NavHelperActions: "Actions Menu",
            SettingsPopinTitle: "Settings",
            SettingsPopinRefreshButton: "Refresh library",
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
        }
      },
      fr: {
        translation: {
            EmptyLibraryTitle: "Lancer un scan pour voir vos applications...",
            EmptyLibraryLabelButton: "Lancer un scan",
            ButtonShowHiddenApps: "Afficher les applications masquées",
            ButtonHideHiddenApps: "Cacher les applications masquées",
            TitleContentGridHiddenApps: "Applications masquées",
            LoadingMessage: "Chargement...",
            MenuSettings: "Paramètres",
            MenuQuit: "Quitter",
            NavHelperLaunch: "Lancer",
            NavHelperFavourite: "Favoris",
            NavHelperHide: "Masquer",
            NavHelperActions: "Actions",
            SettingsPopinTitle: "Paramètres",
            SettingsPopinRefreshButton: "Rafraîchir la librairie",
            SettingsPopinCloseButton: "Sauveguarder et fermer",
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
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });