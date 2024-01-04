package com.notrika.gympin.persistence.entity.article;

import com.notrika.gympin.common.article.enums.ArticleStatus;
import com.notrika.gympin.common.article.enums.ArticleType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
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
@Table(name = "article")
public class ArticleEntity extends BaseEntityWithCreateUpdate<ArticleEntity> {


    @Column(name = "title")
    private String title;

    @Column(name = "fullText",columnDefinition = "longtext")
    private String text;

    @Column(name = "summary",columnDefinition = "longtext")
    private String summary;

    @Column(name = "articleStatus",columnDefinition = "varchar(255) default 'DRAFT' ")
    @Enumerated(EnumType.STRING)
    private ArticleStatus articleStatus;

    @Column(name = "articleType",columnDefinition = "varchar(255) default 'SIMPLE' ")
    @Enumerated(EnumType.STRING)
    private ArticleType articleType;

    @OneToOne
    @ToString.Exclude
    private MultimediaEntity articleImage;

    @ManyToMany
    @JoinTable(name = "ArticleCategories", joinColumns = @JoinColumn(name = "categoryId"), inverseJoinColumns = @JoinColumn(name = "ArticleId"))
    @ToString.Exclude
    private List<ArticleCategoryEntity> categories;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ArticleEntity that = (ArticleEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
