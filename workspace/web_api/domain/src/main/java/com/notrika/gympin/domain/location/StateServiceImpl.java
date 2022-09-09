package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.StateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.StateRepository;
import com.notrika.gympin.persistence.entity.location.StateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateServiceImpl extends AbstractBaseService<StateParam, StateDto, BaseFilter<?>, StateEntity> implements StateService {

    @Autowired
    private StateRepository stateRepository;

    @Override
    public StateDto add(StateParam stateParam) {
        StateEntity initState = StateEntity.builder().name(stateParam.getName()).build();
        StateEntity state = add(initState);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public StateEntity add(StateEntity state) {
        return stateRepository.add(state);
    }

    @Override
    public StateDto update(StateParam stateParam) {
        StateEntity initState = getEntityById(stateParam.getId());
        initState.setName(stateParam.getName());
        StateEntity state = update(initState);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public StateEntity update(StateEntity state) {
        return stateRepository.update(state);
    }

    @Override
    public StateDto delete(StateParam stateParam) {
        StateEntity item = getEntityById(stateParam.getId());
        StateEntity deletedState = delete(item);
        return LocationConvertor.stateToStateDto(deletedState);
    }

    @Override
    public StateEntity delete(StateEntity state) {
        return stateRepository.deleteById2(state);
    }

    @Override
    public List<StateEntity> getAll(Pageable pageable) {
        return stateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<StateDto> convertToDtos(List<StateEntity> entities) {
        return LocationConvertor.statesToStateDtos(entities);
    }

    @Override
    public StateDto getById(long id) {
        StateEntity state = getEntityById(id);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public StateEntity getEntityById(long id) {
        return stateRepository.getById(id);
    }
}
