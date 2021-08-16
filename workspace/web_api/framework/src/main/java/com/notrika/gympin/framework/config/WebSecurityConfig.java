package com.notrika.gympin.framework.config;

import com.notrika.gympin.common.user.service.AccountService;
import com.notrika.gympin.domain.user.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AccountService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Cross-origin-resource-sharing: localhost:8080, localhost:4200(allow for it.)
        http//We will handle it later.
                //Cross side request forgery
                .cors().and().csrf().disable()
//                .cors().and()
                .authorizeRequests()
                //These are public paths
                .antMatchers(

                        "/",
                        "/v2/api-docs",           // swagger
                        "/webjars/**",            // swagger-ui webjars
                        "/swagger-resources/**",  // swagger-ui resources
                        "/configuration/**",      // swagger configuration
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js",
                        "/resources/**",
                        "/error",
                        "/downloadFile/*",
                        "/auth/**",
                        "/v2/swagger-ui/**",
                        "/swagger-ui/**",
                        "/api/v1/user/sendsms",
                        "/api/v1/user/register",
                        "/api/v1/user/loginpanel",
                        "/api/**"

                )
                .permitAll()
                //These can be reachable for just have admin role.
                //All remaining paths should need authentication.
                .anyRequest().fullyAuthenticated()

                //logout will log the user out by invalidated session.
//                .and().logout().permitAll()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST"))

                //login form and path
                .and().formLogin().loginPage("http://localhost:3000/")
                //enable basic authentication
                .and().httpBasic();

        //jwt filter
    }

//    @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                // we don't need CSRF because our token is invulnerable
//                .csrf().disable()
//
//
//                // don't create session
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//
//                .authorizeRequests()
//                //.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//
//                // allow anonymous resource requests
//                .antMatchers(
//                        HttpMethod.GET,
//                        "/",
//                        "/v2/api-docs",           // swagger
//                        "/webjars/**",            // swagger-ui webjars
//                        "/swagger-resources/**",  // swagger-ui resources
//                        "/configuration/**",      // swagger configuration
//                        "/*.html",
//                        "/favicon.ico",
//                        "/**/*.html",
//                        "/**/*.css",
//                        "/**/*.js"
//                ).permitAll()
//                .antMatchers("/auth/**").permitAll()
//                .anyRequest().authenticated();
//
//        // Custom JWT based security filter
//        httpSecurity
//                .addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtTokenProvider));
//
//        // disable page caching
//        httpSecurity.headers().cacheControl();
//    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        auth.inMemoryAuthentication()
                .passwordEncoder(passwordEncoder())
                .withUser("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER");
    }

    //Cross origin resource sharing.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("PUT", "DELETE", "POST", "GET")
                        .allowCredentials(false).maxAge(3600);
            }
        };
    }
}
