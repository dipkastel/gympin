package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelRoleEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public final class PlaceConvertor {


    public static List<PlaceDto> toDto(Collection<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::toDtoSecure).collect(Collectors.toList());
    }

    public static Page<PlaceDto> toDto(Page<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.map(PlaceConvertor::toDtoSecure);
    }

    public static PlaceDto toDto(PlaceEntity entity) {
        if (entity == null) return null;
         Boolean isSequred = false;
         try {
             GympinContext context = GympinContextHolder.getContext();
             if (context == null)
                 throw new UnknownUserException();
             UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
             for(CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp->!cp.isDeleted()).collect(Collectors.toList())){
                 if(personnel.getCorporate().getStatus()== CorporateStatusEnum.SECURE_DEMO){
                     isSequred = true;
                 }
             }
         }catch (Exception e){
         }

        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        try {
            placeDto.setName(isSequred?(entity.getName().substring(0,2)+"*****" +entity.getName().substring(entity.getName().length()-2)):entity.getName());
        }catch (Exception e){

        }
        try {
            placeDto.setLatitude(isSequred?entity.getLatitude()+Math.random()*0.002:entity.getLatitude());
            placeDto.setLongitude(isSequred?entity.getLongitude()+Math.random()*0.002:entity.getLongitude());
        }catch (Exception e){

        }
        placeDto.setTell(isSequred?"02177487334":entity.getTell());
        placeDto.setContractData(entity.getContractData());
        placeDto.setHasContract(entity.isHasContract());
        placeDto.setCallUs(entity.isCallUs());
        try{
            placeDto.setAddress(isSequred?(entity.getAddress().substring(0,3)+"****" +entity.getAddress().substring(entity.getAddress().length()-3)):entity.getAddress());
        }catch (Exception e){}
        placeDto.setOrder(entity.getOrder());
        placeDto.setActiveTimes(entity.getActiveTimes());
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setStatus(entity.getStatus());
        if (entity.getPlaceSport() != null)
            placeDto.setSports(SportConvertor.toDto(entity.getPlaceSport().stream().filter(p -> !p.isDeleted()).map(PlaceSportEntity::getSport).collect(Collectors.toList())));
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        placeDto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        return placeDto;
    }

    public static PlaceDto toSimpleDto(PlaceEntity entity) {
        if (entity == null) return null;
        Boolean isSequred = false;
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            for(CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp->!cp.isDeleted()).collect(Collectors.toList())){
                if(personnel.getCorporate().getStatus()== CorporateStatusEnum.SECURE_DEMO){
                    isSequred = true;
                }
            }
        }catch (Exception e){
        }
        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        placeDto.setName(isSequred?(entity.getName().substring(0,2)+"*****" +entity.getName().substring(entity.getName().length()-2)):entity.getName());
        placeDto.setOrder(entity.getOrder());
        try{
            placeDto.setAddress(isSequred?(entity.getAddress().substring(0,3)+"****" +entity.getAddress().substring(entity.getAddress().length()-3)):entity.getAddress());
        }catch (Exception e){}
        placeDto.setStatus(entity.getStatus());
        return placeDto;
    }

    public static PlaceDto toDtoSecure(PlaceEntity entity) {
        if (entity == null) return null;
        Boolean isSequred = false;
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            for(CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp->!cp.isDeleted()).collect(Collectors.toList())){
                if(personnel.getCorporate().getStatus()== CorporateStatusEnum.SECURE_DEMO){
                    isSequred = true;
                }
            }
        }catch (Exception e){
        }

        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        try {
            placeDto.setName(isSequred?(entity.getName().substring(0,2)+"*****" +entity.getName().substring(entity.getName().length()-2)):entity.getName());
        }catch (Exception e){

        }
        try {
            placeDto.setLatitude(isSequred?entity.getLatitude()+Math.random()*0.002:entity.getLatitude());
            placeDto.setLongitude(isSequred?entity.getLongitude()+Math.random()*0.002:entity.getLongitude());
        }catch (Exception e){

        }
        placeDto.setHasContract(entity.isHasContract());
        placeDto.setOrder(entity.getOrder());
        try{
            placeDto.setAddress(isSequred?(entity.getAddress().substring(0,3)+"****" +entity.getAddress().substring(entity.getAddress().length()-3)):entity.getAddress());
        }catch (Exception e){}
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setHasBeneficiary(entity.getPlaceOwners().stream().filter(PlacePersonnelEntity::getIsBeneficiary).findFirst().map(p -> true).orElse(false));
        placeDto.setStatus(entity.getStatus());
        if (entity.getBuyables().size() > 0) {
            try {
                placeDto.setGenders(entity.getBuyables().stream().filter(BuyableEntity::getEnable).map(BuyableEntity::getGender).collect(Collectors.toSet()));
            } catch (Exception e) {
            }
            try {
                var minPriceTicket = entity.getBuyables().stream().filter(p ->!p.isDeleted()&& p.getEnable() && p.getPrice() != null).min(Comparator.comparing(BuyableEntity::getPrice)).get();
                placeDto.setMinPrice(minPriceTicket.getPrice());
                if(minPriceTicket.getValuePrice().compareTo(minPriceTicket.getPrice())>0)
                    placeDto.setMinPriceBeforeDiscount(minPriceTicket.getValuePrice());
            } catch (Exception e) {
            }
        }
        if (entity.getPlaceSport() != null)
            placeDto.setSports(SportConvertor.toDto(entity.getPlaceSport().stream().filter(p -> !p.isDeleted()).map(PlaceSportEntity::getSport).collect(Collectors.toList())));
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        placeDto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        return placeDto;
    }

    public static PlaceParam toParm(PlaceEntity entity) {
        if (entity == null) return null;
        PlaceParam placeParam = new PlaceParam();
        placeParam.setId(entity.getId());
        placeParam.setName(entity.getName());
        placeParam.setStatus(entity.getStatus());
        return placeParam;
    }

    public static PlaceAboutDto AboutToDto(PlaceAboutEntity entity) {
        if (entity == null) return null;
        return PlaceAboutDto
                .builder()
                .id(entity.getId())
                .createdDate(entity.getCreatedDate())
                .updatedDate(entity.getUpdatedDate())
                .isDeleted(entity.isDeleted())
                .name(entity.getName())
                .description(entity.getDescription())
                .acceptable(entity.getAcceptable())
                .active(entity.getActive())
                .place(toDto(entity.getPlace()))
                .build();
    }

    public static PlacePersonnelDto personnelToDto(PlacePersonnelEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .placeDto(toDto(entity.getPlace()))
                .userDto(UserConvertor.toDtoComplete(entity.getUser()))
                .userRole(entity.getPlacePersonnelRoles().stream().filter(pp -> !pp.isDeleted()).map(PlacePersonnelRoleEntity::getRole).collect(Collectors.toList()))
                .isBeneficiary(entity.getIsBeneficiary())
                .isPublic(entity.getIsPublic())
                .commissionFee(entity.getCommissionFee())
                .build();
    }

    public static PlacePersonnelAccessDto personnelAccessToDto(PlacePersonnelAccessEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelAccessDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .section(entity.getSection())
                .access(entity.getAccess())
                .build();
    }

    public static PlacePersonnelBuyableAccessDto personelBuyableAccessToDto(PlacePersonelBuyableAccessEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelBuyableAccessDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .access(entity.getAccess())
                .buyableDto(BuyableConvertor.ToDto(entity.getBuyable()))
                .build();
    }

    public static List<PlacePersonnelAccessDto> personnelAccessToDto(List<PlacePersonnelAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::personnelAccessToDto).collect(Collectors.toList());

    }


    public static List<PlacePersonnelBuyableAccessDto> personelBuyableAccessToDto(List<PlacePersonelBuyableAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().map(PlaceConvertor::personelBuyableAccessToDto).collect(Collectors.toList());

    }
}
