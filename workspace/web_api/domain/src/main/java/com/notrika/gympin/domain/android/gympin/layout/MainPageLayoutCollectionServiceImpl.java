package com.notrika.gympin.domain.android.gympin.layout;

import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutCollectionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GympinAppConvertor;
import com.notrika.gympin.persistence.dao.repository.MainPageLayoutCollectionRepository;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutCollectionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainPageLayoutCollectionServiceImpl extends AbstractBaseService<MainPageLayoutCollectionParam, MainPageLayoutCollectionDto, MainPageLayoutCollectionEntity> implements MainPageLayoutCollectionService {

    @Autowired
    private MainPageLayoutCollectionRepository collectionRepository;

    @Override
    public MainPageLayoutCollectionDto add(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return GympinAppConvertor.mainPageLayoutCollectionEntityToDto(add(GympinAppConvertor.mainPageLayoutCollectionParamToEntity(mainPageLayoutCollectionParam)));
    }

    @Override
    public MainPageLayoutCollectionDto update(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        MainPageLayoutCollectionEntity collection = getEntityById(mainPageLayoutCollectionParam.getId());
        collection.setName(mainPageLayoutCollectionParam.getCollectionName());
        collection.setItems(mainPageLayoutCollectionParam.getLayoutItems().stream().map(GympinAppConvertor::mainPageLayoutItemParamToEntity).collect(Collectors.toList()));
        return GympinAppConvertor.mainPageLayoutCollectionEntityToDto(update(collection));
    }

    @Override
    public MainPageLayoutCollectionDto delete(MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return GympinAppConvertor.mainPageLayoutCollectionEntityToDto(delete(getEntityById(mainPageLayoutCollectionParam.getId())));
    }

    @Override
    public MainPageLayoutCollectionDto getById(long id) {
        return GympinAppConvertor.mainPageLayoutCollectionEntityToDto(getEntityById(id));
    }

    @Override
    public MainPageLayoutCollectionEntity add(MainPageLayoutCollectionEntity entity) {
        return collectionRepository.add(entity);
    }

    @Override
    public MainPageLayoutCollectionEntity update(MainPageLayoutCollectionEntity entity) {
        return collectionRepository.update(entity);
    }

    @Override
    public MainPageLayoutCollectionEntity delete(MainPageLayoutCollectionEntity entity) {
        return collectionRepository.deleteById2(entity);
    }

    @Override
    public MainPageLayoutCollectionEntity getEntityById(long id) {
        return collectionRepository.getById(id);
    }

    @Override
    public List<MainPageLayoutCollectionEntity> getAll(Pageable pageable) {
        return collectionRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MainPageLayoutCollectionDto> convertToDtos(List<MainPageLayoutCollectionEntity> entities) {
        return entities.stream().map(GympinAppConvertor::mainPageLayoutCollectionEntityToDto).collect(Collectors.toList());
    }

    @Override
    public List<MainPageLayoutItemDto> mainPage(Long id) {
        return getById(id).getLayoutItems();
    }
}
