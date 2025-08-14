package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelRoleEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public final class PlaceConvertor {


    public static List<PlaceGymDto> ToGymDto(Collection<PlaceGymEntity> entities) {
        if (entities == null) return null;
        return entities.stream().filter(o -> !o.isDeleted()).map(PlaceConvertor::toDtoSecureGym).collect(Collectors.toList());
    }

    public static Page<PlaceGymDto> ToGymDto(Page<PlaceGymEntity> entities) {
        if (entities == null) return null;
        return entities.map(PlaceConvertor::toDtoSecureGym);
    }

    public static PlaceGymDto ToGymDto(PlaceGymEntity entity) {
        if (entity == null) return null;
        Boolean isSequred = false;
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            for (CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp -> !cp.isDeleted()).collect(Collectors.toList())) {
                if (personnel.getCorporate().getStatus() == CorporateStatusEnum.SECURE_DEMO) {
                    isSequred = true;
                }
            }
        } catch (Exception e) {
        }

        PlaceGymDto placeDto = new PlaceGymDto();
        placeDto.setId(entity.getId());
        try {
            placeDto.setName(isSequred ? (entity.getName().substring(0, 2) + "*****" + entity.getName().substring(entity.getName().length() - 2)) : entity.getName());
        } catch (Exception e) {

        }
        try {
            placeDto.setLatitude(isSequred ? entity.getLatitude() + Math.random() * 0.002 : entity.getLatitude());
            placeDto.setLongitude(isSequred ? entity.getLongitude() + Math.random() * 0.002 : entity.getLongitude());
        } catch (Exception e) {

        }
        if (entity.getTicketSubscribes().size() > 0) {
            try {
                placeDto.setGenders(entity.getTicketSubscribes().stream().filter(be -> be.getEnable() && (!be.isDeleted())).map(TicketSubscribeEntity::getGender).collect(Collectors.toSet()));
            } catch (Exception e) {
            }
        }
        placeDto.setTell(isSequred ? "02177487334" : entity.getTell());
        placeDto.setContractData(entity.getContractData());
        placeDto.setHasContract(entity.isHasContract());
        placeDto.setCallUs(entity.isCallUs());
        try {
            placeDto.setAddress(isSequred ? (entity.getAddress().substring(0, 3) + "****" + entity.getAddress().substring(entity.getAddress().length() - 3)) : entity.getAddress());
        } catch (Exception e) {
        }
        placeDto.setCommentCount((short) entity.getPlaceComments().size());
        placeDto.setOrder(entity.getOrder());
        placeDto.setActiveTimes(entity.getActiveTimes());
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setRate(entity.getRate());
        placeDto.setStatus(entity.getStatus());
        if (entity.getPlaceSport() != null)
            placeDto.setSports(SportConvertor.toDto(entity.getPlaceSport().stream().filter(p -> !p.isDeleted()).map(PlaceSportEntity::getSport).collect(Collectors.toList())));
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        placeDto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        return placeDto;
    }

    public static List<PlaceCateringDto> ToCateringDto(Collection<PlaceCateringEntity> entities) {
        if (entities == null) return null;
        return entities.stream().filter(o -> !o.isDeleted()).map(PlaceConvertor::ToCateringDto).collect(Collectors.toList());
    }

    public static Page<PlaceCateringDto> ToCateringDto(Page<PlaceCateringEntity> entities) {
        if (entities == null) return null;
        return entities.map(PlaceConvertor::ToCateringDto);
    }

    public static PlaceCateringDto ToCateringDto(PlaceCateringEntity entity) {
        if (entity == null) return null;

        PlaceCateringDto catering = new PlaceCateringDto();
        catering.setId(entity.getId());
        catering.setName(entity.getName());
        catering.setLatitude(entity.getLatitude());
        catering.setLongitude(entity.getLongitude());
        catering.setTell(entity.getTell());
        catering.setAddress(entity.getAddress());
        catering.setOrder(entity.getOrder());
        catering.setAutoDiscount(entity.isAutoDiscount());
        catering.setStatus(entity.getStatus());
        catering.setLocation(LocationConvertor.toDto(entity.getLocation()));
        catering.setLogo(MultimediaConvertor.toDto(entity.getLogo()));
        catering.setLastOrderDayCount(entity.getLastOrderDayCount());
        catering.setMinOrderCount(entity.getMinOrderCount());
        catering.setFreeDeliveryPrice(entity.getFreeDeliveryPrice());
        catering.setHasDishesPrice(entity.getHasDishesPrice());
        return catering;
    }

    public static List<PlaceDto> ToDto(Collection<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.stream().filter(o -> !o.isDeleted()).map(PlaceConvertor::ToDto).collect(Collectors.toList());
    }

    public static Page<PlaceDto> ToDto(Page<PlaceEntity> entities) {
        if (entities == null) return null;
        return entities.map(PlaceConvertor::ToDto);
    }

    public static PlaceDto ToDto(PlaceEntity entity) {
        if (entity == null) return null;
        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(entity.getId());
        placeDto.setName(entity.getName());
        placeDto.setLatitude(entity.getLatitude());
        placeDto.setLongitude(entity.getLongitude());
        placeDto.setTell(entity.getTell());
        placeDto.setAddress(entity.getAddress());
        placeDto.setStatus(entity.getStatus());
        placeDto.setRate(entity.getRate());
        placeDto.setLocation(LocationConvertor.toDto(entity.getLocation()));
        if(entity instanceof PlaceGymEntity)
            placeDto.setPlaceType("Gym");
        if(entity instanceof PlaceCateringEntity)
            placeDto.setPlaceType("Catering");
        return placeDto;
    }

    public static PlaceGymDto toSimpleGymDto(PlaceGymEntity entity) {
        if (entity == null) return null;
        Boolean isSequred = false;
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            for (CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp -> !cp.isDeleted()).collect(Collectors.toList())) {
                if (personnel.getCorporate().getStatus() == CorporateStatusEnum.SECURE_DEMO) {
                    isSequred = true;
                }
            }
        } catch (Exception e) {
        }
        PlaceGymDto placeDto = new PlaceGymDto();
        placeDto.setId(entity.getId());
        placeDto.setActiveTimes(entity.getActiveTimes());
        placeDto.setRate(entity.getRate());
        placeDto.setName(isSequred ? (entity.getName().substring(0, 2) + "*****" + entity.getName().substring(entity.getName().length() - 2)) : entity.getName());
        placeDto.setOrder(entity.getOrder());
        try {
            placeDto.setAddress(isSequred ? (entity.getAddress().substring(0, 3) + "****" + entity.getAddress().substring(entity.getAddress().length() - 3)) : entity.getAddress());
        } catch (Exception e) {
        }
        placeDto.setStatus(entity.getStatus());
        return placeDto;
    }

    public static PlaceGymDto toDtoSecureGym(PlaceGymEntity entity) {
        if (entity == null) return null;
        Boolean isSequred = false;
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            for (CorporatePersonnelEntity personnel : user.getCorporatesPersonel().stream().filter(cp -> !cp.isDeleted()).collect(Collectors.toList())) {
                if (personnel.getCorporate().getStatus() == CorporateStatusEnum.SECURE_DEMO) {
                    isSequred = true;
                }
            }
        } catch (Exception e) {
        }

        PlaceGymDto placeDto = new PlaceGymDto();
        placeDto.setId(entity.getId());
        placeDto.setActiveTimes(entity.getActiveTimes());
        placeDto.setRate(entity.getRate());
        try {
            placeDto.setName(isSequred ? (entity.getName().substring(0, 2) + "*****" + entity.getName().substring(entity.getName().length() - 2)) : entity.getName());
        } catch (Exception e) {

        }
        try {
            placeDto.setLatitude(isSequred ? entity.getLatitude() + Math.random() * 0.002 : entity.getLatitude());
            placeDto.setLongitude(isSequred ? entity.getLongitude() + Math.random() * 0.002 : entity.getLongitude());
        } catch (Exception e) {

        }
        placeDto.setHasContract(entity.isHasContract());
        placeDto.setOrder(entity.getOrder());
        try {
            placeDto.setAddress(isSequred ? (entity.getAddress().substring(0, 3) + "****" + entity.getAddress().substring(entity.getAddress().length() - 3)) : entity.getAddress());
        } catch (Exception e) {
        }
        placeDto.setAutoDiscount(entity.isAutoDiscount());
        placeDto.setHasBeneficiary(entity.getPlaceOwners().stream().filter(o -> !o.isDeleted()).filter(PlacePersonnelEntity::getIsBeneficiary).findFirst().map(p -> true).orElse(false));
        placeDto.setStatus(entity.getStatus());
        if (entity.getTicketSubscribes().size() > 0) {
            try {
                placeDto.setGenders(entity.getTicketSubscribes().stream().filter(be -> be.getEnable() && (!be.isDeleted())).map(TicketSubscribeEntity::getGender).collect(Collectors.toSet()));
            } catch (Exception e) {
            }
            try {
                var minPriceTicket = entity.getTicketSubscribes().stream().filter(p -> !p.isDeleted() && p.getEnable() && p.getPrice() != null).min(Comparator.comparing(BuyableEntity::getPrice)).get();
                placeDto.setMinPrice(minPriceTicket.getPrice());
                if (minPriceTicket.getValuePrice().compareTo(minPriceTicket.getPrice()) > 0)
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
                .place(ToDto(entity.getPlace()))
                .build();
    }

    public static PlacePersonnelDto personnelToDto(PlacePersonnelEntity entity) {
        if (entity == null) return null;
        PlacePersonnelDto dto = new PlacePersonnelDto();

        dto.setId(entity.getId());
        dto.setDeleted(entity.isDeleted());
        dto.setPlaceDto(ToDto(entity.getPlace()));
        if(entity.getPlace() instanceof PlaceCateringEntity)
            dto.setPlaceCateringDto(ToCateringDto((PlaceCateringEntity) entity.getPlace()));
        if(entity.getPlace() instanceof PlaceGymEntity)
            dto.setPlaceGymDto(ToGymDto((PlaceGymEntity) entity.getPlace()));
        dto.setUserDto(UserConvertor.toDtoComplete(entity.getUser()));
        dto.setUserRole(entity.getPlacePersonnelRoles().stream().filter(pp -> !pp.isDeleted()).map(PlacePersonnelRoleEntity::getRole).collect(Collectors.toList()));
        dto.setIsBeneficiary(entity.getIsBeneficiary());
        dto.setIsPublic(entity.getIsPublic());
        dto.setCommissionFee(entity.getCommissionFee());
        return dto;
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
        return entities.stream().filter(o -> !o.isDeleted()).map(PlaceConvertor::personnelAccessToDto).collect(Collectors.toList());

    }

    public static List<PlacePersonnelBuyableAccessDto> personelBuyableAccessToDto(List<PlacePersonelBuyableAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().filter(o -> !o.isDeleted()).map(PlaceConvertor::personelBuyableAccessToDto).collect(Collectors.toList());

    }
}
