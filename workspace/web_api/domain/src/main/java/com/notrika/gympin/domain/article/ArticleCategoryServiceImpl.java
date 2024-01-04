package com.notrika.gympin.domain.article;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.article.dto.ArticleCategoryDto;
import com.notrika.gympin.common.article.param.ArticleCategoryParam;
import com.notrika.gympin.common.article.service.ArticleCategoryService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ArticleConvertor;
import com.notrika.gympin.persistence.dao.repository.article.ArticleCategoryRepository;
import com.notrika.gympin.persistence.entity.article.ArticleCategoryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleCategoryServiceImpl extends AbstractBaseService<ArticleCategoryParam, ArticleCategoryDto, BaseQuery<?>, ArticleCategoryEntity> implements ArticleCategoryService {

    @Autowired
    private ArticleCategoryRepository articleCategoryRepository;

    @Override
    public ArticleCategoryDto add(ArticleCategoryParam articleCategoryParam) {
        ArticleCategoryEntity entity = ArticleCategoryEntity.builder()
                .name(articleCategoryParam.getName())
                .build();
        return ArticleConvertor.toDto(add(entity));
    }

    @Override
    public ArticleCategoryEntity add(ArticleCategoryEntity articleCategory) {
        return articleCategoryRepository.add(articleCategory);
    }

    @Override
    public ArticleCategoryDto update(ArticleCategoryParam articleCategoryParam) {
        ArticleCategoryEntity category = getEntityById(articleCategoryParam.getId());
        category.setName(articleCategoryParam.getName());
        return ArticleConvertor.toDto(update(category));
    }

    @Override
    public ArticleCategoryEntity update(ArticleCategoryEntity articleCategory) {
        return articleCategoryRepository.update(articleCategory);
    }

    @Override
    public ArticleCategoryDto delete(ArticleCategoryParam articleCategoryParam) {
        ArticleCategoryEntity category = articleCategoryRepository.getById(articleCategoryParam.getId());
        return ArticleConvertor.toDto(delete(category));
    }

    @Override
    public ArticleCategoryEntity delete(ArticleCategoryEntity articleCategory) {
        return articleCategoryRepository.deleteById2(articleCategory);
    }

    @Override
    public List<ArticleCategoryEntity> getAll(Pageable pageable) {
        return articleCategoryRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ArticleCategoryEntity> findAll(Specification<ArticleCategoryEntity> specification, Pageable pageable) {
        return articleCategoryRepository.findAll(specification,pageable);
    }

    @Override
    public List<ArticleCategoryDto> convertToDtos(List<ArticleCategoryEntity> entities) {
        return entities.stream().map(ArticleConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ArticleCategoryDto> convertToDtos(Page<ArticleCategoryEntity> entities) {
        return null;
    }

    public List<ArticleCategoryEntity> getAll() {
        return articleCategoryRepository.findAll();
    }

    @Override
    public ArticleCategoryDto getById(long id) {
        return ArticleConvertor.toDto(getEntityById(id));
    }

    @Override
    public ArticleCategoryEntity getEntityById(long id) {
        return articleCategoryRepository.getById(id);
    }
}
