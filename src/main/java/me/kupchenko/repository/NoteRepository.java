package me.kupchenko.repository;

import me.kupchenko.model.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {
    @Override
    List<Note> findAll();

    List<Note> findAllByOwner(String userId);

    @Query(value = "select new Note(n.id, n.title, concat(substring(n.content, 1, 20), '...'), n.owner, n.createdTs, n.updatedTs)  " +
            "from Note n where (n.content LIKE :content or n.title LIKE :content) and n.owner = :userId order by n.updatedTs desc")
    List<Note> findAll(String content, String userId, Pageable pageable);

    long countByOwner(String id);

    @Query(value = "select count(n) from Note n where (n.content LIKE :content or n.title LIKE :content) and n.owner = :userId")
    long countTotalNotesByCriteria(String content, String userId);
}
