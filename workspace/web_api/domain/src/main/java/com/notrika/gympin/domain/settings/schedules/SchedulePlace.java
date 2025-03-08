package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.domain.settings.sms.SmsInServiceImpl;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchedulePlace {

    @Autowired
    private PlaceRepository placeRepository;


    @Transactional
    public void UpdatePlaceSearchStr() {
        List<PlaceEntity> placeEntities = placeRepository.findAllByStatusAndDeletedIsFalseAndSearchStrIsNull(PlaceStatusEnum.ACTIVE);
        List<PlaceEntity> placesToUpdate = new ArrayList<>();
        for (PlaceEntity place : placeEntities) {
            String searchSrt = place.getName();
            searchSrt += " "+place.getAddress();
            searchSrt += " "+place.getLocation().getName();
            searchSrt += " "+place.getActiveTimes();
            searchSrt += " "+ place.getBuyables().stream().filter(be->!be.isDeleted()).map(BuyableEntity::getName).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getPlaceSport().stream().filter(be->!be.isDeleted()).map(be ->be.getSport().getName()).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getTags().stream().filter(be->!be.isDeleted()).map(ManageTagsEntity::getName).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getOptionsOfPlaces().stream().filter(be->!be.isDeleted()).map(be ->be.getPlaceOption().getName()).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getAboutPlaces().stream().filter(be->!be.isDeleted()).map(be ->be.getName()+" "+be.getDescription()).collect(Collectors.joining(" "));
            searchSrt = searchSrt.replaceAll("null" ,"") ;
            place.setSearchStr(searchSrt);
            placesToUpdate.add(place);
        }
        placeRepository.updateAll(placesToUpdate);
    }
}
