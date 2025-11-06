"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/classname";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150.0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        document.getElementById("mobile-menu")?.classList.add("hidden");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // mobile menu ve butonu dışında bir yere tıklandığında mobile menuyu kapat
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        document.getElementById("mobile-menu")?.classList.contains("hidden")
      ) {
        return;
      }

      const target = e.target as HTMLElement;
      if (
        !target.closest("#mobile-menu") &&
        !target.closest("#mobile-menu-button")
      ) {
        document.getElementById("mobile-menu")?.classList.add("hidden");
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const navbarLinks = () => {
    return (
      <>
        <Link
          href="/"
          className={cn(
            `hover:text-violet-200 w-full text-nowrap border-b border-b-transparent hover:border-b-purple-200 h-full pt-9 px-3 text-center`,
            {
              "text-violet-200 border-b-purple-200": pathname === "/",
            }
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          href="/hakkimizda"
          className={cn(
            `hover:text-violet-200 w-full text-nowrap  border-b border-b-transparent hover:border-b-purple-200 h-full pt-9 px-3 text-center`,
            {
              "text-violet-200 border-b-purple-200": pathname === "/hakkimizda",
            }
          )}
        >
          Hakkımızda
        </Link>
        <Link
          href="/iletisim"
          className={cn(
            `hover:text-violet-200 w-full text-nowrap border-b border-b-transparent hover:border-b-purple-200 h-full pt-9 px-3 text-center`,
            {
              "text-violet-200 border-b-purple-200": pathname === "/iletisim",
            }
          )}
        >
          İletişim
        </Link>
        <Link
          href="/neden-biz"
          className={cn(
            `hover:text-violet-200 w-full text-nowrap  border-b border-b-transparent hover:border-b-purple-200 h-full pt-9 px-3 text-center`,
            {
              "text-violet-200 border-b-purple-200": pathname === "/neden-biz",
            }
          )}
        >
          Neden Biz
        </Link>
        {/* <Link
          href="/galeri"
          className={cn(
          `hover:text-violet-200 w-full text-nowrap ${isScrolled ? 'text-fuchsia-200' : 'text-purple-700'} border-b border-b-transparent hover:border-b-purple-200 h-full pt-9 px-3 text-center`,
            {
              "text-violet-200 border-b-purple-200": pathname === "/galeri",
            }
          )}
        >
          Galeri
        </Link> */}
      </>
    );
  };

  return (
    <nav
      className={cn(
        "flex items-center p-4 w-[100%] h-32 text-white fixed backdrop-blur-3xl top-0 z-10 transition-all duration-300 ease-in-out bg-[#522f6a]",
        {
          "bg-[#522f6a] h-24 shadow-xl shadow-[#6a4285e5]": isScrolled,
          // "bg-[#522f6a]": isScrolled,
          // "bg-purple-700": pathname !== "/" && isScrolled,
        }
      )}
    >
      <div className="container relative flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              className="cursor-pointer rounded-full border-[#44215c] border-4"
              src="/assets/gul_sehri_beyaz_logo_yazisiz.png"
              alt="Isparta Gül Şehri Masaj Salonu Logosu"
              width={isScrolled ? 80 : 90}
              height={90}
            />
          </Link>
        </div>
        <div
          className={cn(
            "flex text-lg items-center space-x-4 max-md:hidden h-[90px]",
            {
              "text-md": isScrolled,
            }
          )}
        >
          {navbarLinks()}
        </div>
        <div className="max-lg:hidden">
          <Link href="https://api.whatsapp.com/send/?phone=905302411232&text=Randevu%20almak%20istiyorum.">
            <button className="flex justify-between items-center gap-3 text-white font-semibold py-2 px-4 rounded border border-white hover:border-none hover:bg-gray-700 hover:text-green-500 transition-all duration-300 ease-linear">
              <Icon
                icon="logos:whatsapp-icon"
                className="w-6 h-6 inline-block"
              />
              <span className="text-sm">+90 (530) 241 12 32</span>
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            className={cn(
              "text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition-all duration-300 ease-linear",
              {
                "bg-gray-700 text-green-500": false, // buraya mobile menu açıkken icon rengi verilecek
              }
            )}
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.toggle("hidden");
            }}
          >
            <Icon
              icon="quill:hamburger-sidebar"
              className="text-3xl cursor-pointer"
            />
          </button>
          <div
            id="mobile-menu"
            className={cn("hidden absolute top-[90px] right-0 h-56", {
              "top-16": isScrolled,
            })}
          >
            <div className="flex flex-col items-center justify-center gap-y-2 h-full bg-gray-900 rounded-b-xl">
              {navbarLinks()}
              <a
                onClick={
                  () => {
                    // reportConversion fonksiyonunu dinamik import ile çağır
                    import('@/lib/reportConversion').then(({ reportConversion }) => {
                      reportConversion('https://api.whatsapp.com/send/?phone=905302411232&text=Randevu%20almak%20istiyorum.');
                    });
                  }
                }
                rel="noopener noreferrer"
                className="flex justify-between items-center gap-3 text-white font-semibold py-2 px-4 mt-2 rounded hover:bg-gray-700 hover:text-green-500 transition-all duration-300 ease-linear"
              >
                <Icon
                  icon="logos:whatsapp-icon"
                  className="w-6 h-6 inline-block"
                />
                <span>Randevu Al</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
