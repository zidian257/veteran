# 常见操作梳理

## 删除

设置行号: 键入 `:set number`

### 删除整行

进入 `command mode` 之后（ESC） 键入 `:d` 或者直接 `dd`。

### 删除全部行

进入 `command mode` 之后（ESC） 键入 `:%d`

### 删除指定行

进入 `command mode` 之后（ESC） 键入 `:[start line number][ending line number]d`

e.g: `:8,12d` 


## 如何撤销上一个操作/输入(undo)

进入 `command mode` 之后，键入 `u`、`:u`、`:undo`，这 3 种都是可以的。

如果想要撤销足够多的操作，可以类似：`4u`，撤销 4 个操作。 

## 如何反撤销上一个撤销（redo）

进入 `command mode` 之后，Ctrl + R 键实现 Redo

## 如何批量替换

e.g.: 括号与方括号的替换：`(地址)[/foo]` to `[地址](/foo)`



## 如何进行选定区域的复制粘贴？
