package com.notrika.gympin.domain.option.place;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.dao.option.place.PlaceOption;
import com.notrika.gympin.persistence.repository.PlaceOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceOptionServiceImpl implements PlaceOptionService {

    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    public PlaceOptionDto addPlaceOption(PlaceOptionParam placeOptionParam) {
        PlaceOption placeOption = placeOptionRepository.save(PlaceOption.builder().name(placeOptionParam.getName()).build());
        return PlaceOptionDto.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOptionParam.getName()).build();
    }
}
