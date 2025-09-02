package com.notrika.gympin.controller.impl.settings.link;

import com.notrika.gympin.common.settings.links.api.LinkController;
import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.common.settings.links.param.LinkParam;
import com.notrika.gympin.common.settings.links.query.LinkQuery;
import com.notrika.gympin.common.settings.links.service.LinkService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/link")
public class LinkControllerImpl implements LinkController {

    @Autowired
    LinkService linkService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LinkDto> add(LinkParam param) {
        return ResponseEntity.ok(linkService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LinkDto> update(LinkParam param) {
        return ResponseEntity.ok(linkService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LinkDto> delete(LinkParam param) {
        return ResponseEntity.ok(linkService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<LinkDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(linkService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<LinkDto> getById(Long id) {
        return ResponseEntity.ok(linkService.getById(id));
    }

    @Override
    public ResponseEntity<Page<LinkDto>> query(LinkQuery param) {
        return ResponseEntity.ok(linkService.query(param));
    }

    @Override
    @GetMapping("getByCode")
    public ResponseEntity<LinkDto> getByCode(String code) {
        return ResponseEntity.ok(linkService.getByCode(code));
    }
}
