package com.notrika.gympin.common.settings.base.service;

import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.param.*;

public interface ApplicationConfigService {

     AndroidSplashDto AndroidSplash(AndroidSplashParam splashParam);
     IosSplashDto IosSplash(IosSplashParam splashParam);
     WebAppSplashDto WebAppSplash(WebAppSplashParam splashParam);
     MasterSplashDto MasterSplash(MasterSplashParam splashParam);
     CorporateSplashDto CorporateSplash(CorporateSplashParam splashParam);
     AdminPanelSplashDto AdminPanelSplash(AdminPanelSplashParam splashParam);

}
