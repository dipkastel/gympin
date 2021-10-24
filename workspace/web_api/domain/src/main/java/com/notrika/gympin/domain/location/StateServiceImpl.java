package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.StateService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.StateRepository;
import com.notrika.gympin.persistence.entity.location.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateServiceImpl implements StateService {

    @Autowired
    private StateRepository stateRepository;

    @Override
    public StateDto add(StateParam stateParam) {
        State initState = State.builder().name(stateParam.getName()).build();
        State state = addState(initState);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }

    public State addState(State state) {
        return stateRepository.add(state);
    }

    @Override
    public StateDto update(StateParam stateParam) {
        State initState = getStateById(stateParam.getId());
        initState.setName(stateParam.getName());
        State state = updateState(initState);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }

    public State updateState(State state) {
        return stateRepository.update(state);
    }

    @Override
    public StateDto delete(StateParam stateParam) {
        State item = getStateById(stateParam.getId());
        State deletedState = deleteState(item);
        return LocationConvertor.stateToStateDto(deletedState, LocationConvertor.CollectionType.LIST);
    }

    public State deleteState(State state) {
        State deletedState = stateRepository.deleteById2(state);
        return deletedState;
    }

    @Override
    public List<StateDto> getAll() {
        List<State> stateList = getAllState();
        return (List<StateDto>) LocationConvertor.statesToStateDtos(stateList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);

    }

    public List<State> getAllState() {
        return stateRepository.findAllUndeleted();
    }

    @Override
    public StateDto getById(long id) {
        State state = getStateById(id);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }

    public State getStateById(long id) {
        return stateRepository.getById(id);
    }
}
