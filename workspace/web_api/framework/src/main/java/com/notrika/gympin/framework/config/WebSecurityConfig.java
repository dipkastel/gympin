package com.notrika.gympin.framework.config;

import com.notrika.gympin.common.user.user.service.AccountService;
import com.notrika.gympin.framework.config.jwt.AuthEntryPointJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private AccountService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers(
                        "/swagger-ui/**"
                        ,"/swagger-resources/**"
                        ,"/v2/api-docs/**"
                        ,"/v2/swagger-ui/**"
                        ,"/api/resource/image"
                        ,"/api/resource/audio"
                        ,"/api/resource/video"
                        ,"/api/v1/account/sendsms"
                        ,"/api/v1/account/login"
                        ,"/api/v1/account/registerByInviteCode"
                        ,"/api/v1/account/requestRegisterPlace"
                        ,"/api/v1/account/requestRegisterCorporate"
                        ,"/api/v1/account/requestRegisterAdvise"
                        ,"/api/v1/account/requestPublicMessage"
                        ,"/api/v1/account/refreshToken"
                        ,"/api/v1/configs/AndroidSplash"
                        ,"/api/v1/configs/IosSplash"
                        ,"/api/v1/configs/WebAppSplash"
                        ,"/api/v1/configs/MasterSplash"
                        ,"/api/v1/configs/CorporateSplash"
                        ,"/api/v1/configs/AdminPanelSplash"
                        ,"/api/v1/homepage/getHome"
                        ,"/api/v1/location/getAllPlace"
                        ,"/api/v1/location/getPlaceById"
                        ,"/api/v1/location/query"
                        ,"/api/v1/place/getAll"
                        ,"/api/v1/place/getById"
                        ,"/api/v1/place/query"
                        ,"/api/v1/ticketSubscribe/getTicketSubscribesByPlace"
                        ,"/api/v1/TicketSubscribe/getByPlace"
                        ,"/api/v1/placeAbout/getByPlaceId"
                        ,"/api/v1/OptionOfPlace/getByPlaceId"
                        ,"/api/v1/OptionOfPlace/getByPlaceId"
                        ,"/api/v1/TicketSubscribeAction/getByTicketSubscribe"
                        ,"/api/v1/sport/query"
                        ,"/api/v1/article/query"
                        ,"/api/v1/article/getById"
                        ,"/api/v1/Gateway/PersianCallbackMethod"
                )
                .permitAll()
                .antMatchers("/api/test/**")
                .permitAll()
                .anyRequest()
                .authenticated();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        auth.inMemoryAuthentication().passwordEncoder(passwordEncoder()).withUser("09365375024").password(passwordEncoder().encode("123456")).roles("ADMIN");
    }

    //Cross origin resource sharing.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**").allowedOrigins("*").allowedMethods("PUT", "DELETE", "POST", "GET").allowCredentials(false).maxAge(3600);
            }
        };
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/api/v1/mainpagelayoutcollection/**","/api/v1/mainpagelayoutchilditem/**","/api/v1/mainpagelayoutitem/**");
    }

    @Bean
    public GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    }
}
