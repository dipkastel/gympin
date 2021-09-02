package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.dao.location.PlaceOwner;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceOwnerRepository extends BaseRepository<PlaceOwner, Long> {


}
