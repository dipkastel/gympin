package com.notrika.gympin.domain.sport;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.sport.service.SportService;
import com.notrika.gympin.domain.multimedia.MultimediaServiceImpl;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.persistence.dao.repository.SportRepository;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.multimedia.SportMultimedia;
import com.notrika.gympin.persistence.entity.sport.Sport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class SportServiceImpl implements SportService {

    @Autowired
    private SportRepository sportRepository;

    @Autowired
    private MultimediaServiceImpl multimediaService;

    @Override
    public SportDto addSport(SportParam sportParam) {
        Sport initSport = Sport.builder().name(sportParam.getName()).launchStatus(sportParam.getLaunchStatus()).build();
        Sport sport = addSport(initSport);
        SportDto sportDto = SportConvertor.sportToSportDto(sport);
        try {
            if (sportParam.getPictureIds() != null && sportParam.getPictureIds().size() > 0) {
                List<Long> logoIds=new ArrayList<>();
                for (Long id : sportParam.getPictureIds()) {
                    Multimedia multimedia = multimediaService.getMultimediaById(id);
                    SportMultimedia sportMultimedia = multimediaService.addMultimediaForSport(sport, multimedia);
                    logoIds.add(sportMultimedia.getMultimedia().getId());
                }
                sportDto.setLogoIds(logoIds);
            }
        }catch (Exception e){
            log.error("Error in saving sport multimedia",e);
        }
        return sportDto;
    }

    public Sport addSport(Sport sport) {
        return sportRepository.add(sport);
    }

    @Override
    public SportDto updateSport(SportParam sportParam) {
        Sport sport1 = getSportById(sportParam.getId());
//        if(sportParam.getPictureId()!=null && sportParam.getPictureId().size()>0){
//            List<SportMultimedia> sportMultimedias = multimediaService.getSportMultimedias(sport1);
//        }

        sport1.setName(sportParam.getName());
        sport1.setLaunchStatus(sportParam.getLaunchStatus());
        Sport sport = updateSport(sport1);
        return SportConvertor.sportToSportDto(sport);
    }

    public Sport updateSport(Sport sport) {
        return sportRepository.update(sport);
    }

    @Override
    public SportDto getSportDtoById(long id) {
        Sport sport = sportRepository.getById(id);
        return SportConvertor.sportToSportDto(sport);
    }

    public Sport getSportById(long id) {
        return sportRepository.getById(id);
    }

    @Override
    public List<SportDto> getAllSportDto() {
        List<Sport> sportList = sportRepository.findAllUndeleted();
        return SportConvertor.sportsToSportDtos(sportList);
    }

    public List<Sport> getAllSport() {
        return sportRepository.findAllUndeleted();
    }

    @Override
    public SportDto deleteSport(SportParam sportParam) {
        Sport sport = getSportById(sportParam.getId());
        Sport deleteSport = sportRepository.deleteById2(sport);
        return SportConvertor.sportToSportDto(deleteSport);
    }

    public Sport deleteSport(Sport sport) {
        Sport deletedSport = sportRepository.deleteById2(sport);
        return deletedSport;
    }

}
