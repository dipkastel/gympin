package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.ResponseModel;
import com.notrika.gympin.common.exception.ExceptionBase;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

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
        StringBuffer paramBuffer =
                new StringBuffer().append("\n==============================================================\n")
                        .append("Method ").append(pjp.getSignature().toLongString()).append(" started with following input param: ");
        for (int i = 0; i < pjp.getArgs().length; i++) {
            paramBuffer.append(pjp.getArgs()[i]).append("\n");
        }
        LOGGER.log(Level.INFO, paramBuffer.toString());
        StringBuffer resultBuffer = new StringBuffer().append(" and return following result: \n");
        try {
            Object retVal = pjp.proceed();
            ResponseEntity responseModel = (ResponseEntity) retVal;
            Object responseModelBody = responseModel.getBody();
            ResponseModel responseModel1 = new ResponseModel();
            responseModel1.setData(responseModelBody);
            responseModel1.setSuccess(true);
            responseModel1.setMessageType(SUCCESS);
            resultBuffer.append(responseModel1);
            return new ResponseEntity<ResponseModel>(responseModel1, responseModel.getStatusCode());
        } catch (ExceptionBase e) {
            resultBuffer.append(e);
            Error error = new Error(e.getErrorType(), e);
            ResponseModel responseModel = new ResponseModel();
            responseModel.setSuccess(false);
            responseModel.setMessageType(ERROR);
            responseModel.setMessage(error.getErrorMessage());
            responseModel.setError(error);
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        } catch (Throwable throwable) {
            throw throwable;
        } finally {
            LOGGER.log(Level.INFO, resultBuffer.append("\n==============================================================\n").toString());
        }
        // stop stopwatch
    }

}
