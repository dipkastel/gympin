package com.notrika.gympin.domain.android.gympin.layout;

import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutChildItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutChildItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutChildItemService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GympinAppConvertor;
import com.notrika.gympin.persistence.dao.repository.MainPageLayoutChildItemRepository;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutChildItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainPageLayoutChildItemServiceImpl extends AbstractBaseService<MainPageLayoutChildItemParam, MainPageLayoutChildItemDto, MainPageLayoutChildItemEntity> implements MainPageLayoutChildItemService {

    @Autowired
    private MainPageLayoutChildItemRepository childItemRepository;

    @Override
    public MainPageLayoutChildItemDto add(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(add(GympinAppConvertor.mainPageLayoutChildItemParamToEntity(mainPageLayoutChildItemParam)));
    }

    public MainPageLayoutChildItemEntity add(MainPageLayoutChildItemEntity entity) {
        return childItemRepository.add(entity);
    }

    @Override
    public MainPageLayoutChildItemDto update(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        MainPageLayoutChildItemEntity itemEntity = getEntityById(mainPageLayoutChildItemParam.getId());
        itemEntity.setImageUrl(mainPageLayoutChildItemParam.getImageUrl());
        itemEntity.setTitle(mainPageLayoutChildItemParam.getTitle());
        itemEntity.setDescription(mainPageLayoutChildItemParam.getDescription());
        itemEntity.setDestination(mainPageLayoutChildItemParam.getDestination());
        itemEntity.setData(mainPageLayoutChildItemParam.getData());
        itemEntity.setPriority(mainPageLayoutChildItemParam.getPriority());
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(update(itemEntity));
    }

    public MainPageLayoutChildItemEntity update(MainPageLayoutChildItemEntity entity) {
        return childItemRepository.update(entity);
    }

    @Override
    public MainPageLayoutChildItemDto delete(MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return null;
    }

    public MainPageLayoutChildItemEntity delete(MainPageLayoutChildItemEntity entity) {
        return childItemRepository.deleteById2(entity);
    }

    @Override
    public MainPageLayoutChildItemDto getById(long id) {
        return GympinAppConvertor.mainPageLayoutChildItemEntityToDto(getEntityById(id));
    }

    public MainPageLayoutChildItemEntity getEntityById(long id) {
        return childItemRepository.getById(id);
    }

    @Override
    public List<MainPageLayoutChildItemEntity> getAll(Pageable pageable) {
        return childItemRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MainPageLayoutChildItemDto> convertToDtos(List<MainPageLayoutChildItemEntity> entities) {
        return entities.stream().map(GympinAppConvertor::mainPageLayoutChildItemEntityToDto).collect(Collectors.toList());
    }
}
