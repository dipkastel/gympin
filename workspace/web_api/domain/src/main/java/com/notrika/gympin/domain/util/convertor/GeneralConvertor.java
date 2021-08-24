package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;

import java.util.Date;

public class GeneralConvertor {

    public static <T extends BaseEntity> T fillBaseFieldsToCreate(BaseParam param, T entity) {
        entity.setCreatorUser(User.builder().id(param.getUser().getId()).build());
        entity.setCreatedDate(new Date());
        return entity;
    }

    public static <T extends BaseEntity> T fillBaseFieldsToUpdate(BaseParam param, T entity) {
        entity.setId(param.getId());
        entity.setUpdaterUser(User.builder().id(param.getUser().getId()).build());
        entity.setUpdatedDate(new Date());
        return entity;
    }
}
