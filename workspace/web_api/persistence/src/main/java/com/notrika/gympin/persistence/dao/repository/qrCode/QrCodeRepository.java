package com.notrika.gympin.persistence.dao.repository.qrCode;

import com.notrika.gympin.common.qrCodes.enums.QrCodeType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.qrCode.QrCodeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QrCodeRepository extends BaseRepository<QrCodeEntity, Long> {


    List<QrCodeEntity> findAllByCodeIs(String Code);
    List<QrCodeEntity> findAllByQrCodeTypeAndReferenceId(QrCodeType type,Long reference);
}
