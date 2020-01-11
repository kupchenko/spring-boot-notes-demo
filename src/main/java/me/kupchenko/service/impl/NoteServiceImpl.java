package me.kupchenko.service.impl;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.dto.ResponsePagination;
import me.kupchenko.exception.NoteNotFoundException;
import me.kupchenko.mapper.NoteMapper;
import me.kupchenko.model.Note;
import me.kupchenko.repository.NoteRepository;
import me.kupchenko.service.NoteService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;
    private NoteMapper noteMapper;

    @Override
    public Note getNote(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(NoteNotFoundException::new);
    }

    @Override
    public Note createNote(NoteDto noteDto) {
        Note note = null;//
        return noteRepository.save(note);
    }

    @Override
    public Note replaceNote(Long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .map(n -> replaceAllFields(n, noteDto, "id"))
                .orElseThrow(NoteNotFoundException::new);
        return noteRepository.save(note);
    }

    @Override
    public Note updateNote(Long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .orElseThrow(NoteNotFoundException::new);
//        replace fields
        return noteRepository.save(note);
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

        Pageable pageable = PageRequest.of(searchDto.getPageNumber(), searchDto.getRows().intValue());
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
        pagination.setStart(searchDto.getStart());
        return pagination;
    }

    private ResponsePagination getDefaultResponsePagination(Supplier<Long> countSupplier) {
        ResponsePagination pagination = new ResponsePagination();
        Long count = countSupplier.get();
        pagination.setNumFound(count);
        return pagination;
    }

    private Note replaceAllFields(Note note, NoteDto noteDto, String... excludeFields) {
        List<String> excludeFieldsList = Arrays.asList(excludeFields);
        Map<String, Object> collect = Arrays.stream(noteDto.getClass().getDeclaredFields())
                .collect(Collectors.toMap(Field::getName, field -> getObjectFieldValue(noteDto, field)));

        Arrays.stream(note.getClass().getDeclaredFields())
                .filter(field -> !excludeFieldsList.contains(field.getName()))
                .forEach(field -> {
                    setObjectFieldValue(note, collect, field);
                });
        return note;
    }

    @SneakyThrows
    private void setObjectFieldValue(Note note, Map<String, Object> collect, Field field) {
        field.setAccessible(true);
        String name = field.getName();
        field.set(note, collect.get(name));
    }

    @SneakyThrows
    private Object getObjectFieldValue(NoteDto noteDto, Field field) {
        field.setAccessible(true);
        return field.get(noteDto);
    }
}
