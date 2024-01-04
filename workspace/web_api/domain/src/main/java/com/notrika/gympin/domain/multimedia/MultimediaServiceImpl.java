package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.multimedia.MultimediaNotFoundException;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.query.MultimediaQuery;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.MultimediaConvertor;
import com.notrika.gympin.domain.util.helper.MultimediaServiceHelper;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MultimediaServiceImpl extends AbstractBaseService<MultimediaStoreParam, MultimediaDto, MultimediaQuery, MultimediaEntity> implements MultimediaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MultimediaServiceImpl.class);

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private MultimediaServiceHelper helper;

    @Override
    public MultimediaDto add(MultimediaStoreParam multimediaStoreParam) {
        return MultimediaConvertor.toDto(helper.saveFile(multimediaStoreParam));
    }

    @Override
    public MultimediaDto update(MultimediaStoreParam multimediaStoreParam) {
        if (multimediaStoreParam.getId() == null || multimediaStoreParam.getId() < 1)
            throw new MultimediaNotFoundException();
        MultimediaEntity multimedia = multimediaRepository.getById(multimediaStoreParam.getId());
        if (multimedia == null) throw new MultimediaNotFoundException();
//        if (multimediaStoreParam.getCategoryParam() != null && multimediaStoreParam.getCategoryParam().size() > 0) {
//            List<MultimediaCategoryEntity> multimediaCategories = new ArrayList<>();
//            for (MultimediaCategoryParam categoryParam : multimediaStoreParam.getCategoryParam()) {
//                multimediaCategories.add(categoryService.getEntityById(categoryParam.getId()));
//            }
//        }
        multimedia.setTitle(multimediaStoreParam.getTitle());
        multimedia.setDescription(multimediaStoreParam.getDescription());
        MultimediaEntity update = multimediaRepository.update(multimedia);
        return MultimediaConvertor.toDto(update);
    }

    @Override
    public InputStream getById(MultimediaRetrieveParam multimediaStoreParam) throws Exception {
        return helper.loadFileAsResource(multimediaStoreParam);
    }

    @Override
    public List<MultimediaDto> getAll(BasePagedParam pageableParam, MediaType mediaType) {
        Pageable pageable = PageRequest.of(pageableParam.getPage(), pageableParam.getSize());
        return multimediaRepository.findAllByMediaTypeAndDeletedFalseOrderByIdDesc(mediaType,pageable).stream().map(MultimediaConvertor::toDto).collect(Collectors.toList());
    }


    @Override
    public List<MultimediaEntity> getAll(Pageable pageable) {
        return multimediaRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<MultimediaEntity> findAll(Specification<MultimediaEntity> specification, Pageable pageable) {
        return multimediaRepository.findAll(specification,pageable);
    }

    @Override
    public List<MultimediaDto> convertToDtos(List<MultimediaEntity> entities) {
        return entities.stream().map(MultimediaConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<MultimediaDto> convertToDtos(Page<MultimediaEntity> entities) {
        return entities.map(MultimediaConvertor::toDto);
    }

    @Override
    public boolean delete(Long id) {
        MultimediaEntity multimedia = multimediaRepository.getById(id);
        multimediaRepository.deleteById2(multimedia);
        return true;
    }

    @Override
    public MultimediaEntity add(MultimediaEntity entity) {
        return null;
    }

    @Override
    public MultimediaEntity update(MultimediaEntity entity) {
        return null;
    }


    @Override
    public MultimediaEntity getEntityById(long id) {
        return null;
    }


    @Override
    public MultimediaEntity delete(MultimediaEntity entity) {
        return null;
    }
    @Override
    public MultimediaDto delete(@NonNull MultimediaStoreParam param) {
        return null;
    }

    @Override
    public MultimediaDto getById(long id) {
        return null;
    }

}
