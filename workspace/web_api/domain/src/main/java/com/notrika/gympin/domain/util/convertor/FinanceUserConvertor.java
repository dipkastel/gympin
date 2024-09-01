package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.settings.userSettings.enums.UserSettingTypesEnum;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public final class FinanceUserConvertor {


    public static List<FinanceUserDto> toFinanceDto(List<FinanceUserEntity> finance) {
        return finance.stream().map(FinanceUserConvertor::toFinanceDto).collect(Collectors.toList());
    }

    public static FinanceUserDto toFinanceDto(FinanceUserEntity finance) {
        if (finance == null) return null;
        FinanceUserDto dto = new FinanceUserDto();
        dto.setId(finance.getId());
        dto.setUserFinanceType(finance.getUserFinanceType());
        dto.setUser(UserConvertor.toDtoSimple(finance.getUser()));
        dto.setTotalDeposit(finance.getTotalDeposit());
        return dto;
    }

}
