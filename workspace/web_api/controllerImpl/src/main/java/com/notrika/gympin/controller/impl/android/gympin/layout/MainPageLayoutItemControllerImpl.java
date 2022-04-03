package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutItemController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutitem")
public class MainPageLayoutItemControllerImpl implements MainPageLayoutItemController {

    @Autowired
    private MainPageLayoutItemService mainPageLayoutItemService;

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> add(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.add(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> update(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.update(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> delete(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.delete(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<List<MainPageLayoutItemDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<MainPageLayoutItemDto>>(mainPageLayoutItemService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> getById(@RequestBody Long id) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.getById(id), HttpStatus.OK);
    }

}
