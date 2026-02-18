import React, { useEffect } from "react";
import SettingsPlace from "./SettingsPlace";

const Settings = () => {
  useEffect(() => {
    document.title = "تنظیمات";
  }, []);

  return (
    <>
      <SettingsPlace />
    </>
  );
};

export default Settings;
