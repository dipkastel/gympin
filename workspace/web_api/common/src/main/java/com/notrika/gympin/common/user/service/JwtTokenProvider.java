package com.notrika.gympin.common.user.service;

import org.springframework.security.core.Authentication;

public interface JwtTokenProvider {
    String generateJwtToken(Authentication authentication);
}
