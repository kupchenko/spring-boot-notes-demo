package me.kupchenko.mapper;

import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    @Mapping(ignore = true, target = "owner")
    Note noteDtoToNote(NoteDto noteDto);

    @Mappings({
            @Mapping(ignore = true, target = "id"),
            @Mapping(ignore = true, target = "createdTs"),
            @Mapping(ignore = true, target = "updatedTs"),
    })
    Note noteDtoToNote(CreateNoteDto noteDto);

    NoteDto noteToNoteDto(Note note);

    List<NoteDto> noteListToNoteDtoList(List<Note> notes);
}
