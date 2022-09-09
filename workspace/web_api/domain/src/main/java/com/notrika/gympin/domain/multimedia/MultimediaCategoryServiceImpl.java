package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.common.multimedia.service.MultimediaCategoryService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.MultimediaCategoryConvertor;
import com.notrika.gympin.persistence.dao.repository.MultimediaCategoryRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaCategoryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MultimediaCategoryServiceImpl extends AbstractBaseService<MultimediaCategoryParam, MultimediaCategoryDto, BaseFilter<?>, MultimediaCategoryEntity> implements MultimediaCategoryService {

    @Autowired
    private MultimediaCategoryRepository multimediaCategoryRepository;

    @Override
    public MultimediaCategoryDto add(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategoryEntity multimediaCategory = MultimediaCategoryConvertor.multimediaCategoryParamToMultimediaCategory(multimediaCategoryParam);
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(add(multimediaCategory));
    }

    @Override
    public MultimediaCategoryEntity add(MultimediaCategoryEntity multimediaCategory) {
        return multimediaCategoryRepository.add(multimediaCategory);
    }

    @Override
    public MultimediaCategoryDto update(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategoryEntity category = getEntityById(multimediaCategoryParam.getId());
        category.setName(multimediaCategoryParam.getName());
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(update(category));
    }

    @Override
    public MultimediaCategoryEntity update(MultimediaCategoryEntity multimediaCategory) {
        return multimediaCategoryRepository.update(multimediaCategory);
    }

    @Override
    public MultimediaCategoryDto delete(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategoryEntity category = multimediaCategoryRepository.getById(multimediaCategoryParam.getId());
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(delete(category));
    }

    @Override
    public MultimediaCategoryEntity delete(MultimediaCategoryEntity multimediaCategory) {
        return multimediaCategoryRepository.deleteById2(multimediaCategory);
    }

    @Override
    public List<MultimediaCategoryEntity> getAll(Pageable pageable) {
        return multimediaCategoryRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MultimediaCategoryDto> convertToDtos(List<MultimediaCategoryEntity> entities) {
        return MultimediaCategoryConvertor.multimediaCategoriesToMultimediaCategoryDto(entities);
    }

    public List<MultimediaCategoryEntity> getAll() {
        return multimediaCategoryRepository.findAll();
    }

    @Override
    public MultimediaCategoryDto getById(long id) {
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(getEntityById(id));
    }

    @Override
    public MultimediaCategoryEntity getEntityById(long id) {
        return multimediaCategoryRepository.getById(id);
    }
}
