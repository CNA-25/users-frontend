import { useAuthStore } from "@/stores/auth";
import { Language, useLangStore } from "@/stores/lang";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { authenticated, setAuthenticated, setToken } = useAuthStore();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    setAuthenticated(false);
    setToken(undefined);
  };

  const { setLang } = useLangStore();

  const flagStyle = "max-h-8 cursor-pointer hover:scale-125";
  const changeLang = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <div className="w-full bg-black">
      <div className="flex flex-col max-w-screen-xl p-2 mx-auto md:p-4 md:flex-row">
        <div className="flex flex-row items-center justify-between flex-1">
          <h1 className="text-3xl font-bold text-orange-500">BeerCraft</h1>
          <div className="flex flex-row gap-2">
            <img
              src="/uk.svg"
              alt=""
              className={flagStyle}
              onClick={() => changeLang(Language.EN)}
            />
            <img
              src="/sv.svg"
              alt=""
              className={flagStyle}
              onClick={() => changeLang(Language.SV)}
            />
            <img
              src="/fi.svg"
              alt=""
              className={flagStyle}
              onClick={() => changeLang(Language.FI)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between md:justify-end">
          {authenticated ? (
            <>
              <Link
                to="/edit"
                className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
              >
                My Orders
              </Link>
              <Link
                className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
                onClick={handleLogout}
                to="/"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className="mx-4 text-2xl text-orange-500 md:text-md hover:text-orange-800"
              >
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
