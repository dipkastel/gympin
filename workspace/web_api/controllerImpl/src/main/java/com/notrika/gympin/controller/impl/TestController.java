package com.notrika.gympin.controller.impl;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public ResponseEntity<String> test() {
        //throw new ExceptionBase(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.USER_NOT_FOUND);
        return new ResponseEntity<String>("Hello", HttpStatus.OK);
    }

}
