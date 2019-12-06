package me.kupchenko.service.impl;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.exception.NoteNotFoundException;
import me.kupchenko.model.Note;
import me.kupchenko.model.Notes;
import me.kupchenko.repository.NoteRepository;
import me.kupchenko.service.NoteService;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;

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
    public Notes getNotes() {
        return new Notes(noteRepository.findAll());
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
