package com.notrika.gympin.domain.place.Gym;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.place.placeGym.sport.param.SportParam;
import com.notrika.gympin.common.place.placeGym.sport.query.SportQuery;
import com.notrika.gympin.common.place.placeGym.sport.service.SportService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.multimedia.MultimediaServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Gym.SportRepository;
import com.notrika.gympin.persistence.entity.place.Gym.SportEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SportServiceImpl extends AbstractBaseService<SportParam, SportDto, SportQuery, SportEntity> implements SportService {

    @Autowired
    private SportRepository sportRepository;

    @Autowired
    private MultimediaServiceImpl multimediaService;

    @Override
    public SportDto add(SportParam sportParam) {
        SportEntity initSport = SportEntity.builder().name(sportParam.getName()).launchStatus(sportParam.getLaunchStatus()).build();
        SportEntity sport = add(initSport);
        SportDto sportDto = SportConvertor.toDto(sport);
        return sportDto;
    }

    @Override
    public SportEntity add(SportEntity sport) {
        return sportRepository.add(sport);
    }

    @Override
    public SportDto update(SportParam sportParam) {
        SportEntity sport1 = getEntityById(sportParam.getId());
        sport1.setName(sportParam.getName());
        sport1.setLaunchStatus(sportParam.getLaunchStatus());
        SportEntity sport = update(sport1);
        return SportConvertor.toDto(sport);
    }

    @Override
    public SportEntity update(SportEntity sport) {
        return sportRepository.update(sport);
    }

    @Override
    public SportDto getById(long id) {
        SportEntity sport = sportRepository.getById(id);
        return SportConvertor.toDto(sport);
    }

    @Override
    public SportEntity getEntityById(long id) {
        return sportRepository.getById(id);
    }

    @Override
    public List<SportEntity> getAll(Pageable pageable) {
        return sportRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<SportEntity> findAll(Specification<SportEntity> specification, Pageable pageable) {
        return sportRepository.findAll(specification,pageable);
    }

    @Override
    public List<SportDto> convertToDtos(List<SportEntity> entities) {
        return SportConvertor.toDto(entities);
    }

    @Override
    public Page<SportDto> convertToDtos(Page<SportEntity> entities) {
        return SportConvertor.toDto(entities);
    }

    @Override
    public SportDto delete(SportParam sportParam) {
        SportEntity sport = getEntityById(sportParam.getId());
        SportEntity deleteSport = delete(sport);
        return SportConvertor.toDto(deleteSport);
    }

    @Override
    public SportEntity delete(SportEntity sport) {
        return sportRepository.deleteById2(sport);
    }

    @Override
    public Long getCount(BaseQuery<?> filter) {
        return sportRepository.findFilterdCount(filter);
    }
}
