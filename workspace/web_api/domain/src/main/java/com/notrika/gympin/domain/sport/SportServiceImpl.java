package com.notrika.gympin.domain.sport;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.sport.service.SportService;
import com.notrika.gympin.dao.sport.Sport;
import com.notrika.gympin.domain.util.convertor.SportConvertor;
import com.notrika.gympin.persistence.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportServiceImpl implements SportService {

    @Autowired
    private SportRepository sportRepository;

    @Override
    public SportDto addSport(SportParam sportParam) {
        Sport initSport = Sport.builder().name(sportParam.getName()).build();
        Sport sport = addSport(initSport);
        return SportConvertor.sportToSportDto(sport);
    }

    public Sport addSport(Sport sport) {
        return sportRepository.add(sport);
    }

    @Override
    public SportDto updateSport(SportParam sportParam) {
        Sport initSport = Sport.builder().name(sportParam.getName()).build();
        Sport sport = sportRepository.update(initSport);
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
        List<Sport> sportList = sportRepository.findAll();
        return SportConvertor.sportsToSportDtos(sportList);
    }

    public List<Sport> getAllSport() {
        return sportRepository.findAll();
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
