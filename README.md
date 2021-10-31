# Money Track

A simple way to track transaction locally

## Index

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Idea](#idea)
- [Usage](#usage)
  - [Usage Examples](#usage-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Idea

I always have my terminal open, I also like to have all my tools in one place.

I needed a way to track my transaction with my friend and family and I thought "_why not_".

## Usage

Use `mt` as prefix to any command.

**Flags**:

| flag         | alias | Type of flag | does                                                                      |
| :----------- | :---- | :----------- | :------------------------------------------------------------------------ |
| help         |       | bool         | explains how money-track<br/>works                                        |
| list         | l     | boll         | shows complete list of<br/>unresolved transaction                         |
| showResolved | sr    | bool         | shows transaction like in<br/>list including resolved ones                |
| resolve      | R     | number       | set specified transaction<br/>as resolved                                 |
| togive       | g     | number       | lets you set the amount of<br/>money to give to someone                   |
| toreceive    | r     | number       | lets you set the amount of<br/>money to receive from someone              |
| target       | T     | string       | lets you set the target<br/>of the transaction                            |
| descrption   | d     | string       | set the description of the<br/>transaction                                |
| importance   | i     | number       | set the importance of the<br/>transaction as a value<br/>beteween 1 and 3 |
| delete       | D     | number       | deletes specified transaction                                             |

### Usage Examples

Creating a transaction to remind me to give Pedro 40.30€:  

- `mt "Title of the transaction" -g 40.3 -T "my friend Pedro" -d "Awesome description"`

Asking to show all the transaction (including resolved ones):  

- `mt --list --showResolved`
- `mt --list --sr`
- `mt --sr`  
