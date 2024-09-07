package com.notrika.gympin.domain.user;


import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceHelper {

    @Autowired
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;

    public List<UserCreditDetailDto> getUserCreditsByCorporate(UserParam param) {
        List<CorporatePersonnelEntity> corportePersonnels = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(param.getId());
        List<UserCreditDetailDto> result = new ArrayList<>();
        //check User
        Boolean canPay = true;
        for (CorporatePersonnelEntity personnel : corportePersonnels) {
            //Check corporate
            if (personnel.getCorporate().getStatus() != CorporateStatusEnum.ACTIVE)
                canPay = false;
            var activeCredits = personnel.getCredits().stream().filter(c -> c.getStatus() == CorporatePersonnelCreditStatusEnum.ACTIVE).collect(Collectors.toList());
            checkCreditExpiration(activeCredits);
            var personelCorproateMaxCredit = activeCredits.stream().map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            if (personelCorproateMaxCredit.compareTo(personnel.getCorporate().getFinanceCorporate().getTotalDeposit()) > 0)
                canPay = false;
            for (FinanceCorporatePersonnelCreditEntity credit : activeCredits) {
                //check Credit
                //add credit To List
                UserCreditDetailDto detail = new UserCreditDetailDto();
                detail.setId(credit.getId());
                detail.setPersonnelId(personnel.getId());
                detail.setCreditType(CreditType.SPONSOR);
                detail.setContractType(personnel.getCorporate().getContractType());
                detail.setCreditAmount(credit.getCreditAmount());
                detail.setExpireDate(credit.getExpireDate());
                detail.setCreditPayableAmount(canPay ? credit.getCreditAmount() : BigDecimal.ZERO);
                detail.setCorporate(CorporateConvertor.toDto(personnel.getCorporate()));
                result.add(detail);
            }
        }
        return result;
    }

    private List<FinanceCorporatePersonnelCreditEntity> checkCreditExpiration(List<FinanceCorporatePersonnelCreditEntity> activeCredits) {
        for (FinanceCorporatePersonnelCreditEntity credit : activeCredits) {
            if (credit.getExpireDate().before(new Date())) {
                activeCredits.remove(credit);
                ExpireCredit(credit);
            }
        }
        return activeCredits;
    }

    private void ExpireCredit(FinanceCorporatePersonnelCreditEntity credit) {
        credit.setStatus(CorporatePersonnelCreditStatusEnum.EXPIRE);
        financeCorporatePersonnelCreditRepository.update(credit);
    }
}
