package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.common.multimedia.service.MultimediaCategoryService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.MultimediaCategoryConvertor;
import com.notrika.gympin.persistence.dao.repository.MultimediaCategoryRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MultimediaCategoryServiceImpl extends AbstractBaseService<MultimediaCategoryParam,MultimediaCategoryDto,MultimediaCategory> implements MultimediaCategoryService {

    @Autowired
    private MultimediaCategoryRepository multimediaCategoryRepository;

    @Override
    public MultimediaCategoryDto add(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategory multimediaCategory = MultimediaCategoryConvertor.multimediaCategoryParamToMultimediaCategory(multimediaCategoryParam);
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(add(multimediaCategory));
    }

    public MultimediaCategory add(MultimediaCategory multimediaCategory){
        return multimediaCategoryRepository.add(multimediaCategory);
    }

    @Override
    public MultimediaCategoryDto update(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategory category = getMultimediaCategoryById(multimediaCategoryParam.getId());
        category.setName(multimediaCategoryParam.getName());
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(update(category));
    }

    public MultimediaCategory update(MultimediaCategory multimediaCategory){
        return multimediaCategoryRepository.update(multimediaCategory);
    }

    @Override
    public MultimediaCategoryDto delete(MultimediaCategoryParam multimediaCategoryParam) {
        MultimediaCategory category = multimediaCategoryRepository.getById(multimediaCategoryParam.getId());
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(delete(category));
    }

    public MultimediaCategory delete(MultimediaCategory multimediaCategory){
        return multimediaCategoryRepository.deleteById2(multimediaCategory);
    }

    @Override
    public List<MultimediaCategory> getAll(Pageable pageable) {
        return multimediaCategoryRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<MultimediaCategoryDto> convertToDto(List<MultimediaCategory> entities) {
        return MultimediaCategoryConvertor.multimediaCategoriesToMultimediaCategoryDto(entities);
    }

    public List<MultimediaCategory> getAll(){
        return multimediaCategoryRepository.findAll();
    }

    @Override
    public MultimediaCategoryDto getById(long id) {
        return MultimediaCategoryConvertor.multimediaCategoryToMultimediaCategoryDto(getMultimediaCategoryById(id));
    }

    public MultimediaCategory getMultimediaCategoryById(long id){
        return multimediaCategoryRepository.getById(id);
    }
}
