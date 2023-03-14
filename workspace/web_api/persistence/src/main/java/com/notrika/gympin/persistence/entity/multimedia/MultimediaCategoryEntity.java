package com.notrika.gympin.persistence.entity.multimedia;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.UserMultimediaEntity;
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
@Table(name = "multimediaCategory")
public class MultimediaCategoryEntity extends BaseEntity<MultimediaCategoryEntity> {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    //aspect ratio width
    @Column(name = "arw")
    private Integer arw;

    //aspect ratio height
    @Column(name = "arh")
    private Integer arh;

    @Column(name = "minw")
    private Integer minw;
    @Column(name = "minh")
    private Integer minh;
    @Column(name = "maxw")
    private Integer maxw;
    @Column(name = "maxh")
    private Integer maxh;


    @OneToMany(mappedBy = "category")
    @ToString.Exclude
    private List<MultimediaEntity> multimediaList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MultimediaCategoryEntity that = (MultimediaCategoryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
