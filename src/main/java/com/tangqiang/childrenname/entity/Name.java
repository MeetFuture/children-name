package com.tangqiang.childrenname.entity;

import javax.persistence.*;

/**
 * 名字实体
 *
 * @author tqiang
 * @date 2019-08-30 14:39
 */
@Entity
@Table(name = "NAME")
public class Name {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 64)
    private String name;
    @Column(length = 64)
    private Double score;
    @Column(length = 102400)
    private String desc;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }


    @Override
    public String toString() {
        return "Name{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", score=" + score +
                ", desc='" + desc + '\'' +
                '}';
    }
}
