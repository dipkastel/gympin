import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-listformat/locale-data/en";
import "@formatjs/intl-listformat/locale-data/de";
import "@formatjs/intl-listformat/locale-data/es";
import "@formatjs/intl-listformat/locale-data/fr";
import "@formatjs/intl-listformat/locale-data/ja";
import "@formatjs/intl-listformat/locale-data/zh";
import "@formatjs/intl-listformat/locale-data/fa";

import deMessages from "./messages/de";
import enMessages from "./messages/en.json";
import esMessages from "./messages/es";
import frMessages from "./messages/fr";
import jaMessages from "./messages/ja";
import zhMessages from "./messages/zh";
import faMessages from "./messages/fa";

const allMessages = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages,
  fa: faMessages
};

export default function I18nProvider({ children }) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  const messages = allMessages[locale];
  return (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
  );
}
