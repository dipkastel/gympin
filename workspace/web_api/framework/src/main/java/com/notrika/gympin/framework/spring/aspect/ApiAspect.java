package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.ResponseModel;
import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;

import static com.notrika.gympin.common.ResponseModel.ERROR;
import static com.notrika.gympin.common.ResponseModel.SUCCESS;

//@Order(Integer.MAX_VALUE)
@Aspect
@Component
@Slf4j
public class ApiAspect {

    @Around("execution(* com.notrika.gympin.controller.impl..*.*(..))")
    public Object process(ProceedingJoinPoint pjp) {
        // start stopwatch
        setGympinServiceCallContext();
        logInput(pjp);
        StringBuffer resultBuffer = new StringBuffer().append("\n and return following result: \n");
        try {
            Object retVal = pjp.proceed();
            MethodSignature signature = (MethodSignature) pjp.getSignature();
            Method method = signature.getMethod();
            IgnoreWrapAspect ignoreWrapAspect = method.getAnnotation(IgnoreWrapAspect.class);
            if (ignoreWrapAspect == null) {
                return getResponseModelResponseEntity(resultBuffer, (ResponseEntity) retVal);
            }
            return retVal;
        } catch (ExceptionBase e) {
            Error error = new Error(e.getErrorType(), e);
            log.error(error.getErrorMessage(), e);
            return getFailedResponse(error, e.getHttpStatus());
        } catch (Throwable e) {
            log.error("Unkown error: \n",e);
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
        if(GympinContextHolder.getContext()==null){
            GympinContextHolder.setContext(new GympinContext());
        }
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetailsImpl){
            GympinContextHolder.getContext().setUserDetails((UserDetailsImpl) principal);
        }
        log.info("Following context setted: {} \n",GympinContextHolder.getContext());
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


}
