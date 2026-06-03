package com.notrika.gympin.controller.impl.pages;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.pages.api.PagesController;
import com.notrika.gympin.common.pages.dto.PagesDeadendDto;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
import com.notrika.gympin.common.pages.query.PagesQuery;
import com.notrika.gympin.common.pages.service.PagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pages")
public class PagesControllerImpl implements PagesController {

    @Autowired
    private PagesService pageService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<PagesDeadendDto> add(PagesItemParam pagesItemParam) {
        return ResponseEntity.ok(pageService.add(pagesItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<PagesDeadendDto> update(PagesItemParam pagesItemParam) {
        return ResponseEntity.ok(pageService.update(pagesItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<PagesDeadendDto> delete(PagesItemParam pagesItemParam) {
        return ResponseEntity.ok(pageService.delete(pagesItemParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<PagesDeadendDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(pageService.getAll(pagingParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<PagesDeadendDto> getById(Long id) {
        return ResponseEntity.ok(pageService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PagesDeadendDto>> query(PagesQuery filter) {
        return new ResponseEntity<>(pageService.query(filter), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getHome")
    public ResponseEntity<List<PagesItemDto>> getHome(String SettingKey,Long PageId) {
        return ResponseEntity.ok(pageService.getHomeBySettingKeyOrPageId(SettingKey,PageId));
    }

    @Override
    @GetMapping("/getPageByData")
    public ResponseEntity<List<PagesItemDto>> getPageByData(String Data) {
        return ResponseEntity.ok(pageService.getPageByPageData(Data));
    }

    @Override
    @GetMapping("/clearCash")
    public ResponseEntity<Void> clearCash() {
        return ResponseEntity.ok(pageService.clearCash());
    }

    @Override
    @PutMapping("/updatePriority")
    public ResponseEntity<PagesDeadendDto> updatePriority(PagesItemParam pagesParam){
        return ResponseEntity.ok(pageService.updatePriority(pagesParam));
    }

    //type
    @Override
    @GetMapping("/getAllTypes")
    public ResponseEntity<List<PagesTypeDto>> getAllTypes(Pageable pageable) {
        return ResponseEntity.ok(pageService.getAllTypes(pageable));
    }

    @Override
    @PostMapping("/addType")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PagesTypeDto> addType(PagesTypeParam param) {
        return ResponseEntity.ok(pageService.addType(param));
    }


    @Override
    @PutMapping("/updateType")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PagesTypeDto> UpdateType(PagesTypeParam param) {
        return ResponseEntity.ok(pageService.UpdateType(param));
    }


    @Override
    @PutMapping("/deleteType")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PagesTypeDto> deleteType(@RequestBody PagesTypeParam param) {
        return ResponseEntity.ok(pageService.deleteType(param));
    }

}
