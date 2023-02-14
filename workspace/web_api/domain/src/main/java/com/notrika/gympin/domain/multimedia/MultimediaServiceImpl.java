package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.exception.multimedia.MultimediaNotFoundException;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import com.notrika.gympin.domain.util.convertor.MultimediaConvertor;
import com.notrika.gympin.domain.util.helper.MultimediaServiceHelper;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MultimediaServiceImpl implements MultimediaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MultimediaServiceImpl.class);

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private MultimediaServiceHelper helper;

    @Override
    public MultimediaDto add(MultimediaStoreParam multimediaStoreParam) throws Exception {
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
        return multimediaRepository.findAllByMediaTypeOrderByIdDesc(mediaType,pageable).stream().map(MultimediaConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public boolean delete(Long id) {
        MultimediaEntity multimedia = multimediaRepository.getById(id);
        multimediaRepository.deleteById2(multimedia);
        return true;
    }
}
