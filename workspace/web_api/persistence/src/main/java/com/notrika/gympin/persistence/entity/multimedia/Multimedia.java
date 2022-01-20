package com.notrika.gympin.persistence.entity.multimedia;

import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "multimedia")
public class Multimedia extends BaseEntityWithCreateUpdate {

    @ManyToOne(cascade = CascadeType.ALL,optional = false,fetch = FetchType.LAZY)
    private User user;

    @Column(name = "file_name",nullable = false)
    private String fileName;

    @Column(name = "media_type",nullable = false)
    private MediaType mediaType;

    @Column(name = "document_format")
    private String documentFormat;

    @Column(name = "upload_dir")
    private String uploadDir;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "multimedia")
    @ToString.Exclude
    private List<SportMultimedia> multimedias;

    @ManyToMany
    @JoinTable(
            name = "multimedia_multimedia_category",
            joinColumns = @JoinColumn(name = "multimedia_id"),
            inverseJoinColumns = @JoinColumn(name = "multimedia_category_id"))
    @ToString.Exclude
    private List<MultimediaCategory> categories;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Multimedia that = (Multimedia) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return 606785354;
    }
}
