package com.notrika.gympin.domain.settings;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.base.dto.CallListDataItemDto;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.dto.CallListDto;
import com.notrika.gympin.common.settings.base.param.CallToNumberParam;
import com.notrika.gympin.common.settings.base.param.GetCallListParam;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.settings.base.param.SettingProfitParam;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.SettingsConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.BuyableRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketDiscountHistoryRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import org.springframework.web.client.RestTemplate;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    PlaceGymRepository placeGymRepository;
    @Autowired
    BuyableRepository buyableRepository;
    @Autowired
    private TicketDiscountHistoryRepository ticketSubscribeDiscountHistoryRepository;
    @Autowired
    private UserServiceImpl userService;

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
        List<PlaceGymEntity> places = placeGymRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            List<BuyableEntity> ActiveBuyablesOfPlace = place.getTicketSubscribes().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
            for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                try {
                    BigDecimal beforPrice = buyable.getPrice();
                    BigDecimal newPrice = BigDecimal.valueOf(Math.round(buyable.getPlacePrice().intValue() / 1000) * (1 - (buyable.getBeneficiary().getCommissionFee() / 100)) * 1000);
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
    public Boolean DoMaximumManagedDiscount(SettingProfitParam pr) {
        List<PlaceGymEntity> places = placeGymRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            List<BuyableEntity> ActiveBuyablesOfPlace = place.getTicketSubscribes().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
            for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                try {
                    BigDecimal beforPrice = buyable.getPrice();
                    Double discount = buyable.getBeneficiary().getCommissionFee() - pr.getProfit();
                    if (discount < 1)
                        discount = (double) 0;
                    BigDecimal newPrice = BigDecimal.valueOf(Math.round(buyable.getPlacePrice().intValue() / 1000) * (1 - (discount / 100)) * 1000);
                    if (newPrice.compareTo(buyable.getPrice()) != 0) {
                        buyable.setPrice(newPrice);
                        buyable.setDiscount(discount.shortValue());
                        buyableToUpdate.add(buyable);
                        buyableDiscountHistoryEntityListToAdd.add(
                                BuyableDiscountHistoryEntity.builder()
                                        .buyable(buyable)
                                        .discount(discount.shortValue())
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
        List<PlaceGymEntity> places = placeGymRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            List<BuyableEntity> ActiveBuyablesOfPlace = place.getTicketSubscribes().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
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
        List<PlaceGymEntity> places = placeGymRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<PlaceGymEntity> placeToUpdate = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            if (!place.isAutoDiscount()) {
                place.setAutoDiscount(true);
                placeToUpdate.add(place);
            }
        }
        placeGymRepository.updateAll(placeToUpdate);
        return true;
    }

    @Override
    public Boolean UpdateAutoDiscount() {
        List<PlaceGymEntity> places = placeGymRepository.findAllByStatusAndDeletedIsFalse(PlaceStatusEnum.ACTIVE);
        List<BuyableEntity> buyableToUpdate = new ArrayList<>();
        List<BuyableDiscountHistoryEntity> buyableDiscountHistoryEntityListToAdd = new ArrayList<>();
        for (PlaceGymEntity place : places) {
            if (Math.random() > 0.5) {
                List<BuyableEntity> ActiveBuyablesOfPlace = place.getTicketSubscribes().stream().filter(b -> b.getEnable() && !b.isDeleted()).collect(Collectors.toList());
                for (BuyableEntity buyable : ActiveBuyablesOfPlace) {
                    try {
                        Double discountFee = (buyable.getBeneficiary().getCommissionFee() / 100) * Math.random();
                        BigDecimal beforPrice = buyable.getPrice();
                        BigDecimal newPrice = BigDecimal.valueOf(Math.round((buyable.getPlacePrice().intValue() / 1000) * (1 - discountFee)) * 1000);
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
    public CallListDto getCallList(GetCallListParam param) {

        String token = getByKey("CALL_TOKEN").getValue();
        String url = "https://coreapi.daftareshoma.com/api/Customize/CustomerCallSearch";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);

        HttpEntity<GetCallListParam> requestEntity =
                new HttpEntity<>(param, headers);

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<CallListDto> response = restTemplate.postForEntity(
                    url,
                    requestEntity,
                    CallListDto.class
            );
            List<CallListDataItemDto> resultList = new ArrayList<>();
            CallListDto result = response.getBody();
            result.setData(response.getBody().getData().stream().map(e->{

                try {
                    e.setUser(UserConvertor.toDtoSimple(userService.getByPhoneNumber(e.getFromNumber().replace("+98","0"))));
                }catch (Exception g){}
                resultList.add(e);
                return e;
            }).collect(Collectors.toList()));
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                return response.getBody();
            }

        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public String CallToNumber(CallToNumberParam param) {

        String extension = getByKey("CALL_CALLER_EXTENSION").getValue();
        String fromNumber = getByKey("CALL_CALLER_NUMBER").getValue();
        String token = getByKey("CALL_TOKEN").getValue();
        param.setCaller_extension(extension);
        param.setFrom_number(fromNumber);

        String url = "https://coreapi.daftareshoma.com/api/Customize/OutgoingCall";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);

        HttpEntity<CallToNumberParam> requestEntity =
                new HttpEntity<>(param, headers);

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                return "موفق - " + response.getBody();
            } else {
                return "خطا - وضعیت: " + response.getStatusCode();
            }

        } catch (Exception e) {
            return "ارسال ناموفق: " + e.getMessage();
        }
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
        return entities.stream().filter(o -> !o.isDeleted()).map(SettingsConvertor::toDto).collect(Collectors.toList());
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
