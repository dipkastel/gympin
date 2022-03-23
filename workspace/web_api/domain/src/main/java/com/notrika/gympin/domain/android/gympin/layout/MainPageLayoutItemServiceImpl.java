package com.notrika.gympin.domain.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutItemService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.GympinAppConvertor;
import com.notrika.gympin.persistence.dao.repository.MainPageLayoutItemRepository;
import com.notrika.gympin.persistence.entity.android.layout.MainPageLayoutItemEntity;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainPageLayoutItemServiceImpl extends AbstractBaseService<MainPageLayoutItemParam, MainPageLayoutItemDto, MainPageLayoutItemEntity> implements MainPageLayoutItemService {

    @Autowired
    private MainPageLayoutItemRepository pageLayoutRepository;

    @Override
    public MainPageLayoutItemDto add(MainPageLayoutItemParam mainPageLayoutItemParam) {
        return GympinAppConvertor.mainPageLayoutItemDtoEntityToDto(add(GympinAppConvertor.mainPageLayoutItemParamToEntity(mainPageLayoutItemParam)));
    }

    public MainPageLayoutItemEntity add(MainPageLayoutItemEntity entity) {
        return pageLayoutRepository.add(entity);
    }

    @Override
    public MainPageLayoutItemDto update(MainPageLayoutItemParam mainPageLayoutItemParam) {
        //        MainPageLayoutEntity mainPageLayout = getMainPageLayoutById(mainPageLayoutParam.getId());
        throw new NotYetImplementedException();
    }

    public MainPageLayoutItemEntity update(MainPageLayoutItemEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public MainPageLayoutItemDto delete(MainPageLayoutItemParam mainPageLayoutItemParam) {
        return GympinAppConvertor.mainPageLayoutItemDtoEntityToDto(delete(getEntityById(mainPageLayoutItemParam.getId())));
    }

    public MainPageLayoutItemEntity delete(MainPageLayoutItemEntity entity) {
        return pageLayoutRepository.deleteById2(entity);
    }

    @Override
    public MainPageLayoutItemDto getById(long id) {
        return GympinAppConvertor.mainPageLayoutItemDtoEntityToDto(getEntityById(id));
    }

    public MainPageLayoutItemEntity getEntityById(long id) {
        return pageLayoutRepository.getById(id);
    }

    @Override
    public List<MainPageLayoutItemEntity> getAll(Pageable pageable) {
        return pageLayoutRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MainPageLayoutItemDto> convertToDtos(List<MainPageLayoutItemEntity> entities) {
        return entities.stream().map(GympinAppConvertor::mainPageLayoutItemDtoEntityToDto).collect(Collectors.toList());
    }

    @Override
    public List<MainPageLayoutItemDto> mainPage() {
        return this.getAll(BasePagedParam.builder().page(0).size(Integer.MAX_VALUE).build());
    }

}
