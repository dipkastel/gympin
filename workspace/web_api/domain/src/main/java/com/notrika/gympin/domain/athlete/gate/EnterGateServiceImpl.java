package com.notrika.gympin.domain.athlete.gate;

import com.notrika.gympin.common.athlete.gate.dto.EnterGateDto;
import com.notrika.gympin.common.athlete.gate.enums.EnterGateStatus;
import com.notrika.gympin.common.athlete.gate.param.EnterGateParam;
import com.notrika.gympin.common.athlete.gate.service.EnterGateService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.plan.EnterGateLimitException;
import com.notrika.gympin.common.exception.plan.GateNotInPlanException;
import com.notrika.gympin.common.exception.plan.PlanExpiredException;
import com.notrika.gympin.common.exception.plan.UserHaveNoPlanException;
import com.notrika.gympin.domain.location.GateServiceImpl;
import com.notrika.gympin.domain.plan.PlanRegisterServiceImpl;
import com.notrika.gympin.domain.util.convertor.GateConvertor;
import com.notrika.gympin.persistence.dao.repository.EnterGateRepository;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service(value = "athleteEnterGateService")
public class EnterGateServiceImpl implements EnterGateService {

    @Autowired
    private EnterGateRepository enterGateRepository;

    @Autowired
    private PlanRegisterServiceImpl planRegisterService;

    @Autowired
    private GateServiceImpl gateService;

    @Override
    public EnterGateDto request(EnterGateParam param) {
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        PlanRegisterEntity planOfUser = planRegisterService.getPlanOfUser(user);
        if (planOfUser == null) {
            throw new UserHaveNoPlanException();
        }
        if (new Date().after(planOfUser.getExpireDate())) {
            throw new PlanExpiredException();
        }
        GateEntity gate = gateService.getEntityById(param.getGate().getId());
        Optional<PlanGateEntity> gateEntity = null;//planOfUser.getPlan().getPlanGates().stream().filter(g -> g.getGate().equals(gate)).findAny();
        if (gateEntity.isEmpty()) {
            throw new GateNotInPlanException();
        }
        PlanGateEntity planGateEntity = gateEntity.get();
        Long enterCount = enterGateRepository.countAllByAthleteAndGateAndEnterGateStatusAndDeletedIsFalse(user, gate, EnterGateStatus.ACCEPTED);
        if (enterCount >= planGateEntity.getEntryCount()) {
            throw new EnterGateLimitException();
        }
        Timestamp storeTime = new Timestamp(new Date().getTime());
        EnterGateEntity enterGateEntity = new EnterGateEntity();
        enterGateEntity.setReferenceId(UUID.randomUUID().toString());
        enterGateEntity.setAthlete(user);
        enterGateEntity.setGate(gate);
        enterGateEntity.setRequestDate(storeTime);
        enterGateEntity.setLastUpdateStatusDate(storeTime);
        enterGateEntity.setEnterGateStatus(EnterGateStatus.REQUESTED);
        EnterGateEntity entity = enterGateRepository.add(enterGateEntity);
        EnterGateDto dto = new EnterGateDto();
        dto.setId(entity.getId());
        dto.setGate(GateConvertor.convertToDto(entity.getGate()));
        dto.setReferenceId(entity.getReferenceId());
        return dto;
    }
}
