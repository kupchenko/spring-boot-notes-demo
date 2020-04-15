package me.kupchenko.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.kupchenko.config.WithMockOAuth2User;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import me.kupchenko.repository.NoteRepository;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static me.kupchenko.TestUtils.getResourceFileAsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockOAuth2User(username = "user", roles = {"ROLE_USER", "ROLE_ADMIN"}, scopes = "notes")
@Sql(value = {"/db/schema.sql", "/db/data.sql"})
public class NotesControllerTest extends BaseControllerTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private NoteRepository noteRepository;

    @Test
    public void getNotes_shouldReturnAllNotesForUser() throws Exception {
        mvc.perform(get("/notes/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.notes", hasSize(1)))
                .andExpect(jsonPath("$.notes[0].title", is("My test note")))
                .andExpect(jsonPath("$.pagination.numFound", is(1)));
    }

    @Test
    public void createNotes_shouldCreateNote() throws Exception {
        String payload = getResourceFileAsString(getClass(), "payload/createNote.json");

        MvcResult result = mvc.perform(post("/notes")
                .content(payload)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .with(csrf().asHeader())
        )
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = result.getResponse().getContentAsString();
        NoteDto responseDto = objectMapper.reader().forType(NoteDto.class).readValue(contentAsString);
        Note note = noteRepository.findById(responseDto.getId()).orElseThrow(AssertionError::new);

        Assert.assertThat(note.getTitle(), is("Note title"));
        Assert.assertThat(note.getContent(), is("Note content"));
    }
}