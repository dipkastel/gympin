package com.notrika.gympin.controller.impl.article;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.article.dto.ArticleCategoryDto;
import com.notrika.gympin.common.article.param.ArticleCategoryParam;
import com.notrika.gympin.common.article.service.ArticleCategoryService;
import com.notrika.gympin.common.article.api.ArticleCategoryController;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/articleCategory")
public class ArticleCategoryControllerImpl implements ArticleCategoryController {

    @Autowired
    private ArticleCategoryService articleCategoryService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER')")
    public ResponseEntity<ArticleCategoryDto> add( ArticleCategoryParam param) {
        return new ResponseEntity<>(articleCategoryService.add(param), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER')")
    public ResponseEntity<ArticleCategoryDto> update( ArticleCategoryParam param) {
        return new ResponseEntity<>(articleCategoryService.update(param), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ArticleCategoryDto> delete( ArticleCategoryParam param) {
        return new ResponseEntity<>(articleCategoryService.delete(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ArticleCategoryDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(articleCategoryService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ArticleCategoryDto> getById(Long id) {
        return new ResponseEntity<>(articleCategoryService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<ArticleCategoryDto>> query(BaseQuery<?> filter) {
        throw new FunctionNotAvalable();
    }

}
