package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
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
    private PlaceGymRepository placeGymRepository;


    @Transactional
    public void UpdatePlaceSearchStr() {
        List<PlaceGymEntity> placeEntities = placeGymRepository.findAllByStatusAndDeletedIsFalseAndSearchStrIsNull(PlaceStatusEnum.ACTIVE);
        List<PlaceGymEntity> placesToUpdate = new ArrayList<>();
        for (PlaceGymEntity place : placeEntities) {
            String searchSrt = place.getName();
            searchSrt += " "+place.getAddress();
            searchSrt += " "+place.getLocation().getName();
            searchSrt += " "+place.getActiveTimes();
            searchSrt += " "+ place.getTicketSubscribes().stream().filter(be->!be.isDeleted()).map(BuyableEntity::getName).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getPlaceSport().stream().filter(be->!be.isDeleted()).map(be ->be.getSport().getName()).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getTags().stream().filter(be->!be.isDeleted()).map(ManageTagsEntity::getName).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getOptionsOfPlaces().stream().filter(be->!be.isDeleted()).map(be ->be.getPlaceOption().getName()).collect(Collectors.joining(" "));
            searchSrt += " "+ place.getAboutPlaces().stream().filter(be->!be.isDeleted()).map(be ->be.getName()+" "+be.getDescription()).collect(Collectors.joining(" "));
            searchSrt = searchSrt.replaceAll("null" ,"") ;
            place.setSearchStr(searchSrt);
            placesToUpdate.add(place);
        }
        placeGymRepository.updateAll(placesToUpdate);
    }
}
