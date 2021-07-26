package com.notrika.web_api.config;

import com.notrika.web_api.data.services.UserDetailsServiceImpl;
import com.notrika.web_api.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        //Cross-origin-resource-sharing: localhost:8080, localhost:4200(allow for it.)
        http//We will handle it later.
                //Cross side request forgery
                .csrf().disable()
//                .cors().and()
                .authorizeRequests()
                //These are public paths
                .antMatchers(

                        HttpMethod.GET,
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
                        "/api/user/**" ,
                        "/downloadFile/*",
                        "/auth/**"
                )
                .permitAll()
                //These can be reachable for just have admin role.
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                //All remaining paths should need authentication.
                .anyRequest().fullyAuthenticated()

                //logout will log the user out by invalidated session.
               .and().logout().permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST"))

                //login form and path
                .and().formLogin().loginPage("/api/user/login").and()
                //enable basic authentication
                .httpBasic().and();

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
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    //Cross origin resource sharing.
    @Bean
    public WebMvcConfigurer corsConfigurer()
    {
        return new WebMvcConfigurer()
        {
            @Override
            public void addCorsMappings(CorsRegistry registry)
            {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }
}
