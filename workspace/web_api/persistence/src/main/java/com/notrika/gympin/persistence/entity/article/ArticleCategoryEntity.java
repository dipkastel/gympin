package com.notrika.gympin.persistence.entity.article;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "articleCategory")
public class ArticleCategoryEntity extends BaseEntityWithCreateUpdate<ArticleCategoryEntity> {

    @Column(name = "name", nullable = false)
    private String name;


    @ManyToMany(mappedBy = "categories",fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private List<ArticleEntity> articleList;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ArticleCategoryEntity that = (ArticleCategoryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
