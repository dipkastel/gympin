package com.notrika.gympin.domain.settings;

import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.*;
import com.notrika.gympin.common.settings.base.service.ApplicationConfigService;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ApplicationConfigsServiceImpl implements ApplicationConfigService {

    @Autowired
    SettingsService settingsService;

    @Override
    public AndroidSplashDto AndroidSplash(AndroidSplashParam splashParam) {
        AndroidSplashDto result = new AndroidSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.ANDROID));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }

    @Override
    public IosSplashDto IosSplash(IosSplashParam splashParam) {
        IosSplashDto result = new IosSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.IOS));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }

    @Override
    public WebAppSplashDto WebAppSplash(WebAppSplashParam splashParam) {
        WebAppSplashDto result = new WebAppSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.WEB_APP));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }

    @Override
    public MasterSplashDto MasterSplash(MasterSplashParam splashParam) {
        MasterSplashDto result = new MasterSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.WEB_MASTER));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }

    @Override
    public CorporateSplashDto CorporateSplash(CorporateSplashParam splashParam) {
        CorporateSplashDto result = new CorporateSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.WEB_CORPORATE));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }

    @Override
    public AdminPanelSplashDto AdminPanelSplash(AdminPanelSplashParam splashParam) {
        AdminPanelSplashDto result = new AdminPanelSplashDto();
        List<SettingDto> settingDtoList = new ArrayList<>();
        settingDtoList.addAll(settingsService.getByType(settingsType.WEB_PANEL));
        settingDtoList.addAll(settingsService.getByType(settingsType.APPLICATION));
        settingDtoList.addAll(settingsService.getByType(settingsType.GENERAL));
        result.setSettings(settingDtoList);
        return result;
    }
}
