package com.notrika.gympin.domain.place.Counseling;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto.CounselingProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.param.CounselingProficienciesParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.service.CounselingProficienciesService;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.CounselingProficienciesConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Counseling.CounselingProficienciesRepository;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingEntity;
import com.notrika.gympin.persistence.entity.place.Counseling.CounselingProficienciesEntity;
import com.notrika.gympin.persistence.entity.place.Counseling.ProficienciesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CounselingProficienciesServiceImpl extends AbstractBaseService<CounselingProficienciesParam, CounselingProficienciesDto, BaseQuery<?>, CounselingProficienciesEntity> implements CounselingProficienciesService {

    @Autowired
    private CounselingServiceImpl counselingService;

    @Autowired
    private ProficienciesServiceImpl proficienciesService;

    @Autowired
    private CounselingProficienciesRepository counselingProficienciesRepository;

    @Override
    public CounselingProficienciesDto add(CounselingProficienciesParam param) {
        CounselingEntity counseling = counselingService.getEntityById(param.getCounseling().getId());
        ProficienciesEntity proficiencies = proficienciesService.getEntityById(param.getProficiencies().getId());
        CounselingProficienciesEntity initPlaceSport = CounselingProficienciesEntity.builder().counseling(counseling).proficiencies(proficiencies).build();
        CounselingProficienciesEntity entity  = add(initPlaceSport);
        return CounselingProficienciesConvertor.toDto(entity);
    }

    @Override
    public CounselingProficienciesEntity add(CounselingProficienciesEntity param) {
        if(getProficienciesByCounseling(param.getCounseling()).stream().filter(o->!o.isDeleted()).anyMatch(o-> Objects.equals(o.getProficiencies().getId(), param.getProficiencies().getId())))
            throw new DuplicateEntryAddExeption();
        return counselingProficienciesRepository.add(param);
    }

    @Override
    public CounselingProficienciesDto update(CounselingProficienciesParam param) {
        CounselingEntity place = counselingService.getEntityById(param.getCounseling().getId());
        ProficienciesEntity proficiencies = proficienciesService.getEntityById(param.getProficiencies().getId());
        CounselingProficienciesEntity initPlaceSport = getEntityById(param.getId());
        initPlaceSport.setCounseling(place);
        initPlaceSport.setProficiencies(proficiencies);
        CounselingProficienciesEntity entity = update(initPlaceSport);
        return CounselingProficienciesConvertor.toDto(entity);
    }

    @Override
    public CounselingProficienciesEntity update(CounselingProficienciesEntity param) {
        return counselingProficienciesRepository.getById(param.getId());
    }

    @Override
    public CounselingProficienciesDto delete(CounselingProficienciesParam param) {
        CounselingProficienciesEntity entity = getEntityById(param.getId());
        CounselingProficienciesEntity deletedPlaceSport = delete(entity);
        return CounselingProficienciesConvertor.toDto(deletedPlaceSport);
    }

    @Override
    public CounselingProficienciesEntity delete(CounselingProficienciesEntity param) {
        return counselingProficienciesRepository.deleteById2(param);
    }

    @Override
    public List<CounselingProficienciesEntity> getAll(Pageable pageable) {
        return counselingProficienciesRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<CounselingProficienciesEntity> findAll(Specification<CounselingProficienciesEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<CounselingProficienciesDto> convertToDtos(List<CounselingProficienciesEntity> entities) {
        return entities.stream().map(CounselingProficienciesConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<CounselingProficienciesDto> convertToDtos(Page<CounselingProficienciesEntity> entities) {
        return null;
    }

    @Override
    public CounselingProficienciesDto getById(long id) {
        CounselingProficienciesEntity param = getEntityById(id);
        return CounselingProficienciesConvertor.toDto(param);
    }

    @Override
    public CounselingProficienciesEntity getEntityById(long id) {
        return counselingProficienciesRepository.getById(id);
    }

    @Override
    public List<CounselingProficienciesDto> getCounselingProficiencies(CounselingParam param) {
        CounselingEntity counseling = CounselingEntity.builder().id(param.getId()).build();
        List<CounselingProficienciesEntity> proficienciesList = getProficienciesByCounseling(counseling);
        return proficienciesList.stream().map(CounselingProficienciesConvertor::toDto).collect(Collectors.toList());
    }

    public List<CounselingProficienciesEntity> getProficienciesByCounseling(CounselingEntity place) {
        return counselingProficienciesRepository.getProficienciesByCounseling(place.getId());
    }

}
