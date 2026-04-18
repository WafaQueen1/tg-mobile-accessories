import { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme') // Default to dark 
    );

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme, currentLang: i18n.language, changeLanguage }}>
            {children}
        </ThemeContext.Provider>
    );
};
