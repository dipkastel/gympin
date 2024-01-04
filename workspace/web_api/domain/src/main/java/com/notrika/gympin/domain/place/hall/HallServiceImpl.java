package com.notrika.gympin.domain.place.hall;

import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.filter.HallFilter;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.hall.service.HallService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.persistence.dao.repository.place.hall.HallRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HallServiceImpl extends AbstractBaseService<HallParam, HallDto, HallFilter, HallEntity> implements HallService {

    @Autowired
    private HallRepository hallRepository;


    @Override
    public HallDto add(@NonNull HallParam hallParam) {
        HallEntity hallEntity = HallConvertor.convertToEntity(hallParam);
        hallEntity = this.hallRepository.add(hallEntity);
        return HallConvertor.convertToDto(hallEntity);
    }

    @Override
    public HallDto update(@NonNull HallParam hallParam) {
        HallEntity hall = getEntityById(hallParam.getId());
        hall.setName(hallParam.getName());
        hall.setEnable(hallParam.getEnable());
        hall.setTrafficManagement(hallParam.getTrafficManagement());
        HallEntity result = update(hall);
        return HallConvertor.convertToDto(result);
    }

    @Override
    public HallDto delete(@NonNull HallParam hallParam) {
        HallEntity hall = getEntityById(hallParam.getId());
        return HallConvertor.convertToDto(hallRepository.deleteById2(hall));
    }

    @Override
    public HallDto getById(long id) {
        HallEntity hallEntity = this.getEntityById(id);
        return HallConvertor.convertToDto(hallEntity);
    }

    @Override
    public HallEntity add(HallEntity entity) {
        HallEntity hallEntity = hallRepository.add(entity);
//        accountingService.add(HallEntity, AccountTopic.PREPAYMENT);
        return hallEntity;
    }

    @Override
    public HallEntity update(HallEntity entity) {
        return hallRepository.update(entity);
    }

    @Override
    public HallEntity delete(HallEntity entity) {
        HallEntity hall = getEntityById(entity.getId());
        return hallRepository.deleteById2(hall);
    }

    @Override
    public HallEntity getEntityById(long id) {
        return hallRepository.getById(id);
    }

    @Override
    public List<HallEntity> getAll(Pageable pageable) {
        return hallRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<HallEntity> findAll(Specification<HallEntity> specification, Pageable pageable) {
        return hallRepository.findAll(specification,pageable);
    }

    @Override
    public List<HallDto> convertToDtos(List<HallEntity> entities) {
        return entities.stream().map(HallConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Page<HallDto> convertToDtos(Page<HallEntity> entities) {
        return null;
    }

    @Override
    public List<ActiveTimesDto> getActions(HallParam hall) {
        return null;
    }


    @Override
    public List<HallDto> getHallsByPlace(PlaceParam place) {
        return hallRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(HallConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<HallDto> getHallsBySport(SportParam sport) {
        return hallRepository.findAllBySportAndDeletedIsFalse(SportEntity.builder().id(sport.getId()).build()).stream().map(HallConvertor::convertToDto).collect(Collectors.toList());
    }


    public List<HallEntity> getHallsByOwner(UserEntity owner) {
        return hallRepository.findAllByOwnerAndDeletedIsFalse(owner);
    }

}
