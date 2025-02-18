import { useState } from "react";
import { Check } from "lucide-react";
import logo from "../../Images/logo.jpg";
import "./NavbarAr-module.css";
import { NavLink } from "react-router-dom";

export default function NavbarAr({ onLanguageChange }) {
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

  const providers = [
    { name: "ڤودافون", id: "vodafone" },
    { name: "اورنچ", id: "orange" },
    { name: "اتصالات", id: "etisalat" },
    { name: "وى", id: "we" },
  ];

  return (
    <>
      <nav className="bg-[#151515] border-gray-200 fixed w-full z-[100]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center lg:order-2 space-x-1 lg:space-x-0 rtl:space-x-reverse">
            <p className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center custom-size text-2xl font-semibold whitespace-nowrap text-white">
                كاش زون
              </span>
              <img
                src={logo}
                className="h-10 rounded-4xl"
                alt="Flowbite Logo"
              />
            </p>
          </div>
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
          <button
            onClick={onLanguageChange}
            className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-white rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white"
          >
            <svg
              className="w-5 h-5 rounded-full me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 3900 3900"
            >
              <path fill="#b22234" d="M0 0h7410v3900H0z" />
              <path
                d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                stroke="#fff"
                strokeWidth={300}
              />
              <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
              <g fill="#fff">
                <g id="d">
                  <g id="c">
                    <g id="e">
                      <g id="b">
                        <path
                          id="a"
                          d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                        />
                        <use xlinkHref="#a" y={420} />
                        <use xlinkHref="#a" y={840} />
                        <use xlinkHref="#a" y={1260} />
                      </g>
                      <use xlinkHref="#a" y={1680} />
                    </g>
                    <use xlinkHref="#b" x={247} y={210} />
                  </g>
                  <use xlinkHref="#c" x={494} />
                </g>
                <use xlinkHref="#d" x={988} />
                <use xlinkHref="#c" x={1976} />
                <use xlinkHref="#e" x={2470} />
              </g>
            </svg>
            English
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
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
                    <svg
                      className="w-2.5 h-2.5 me-3"
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
                    {selectedProvider ? selectedProvider : "شركات الاتصالات"}
                  </button>
                  <div
                    className={`${
                      isDropdownOpen ? "block" : "hidden"
                    } absolute z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-[#050505]`}
                  >
                    <ul className="py-2 text-sm text-gray-200">
                      {providers.map((provider) => (
                        <li key={provider.id}>
                          <a
                            href="#"
                            onClick={(e) =>
                              handleProviderClick(provider.name, e)
                            }
                            className="px-4 py-2 duration-200 hover:bg-gray-600 hover:text-white flex items-center justify-between"
                          >
                            {selectedProvider === provider.name && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                            <span className="inline-block ms-auto">
                              {provider.name}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="block text-right py-2 px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/topuptransfer"
                  className="block py-2 text-right px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  تحويل رصيد
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wallet"
                  className="block py-2 text-right px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  محفظة
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/billpayment"
                  className="block py-2 text-right px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  دفع فواتير
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/offers"
                  className="block py-2 text-right px-3 lg:p-0 rounded-sm text-white lg:hover:text-[#777777] duration-200 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                >
                  العروض
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
