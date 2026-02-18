package com.notrika.gympin.domain.user;


import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.corporate.CorporatePersonelFinanceHelper;
import com.notrika.gympin.domain.util.convertor.CorporateConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceCorporateRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporatePersonnelCreditTransactionRepository;
import com.notrika.gympin.persistence.dao.repository.finance.transaction.FinanceCorporateTransactionRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceHelper {

    @Autowired
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    FinanceCorporateRepository financeCorporateRepository;

    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    FinanceCorporateTransactionRepository financeCorporateTransactionRepository;

    @Autowired
    FinanceCorporatePersonnelCreditRepository financeCorporatePersonnelCreditRepository;

    @Autowired
    CorporatePersonelFinanceHelper corporatePersonelFinanceHelper;

    @Autowired
    FinanceCorporatePersonnelCreditTransactionRepository financeCorporatePersonnelCreditTransactionRepository;


    public List<UserCreditDetailDto> getUserCreditsByCorporate(UserParam param) {
        List<CorporatePersonnelEntity> corportePersonnels = corporatePersonnelRepository.findByUserIdAndDeletedIsFalse(param.getId());
        List<UserCreditDetailDto> result = new ArrayList<>();
        //check User
        for (CorporatePersonnelEntity personnel : corportePersonnels) {
            Boolean canPay = true;
            //Check corporate
            CorporateEntity corporate = personnel.getCorporate();
            if (corporate.getStatus() != CorporateStatusEnum.ACTIVE)
                canPay = false;
            var activeCredits = personnel.getCredits().stream().filter(o->!o.isDeleted()).filter(c -> c.getStatus() == CorporatePersonnelCreditStatusEnum.ACTIVE).collect(Collectors.toList());
            activeCredits = corporatePersonelFinanceHelper.getActiveCredits(activeCredits);
            var personelCorproateMaxCredit = activeCredits.stream().filter(o->!o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            if (personelCorproateMaxCredit.compareTo(corporate.getFinanceCorporate().getTotalDeposit()) > 0)
                canPay = false;
            if(corporate.getContractType()== CorporateContractTypeEnum.GOLD)
                canPay = true;
            for (FinanceCorporatePersonnelCreditEntity credit : activeCredits) {
                //check Credit
                //add credit To List
                UserCreditDetailDto detail = new UserCreditDetailDto();
                detail.setId(credit.getId());
                detail.setCreditStatus(credit.getStatus());
                detail.setPersonnelId(personnel.getId());
                detail.setName(credit.getName());
                detail.setCreditType(CreditType.SPONSOR);
                detail.setContractType(corporate.getContractType());
                detail.setCreditAmount(credit.getCreditAmount());
                detail.setExpireDate(credit.getExpireDate());
                detail.setCreditPayableAmount(canPay ? credit.getCreditAmount() : BigDecimal.ZERO);
                detail.setCorporate(CorporateConvertor.toDto(corporate));
                result.add(detail);
            }
        }
        return result;
    }

}
