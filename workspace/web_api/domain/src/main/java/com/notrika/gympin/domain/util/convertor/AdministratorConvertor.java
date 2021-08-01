package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.dao.administrator.Administrator;

//@Component
public class AdministratorConvertor {

    public static AdministratorLoginDto administratorToAdministratorLoginDto(Administrator administrator){
        if(administrator==null)
            return null;
        AdministratorLoginDto dto = new AdministratorLoginDto();
        dto.setId(administrator.getId());
        dto.setAdministratorRoles(administrator.getAdministratorRoles());
        dto.setAdministratorname(administrator.getAdministratorname());
        dto.setPhoneNumber(administrator.getPhoneNumber());
        dto.setEmail(administrator.getEmail());
        return dto;
    }
}
