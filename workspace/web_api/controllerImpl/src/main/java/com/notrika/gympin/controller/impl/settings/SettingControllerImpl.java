package com.notrika.gympin.controller.impl.settings;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.base.api.SettingsController;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/settings")
public class SettingControllerImpl implements SettingsController {

    @Autowired
    private SettingsService settingsService;

    @Override
    @GetMapping("/getByType")
    public ResponseEntity<List<SettingDto>> getSettingsByType(settingsType type) {
        return new ResponseEntity<List<SettingDto>>(settingsService.getByType(type),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SettingDto> add(SettingParam settingParam) {
        return new ResponseEntity<SettingDto>(settingsService.add(settingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SettingDto> update(SettingParam settingParam) {
        return new ResponseEntity<SettingDto>(settingsService.update(settingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SettingDto> delete(SettingParam settingParam) {
        return new ResponseEntity<SettingDto>(settingsService.delete(settingParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAll")
    public ResponseEntity<List<SettingDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<SettingDto>>(settingsService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SettingDto> getById(Long id) {
        return new ResponseEntity<SettingDto>(settingsService.getById(id),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<SettingDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
