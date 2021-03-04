package com.coreyhclay.springjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private boolean published;

    @Column(name = "slot1")
    private String slot1;

    @Column(name = "slot2")
    private String slot2;

    @Column(name = "slot3")
    private String slot3;

    @Column(name = "slot4")
    private String slot4;

    public Team() {
    }

    public Team(String title, String description, boolean published, String slot1, String slot2, String slot3,
            String slot4) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
        this.slot4 = slot4;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean isPublished) {
        this.published = isPublished;
    }

    @Override
    public String toString() {
        return "Team [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + ", slot1="
                + slot1 + ", slot2=" + slot2 + ", slot3=" + slot3 + ", slot4=" + slot4 + " ]";
    }

    public String getSlot1() {
        return slot1;
    }

    public void setSlot1(String slot1) {
        this.slot1 = slot1;
    }

    public String getSlot2() {
        return slot2;
    }

    public void setSlot2(String slot2) {
        this.slot2 = slot2;
    }

    public String getSlot3() {
        return slot3;
    }

    public void setSlot3(String slot3) {
        this.slot3 = slot3;
    }

    public String getSlot4() {
        return slot4;
    }

    public void setSlot4(String slot4) {
        this.slot4 = slot4;
    }

}
