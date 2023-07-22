package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common._base.base.ResponseModel;
import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.persistence.dao.repository.ServiceExecutionRepository;
import com.notrika.gympin.persistence.entity.security.service.ServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;

import static com.notrika.gympin.common._base.base.ResponseModel.ERROR;
import static com.notrika.gympin.common._base.base.ResponseModel.SUCCESS;

//@Order(Integer.MAX_VALUE)
@Aspect
@Component
@Slf4j
public class ApiAspect {

    @Autowired
    private ServiceExecutionRepository serviceExecutionRepository;

    @Around("execution(* com.notrika.gympin.controller.impl..*.*(..))")
    public Object process(ProceedingJoinPoint pjp) {
        // start stopwatch
        MethodSignature signature = (MethodSignature) pjp.getSignature();
        Method method = signature.getMethod();
        if (!method.getName().equals("greeting")) {
            setGympinServiceCallContext();
        } else {
            setGympinServiceCallContextForChat(pjp.getArgs()[0]);
        }
        logInput(pjp);
        StringBuffer resultBuffer = new StringBuffer().append("\n and return following result: \n");
        try {
            Object retVal = pjp.proceed();
            try {
                IgnoreWrapAspect ignoreWrapAspect = method.getAnnotation(IgnoreWrapAspect.class);
                if (ignoreWrapAspect == null) {
                    saveServiceCall(pjp, retVal);
                    return getResponseModelResponseEntity(resultBuffer, (ResponseEntity) retVal);
                }
            } catch (Exception e) {
                log.error("Error in Save Service Data: \n", e);
            }
            return retVal;
        } catch (ExceptionBase e) {
            Error error = new Error(e);
            log.error(error.getErrorMessage(), e);
            return getFailedResponse(error, e.getHttpStatus());
        } catch (Throwable e) {
            log.error("Unkown error: \n", e);
            return getFailedResponse(Error.builder().errorMessage(e.getMessage()).stackTrace(Arrays.toString(e.getStackTrace())).build(), HttpStatus.EXPECTATION_FAILED);
        } finally {
            log.info(resultBuffer.append("\n==============================================================\n").toString());
            GympinContextHolder.clear();
        }
        // stop stopwatch
    }

    private ResponseEntity<ResponseModel> getResponseModelResponseEntity(StringBuffer resultBuffer, ResponseEntity retVal) {
        log.info("Going to set ResponseEntity... \n");
        ResponseEntity responseModel = retVal;
        Object responseModelBody = responseModel.getBody();
        ResponseModel finalResponse = new ResponseModel();
        finalResponse.setData(responseModelBody);
        finalResponse.setSuccess(true);
        finalResponse.setMessageType(SUCCESS);
        resultBuffer.append(finalResponse);
        return new ResponseEntity<ResponseModel>(finalResponse, responseModel.getStatusCode());
    }

    private void logInput(ProceedingJoinPoint pjp) {
        StringBuffer paramBuffer =
                new StringBuffer().append("\n==============================================================\n").append("Method ").append(pjp.getSignature().toLongString()).append("\nstarted with following input param: \n");
        for (int i = 0; i < pjp.getArgs().length; i++) {
            paramBuffer.append(pjp.getArgs()[i]).append("\n");
        }
        log.info(paramBuffer.toString());
    }

    private void setGympinServiceCallContext() {
        log.info("Going to set context...\n");
        if (GympinContextHolder.getContext() == null) {
            GympinContextHolder.setContext(new GympinContext());
        }
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetailsImpl) {
                GympinContextHolder.getContext().setUserDetails((UserDetailsImpl) principal);
            }
            log.info("Following context setted: {} \n", GympinContextHolder.getContext());
        }catch (Exception ex){
            log.error("ERROR IN SET CONTEXT",ex);
        }
    }

    private void setGympinServiceCallContextForChat(Object principal) {
        log.info("Going to set context...\n");
        if (GympinContextHolder.getContext() == null) {
            GympinContextHolder.setContext(new GympinContext());
        }
        if (principal instanceof UserDetailsImpl) {
            GympinContextHolder.getContext().setUserDetails((UserDetailsImpl) principal);
        }
        log.info("Following context setted: {} \n", GympinContextHolder.getContext());
    }

    private ResponseEntity<ResponseModel> getFailedResponse(Error error, HttpStatus httpStatus) {
        log.info("Going to set failure response:...\n");
        ResponseModel responseModel = new ResponseModel();
        responseModel.setSuccess(false);
        responseModel.setMessageType(ERROR);
        responseModel.setMessage(error.getErrorMessage());
        responseModel.setError(error);
        return new ResponseEntity<ResponseModel>(responseModel, httpStatus);
    }


    private void saveServiceCall(ProceedingJoinPoint joinPoint, Object retVal) throws IOException {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        PostMapping postMapping = method.getAnnotation(PostMapping.class);
        PutMapping putMapping = method.getAnnotation(PutMapping.class);
        DeleteMapping deleteMapping = method.getAnnotation(DeleteMapping.class);
        if (postMapping == null && putMapping == null && deleteMapping == null) return;
        ObjectMapper objectMapper = new ObjectMapper();
        String paramJson = objectMapper.writeValueAsString(Arrays.stream(joinPoint.getArgs()).findFirst());
        String dtoJson = null;
        Class dtoClass;
        if (retVal.getClass().isAssignableFrom(ResponseEntity.class)) {
            Object body = ((ResponseEntity) retVal).getBody();
            dtoClass = body.getClass();
            dtoJson = objectMapper.writeValueAsString(body);
        } else {
            dtoClass = retVal.getClass();
            objectMapper.writeValueAsString(retVal);
        }
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);

        ServiceExecutionEntity serviceExecution = new ServiceExecutionEntity();
        serviceExecution.setService(method.toGenericString());
        serviceExecution.setParamClass(joinPoint.getArgs()[0].getClass());
        serviceExecution.setParam(paramJson);
        serviceExecution.setDto(dtoJson);
        serviceExecution.setDtoClass(dtoClass);
        serviceExecution.setExecutorUser(user);
        serviceExecutionRepository.add(serviceExecution);

    }


}
