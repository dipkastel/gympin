package com.notrika.gympin.domain.sport;

import com.notrika.gympin.common.primitive.param.LongParam;
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
        Sport initSport=Sport.builder().name(sportParam.getName()).build();
        Sport sport = sportRepository.add(initSport);
        return SportConvertor.sportToSportDto(sport);
    }

    @Override
    public SportDto updateSport(SportParam sportParam) {
        Sport initSport=Sport.builder().name(sportParam.getName()).build();
        Sport sport = sportRepository.update(initSport);
        return SportConvertor.sportToSportDto(sport);
    }

    @Override
    public SportDto getSportById(LongParam id) {
        Sport sport = sportRepository.getById(id.getValue());
        return SportConvertor.sportToSportDto(sport);
    }

    @Override
    public List<SportDto> getAllSport() {
        List<Sport> sportList = sportRepository.findAll();
        return SportConvertor.sportsToSportDtos(sportList);
    }

    @Override
    public void deleteSport(SportParam sportParam) {
        Sport sport = sportRepository.getById(sportParam.getId());
        sportRepository.deleteById2(sport);
    }
}
