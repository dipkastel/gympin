package com.notrika.gympin.domain.sport;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.sport.service.SportService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.multimedia.MultimediaServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.persistence.dao.repository.SportRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.multimedia.SportMultimediaEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class SportServiceImpl extends AbstractBaseService<SportParam, SportDto, BaseFilter<?>, SportEntity> implements SportService {

    @Autowired
    private SportRepository sportRepository;

    @Autowired
    private MultimediaServiceImpl multimediaService;

    @Override
    public SportDto add(SportParam sportParam) {
        SportEntity initSport = SportEntity.builder().name(sportParam.getName()).launchStatus(sportParam.getLaunchStatus()).build();
        SportEntity sport = add(initSport);
        SportDto sportDto = SportConvertor.sportToSportDto(sport);
        try {
            if (sportParam.getPictureIds() != null && sportParam.getPictureIds().size() > 0) {
                List<Long> logoIds = new ArrayList<>();
                for (Long id : sportParam.getPictureIds()) {
                    MultimediaEntity multimedia = multimediaService.getMultimediaById(id);
                    SportMultimediaEntity sportMultimedia = multimediaService.addMultimediaForSport(sport, multimedia);
                    logoIds.add(sportMultimedia.getMultimedia().getId());
                }
                sportDto.setLogoIds(logoIds);
            }
        } catch (Exception e) {
            log.error("Error in saving sport multimedia", e);
        }
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
        return SportConvertor.sportToSportDto(sport);
    }

    @Override
    public SportEntity update(SportEntity sport) {
        return sportRepository.update(sport);
    }

    @Override
    public SportDto getById(long id) {
        SportEntity sport = sportRepository.getById(id);
        return SportConvertor.sportToSportDto(sport);
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
    public List<SportDto> convertToDtos(List<SportEntity> entities) {
        return SportConvertor.sportsToSportDtos(entities);
    }

    @Override
    public SportDto delete(SportParam sportParam) {
        SportEntity sport = getEntityById(sportParam.getId());
        SportEntity deleteSport = delete(sport);
        return SportConvertor.sportToSportDto(deleteSport);
    }

    @Override
    public SportEntity delete(SportEntity sport) {
        return sportRepository.deleteById2(sport);
    }

    @Override
    public List<MultimediaDto> getSportMultimedia(SportParam sportParam) {
        List<MultimediaDto> multimediaDtoLis = new ArrayList<>();
        List<SportMultimediaEntity> sportMultimedias = multimediaService.getSportMultimedias(SportEntity.builder().id(sportParam.getId()).build());
        for (SportMultimediaEntity sportMultimedia : sportMultimedias) {
            multimediaDtoLis.add(MultimediaDto.builder().id(sportMultimedia.getMultimedia().getId()).name(sportMultimedia.getMultimedia().getTitle()).build());
        }
        return multimediaDtoLis;
    }
}
