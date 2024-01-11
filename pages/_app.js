// import "@/styles/globals.scss";
import "../styles/globals.scss";
import { ProgressProvider } from "@/context/progress_context";
// import { SocketContextProvider } from "@/context/socket-context";
import { HomeworkProvider } from "@/context/homework-context";
import { Provider } from "@/context";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import "regenerator-runtime";
const messages = { en, ru };

function getDirection(locale) {
  return "ltr";
}

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Provider>
        <ProgressProvider>
          <HomeworkProvider>
            <Component {...pageProps} dir={getDirection(locale)} />
          </HomeworkProvider>
        </ProgressProvider>
      </Provider>
    </IntlProvider>
  );
};

export default App;
