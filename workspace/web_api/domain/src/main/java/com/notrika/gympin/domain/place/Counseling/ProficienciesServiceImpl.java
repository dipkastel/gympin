package com.notrika.gympin.domain.place.Counseling;

import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.param.ProficienciesParam;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.query.ProficienciesQuery;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.service.ProficienciesService;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ProficienciesConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Counseling.ProficienciesRepository;
import com.notrika.gympin.persistence.entity.place.Counseling.ProficienciesEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProficienciesServiceImpl extends AbstractBaseService<ProficienciesParam, ProficienciesDto, ProficienciesQuery, ProficienciesEntity> implements ProficienciesService {

    @Autowired
    private ProficienciesRepository proficienciesRepository;

    @Override
    public ProficienciesDto add(ProficienciesParam Param) {
        ProficienciesEntity initSport = ProficienciesEntity.builder().name(Param.getName()).build();
        ProficienciesEntity proficiencies = add(initSport);
        ProficienciesDto proficienciesDto = ProficienciesConvertor.toDto(proficiencies);
        return proficienciesDto;
    }

    @Override
    public ProficienciesEntity add(ProficienciesEntity sport) {
        return proficienciesRepository.add(sport);
    }

    @Override
    public ProficienciesDto update(ProficienciesParam sportParam) {
        ProficienciesEntity sport1 = getEntityById(sportParam.getId());
        sport1.setName(sportParam.getName());
        ProficienciesEntity sport = update(sport1);
        return ProficienciesConvertor.toDto(sport);
    }

    @Override
    public ProficienciesEntity update(ProficienciesEntity sport) {
        return proficienciesRepository.update(sport);
    }

    @Override
    public ProficienciesDto getById(long id) {
        ProficienciesEntity proficiencies = proficienciesRepository.getById(id);
        return ProficienciesConvertor.toDto(proficiencies);
    }

    @Override
    public ProficienciesEntity getEntityById(long id) {
        return proficienciesRepository.getById(id);
    }

    @Override
    public List<ProficienciesEntity> getAll(Pageable pageable) {
        return proficienciesRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ProficienciesEntity> findAll(Specification<ProficienciesEntity> specification, Pageable pageable) {
        return proficienciesRepository.findAll(specification, pageable);
    }

    @Override
    public List<ProficienciesDto> convertToDtos(List<ProficienciesEntity> entities) {
        return entities.stream().map(ProficienciesConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ProficienciesDto> convertToDtos(Page<ProficienciesEntity> entities) {
        return entities.map(ProficienciesConvertor::toDto);
    }

    @Override
    public ProficienciesDto delete(ProficienciesParam sportParam) {
        ProficienciesEntity proficiencies = getEntityById(sportParam.getId());
        ProficienciesEntity delete = delete(proficiencies);
        return ProficienciesConvertor.toDto(delete);
    }

    @Override
    public ProficienciesEntity delete(ProficienciesEntity sport) {
        return proficienciesRepository.deleteById2(sport);
    }

}
