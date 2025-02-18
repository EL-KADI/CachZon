import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavbarAr from "../NavbarAr/NavbarAr";
import { useState, useEffect } from "react";

export default function Layout() {
  const [isArabic, setIsArabic] = useState(() => {
    const savedLanguage = sessionStorage.getItem("language");

    return savedLanguage === "ar";
  });

  const toggleLanguage = () => {
    setIsArabic((prev) => {
      const newValue = !prev;

      sessionStorage.setItem("language", newValue ? "ar" : "en");
      return newValue;
    });
  };

  useEffect(() => {
    import("flowbite").then((Flowbite) => {
      const collapseButtons = document.querySelectorAll(
        "[data-collapse-toggle]"
      );
      collapseButtons.forEach((button) => {
        new Flowbite.Collapse(button);
      });

      const dropdownButtons = document.querySelectorAll(
        "[data-dropdown-toggle]"
      );
      dropdownButtons.forEach((button) => {
        new Flowbite.Dropdown(button);
      });
    });
  }, [isArabic]);

  return (
    <>
      {isArabic ? (
        <NavbarAr onLanguageChange={toggleLanguage} />
      ) : (
        <Navbar onLanguageChange={toggleLanguage} />
      )}
      <Outlet context={[isArabic]} />
    </>
  );
}
