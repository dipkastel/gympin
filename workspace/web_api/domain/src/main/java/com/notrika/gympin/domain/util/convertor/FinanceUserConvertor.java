package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public final class FinanceUserConvertor {


    public static List<FinanceUserDto> toFinanceDto(List<FinanceUserEntity> finance) {
        return finance.stream().filter(o->!o.isDeleted()).map(FinanceUserConvertor::toFinanceDto).collect(Collectors.toList());
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

    public static UserCreditDetailDto toDto(FinanceUserEntity userPersonalWallet) {
        UserCreditDetailDto detail = new UserCreditDetailDto();
        BigDecimal userDebit = userPersonalWallet.getTotalDeposit();
        detail.setCreditAmount(userDebit);
        detail.setId(userPersonalWallet.getId());
        if (userPersonalWallet.getUserFinanceType() == UserFinanceType.INCOME_WALLET)
            detail.setCreditType(CreditType.INCOME);
        if (userPersonalWallet.getUserFinanceType() == UserFinanceType.PERSONAL_WALLET)
            detail.setCreditType(CreditType.PERSONAL);
        if (userPersonalWallet.getUserFinanceType() == UserFinanceType.NON_WITHDRAWABLE_WALLET)
            detail.setCreditType(CreditType.NON_WITHDRAWABLE);
        detail.setCreditPayableAmount(userDebit);
        detail.setPlace(PlaceConvertor.toSimpleGymDto(userPersonalWallet.getPlace()));
        return detail;
    }
}
