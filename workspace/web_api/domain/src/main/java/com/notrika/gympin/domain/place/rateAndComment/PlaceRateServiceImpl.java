package com.notrika.gympin.domain.place.rateAndComment;

import com.notrika.gympin.common.place.placeBase.query.PlaceRateQuery;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.placeBase.dto.PlaceRateDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceRateParam;
import com.notrika.gympin.common.place.placeBase.service.PlaceRateService;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.util.exception.user.UserAlreadyRatedThisPlaceException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceRateAndCommentConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCommentRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRateRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.rateAndComment.PlaceRateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaceRateServiceImpl extends AbstractBaseService<PlaceRateParam, PlaceRateDto, PlaceRateQuery, PlaceRateEntity> implements PlaceRateService {


    @Autowired
    PlaceRateRepository placeRateRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public PlaceRateDto add(@NonNull PlaceRateParam param) {
        if(param.getUserId()==null)
            throw new UnknownUserException();
        if(param.getPlaceId()==null)
            throw new UnsupportedOperationException();
        PlaceEntity place = placeRepository.getById(param.getPlaceId());
        UserEntity user = userRepository.getById(param.getUserId());
        PlaceRateEntity lastUserRate =  placeRateRepository.findByDeletedIsFalseAndPlaceIdAndUserId(param.getPlaceId(),param.getUserId());
        if(lastUserRate!=null)
            throw new UserAlreadyRatedThisPlaceException();
        updatePlaceRate(place,param.getRate());
        PlaceRateEntity rate = placeRateRepository.add(PlaceRateEntity.builder()
                .rate(param.getRate())
                .place(place)
                .user(user)
                .build());
        return PlaceRateAndCommentConvertor.toDto(rate);
    }
    @Override
    public PlaceRateDto update(@NonNull PlaceRateParam ratePlaceParam) {
        return null;
    }

    @Override
    public PlaceRateDto delete(@NonNull PlaceRateParam ratePlaceParam) {
        return null;
    }

    @Override
    public PlaceRateDto getById(long id) {
        return null;
    }

    @Override
    public PlaceRateEntity add(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity update(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity delete(PlaceRateEntity entity) {
        return null;
    }

    @Override
    public PlaceRateEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<PlaceRateEntity> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<PlaceRateEntity> findAll(Specification<PlaceRateEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceRateDto> convertToDtos(List<PlaceRateEntity> entities) {
        return null;
    }

    @Override
    public Page<PlaceRateDto> convertToDtos(Page<PlaceRateEntity> entities) {
        return null;
    }

    private Double updatePlaceRate(PlaceEntity place,Double newRate){
        try{
            List<PlaceRateEntity> rates = place.getPlaceRates();
            if(rates == null)
                rates = new ArrayList<>();
            rates.add(PlaceRateEntity.builder().rate(newRate).build());
            Double rate = rates.stream().mapToDouble(r->r.getRate().doubleValue()).average().getAsDouble();
            place.setRate(rate);
            placeRepository.update(place);
            return rate;
        }catch (Exception e){
            return 0.0;
        }
    }
}
