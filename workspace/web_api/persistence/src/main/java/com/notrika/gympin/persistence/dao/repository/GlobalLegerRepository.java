package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.accounting.AccountEntity;
import com.notrika.gympin.persistence.entity.accounting.GlobalLegerEntity;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface GlobalLegerRepository extends BaseRepository<GlobalLegerEntity,Long> {

    GlobalLegerEntity findGlobalLegerEntityByAccount(AccountEntity account);


}
