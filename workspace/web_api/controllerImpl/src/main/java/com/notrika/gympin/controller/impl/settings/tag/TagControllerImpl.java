package com.notrika.gympin.controller.impl.settings.tag;

import com.notrika.gympin.common.settings.tag.api.TagController;
import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.common.settings.tag.param.TagParam;
import com.notrika.gympin.common.settings.tag.query.TagQuery;
import com.notrika.gympin.common.settings.tag.service.TagService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tag")
public class TagControllerImpl implements TagController {

    @Autowired
    private TagService tagService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<TagDto> add(TagParam param) {
        return ResponseEntity.ok(tagService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<TagDto> update(TagParam param) {
        return ResponseEntity.ok(tagService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<TagDto> delete(TagParam param) {
        return ResponseEntity.ok(tagService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<TagDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(tagService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TagDto> getById(Long id) {
        return ResponseEntity.ok(tagService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TagDto>> query(TagQuery filter) {
        return ResponseEntity.ok(tagService.query(filter));
    }


    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    @PostMapping("addToPlace")
    public ResponseEntity<List<TagDto>> addToPlace(TagParam tagParam) {
        return ResponseEntity.ok(tagService.addToPlace(tagParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    @PostMapping("removeFromPlace")
    public ResponseEntity<List<TagDto>> removeFromPlace(TagParam tagParam) {
        return ResponseEntity.ok(tagService.removeFromPlace(tagParam));
    }

    @Override
    @GetMapping("getPlaceTags")
    public ResponseEntity<List<TagDto>> getPlaceTags(Long placeId) {
        return ResponseEntity.ok(tagService.getPlaceTags(placeId));
    }
}
