package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.settings.corporateSettings.enums.CorporateSettingTypesEnum;
import com.notrika.gympin.common.settings.userSettings.enums.UserSettingTypesEnum;
import com.notrika.gympin.domain.corporate.CorporatePersonelFinanceHelper;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelGroupEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.stream.Collectors;

public final class CorporateConvertor {


    public static CorporateDto toDto(CorporateEntity entity) {
        if (entity == null) return null;
        CorporateDto dto = new CorporateDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setEmail(entity.getEmail());
        dto.setTel(entity.getTel());
        dto.setContractData(entity.getContractData());
        if (entity.getFinanceCorporate() != null)
            dto.setFinanceCorporate(TransactionConvertor.toSimpleDto(entity.getFinanceCorporate()));
        dto.setStatus(entity.getStatus());
        dto.setContractType(entity.getContractType());
        dto.setLogo(MultimediaConvertor.toDto(entity.getLogo()));
        dto.setDefaultExpireDuration(entity.getDed());
        try{
            dto.setWizard(getWizard(entity));
        }catch (Exception e){}
        try{
            dto.setLatitude(entity.getLatitude());
            dto.setLongitude(entity.getLongitude());
        }catch (Exception e){}
        try{
            dto.setPersonnelCount(entity.getPersonnel().stream().filter(p->!p.isDeleted() ).count());

        }catch (Exception e){}
        try{
            dto.setContractDate(entity.getContractDate());
            Calendar expireDate = Calendar.getInstance();
            expireDate.setTime(entity.getContractDate());
            expireDate.add(Calendar.YEAR, 1);
            dto.setContractExpireDate(expireDate.getTime());
        }catch (Exception e){}
        return dto;
    }

    private static Boolean getWizard(CorporateEntity entity) {
        var settings = entity.getSettings().stream().filter(o->!o.isDeleted()).filter(r->r.getKey().equals(CorporateSettingTypesEnum.USER_WIZARD_COMPLETE)).findFirst();
        if(settings==null)return false;
        return (settings.get().getValue().equals("true"));
    }

    public static CorporatePersonnelGroupDto toDto(CorporatePersonnelGroupEntity entity) {
        if (entity == null) return null;
        CorporatePersonnelGroupDto dto = new CorporatePersonnelGroupDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        try{
            dto.setUserCount(entity.getPersonels().stream().filter(o->!o.isDeleted()).count());
        }catch (Exception e){
            dto.setUserCount(0l);
        }
        return dto;
    }

    public static CorporatePersonnelDto toPersonnelDto(CorporatePersonnelEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setPersonnelGroup(toDto(entity.getPersonnelGroup()));
        try{
            dto.setCateringAccess(entity.getUser().getSettings().stream().filter(us->us.getKey().equals(UserSettingTypesEnum.CATERING_ACCESS)&&!us.isDeleted()).map(us->Long.valueOf(us.getValue())).collect(Collectors.toList()));
        }catch (Exception e){}
        if (entity.getCredits() != null)
            dto.setCreditList(entity.getCredits().stream().filter(o->!o.isDeleted()).map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().filter(o->!o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        return dto;
    }

    public static CorporatePersonnelDto toSimplePersonnelDto(CorporatePersonnelEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setRole(entity.getRole());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().filter(o->!o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        return dto;
    }

    public static CorporatePersonnelDto toSecurePersonnelDto(CorporatePersonnelEntity entity, CorporatePersonelFinanceHelper helper) {
        if (entity == null) return null;
        CorporatePersonnelDto dto = new CorporatePersonnelDto();
        dto.setId(entity.getId());
        dto.setCorporate(toDto(entity.getCorporate()));
        dto.setRole(entity.getRole());
        dto.setPersonnelGroup(toDto(entity.getPersonnelGroup()));
        dto.setUser(UserConvertor.toDtoLessDetails(entity.getUser()));
        try{
            dto.setTotalCredit(entity.getCredits().stream().filter(o->!o.isDeleted()).map(FinanceCorporatePersonnelCreditEntity::getCreditAmount).reduce(BigDecimal.ZERO,BigDecimal::add));
        }catch (Exception e){}
        if (entity.getCredits() != null)
            dto.setCreditList(helper.checkCreditsExpiration(entity.getCredits().stream().filter(o->!o.isDeleted()).sorted((o1, o2)->o2.getId().compareTo(o1.getId())).collect(Collectors.toList())).stream().map(CorporateConvertor::toCreditDto).collect(Collectors.toList()));
        return dto;
    }

    public static CorporatePersonnelCreditDto toCreditDto(FinanceCorporatePersonnelCreditEntity entity) {
        if(entity==null) return null;
        CorporatePersonnelCreditDto dto = CorporatePersonnelCreditDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .creditAmount(entity.getCreditAmount())
                .personnel(CorporateConvertor.toSimplePersonnelDto(entity.getCorporatePersonnel()))
                .expireDate(entity.getExpireDate())
                .createdDate(entity.getCreatedDate())
                .status(entity.getStatus())
                .creatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()))
                .build();
        return dto;
    }

}
