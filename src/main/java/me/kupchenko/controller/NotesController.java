package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NotesController {
    private NoteService noteService;

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto findNotes() {
        return noteService.getNotes();
    }

    @GetMapping(value = "/user", produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto searchUserNotes(Authentication auth,
                                            @Valid NotesSearchDto searchDto) {
        log.info("Searching notes for user {} by search criteria: {}", auth.getName(), searchDto);
        OAuth2AuthenticationDetails oauthDetails = (OAuth2AuthenticationDetails) auth.getDetails();
        Map<String, Object> details = (Map<String, Object>) oauthDetails.getDecodedDetails();
        Long userId = Long.parseLong(details.get("user-id").toString());
        return noteService.searchUserNotes(userId, searchDto);
    }
}
