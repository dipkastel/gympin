package com.notrika.gympin.framework.config.jwt;

import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import com.notrika.gympin.common.user.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.user.enums.TokenType;
import com.notrika.gympin.common.user.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.util.exception.user.UserLockedException;
import com.notrika.gympin.common.util.exception.user.UserSuspendedException;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.user.UserTokenRepository;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserTokenEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProviderImpl implements JwtTokenProvider {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.token.prefix}")
    private String jwtTokenPrefix;

    @Value("${app.jwt.header.string}")
    private String jwtHeaderString;

    @Value("${app.jwt.user-expiration-in-ms}")
    private Long userjwtExpirationInMs;

    @Value("${app.jwt.admin-expiration-in-ms}")
    private Long adminjwtExpirationInMs;

    @Value("${app.jwt.refreshtoken-in-ms}")
    private Long refreshTokenJwtExpirationInMs;

    @Autowired
    private UserTokenRepository userTokenRepository;

    @Autowired
    private UserServiceImpl userService;

    /*public UserToken generateToken(User user, Authentication auth) {
        String authorities = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());

        String tokenString =
                Jwts.builder().setSubject(auth.getName()).claim("roles", authorities).claim("GympinRole", user.getUserRole()).setExpiration(new Date(System.currentTimeMillis() +
                 userjwtExpirationInMs)).signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(tokenString);
        userToken.setExpireDate(new Date(System.currentTimeMillis() + userjwtExpirationInMs));
        userTokenRepository.save(userToken);
        return userToken;
    }*/

    public UserTokenEntity generateToken(UserEntity admin, Authentication auth) {
        String authorities = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());

        String tokenString =
                Jwts.builder().setSubject(auth.getName()).claim("roles", authorities).claim("GympinRole", admin.getUserRoles()).setExpiration(new Date(System.currentTimeMillis() + adminjwtExpirationInMs)).signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
        UserTokenEntity userToken = new UserTokenEntity();
        //        userToken.setUser(admin.getBaseUser());
        userToken.setToken(tokenString);
        userToken.setExpireDate(new Date(System.currentTimeMillis() + adminjwtExpirationInMs));
        userTokenRepository.add(userToken);
        return userToken;
    }

    public String generateJwtToken(Authentication authentication, TokenType tokenType) {
        Long expireTime = 0L;
        switch (tokenType) {
            case USER:
                expireTime = userjwtExpirationInMs;
                break;
            case ADMIN:
                expireTime = adminjwtExpirationInMs;
            case REFRESH_TOKE:
                expireTime = refreshTokenJwtExpirationInMs;
                break;
        }
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        return getjwt(expireTime, userPrincipal.getUsername());
    }

    private String getjwt(Long expireTime, String username) {
        return Jwts.builder().setSubject((username)).setIssuedAt(new Date()).setExpiration(new Date((new Date()).getTime() + expireTime)).signWith(SignatureAlgorithm.HS512,
                jwtSecret).compact();
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token == null) {
            return null;
        }
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        String username = claims.getSubject();
        final List<GrantedAuthority> authorities =
                Arrays.stream(claims.get("roles").toString().split(",")).map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return username != null ? new UsernamePasswordAuthenticationToken(username, null, authorities) : null;
    }

    public boolean validateToken(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token == null) {
            return false;
        }
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        if (claims.getExpiration().before(new Date())) {
            return false;
        }
        return true;
    }

    public boolean validateToken(String token) {
        if (!StringUtils.hasText(token)) {
            return false;
        }
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return !claims.getExpiration().before(new Date());
    }

    @Override
    public RefreshTokenDto refreshToken(String refreshToken) {
        String phoneNumber = getUserNameFromJwtToken(refreshToken);
        UserEntity user = userService.getByPhoneNumber(phoneNumber);
        if (user.isDeleted())
            throw new UnknownUserException();
        if(user.getUserStatus()== UserStatus.LOCKED)
            throw new UserLockedException();
        if(user.getUserStatus()== UserStatus.SUSPENDED)
            throw new UserSuspendedException();

        //TODO check user status and handel suspend locked and other
        RefreshTokenDto refreshTokenDto = new RefreshTokenDto();
        refreshTokenDto.setToken(getjwt(userjwtExpirationInMs, phoneNumber));
        refreshTokenDto.setRefreshToken(getjwt(refreshTokenJwtExpirationInMs, phoneNumber));
        return refreshTokenDto;
    }

    private String resolveToken(HttpServletRequest req) {
        //Bearer key...
        String bearerToken = req.getHeader(jwtHeaderString);
        if (bearerToken != null && bearerToken.startsWith(jwtTokenPrefix)) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }


    public UserEntity getCurrentUser(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return null;// userService.findByUsername(claims.getSubject());
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
}
