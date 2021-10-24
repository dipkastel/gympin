package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MultimediaRepository extends BaseRepository<Multimedia, Long> {

    //@Query("Select m from Multimedia m where m.user.id = :#{#user.id} and m.fileName = :#{#fileName}")
    Multimedia findByUserAndFileName(User user, String fileName);

}
