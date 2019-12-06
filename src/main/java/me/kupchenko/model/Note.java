package me.kupchenko.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private Integer owner;
    @Column(name = "created_ts")
    private LocalDateTime createdTs;
    @Column(name = "updated_ts")
    private LocalDateTime updatedTs;
}
