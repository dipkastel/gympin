package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.StateController;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.StateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/state")
public class StateControllerImpl implements StateController {

    private final StateService stateService;

    public StateControllerImpl(StateService stateService) {
        this.stateService = stateService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<StateDto> add(StateParam stateParam) {
        return new ResponseEntity<StateDto>(stateService.add(stateParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<StateDto> update(StateParam stateParam) {
        return new ResponseEntity<StateDto>(stateService.update(stateParam),HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<StateDto> delete(StateParam stateParam) {
        return new ResponseEntity<StateDto>(stateService.delete(stateParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<StateDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<StateDto>>(stateService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StateDto> getById(long id) {
        return new ResponseEntity<StateDto>(stateService.getById(id),HttpStatus.OK);
    }
}
