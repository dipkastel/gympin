package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.user.api.AdministratorController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/administrator")
public class AdministratorControllerImpl implements AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<UserDto> add(UserParam administratorParam) {
        return ResponseEntity.ok(administratorService.add(administratorParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<UserDto> update(UserParam administratorParam) {
        return ResponseEntity.ok(administratorService.update(administratorParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<UserDto> delete(UserParam administratorParam) {
        return ResponseEntity.ok(administratorService.delete(administratorParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<UserDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(administratorService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<UserDto> getById(Long id) {
        return ResponseEntity.ok(administratorService.getById(id));
    }

    @Override
    public ResponseEntity<Long> countSearch() {
        return null;
    }

    @Override
    public ResponseEntity<List<UserDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
