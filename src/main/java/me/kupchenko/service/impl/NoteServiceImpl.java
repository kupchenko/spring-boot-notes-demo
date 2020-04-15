package me.kupchenko.service.impl;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.auth.service.dto.UserDto;
import me.kupchenko.dto.AdminNotesResponseDto;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.dto.ResponsePagination;
import me.kupchenko.exception.NoteNotFoundException;
import me.kupchenko.mapper.NoteMapper;
import me.kupchenko.model.Note;
import me.kupchenko.repository.NoteRepository;
import me.kupchenko.service.NoteService;
import me.kupchenko.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.LongSupplier;

@Slf4j
@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;
    private NoteMapper noteMapper;
    private UserService userService;

    @Override
    public ExtendedNoteDto getNote(String userId, Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(userId, id));

        validateNote(userId, note);

        return noteMapper.noteToExtendedNoteDto(note);
    }

    private void validateNote(String userId, Note note) {
        if (!note.getOwner().equals(userId)) {
            throw new NoteNotFoundException(userId, note.getId());
        }
    }

    @Override
    public NoteDto createNote(CreateNoteDto noteDto) {
        Note note = noteMapper.noteDtoToNote(noteDto);
        note.setUpdatedTs(LocalDateTime.now());
        note.setCreatedTs(LocalDateTime.now());
        Note newNote = noteRepository.save(note);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public NoteDto replaceNote(String userId, NoteDto noteDto) {
        Note changedNote = noteRepository.findById(noteDto.getId())
                .filter(note -> note.getOwner().equals(userId))
                .map(note -> replaceAllFields(note, noteDto, "id", "createdTs", "updatedTs"))
                .orElseThrow(() -> new NoteNotFoundException(userId, noteDto.getId()));

        Note newNote = noteRepository.save(changedNote);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public NoteDto updateNote(Long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("unknown", id));
//        replace fields
        Note newNote = noteRepository.save(note);
        return noteMapper.noteToNoteDto(newNote);
    }

    @Override
    public void deleteNote(String userId, Long noteId) {
        Note noteForDelete = noteRepository.findById(noteId)
                .filter(note -> note.getOwner().equals(userId))
                .orElseThrow(() -> new NoteNotFoundException(userId, noteId));
        noteRepository.delete(noteForDelete);
    }

    @Override
    public NotesResponseDto getNotes() {
        List<Note> notes = noteRepository.findAll();
        List<NoteDto> noteDtos = noteMapper.noteListToNoteDtoList(notes);
        ResponsePagination responsePagination = getDefaultResponsePagination(() -> noteRepository.count());
        return new NotesResponseDto(noteDtos, responsePagination);
    }

    @Override
    public NotesResponseDto getNotesByUserId(String userId) {
        List<Note> userNotes = noteRepository.findAllByOwner(userId);
        List<NoteDto> userNotesDtos = noteMapper.noteListToNoteDtoList(userNotes);
        ResponsePagination responsePagination = getDefaultResponsePagination(() -> noteRepository.countByOwner(userId));
        return new NotesResponseDto(userNotesDtos, responsePagination);
    }

    @Override
    public NotesResponseDto searchUserNotes(String userId, NotesSearchDto searchDto) {
        String content = "%" + searchDto.getText() + "%";
        ResponsePagination pagination = getResponsePagination(searchDto, () -> noteRepository.countTotalNotesByCriteria(content, userId));

        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getRows());
        List<Note> userNotes = noteRepository.findAll(content, userId, pageable);
        List<NoteDto> userNotesDtos = noteMapper.noteListToNoteDtoList(userNotes);
        return new NotesResponseDto(userNotesDtos, pagination);
    }

    @Override
    public ExtendedNoteDto getNote(Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new NoteNotFoundException("unknown", noteId));
        UserDto user = userService.findById(note.getOwner());
        ExtendedNoteDto extendedNoteDto = noteMapper.noteToExtendedNoteDto(note);
        extendedNoteDto.setUser(user);

        return extendedNoteDto;
    }

    @Override
    public AdminNotesResponseDto searchAdminUserNotes(String userId, NotesSearchDto searchDto) {
        NotesResponseDto note = searchUserNotes(userId, searchDto);
        UserDto user = userService.findById(userId);
        return AdminNotesResponseDto.builder()
                .notes(note.getNotes())
                .pagination(note.getPagination())
                .user(user)
                .build();
    }

    private ResponsePagination getResponsePagination(NotesSearchDto searchDto, LongSupplier countSupplier) {
        ResponsePagination pagination = new ResponsePagination();
        Long count = countSupplier.getAsLong();
        pagination.setNumFound(count);
        pagination.setRows(searchDto.getRows());
        pagination.setPage(searchDto.getPage());
        return pagination;
    }

    private ResponsePagination getDefaultResponsePagination(LongSupplier countSupplier) {
        ResponsePagination pagination = new ResponsePagination();
        Long count = countSupplier.getAsLong();
        pagination.setNumFound(count);
        return pagination;
    }

    private Note replaceAllFields(Note note, NoteDto noteDto, String... excludeFields) {
        List<String> excludeFieldsList = Arrays.asList(excludeFields);
        Map<String, Object> clazzFields = Arrays.stream(noteDto.getClass().getDeclaredFields())
                .collect(HashMap::new, (m, v) -> m.put(v.getName(), getObjectFieldValue(noteDto, v)), HashMap::putAll);

        Arrays.stream(note.getClass().getDeclaredFields())
                .filter(field -> !excludeFieldsList.contains(field.getName()))
                .forEach(field -> setObjectFieldValue(note, clazzFields, field));
        note.setUpdatedTs(LocalDateTime.now());
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
