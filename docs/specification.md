# Introduction

XMindMark is a lightweight markup language for **mind mapping** inspired by **markdown**. It is designed to present structures and elements of a mind map easily. And we usually write it by plain text in files which has `.xmindmark` extension name.

However, if you're not familiar with core concepts of Mind Map yet, you might need:
- [Explore and try XMind](https://www.xmind.net) - the most professional and popular mind mapping tool.
- Or take a glance at [Wikipedia](https://en.wikipedia.org/wiki/Mind_map) about Mind Map.

# Getting started

## Central Topic

The first line of XMindMark will be considered as central topic, any empty lines before will be ignored.

```
Central Topic
```

## Main Topics / Sub Topics

You can describe sub-topics by starting a new line with `-` or `*`, with at least one space. Like:

```
Central Topic

- Main Topic 1
- Main Topic 2
```

Empty lines between sub-topics of the same level will be ignored.

```
Central Topic

* Main Topic 1

* Main Topic 2

* Main Topic 3
```

Main Topics (the first level of sub-topic) should have **no** indent, however, you need apply indent to other sub-topics of deeper level.

**NOTE**: One Tab (`\t`) will be treated as Four spaces.

```
Central Topic

- Main Topic 1

- Main Topic 2
    * Subtopic 2.1
    * Subtopic 2.2

- Main Topic 3
    * Subtopic 3.1
        - Subtopic 3.1.1
        - Subtopic 3.1.2
    * Subtopic 3.2
```

> Floating Topic is not supported yet.


# Relationship

***Syntax: `[<number>]` - This marker symbol indicates a specific [Relationship](#Relationship).***

First, mark a topic by  `[<number>]`, like `[1]`. The number marker should appeared at the end of the topic content. The number  itself makes no sence and do not have to be continuous.

Then append `[^<number>]` (like `[^1]`), at the end of the aforesaid topic.

**NOTE**: Relationship created only when the source topic and target topic have a same `<number>`

```
* To topic [1]
* Topic
    - From topic [^1]
```
If you must use `[]` within topic content, write `\[\]` instead. (like in Markdown).

Spaces within `[]` which follows a topic content is NOT allowed.

### Relationship with title

Write your relationship title content within `()` after `[^<number>]`
```
* To topic [1]
* From topic [^1](Relationship Title)
```

## Boundary

***Syntax: `[B<number?>]` - This marker symbol indicates a specific boundary. `?` means that the number is optional.***

Appending `[B<number?>]` after topic content means that the specific topic will be wrapped by a boundary. 

If there are multiple topics continuously at the same level with `[B<number?>]` followed, respectively, they will be wrapped by the same boundary. Like this:

```
* topic 1 [B]
* topic 2 [B]
```

```
* topic 1 [B1]
* topic 2 [B1]
```

Both of above example described that two topics will be wrapped by a same boundary.


### Multiple boundaries

If there are multiple boundaries in a group of topics at the same level, make sure add numbers after `B` to diffrentiate every boundary:

```
- main topic
    * topic 1 [B1]
    * topic 2 [B1]
    * topic 3 [B2]
    * topic 4 [B2]
```

In this example, "topic 1" and "topic 2" will wrapped by a boundary, however "topic 3" and "topic 4" will wrapped by another boundary.


### Boundary title

Boundary can also have a title. To do this:
1. Perform a separatly line with the same indent depth, after the topic(s) it wrapped.
2. Started with `[B]` or `[B<number>]:` and one space, to declare which boundary it points to.
3. Write your boundary title.

```
- main topic
    * topic 1 [B]
    * topic 2 [B]
    [B]: Boundary Title
```

In this example, the boundary wrapped "topic 1" and "topic 2" has title with content "Boundary title"


### Boundary with [Relationship](#Relationship)

We treat boundary title as a normal topic, so you can simply append `[<number>]` or `[^<number>]` to boundary title or topic, just like aforesaid.

```
- main topic
    * topic 1 [B]
    * topic 2 [B]
    [B]: Boundary Title [1]
- main topic [^1]
```

In this example, we described a relationship connects "main topic" with a boundary which wrapped "topic 1" and "topic 2".


## Summary

***Syntax: `[B<number?>]` - This marker symbol indicates a specific summary. `?` means that the number is optional.***


Similar to [Boundary](#Boundary), we describe Summary by `[S<number?>]`. 

Logically, Summary is also a topic, if you forgot edit title for your summary topic by  `[S<number?>]: ...`, We will create a default topic for you. This will reflected in the [XMind](https://xmind.net/) file transformed by this XMindMark file.

```
* topic 1 [S]
* topic 2 [S]
[S]: Summary Topic
```
```
* topic 1 [S1]
* topic 2 [S1]
[S1]: Summary Topic
```

Both of above examples created a summary topic for "topic 1" and "topic 2" with topic content: "Summary Topic"


### Summary with sub-topics

The difference with [Boundary](#Boundary) is that Summary topic could have sub-topics of itself:

```
* topic 1 [S]
* topic 2 [S]
[S]: Summary Topic
    - subtopic 1
    - subtopic 2
```

So you can perform [Boundary](#Boundary), [Relationship](#Relationship) with summary topic and it's sub-topics just like other normal topics:

```
* topic 1 [S]
* topic 2 [S][1]
[S]: Summary Topic[^1]
    - subtopic 1 [B]
    - subtopic 2 [B]
```


# Advanced usage

### Perform multiple marker symbol at one topic

Every marker symbol of topic must be placed after topic content without any spaces. Like:

```

Seasons of 2021

- Spring [1]
- Summer [B1]
- Autumn [B1][^1](Cool)[S1]
- Winter [S1]
```

In the example above, "Summer" and "Autumn" will be wrapped by a boundary, "Autumn" and "Winter" will be wrapped by a summary topic, a relationship will connected "Spring" and "Autumn" with title: "Cool".
