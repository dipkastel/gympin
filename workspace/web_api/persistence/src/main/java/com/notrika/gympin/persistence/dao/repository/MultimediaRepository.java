package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.user.User;
import javassist.bytecode.analysis.MultiType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultimediaRepository extends BaseRepository<Multimedia, Long> {

    //@Query("Select m from Multimedia m where m.user.id = :#{#user.id} and m.fileName = :#{#fileName}")
    //Multimedia findByUserAndFileName(User user, String fileName);

    Multimedia findByUserAndFileName(User user, String fileName);

    Multimedia findByFileName(String fileName);

    List<Multimedia> findAllByMediaType(MediaType mediaType, Pageable pageable);
}
