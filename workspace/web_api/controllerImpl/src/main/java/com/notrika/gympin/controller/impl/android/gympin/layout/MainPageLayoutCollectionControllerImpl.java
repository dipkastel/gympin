package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutCollectionController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutcollection")
public class MainPageLayoutCollectionControllerImpl implements MainPageLayoutCollectionController {

    @Autowired
    private MainPageLayoutCollectionService collectionService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> add(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return ResponseEntity.ok(collectionService.add(mainPageLayoutCollectionParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> update(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return ResponseEntity.ok(collectionService.update(mainPageLayoutCollectionParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> delete(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return ResponseEntity.ok(collectionService.delete(mainPageLayoutCollectionParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<MainPageLayoutCollectionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(collectionService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> getById(Long id) {
        return ResponseEntity.ok(collectionService.getById(id));
    }

    @Override
    @GetMapping("/mainPage")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<List<MainPageLayoutItemDto>> mainPage(Long id) {
        return ResponseEntity.ok(collectionService.mainPage(id));
    }

    @Override
    public ResponseEntity<Long> countSearch() {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutCollectionDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<MainPageLayoutCollectionDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
