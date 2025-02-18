import { useState } from 'react';
import { Check } from 'lucide-react';
import logo from "../../Images/logo.jpg";
import "./Navbar-module.css";
import { NavLink } from 'react-router-dom';

export default function Navbar({ onLanguageChange }) {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProviderClick = (provider, e) => {
    e.preventDefault();
    setSelectedProvider(provider);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-[#151515] border-gray-200 fixed w-full z-[100]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10 rounded-4xl" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap custom-size text-white">
              CashZon
            </span>
          </p>
          <div className="flex items-center lg:order-2 space-x-1 lg:space-x-0 rtl:space-x-reverse">
            <button
              onClick={onLanguageChange}
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm duration-200 text-white rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white"
            >
            <svg
              aria-hidden="true"
              className="h-5 w-5 rounded-full me-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 480"
            >
              <g fillRule="evenodd">
                <path fill="#ef3340" d="M0 0h640v160H0z" />
                <path fill="#fff" d="M0 160h640v160H0z" />
                <path fill="#000" d="M0 320h640v160H0z" />
                <path
                  fill="#c09300"
                  d="M320 210.667c17.568 0 30.892 14.325 30.892 30.892s-13.324 30.892-30.892 30.892-30.892-14.325-30.892-30.892 13.324-30.892 30.892-30.892zm0 10c-11.555 0-20.892 9.337-20.892 20.892s9.337 20.892 20.892 20.892 20.892-9.337 20.892-20.892-9.337-20.892-20.892-20.892z"
                />
              </g>
            </svg>
              Arabic
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center duration-200 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-[#050505] focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="navbar-language"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-language"
          >
            <ul className="flex flex-col lg:items-center font-medium p-4 lg:p-0 mt-4 border rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 bg-[#1a1a1a] lg:pe-4 border-gray-700">
              <li className="relative">
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="text-white mb-2 lg:mb-0 bg-[#101010] hover:bg-[#050505] duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    aria-expanded={isDropdownOpen}
                  >
                    {selectedProvider || "Telecom Companies"}
                    <svg
                      className="w-5 h-5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={`${
                      isDropdownOpen ? 'block' : 'hidden'
                    } absolute z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-[#050505]`}
                  >
                    <ul className="py-2 text-sm text-gray-200">
                      {["Vodafone", "Orange", "Etisalat", "We"].map(
                        (provider) => (
                          <li key={provider}>
                            <a
                              href="#"
                              onClick={(e) => handleProviderClick(provider, e)}
                              className="px-4 py-2 duration-200 hover:bg-gray-600 hover:text-white flex items-center justify-between"
                            >
                              {provider}
                              {selectedProvider === provider && (
                                <Check className="w-4 h-4 text-green-500" />
                              )}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <NavLink
                  to={"/"}
                  className="block py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"topuptransfer"}
                  className="block py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  Top-up Transfer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"wallet"}
                  className="block py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  Wallet
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"billpayment"}
                  className="block py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  Bill Payment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"offers"}
                  className="block py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  Offers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="pb-16"></div>
    </>
  );
}