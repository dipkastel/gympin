package com.notrika.gympin.domain.gym.gate;

import com.notrika.gympin.common.gym.gate.dto.EnterGateDto;
import com.notrika.gympin.common.gym.gate.param.EnterGateParam;
import com.notrika.gympin.common.gym.gate.service.EnterGateService;
import com.notrika.gympin.persistence.dao.repository.EnterGateRepository;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service(value="gateEnterGateService")
public class EnterGateServiceImpl implements EnterGateService {

    @Autowired
    private EnterGateRepository enterGateRepository;

    @Override
    public EnterGateDto confirmEnterGate(EnterGateParam enterGateParam) {
        Timestamp storeTime = new Timestamp(new Date().getTime());
        EnterGateEntity enterGateEntity = enterGateRepository.findAllByReferenceIdAndDeletedIsFalse(enterGateParam.getReferenceId());
//        if(enterGateEntity==null){
//            throw new EnterGateRequestNotFoundException();
//        }
//        enterGateEntity.setEnterGateStatus(enterGateParam.getEnterStatus());
        enterGateEntity.setLastUpdateStatusDate(storeTime);
        enterGateRepository.update(enterGateEntity);
        EnterGateDto dto=new EnterGateDto();
        return dto;
    }
}
