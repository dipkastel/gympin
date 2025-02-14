package com.notrika.gympin.domain.settings.gifts;

import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.gifts.dto.GiftCreditDto;
import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.common.settings.gifts.param.GiftCreditParam;
import com.notrika.gympin.common.settings.gifts.query.GiftCreditQuery;
import com.notrika.gympin.common.settings.gifts.service.GiftCreditService;
import com.notrika.gympin.common.util.exception.activation.code.ActivationCodeNotFoundException;
import com.notrika.gympin.common.util.exception.corporate.CorporateContractIsNotComplete;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.transactions.RequestOverCreditLimit;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporatePersonelFinanceHelper;
import com.notrika.gympin.domain.corporate.CorporatePersonnelCreditServiceImpl;
import com.notrika.gympin.domain.util.convertor.GiftConvertor;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageGiftCreditRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.ws.rs.BadRequestException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GiftsCreditServiceImpl extends AbstractBaseService<GiftCreditParam, GiftCreditDto, GiftCreditQuery, ManageGiftCreditEntity> implements GiftCreditService {

    @Autowired
    private ManageGiftCreditRepository manageGiftCreditRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CorporateRepository corporateRepository;

    @Autowired
    private CorporatePersonnelCreditServiceImpl corporatePersonnelCreditServiceImpl;

    @Autowired
    private CorporatePersonnelRepository corporatePersonnelRepository;

    @Autowired
    CorporatePersonelFinanceHelper corporatePersonnelFinanceHelper;

    @Override
    public GiftCreditDto add(@NonNull GiftCreditParam giftCreditParam) {
        List<ManageGiftCreditEntity> entities = new ArrayList<>();
        if(giftCreditParam.getAmount().compareTo(BigDecimal.ONE)<1)
            throw new BadRequestException("مبلغ هدیه نمیتواند 0 باشد");
        CorporateEntity corporate = corporateRepository.getById(giftCreditParam.getCorporate().getId());
        if(giftCreditParam.getCheckCorporateDeposit()){
            BigDecimal priceToGift = giftCreditParam.getAmount().multiply(BigDecimal.valueOf(giftCreditParam.getCount()));
            if(corporate.getFinanceCorporate().getTotalDeposit().subtract(corporate.getFinanceCorporate().getTotalCredits()).compareTo(priceToGift)<0)
                throw new RequestOverCreditLimit();
        }
        if (!corporatePersonnelFinanceHelper.checkContractContract(corporate))
            throw new CorporateContractIsNotComplete();

        for(int i = 0;i<giftCreditParam.getCount();i++){
            ManageGiftCreditEntity entity = new ManageGiftCreditEntity();
            entity.setName(giftCreditParam.getName());
            entity.setCode(GeneralHelper.GenerateGiftCode(manageGiftCreditRepository));
            entity.setRegisterCode(GeneralHelper.GenerateGiftRegisterCode(manageGiftCreditRepository));
            entity.setExpireDate(giftCreditParam.getExpireDate());
            entity.setCanRegister(giftCreditParam.getCanRegister());
            entity.setAmount(giftCreditParam.getAmount());
            entity.setCreditExpireDate(giftCreditParam.getCreditExpireDate());
            entity.setCorporate(corporate);
            if(giftCreditParam.getCanRegister()){
                entity.setStatus(GiftCreditStatusEnum.ACTIVE);
            }else{
                if (giftCreditParam.getUser()==null||giftCreditParam.getUser().getId()==null)
                    throw new BadRequestException("اگر امکان ثبت نام وجود ندارد کاربر مشخص کنید");
                UserEntity user = userRepository.getById(giftCreditParam.getUser().getId());
                if(corporate!=null){
                    if(corporate.getPersonnel().stream().noneMatch(p-> p.getUser().getId().equals(user.getId())))
                        throw new BadRequestException("کاربر انتخاب شده در سازمان انتخاب شده وجود ندارد");
                }
                entity.setUser(user);
                entity.setStatus(GiftCreditStatusEnum.REGISTERED);
            }
            entities.add(entity);
        }
        manageGiftCreditRepository.addAll(entities);
        return GiftConvertor.toDto(null);
    }



    @Override
    public GiftCreditDto claimGiftCredit(@NonNull GiftCreditParam giftCreditParam) throws Exception {
        ManageGiftCreditEntity gift = manageGiftCreditRepository.getByCodeAndDeletedIsFalse(giftCreditParam.getCode());
        if(gift==null)
            throw new ActivationCodeNotFoundException();
        checkForExpire(gift,manageGiftCreditRepository);
        if(gift.getStatus()==GiftCreditStatusEnum.DRAFT)
            throw new GiftCreditIsNotActiveException();
        if(gift.getStatus()==GiftCreditStatusEnum.USED)
            throw new GiftCreditIsUsedException();
        if(gift.getStatus()==GiftCreditStatusEnum.EXPIRED)
            throw new GiftCreditIsExpiredException();
        if(gift.getStatus()==GiftCreditStatusEnum.INACTIVE)
            throw new GiftCreditIsNotActiveException();
        if(giftCreditParam.getUser()==null)
            throw new GiftCreditUserNotSetException();
        if(gift.getUser()!=null)
            if(!gift.getUser().getId().equals(giftCreditParam.getUser().getId()))
                throw new GiftCreditIsForOtherPersonException();

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
        if(!userRequester.getId().equals(giftCreditParam.getUser().getId()))
            throw new GiftCreditIsForOtherPersonException();

        corporatePersonnelCreditServiceImpl.addGiftCredit(gift,userRequester);
        gift.setStatus(GiftCreditStatusEnum.USED);
        if (gift.getUser()==null)
            gift.setUser(userRequester);
        manageGiftCreditRepository.update(gift);
        return GiftConvertor.toDto(gift);
    }

    private Boolean checkForExpire(ManageGiftCreditEntity gift, ManageGiftCreditRepository manageGiftCreditRepository) {
        if(gift.getExpireDate().before(new Date())){
          gift.setStatus(GiftCreditStatusEnum.EXPIRED);
          gift.setCanRegister(false);
          manageGiftCreditRepository.update(gift);
            throw new GiftCreditIsExpiredException();
        }
        return true;
    }


    @Override
    public GiftCreditDto update(@NonNull GiftCreditParam giftCreditParam) {
        ManageGiftCreditEntity entity = manageGiftCreditRepository.getById(giftCreditParam.getId());
        entity.setCode(giftCreditParam.getCode());
        entity.setRegisterCode(giftCreditParam.getRegisterCode());
        entity.setExpireDate(giftCreditParam.getExpireDate());
        entity.setCanRegister(giftCreditParam.getCanRegister());
        entity.setAmount(giftCreditParam.getAmount());
        entity.setStatus(giftCreditParam.getStatus());
        return GiftConvertor.toDto(manageGiftCreditRepository.update(entity));
    }

    @Override
    public GiftCreditDto delete(@NonNull GiftCreditParam giftCreditParam) {
        ManageGiftCreditEntity tag = manageGiftCreditRepository.getById(giftCreditParam.getId());
        return GiftConvertor.toDto(manageGiftCreditRepository.deleteById2(tag));
    }

    @Override
    public GiftCreditDto getById(long id) {
        return GiftConvertor.toDto(manageGiftCreditRepository.getById(id));
    }

    @Override
    public GiftCreditDto getByCode(String code) {
        return GiftConvertor.toDto(manageGiftCreditRepository.getByCodeAndDeletedIsFalse(code));
    }

    @Override
    public ManageGiftCreditEntity add(ManageGiftCreditEntity entity) {
        return manageGiftCreditRepository.add(entity);
    }

    @Override
    public ManageGiftCreditEntity update(ManageGiftCreditEntity entity) {
        return manageGiftCreditRepository.update(entity);
    }

    @Override
    public ManageGiftCreditEntity delete(ManageGiftCreditEntity entity) {
        return manageGiftCreditRepository.deleteById2(entity);
    }

    @Override
    public ManageGiftCreditEntity getEntityById(long id) {
        return manageGiftCreditRepository.getById(id);
    }

    @Override
    public List<ManageGiftCreditEntity> getAll(Pageable pageable) {
        return manageGiftCreditRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageGiftCreditEntity> findAll(Specification<ManageGiftCreditEntity> specification, Pageable pageable) {
        return manageGiftCreditRepository.findAll(specification, pageable);
    }

    @Override
    public List<GiftCreditDto> convertToDtos(List<ManageGiftCreditEntity> entities) {
        return entities.stream().map(GiftConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<GiftCreditDto> convertToDtos(Page<ManageGiftCreditEntity> entities) {
        return entities.map(GiftConvertor::toDto);
    }


}
