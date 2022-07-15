import React, { useState } from "react";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../partials/content/Portlet";
import { Tab, Tabs } from "@mui/material";
import "./AddMedia.css";
import AddImage from "./AddImage";

function AddMedia(props) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Portlet>
        <PortletHeader
          toolbar={
            <PortletHeaderToolbar>
              <Tabs
                component="div"
                className="builder-tabs"
                value={tab}
                onChange={(_, nextTab) => {
                  setTab(nextTab);
                }}
              >
                <Tab label="image" />
                <Tab label="video" />
                <Tab label="sound" />
              </Tabs>
            </PortletHeaderToolbar>
          }
        />

        {tab === 0 && (
          <PortletBody>
            <div className="kt-section kt-margin-t-30">
              <div className="kt-section__body">
                <AddImage />
              </div>
            </div>
          </PortletBody>
        )}

        {tab === 1 && (
          <PortletBody>
            <div className="kt-section kt-margin-t-30">
              <div className="kt-section__body">2</div>
            </div>
          </PortletBody>
        )}

        {tab === 2 && (
          <PortletBody>
            <div className="kt-section kt-margin-t-30">
              <div className="kt-section__body">3</div>
            </div>
          </PortletBody>
        )}
      </Portlet>
    </>
  );
}

export default AddMedia;
