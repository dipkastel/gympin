package com.notrika.gympin.persistence.entity.multimedia;

import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "multimedia_category")
public class MultimediaCategory extends BaseEntity {

    @Column(name = "name",nullable = false,unique = true)
    private String name;

    @ManyToMany(mappedBy = "categories")
    private List<Multimedia> multimediaList;

}
