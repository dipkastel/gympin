package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.accounting.account.enums.AccountTopic;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.dto.GateTimingDto;
import com.notrika.gympin.common.location.filter.GateFilter;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.service.GateService;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.accounting.AccountingServiceImpl;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.domain.util.convertor.searchfilter.GateFilterConvertor;
import com.notrika.gympin.persistence.dao.repository.GateRepository;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GateServiceImpl extends AbstractBaseService<GateParam, GateDto, GateFilter, GateEntity> implements GateService {

    @Autowired
    private GateRepository gateRepository;

    @Autowired
    private AccountingServiceImpl accountingService;

    @Override
    public GateDto add(@NonNull GateParam gateParam) {
        GateEntity gateEntity = GateConvertor.convertToEntity(gateParam);
        gateEntity = this.gateRepository.add(gateEntity);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateDto update(@NonNull GateParam gateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public GateDto delete(@NonNull GateParam gateParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public GateDto getById(long id) {
        GateEntity gateEntity = this.getEntityById(id);
        return GateConvertor.convertToDto(gateEntity);
    }

    @Override
    public GateEntity add(GateEntity entity) {
        GateEntity gateEntity = gateRepository.add(entity);
        accountingService.add(gateEntity, AccountTopic.PREPAYMENT);
        return gateEntity;
    }

    @Override
    public GateEntity update(GateEntity entity) {
        return gateRepository.update(entity);
    }

    @Override
    public GateEntity delete(GateEntity entity) {
        return gateRepository.deleteById2(entity);
    }

    @Override
    public GateEntity getEntityById(long id) {
        return gateRepository.getById(id);
    }

    @Override
    public List<GateEntity> getAll(Pageable pageable) {
        return gateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<GateDto> convertToDtos(List<GateEntity> entities) {
        return entities.stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<GateTimingDto> getGateTimings(GateParam gate) {
        return null;
    }

    @Override
    public List<GateDto> search(GateFilter filter) {
        Specification<GateEntity> clause = createSearchSpecification(filter);
        return gateRepository.findAll(clause).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Long countSearch(GateFilter filter) {
        Specification<GateEntity> clause = createSearchSpecification(filter);
        return gateRepository.count(clause);
    }

    private Specification<GateEntity> createSearchSpecification(GateFilter filter) {
        Specification<GateEntity> clause = null;
        List<SearchCriteria> searchCriteriaList = GateFilterConvertor.convertToGateFilter(filter);
        if (!searchCriteriaList.isEmpty()) {
            GateEntity specification = new GateEntity();
            specification.setCriteria(searchCriteriaList.get(0));
            clause = Specification.where(specification);
        }
        for (int i = 1; i < searchCriteriaList.size(); i++) {
            GateEntity specification = new GateEntity();
            specification.setCriteria(searchCriteriaList.get(i));
            clause.and(specification);
        }
        return clause;
    }

    @Override
    public Long countFilter(GateFilter filter) {
        Specification<GateEntity> clause = createSearchSpecification(filter);
        return gateRepository.count(clause);
    }

    @Override
    public List<GateDto> filter(GateFilter filter) {
        Specification<GateEntity> clause = createSearchSpecification(filter);
        return gateRepository.findAll(clause).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    private Specification<GateEntity> createFilterSpecification(GateFilter filter) {
        Specification<GateEntity> clause = null;
        List<SearchCriteria> searchCriteriaList = GateFilterConvertor.convertToGateFilter(filter);
        if (!searchCriteriaList.isEmpty()) {
            GateEntity specification = new GateEntity();
            specification.setCriteria(searchCriteriaList.get(0));
            clause = Specification.where(specification);
        }
        for (int i = 1; i < searchCriteriaList.size(); i++) {
            GateEntity specification = new GateEntity();
            specification.setCriteria(searchCriteriaList.get(i));
            clause.or(specification);
        }
        return clause;
    }

    @Override
    public List<GateDto> getGatesByPlace(PlaceParam place) {
        return gateRepository.findAllByPlaceAndDeletedIsFalse(PlaceEntity.builder().id(place.getId()).build()).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<GateDto> getGatesBySport(SportParam sport) {
        return gateRepository.findAllBySportAndDeletedIsFalse(SportEntity.builder().id(sport.getId()).build()).stream().map(GateConvertor::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<GateDto> getGatesByOwner(UserParam owner) {
        return null;
    }

    @Override
    public List<GateDto> getGatesByGuard(UserParam guard) {
        return null;
    }
}
