package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutCollectionController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutcollection")
public class MainPageLayoutCollectionControllerImpl implements MainPageLayoutCollectionController {

    @Autowired
    private MainPageLayoutCollectionService collectionService;

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> add(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.add(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> update(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.update(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> delete(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.delete(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<List<MainPageLayoutCollectionDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(collectionService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<MainPageLayoutCollectionDto> getById(@RequestBody long id) {
        return new ResponseEntity<>(collectionService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("/mainpage")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<List<MainPageLayoutItemDto>> mainPage(Long id) {
        return new ResponseEntity<List<MainPageLayoutItemDto>>(collectionService.mainPage(id), HttpStatus.OK);
    }
}
