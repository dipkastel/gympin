package com.notrika.gympin.domain.android.gympin.layout;

import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutChildItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutChildItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutChildItemService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GympinAppConvertor;
import com.notrika.gympin.persistence.dao.repository.MainPageLayoutChildItemRepository;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutChildItemEntity;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MainPageLayoutChildItemServiceImpl extends AbstractBaseService<MainPageLayoutChildItemParam, MainPageLayoutChildItemDto, MainPageLayoutChildItemEntity> implements MainPageLayoutChildItemService {

    @Autowired
    private MainPageLayoutChildItemRepository childItemRepository;

    @Override
    public MainPageLayoutChildItemDto add(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        log.info("MainPageLayoutChildItemDto add is going to execute with param {}",mainPageLayoutChildItemParam);
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(add(GympinAppConvertor.mainPageLayoutChildItemParamToEntity(mainPageLayoutChildItemParam)));
    }

    @Override
    public MainPageLayoutChildItemEntity add(MainPageLayoutChildItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity add is going to execute with param {}",entity);
        return childItemRepository.add(entity);
    }

    @Override
    public MainPageLayoutChildItemDto update(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        log.info("MainPageLayoutChildItemDto update is going to execute with param {}",mainPageLayoutChildItemParam);
        MainPageLayoutChildItemEntity itemEntity = getEntityById(mainPageLayoutChildItemParam.getId());
        itemEntity.setImageUrl(mainPageLayoutChildItemParam.getImageUrl());
        itemEntity.setTitle(mainPageLayoutChildItemParam.getTitle());
        itemEntity.setDescription(mainPageLayoutChildItemParam.getDescription());
        itemEntity.setDestination(mainPageLayoutChildItemParam.getDestination());
        itemEntity.setData(mainPageLayoutChildItemParam.getData());
        itemEntity.setPriority(mainPageLayoutChildItemParam.getPriority());
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(update(itemEntity));
    }

    @Override
    public MainPageLayoutChildItemEntity update(MainPageLayoutChildItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity update is going to execute with param {}",entity);
        return childItemRepository.update(entity);
    }

    @Override
    public MainPageLayoutChildItemDto delete(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        log.info("MainPageLayoutChildItemDto delete is going to execute with param {}",mainPageLayoutChildItemParam);
        throw new NotYetImplementedException();
    }

    @Override
    public MainPageLayoutChildItemEntity delete(MainPageLayoutChildItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity delete is going to execute with param {}",entity);
        return childItemRepository.deleteById2(entity);
    }

    @Override
    public MainPageLayoutChildItemDto getById(long id) {
        log.info("MainPageLayoutChildItemDto getById is going to execute with param {}",id);
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(getEntityById(id));
    }

    @Override
    public MainPageLayoutChildItemEntity getEntityById(long id) {
        log.info("MainPageLayoutChildItemEntity getEntityById is going to execute with param {}",id);
        return childItemRepository.getById(id);
    }

    @Override
    public List<MainPageLayoutChildItemEntity> getAll(Pageable pageable) {
        log.info("List<MainPageLayoutChildItemEntity> getAll is going to execute with param {}",pageable);
        return childItemRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MainPageLayoutChildItemDto> convertToDtos(List<MainPageLayoutChildItemEntity> entities) {
        log.info("List<MainPageLayoutChildItemDto> convertToDtos is going to execute with param {}",entities);
        return entities.stream().map(GympinAppConvertor::mainPageLayoutChildItemEntityToDto).collect(Collectors.toList());
    }

}
