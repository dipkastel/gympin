package com.notrika.gympin.common.user.user.service;

import com.notrika.gympin.common.user.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.user.enums.TokenType;
import org.springframework.security.core.Authentication;

public interface JwtTokenProvider {

    String generateJwtToken(Authentication authentication, TokenType tokenType);

    boolean validateToken(String token);

    RefreshTokenDto refreshToken(String refreshToken);


}
