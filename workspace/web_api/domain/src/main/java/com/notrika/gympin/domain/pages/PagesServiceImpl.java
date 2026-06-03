package com.notrika.gympin.domain.pages;

import com.notrika.gympin.common.pages.dto.PagesDeadendDto;
import com.notrika.gympin.common.pages.dto.PagesItemDto;
import com.notrika.gympin.common.pages.dto.PagesTypeDto;
import com.notrika.gympin.common.pages.param.PagesItemParam;
import com.notrika.gympin.common.pages.param.PagesTypeParam;
import com.notrika.gympin.common.pages.query.PagesQuery;
import com.notrika.gympin.common.pages.service.PagesService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.settings.SettingsServiceImpl;
import com.notrika.gympin.domain.util.convertor.PagesConvertor;
import com.notrika.gympin.persistence.dao.repository.home.PagesRepository;
import com.notrika.gympin.persistence.dao.repository.home.PagesTypesRepository;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.entity.pages.PagesItemEntity;
import com.notrika.gympin.persistence.entity.pages.PagesTypeEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PagesServiceImpl extends AbstractBaseService<PagesItemParam, PagesDeadendDto, PagesQuery, PagesItemEntity> implements PagesService {

    @Autowired
    private PagesRepository pageRepository;
    @Autowired
    private PagesTypesRepository pagesTypesRepository;
    @Autowired
    private MultimediaRepository multimediaRepository;
    @Autowired
    private SettingsServiceImpl settingsService;

    public List<PagesItemDto> loadedHome;

    @Override
    public PagesDeadendDto add(PagesItemParam pagesParam) {
        loadedHome = null;
        return PagesConvertor.toDeadendDto(add(PagesConvertor.toTypeEntity(pagesParam)));
    }

    @Override
    public PagesItemEntity add(PagesItemEntity entity) {
        loadedHome = null;
        return pageRepository.add(entity);
    }

    @Override
    public PagesDeadendDto update(PagesItemParam pagesParam) {
        PagesItemEntity itemEntity = getEntityById(pagesParam.getId());

        if (pagesParam.getImageId() != null)
            itemEntity.setMultimedia(multimediaRepository.getById(pagesParam.getImageId()));
        if (pagesParam.getParent() != null)
            itemEntity.setParent(pageRepository.getById(pagesParam.getParent().getId()));
        if (pagesParam.getDestination() != null)
            itemEntity.setDestination(pagesParam.getDestination());
        if (pagesParam.getTitle() != null)
            itemEntity.setTitle(pagesParam.getTitle());
        itemEntity.setDescription(pagesParam.getDescription());
        itemEntity.setData(pagesParam.getData());
        itemEntity.setUrl(pagesParam.getUrl());
        itemEntity.setViewType(pagesParam.getViewType());
        return PagesConvertor.toDeadendDto(update(itemEntity));
    }

    @Override
    public PagesDeadendDto updatePriority(PagesItemParam pagesParam) {
        PagesItemEntity itemEntity = getEntityById(pagesParam.getId());
        if (pagesParam.getPriority() != null)
            itemEntity.setPriority(pagesParam.getPriority());
        return PagesConvertor.toDeadendDto(update(itemEntity));
    }

    @Override
    public PagesItemEntity update(PagesItemEntity entity) {
        loadedHome = null;
        return pageRepository.update(entity);
    }

    @Override
    public PagesDeadendDto delete(PagesItemParam pagesParam) {
        loadedHome = null;
        PagesItemEntity entity = getEntityById(pagesParam.getId());
        return PagesConvertor.toDeadendDto(delete(entity));
    }

    @Override
    public PagesItemEntity delete(PagesItemEntity entity) {
        loadedHome = null;
        return pageRepository.deleteById2(entity);
    }

    @Override
    public PagesDeadendDto getById(long id) {
        return PagesConvertor.toDeadendDto(getEntityById(id));
    }

    @Override
    public PagesItemEntity getEntityById(long id) {
        return pageRepository.getById(id);
    }

    @Override
    public List<PagesItemEntity> getAll(Pageable pageable) {
        return pageRepository.findAllUndeleted(pageable).stream().filter(p -> p.getParent() == null).collect(Collectors.toList());
    }

    @Override
    public Page<PagesItemEntity> findAll(Specification<PagesItemEntity> specification, Pageable pageable) {
        return pageRepository.findAll(specification, pageable);
    }

    @Override
    public List<PagesDeadendDto> convertToDtos(List<PagesItemEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(PagesConvertor::toDeadendDto).sorted(Comparator.comparing(PagesDeadendDto::getPriority)).collect(Collectors.toList());
    }

    @Override
    public Page<PagesDeadendDto> convertToDtos(Page<PagesItemEntity> entities) {
        return entities.map(PagesConvertor::toDeadendDto);
    }

    @Override
    public List<PagesItemDto> getHomeBySettingKeyOrPageId(String settingkey, Long pageId) {
        try {
            if (pageId == null)
                pageId = Long.valueOf(settingsService.getByKey(settingkey).getValue());
            if (pageId == null)
                pageId = 2l;
        } catch (Exception e) {
        }
//        if (loadedHome != null)
//            return loadedHome;
//        else {
            loadedHome = pageRepository.getByParentIdAndDeletedIsFalseOrderByPriorityAsc(pageId).stream().map(PagesConvertor::toDtoWithChild).collect(Collectors.toList());
            return loadedHome;
//        }
    }
    @Override
    public List<PagesItemDto> getPageByPageData(String data) {
            return pageRepository.findFirstByData(data).getItems().stream().sorted(Comparator.comparing(PagesItemEntity::getPriority)).filter(item->!item.isDeleted()).map(PagesConvertor::toDtoWithChild).collect(Collectors.toList());
    }

    @Override
    public Void clearCash() {
        loadedHome = null;
        return null;
    }

    @Override
    public List<PagesTypeDto> getAllTypes(Pageable pageable) {
        return PagesConvertor.toTypeDto(pagesTypesRepository.findAllUndeleted(pageable));
    }

    @Override
    public PagesTypeDto addType(PagesTypeParam param) {
        return PagesConvertor.toTypeDto(pagesTypesRepository.add(PagesConvertor.toTypeEntity(param)));
    }

    @Override
    public PagesTypeDto UpdateType(PagesTypeParam param) {
        return PagesConvertor.toTypeDto(pagesTypesRepository.update(PagesConvertor.toTypeEntity(param)));
    }

    @Override
    public PagesTypeDto deleteType(PagesTypeParam param) {
        PagesTypeEntity entity = pagesTypesRepository.getById(param.getId());
        return PagesConvertor.toTypeDto(pagesTypesRepository.deleteById2(entity));
    }

}
