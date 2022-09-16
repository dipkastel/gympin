package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutItemController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutitem")
public class MainPageLayoutItemControllerImpl implements MainPageLayoutItemController {

    @Autowired
    private MainPageLayoutItemService mainPageLayoutItemService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> add(MainPageLayoutItemParam mainPageLayoutItemParam) {
        return ResponseEntity.ok(mainPageLayoutItemService.add(mainPageLayoutItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> update(MainPageLayoutItemParam mainPageLayoutItemParam) {
        return ResponseEntity.ok(mainPageLayoutItemService.update(mainPageLayoutItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> delete(MainPageLayoutItemParam mainPageLayoutItemParam) {
        return ResponseEntity.ok(mainPageLayoutItemService.delete(mainPageLayoutItemParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<MainPageLayoutItemDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(mainPageLayoutItemService.getAll(pagingParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutItemDto> getById(Long id) {
        return ResponseEntity.ok(mainPageLayoutItemService.getById(id));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutItemDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutItemDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
