package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.StateService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.StateRepository;
import com.notrika.gympin.persistence.entity.location.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateServiceImpl extends AbstractBaseService<StateParam, StateDto, BaseFilter<?>, State> implements StateService {

    @Autowired
    private StateRepository stateRepository;

    @Override
    public StateDto add(StateParam stateParam) {
        State initState = State.builder().name(stateParam.getName()).build();
        State state = add(initState);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public State add(State state) {
        return stateRepository.add(state);
    }

    @Override
    public StateDto update(StateParam stateParam) {
        State initState = getEntityById(stateParam.getId());
        initState.setName(stateParam.getName());
        State state = update(initState);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public State update(State state) {
        return stateRepository.update(state);
    }

    @Override
    public StateDto delete(StateParam stateParam) {
        State item = getEntityById(stateParam.getId());
        State deletedState = delete(item);
        return LocationConvertor.stateToStateDto(deletedState);
    }

    @Override
    public State delete(State state) {
        return stateRepository.deleteById2(state);
    }

    @Override
    public List<State> getAll(Pageable pageable) {
        return stateRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<StateDto> convertToDtos(List<State> entities) {
        return LocationConvertor.statesToStateDtos(entities);
    }

    @Override
    public StateDto getById(long id) {
        State state = getEntityById(id);
        return LocationConvertor.stateToStateDto(state);
    }

    @Override
    public State getEntityById(long id) {
        return stateRepository.getById(id);
    }
}
