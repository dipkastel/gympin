package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.ResponseModel;
import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
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
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.notrika.gympin.common.ResponseModel.ERROR;
import static com.notrika.gympin.common.ResponseModel.SUCCESS;

@Aspect
@Component
public class ApiAspect {

    private final static Logger LOGGER = Logger.getLogger("ApiAspect");

    @Around("execution(* com.notrika.gympin.controller.impl..*.*(..))")
    public Object process(ProceedingJoinPoint pjp) throws Throwable {
        // start stopwatch
        setGympinServiceCall();
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
            LOGGER.log(Level.FINEST,error.getErrorMessage(),e);
            return getFailedResponse(error, e.getHttpStatus());
        } catch (Throwable e) {
            LOGGER.log(Level.FINEST,e.getMessage(),e);
            return getFailedResponse(Error.builder().errorMessage(e.getMessage()).stackTrace(Arrays.toString(e.getStackTrace())).build(), HttpStatus.EXPECTATION_FAILED);
        } finally {
            LOGGER.log(Level.INFO, resultBuffer.append("\n==============================================================\n").toString());
            GympinContextHolder.clear();
        }
        // stop stopwatch
    }

    private ResponseEntity<ResponseModel> getResponseModelResponseEntity(StringBuffer resultBuffer, ResponseEntity retVal) {
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
        LOGGER.log(Level.INFO, paramBuffer.toString());
    }

    private void setGympinServiceCall() {
        GympinContext contextEntry = new GympinContext();
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User) {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            contextEntry.setUser(UserConvertor.userToUserDto(user));
            contextEntry.setUserGroup(user.getUserGroup());
        } else if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof Administrator) {
            Administrator administrator = (Administrator) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            contextEntry.setUser(UserConvertor.administratorToAdministratorDto(administrator));
            contextEntry.setUserGroup(administrator.getBaseUser().getUserGroup());
        }
        GympinContextHolder.setContext(contextEntry);
    }

    private ResponseEntity<ResponseModel> getFailedResponse(Error error, HttpStatus httpStatus) {
        ResponseModel responseModel = new ResponseModel();
        responseModel.setSuccess(false);
        responseModel.setMessageType(ERROR);
        responseModel.setMessage(error.getErrorMessage());
        responseModel.setError(error);
        return new ResponseEntity<ResponseModel>(responseModel, httpStatus);
    }


}
