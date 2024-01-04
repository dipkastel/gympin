package com.notrika.gympin.persistence.dao.repository.multimedia;

import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultimediaRepository extends BaseRepository<MultimediaEntity, Long> {

    //@Query("Select m from Multimedia m where m.user.id = :#{#user.id} and m.fileName = :#{#fileName}")
    //Multimedia findByUserAndFileName(User user, String fileName);

    MultimediaEntity findByUserAndFileName(UserEntity user, String fileName);

    MultimediaEntity findByFileName(String fileName);

    List<MultimediaEntity> findAllByMediaTypeAndDeletedFalseOrderByIdDesc(MediaType mediaType, Pageable pageable);
}
