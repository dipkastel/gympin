package com.notrika.gympin.common.gympin.base.service;

import com.notrika.gympin.common.gympin.base.dto.*;
import com.notrika.gympin.common.gympin.base.param.*;

public interface ApplicationConfigService {

     AndroidSplashDto AndroidSplash(AndroidSplashParam splashParam);
     IosSplashDto IosSplash(IosSplashParam splashParam);
     WebAppSplashDto WebAppSplash(WebAppSplashParam splashParam);
     MasterSplashDto MasterSplash(MasterSplashParam splashParam);
     CorporateSplashDto CorporateSplash(CorporateSplashParam splashParam);
     AdminPanelSplashDto AdminPanelSplash(AdminPanelSplashParam splashParam);

}
