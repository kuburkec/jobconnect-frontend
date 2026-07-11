import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "welcome_back": "Welcome Back",
                "login_subtitle": "Enter your details to find your next opportunity.",
                "login": "Sign In",
                "email": "Email Address",
                "password": "Password",
                "login_btn": "Sign In Now",
                "no_account": "Don't have an account? Register",
                "nav_dashboard": "Dashboard",
                "logout": "Logout",
                "register_success": "Account created! You can now login.",
                "auth_error": "Invalid email or password"
            }
        },
        mk: {
            translation: {
                "welcome_back": "Добредојдовте назад",
                "login_subtitle": "Внесете ги вашите податоци за да ја најдете следната можност.",
                "login": "Најави се",
                "email": "Е-пошта",
                "password": "Лозинка",
                "login_btn": "Најави се сега",
                "no_account": "Немате сметка? Регистрирајте се",
                "nav_dashboard": "Панел",
                "logout": "Одјави се",
                "register_success": "Сметката е креирана! Сега можете да се најавите.",
                "auth_error": "Невалидна е-пошта или лозинка"
            }
        },
        sq: {
            translation: {
                "welcome_back": "Mirëseerdhët sërish",
                "login_subtitle": "Shënoni të dhënat tuaja për të gjetur mundësinë e radhës.",
                "login": "Identifikohu",
                "email": "Email adresa",
                "password": "Fjalëkalimi",
                "login_btn": "Identifikohu tani",
                "no_account": "Nuk keni llogari? Regjistrohuni",
                "nav_dashboard": "Paneli",
                "logout": "Dil",
                "register_success": "Llogaria u krijua! Tani mund të identifikoheni.",
                "auth_error": "Email ose fjalëkalim i pasaktë"
            }
        }
    },
    lng: "mk", // Changed to Macedonian for your preview
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;