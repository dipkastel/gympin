package com.notrika.gympin.domain.place.hall;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.hall.param.HallTrafficParam;
import com.notrika.gympin.common.place.hall.service.HallTrafficService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.persistence.dao.repository.place.hall.HallRepository;
import com.notrika.gympin.persistence.dao.repository.place.hall.HallTrafficRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallTrafficEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HallTrafficServiceImpl extends AbstractBaseService<HallTrafficParam, HallTrafficDto, BaseQuery<?>, HallTrafficEntity> implements HallTrafficService {

    @Autowired
    HallTrafficRepository hallTrafficRepository;
    @Autowired
    HallRepository hallRepository;

    @Override
    public HallTrafficDto add(@NonNull HallTrafficParam hallTrafficParam) {
        HallEntity hall = hallRepository.getById(hallTrafficParam.getHall().getId());
        HallTrafficEntity hallTrafficEntity = HallTrafficEntity.builder()
                .traffic(hallTrafficParam.getTraffic())
                .build();
        return HallConvertor.convertToHallTrafficDto(hallTrafficRepository.add(hallTrafficEntity));
    }

    @Override
    public HallTrafficEntity add(HallTrafficEntity entity) {
        return hallTrafficRepository.add(entity);
    }


    @Override
    public HallTrafficDto update(@NonNull HallTrafficParam hallTrafficParam) {
        HallTrafficEntity hallTrafficEntity = hallTrafficRepository.getById(hallTrafficParam.getId());
        hallTrafficEntity.setTraffic(hallTrafficParam.getTraffic());
        return HallConvertor.convertToHallTrafficDto(hallTrafficRepository.update(hallTrafficEntity));
    }

    @Override
    public HallTrafficEntity update(HallTrafficEntity entity) {
        HallTrafficEntity hallTrafficEntity = hallTrafficRepository.getById(entity.getId());
        hallTrafficEntity.setTraffic(entity.getTraffic());
        return hallTrafficRepository.update(hallTrafficEntity);
    }


    @Override
    public HallTrafficDto delete(@NonNull HallTrafficParam hallTrafficParam) {
        HallTrafficEntity entity = hallTrafficRepository.getById(hallTrafficParam.getId());
        return HallConvertor.convertToHallTrafficDto(hallTrafficRepository.deleteById2(entity));
    }
    @Override
    public HallTrafficEntity delete(HallTrafficEntity entity) {
        return hallTrafficRepository.deleteById2(entity);
    }

    @Override
    public HallTrafficDto getById(long id) {
        return HallConvertor.convertToHallTrafficDto(hallTrafficRepository.getById(id));
    }

    @Override
    public HallTrafficEntity getEntityById(long id) {
        return hallTrafficRepository.getById(id);
    }

    @Override
    public List<HallTrafficEntity> getAll(Pageable pagingParam) {
        return hallTrafficRepository.findAllUndeleted(pagingParam);
    }

    @Override
    public Page<HallTrafficEntity> findAll(Specification<HallTrafficEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<HallTrafficDto> convertToDtos(List<HallTrafficEntity> entities) {
        return entities.stream().map(HallConvertor::convertToHallTrafficDto).collect(Collectors.toList());
    }

    @Override
    public Page<HallTrafficDto> convertToDtos(Page<HallTrafficEntity> entities) {
        return null;
    }

    @Override
    public HallTrafficDto getLatestByHallId(Long id) {
        return HallConvertor.convertToHallTrafficDto(hallTrafficRepository.findTopByHallIdAndDeletedFalseOrderByIdDesc(id));
    }
}
