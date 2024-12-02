package com.notrika.gympin.domain.settings;

import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SettingsConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.BuyableRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SettingsServiceImpl extends AbstractBaseService<SettingParam, SettingDto, BaseQuery<?>, SettingsEntity> implements SettingsService {

    @Autowired
    ManageSettingsRepository manageSettingsRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    BuyableRepository buyableRepository;
    @Autowired
    private TicketDiscountHistoryRepository ticketSubscribeDiscountHistoryRepository;

    @Override
    public SettingDto add(@NonNull SettingParam settingParam) {
        return SettingsConvertor.toDto(manageSettingsRepository.add(SettingsConvertor.toEntity(settingParam)));
    }

    @Override
    public SettingDto update(@NonNull SettingParam settingParam) {
        SettingsEntity entity = manageSettingsRepository.getById(settingParam.getId());
        entity.setValue(settingParam.getValue());
        entity.setData(settingParam.getData());
        entity.setDescription(settingParam.getDescription());
        entity.setType(settingParam.getType());
        entity.setKey(settingParam.getKey());
        return SettingsConvertor.toDto(manageSettingsRepository.update(entity));
    }

    @Override
    public SettingDto delete(@NonNull SettingParam settingParam) {
        SettingsEntity entity = manageSettingsRepository.getById(settingParam.getId());
        if (entity.getValue() == null)
            return SettingsConvertor.toDto(manageSettingsRepository.deleteById2(entity));
        else
            return null;
    }


    @Override
    public List<SettingDto> getByType(settingsType type) {
        return convertToDtos(manageSettingsRepository.findAllByDeletedIsFalseAndType(type));
    }

    @Override
    public SettingDto getByKey(String key) {
        return SettingsConvertor.toDto(manageSettingsRepository.findByKeyAndDeletedFalse(key));
    }

    @Override
    public Boolean DoMaximumDiscount() {
        List<PlaceEntity> places = placeRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceEntity place : places) {
            List<BuyableEntity> ActiveBuyablesOfPlace = place.getBuyables().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
            for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                try {
                    BigDecimal beforPrice = buyable.getPrice();
                    BigDecimal newPrice = BigDecimal.valueOf(buyable.getPlacePrice().intValue() * (1 - (buyable.getBeneficiary().getCommissionFee() / 100)));
                    if (newPrice.compareTo(buyable.getPrice()) != 0) {
                        buyable.setPrice(newPrice);
                        buyable.setDiscount(buyable.getBeneficiary().getCommissionFee().shortValue());
                        buyableToUpdate.add(buyable);
                        buyableDiscountHistoryEntityListToAdd.add(
                                BuyableDiscountHistoryEntity.builder()
                                        .buyable(buyable)
                                        .discount(buyable.getBeneficiary().getCommissionFee().shortValue())
                                        .beforPrice(beforPrice)
                                        .afterPrice(newPrice)
                                        .build());
                    }
                } catch (Exception e) {
                }

            }
        }
        buyableRepository.updateAll(buyableToUpdate);
        ticketSubscribeDiscountHistoryRepository.addAll(buyableDiscountHistoryEntityListToAdd);
        return true;
    }

    @Override
    public Boolean RemoveAllDiscounts() {
        List<PlaceEntity> places = placeRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceEntity place : places) {
            List<BuyableEntity> ActiveBuyablesOfPlace = place.getBuyables().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
            for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                try {
                    BigDecimal beforPrice = buyable.getPrice();

                    if (buyable.getPlacePrice().compareTo(buyable.getPrice()) != 0) {
                        buyable.setPrice(buyable.getPlacePrice());
                        buyable.setDiscount((short) 0);
                        buyableToUpdate.add(buyable);
                        buyableDiscountHistoryEntityListToAdd.add(
                                BuyableDiscountHistoryEntity.builder()
                                        .buyable(buyable)
                                        .discount((short) 0)
                                        .beforPrice(beforPrice)
                                        .afterPrice(buyable.getPlacePrice())
                                        .build());
                    }
                } catch (Exception e) {
                }

            }
        }
        buyableRepository.updateAll(buyableToUpdate);
        ticketSubscribeDiscountHistoryRepository.addAll(buyableDiscountHistoryEntityListToAdd);
        return true;
    }

    @Override
    public Boolean SetAutoToAll() {
        List<PlaceEntity> places = placeRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<PlaceEntity> placeToUpdate = new ArrayList<>();
        for (PlaceEntity place : places) {
            if (!place.isAutoDiscount()) {
                place.setAutoDiscount(true);
                placeToUpdate.add(place);
            }
        }
        placeRepository.updateAll(placeToUpdate);
        return true;
    }

    @Override
    public Boolean UpdateAutoDiscount() {
        List<PlaceEntity> places = placeRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceEntity place : places) {
            if (Math.random() > 0.5) {
                List<BuyableEntity> ActiveBuyablesOfPlace = place.getBuyables().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
                for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                    try {
                        Double discountFee = (buyable.getBeneficiary().getCommissionFee() / 100)*Math.random();
                        BigDecimal beforPrice = buyable.getPrice();
                        BigDecimal newPrice = BigDecimal.valueOf(buyable.getPlacePrice().intValue() * (1 - discountFee));
                        if (newPrice.compareTo(buyable.getPrice()) != 0) {
                            buyable.setPrice(newPrice);
                            buyable.setDiscount(discountFee.shortValue());
                            buyableToUpdate.add(buyable);
                            buyableDiscountHistoryEntityListToAdd.add(
                                    BuyableDiscountHistoryEntity.builder()
                                            .buyable(buyable)
                                            .discount(discountFee.shortValue())
                                            .beforPrice(beforPrice)
                                            .afterPrice(newPrice)
                                            .build());
                        }
                    } catch (Exception e) {
                    }

                }
            }
        }
        buyableRepository.updateAll(buyableToUpdate);
        ticketSubscribeDiscountHistoryRepository.addAll(buyableDiscountHistoryEntityListToAdd);
        return true;
    }

    @Override
    public List<SettingsEntity> getAll(Pageable pageable) {
        return manageSettingsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<SettingsEntity> findAll(Specification<SettingsEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public SettingsEntity add(SettingsEntity entity) {
        return manageSettingsRepository.add(entity);
    }

    @Override
    public SettingsEntity update(SettingsEntity entity) {
        return manageSettingsRepository.update(entity);
    }

    @Override
    public SettingsEntity delete(SettingsEntity entity) {
        return manageSettingsRepository.deleteById2(entity);
    }

    @Override
    public SettingsEntity getEntityById(long id) {
        return manageSettingsRepository.getById(id);
    }

    @Override
    public List<SettingDto> convertToDtos(List<SettingsEntity> entities) {
        return entities.stream().map(SettingsConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<SettingDto> convertToDtos(Page<SettingsEntity> entities) {
        return null;
    }

    @Override
    public SettingDto getById(long id) {
        return SettingsConvertor.toDto(manageSettingsRepository.getById(id));
    }

    @Override
    public Page<SettingDto> query(BaseQuery<?> filter) {
        return null;
    }

}
