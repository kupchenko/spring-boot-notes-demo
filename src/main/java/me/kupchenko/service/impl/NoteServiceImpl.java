package me.kupchenko.service.impl;

import lombok.AllArgsConstructor;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.exception.NoteNotFoundException;
import me.kupchenko.model.Note;
import me.kupchenko.model.Notes;
import me.kupchenko.repository.NoteRepository;
import me.kupchenko.service.NoteService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;

    @Override
    public Optional<Note> getNote(Long id) {
        return noteRepository.findById(id);
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
        return null;
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
        return null;
    }
}
