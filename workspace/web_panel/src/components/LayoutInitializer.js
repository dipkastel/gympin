import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LayoutSplashScreen} from "./LayoutContext";
import {builderActions} from "../helper/redux/actions/builderAction";

/**
 * Used to synchronize current layout `menuConfig`, `layoutConfig` and
 * `htmlClassService` with redux store.
 */
export default function LayoutInitializer({
  children,
  menuConfig,
  layoutConfig,
  htmlClassService,
}) {
  const dispatch = useDispatch();
  const builderState = useSelector(({ builder }) => builder);

  useEffect(() => {
    dispatch(builderActions.setMenuConfig(menuConfig));
  }, [dispatch, menuConfig]);

  useEffect(() => {
    if (layoutConfig.demo !== builderState.layoutConfig.demo) {
      dispatch(builderActions.setLayoutConfigs(layoutConfig));
    }
  }, [dispatch, builderState, layoutConfig]);

  useEffect(() => {
    dispatch(builderActions.setHtmlClassService(htmlClassService));
  }, [dispatch, htmlClassService]);

  return htmlClassService === builderState.htmlClassServiceObjects ? (
    // Render content when `htmlClassService` synchronized with redux store.
    <>{children}</>
  ) : (
    // Otherwise sow loading splash screen.
    <LayoutSplashScreen />
  );
}
