package me.kupchenko.service.impl;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.dto.ResponsePagination;
import me.kupchenko.exception.NoteNotFoundException;
import me.kupchenko.mapper.NoteMapper;
import me.kupchenko.model.Note;
import me.kupchenko.model.User;
import me.kupchenko.repository.NoteRepository;
import me.kupchenko.repository.UserRepository;
import me.kupchenko.service.NoteService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

import static me.kupchenko.util.Constant.DEFAULT_ROWS_NUMBER;
import static me.kupchenko.util.Constant.DEFAULT_START_PAGE;

@Slf4j
@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;
    private UserRepository userRepository;
    private NoteMapper noteMapper;

    @Override
    public NoteDto getNote(Long id) {
        return noteRepository.findById(id)
                .map(noteMapper::noteToNoteDto)
                .orElseThrow(NoteNotFoundException::new);
    }

    @Override
    public NoteDto createNote(CreateNoteDto noteDto) {
        Note note = noteMapper.noteDtoToNote(noteDto);
        User user = userRepository.findById(noteDto.getUserId())
                .orElseThrow(IllegalArgumentException::new);
        note.setUser(user);
        note.setUpdatedTs(LocalDateTime.now());
        note.setCreatedTs(LocalDateTime.now());
        Note newNote = noteRepository.save(note);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public NoteDto replaceNote(Long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .map(n -> replaceAllFields(n, noteDto, "id", "createdTs", "updatedTs"))
                .orElseThrow(NoteNotFoundException::new);

        Note newNote = noteRepository.save(note);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public NoteDto updateNote(Long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .orElseThrow(NoteNotFoundException::new);
//        replace fields
        Note newNote = noteRepository.save(note);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NotesResponseDto getNotes() {
        List<Note> notes = noteRepository.findAll();
        List<NoteDto> noteDtos = noteMapper.noteListToNoteDtoList(notes);
        ResponsePagination responsePagination = getDefaultResponsePagination(() -> noteRepository.count());
        return new NotesResponseDto(noteDtos, responsePagination);
    }

    @Override
    public NotesResponseDto getNotesByUserId(Long userId) {
        List<Note> userNotes = noteRepository.findAllByUserId(userId);
        List<NoteDto> userNotesDtos = noteMapper.noteListToNoteDtoList(userNotes);
        ResponsePagination responsePagination = getDefaultResponsePagination(() -> noteRepository.countByUserId(userId));
        return new NotesResponseDto(userNotesDtos, responsePagination);
    }

    @Override
    public NotesResponseDto searchUserNotes(Long userId, NotesSearchDto searchDto) {
        String content = "%" + searchDto.getText() + "%";
        ResponsePagination pagination = getResponsePagination(searchDto, () -> noteRepository.countTotalNotesByCriteria(content, userId));

        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getRows());
        List<Note> userNotes = noteRepository.searchNotes(content, userId, pageable);
        List<NoteDto> userNotesDtos = noteMapper.noteListToNoteDtoList(userNotes);
//        log.info("Total found: {}, returning: {}, for filter '{}'", count, userNotesDtos.size(), searchDto.getText());
        return new NotesResponseDto(userNotesDtos, pagination);
    }

    private ResponsePagination getResponsePagination(NotesSearchDto searchDto, Supplier<Long> countSupplier) {
        ResponsePagination pagination = new ResponsePagination();
        Long count = countSupplier.get();
        pagination.setNumFound(count);
        pagination.setRows(searchDto.getRows());
        pagination.setPage(searchDto.getPage());
        return pagination;
    }

    private ResponsePagination getDefaultResponsePagination(Supplier<Long> countSupplier) {
        ResponsePagination pagination = new ResponsePagination();
        Long count = countSupplier.get();
        pagination.setNumFound(count);
        pagination.setPage(DEFAULT_START_PAGE);
        pagination.setRows(DEFAULT_ROWS_NUMBER);
        return pagination;
    }

    private Note replaceAllFields(Note note, NoteDto noteDto, String... excludeFields) {
        List<String> excludeFieldsList = Arrays.asList(excludeFields);
        Map<String, Object> clazzFields = Arrays.stream(noteDto.getClass().getDeclaredFields())
                .collect(HashMap::new, (m, v) -> m.put(v.getName(), getObjectFieldValue(noteDto, v)), HashMap::putAll);

        Arrays.stream(note.getClass().getDeclaredFields())
                .filter(field -> !excludeFieldsList.contains(field.getName()))
                .forEach(field -> {
                    setObjectFieldValue(note, clazzFields, field);
                });
        return note;
    }

    @SneakyThrows
    private void setObjectFieldValue(Note note, Map<String, Object> collect, Field field) {
        field.setAccessible(true);
        String name = field.getName();
        if (collect.containsKey(name)) {
            field.set(note, collect.get(name));
        }
    }

    @SneakyThrows
    private Object getObjectFieldValue(NoteDto noteDto, Field field) {
        field.setAccessible(true);
        return field.get(noteDto);
    }
}
