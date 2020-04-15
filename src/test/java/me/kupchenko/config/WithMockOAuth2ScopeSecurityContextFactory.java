package me.kupchenko.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class WithMockOAuth2ScopeSecurityContextFactory implements WithSecurityContextFactory<WithMockOAuth2User> {

    @Override
    public SecurityContext createSecurityContext(WithMockOAuth2User user) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Set<String> scope = Set.of(user.scopes());
        List<SimpleGrantedAuthority> authorities = Arrays.stream(user.roles()).map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        Jwt jwt = Jwt.withTokenValue("token")
                .header("alg", "none")
                .subject(user.username())
                .claim("user-id", user.username())
                .claim("roles", authorities)
                .claim("scopes", scope)
                .build();
        Authentication auth = new JwtAuthenticationToken(jwt, Collections.emptyList());
        context.setAuthentication(auth);

        return context;
    }
}
