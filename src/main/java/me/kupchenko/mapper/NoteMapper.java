package me.kupchenko.mapper;

import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    @Mapping(ignore = true, target = "owner")
    Note noteDtoToNote(NoteDto noteDto);

    NoteDto noteToNoteDto(Note note);

    List<NoteDto> noteListToNoteDtoList(List<Note> notes);
}
