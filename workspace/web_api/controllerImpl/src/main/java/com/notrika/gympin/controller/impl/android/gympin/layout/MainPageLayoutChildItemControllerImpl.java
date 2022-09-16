package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutChildItemController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutChildItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutChildItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutChildItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutchilditem")
public class MainPageLayoutChildItemControllerImpl implements MainPageLayoutChildItemController {

    @Autowired
    private MainPageLayoutChildItemService childItemService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutChildItemDto> add(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return ResponseEntity.ok(childItemService.add(mainPageLayoutChildItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutChildItemDto> update(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return ResponseEntity.ok(childItemService.update(mainPageLayoutChildItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutChildItemDto> delete(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return ResponseEntity.ok(childItemService.delete(mainPageLayoutChildItemParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<MainPageLayoutChildItemDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(childItemService.getAll(pagingParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutChildItemDto> getById(@RequestBody Long id) {
        return ResponseEntity.ok(childItemService.getById(id));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutChildItemDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutChildItemDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
