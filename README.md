# shu javascript library

## 1. 说明

自己实现[underscore](https://underscorejs.org/)库中的所有方法

## 2. 结构

```
collections.js                      搜集类方法
    - each
    - map
    - reduce
    - reduceRight
    - find
    - filter
    - where
    - findWhere
    - reject
    - every
    - some
    - contains
    - invoke
    - pluck
    - max
    - min
    - sortBy
    - groupBy
    - indexBy
    - countBy
    - shuffle
    - sample
    - toArray
    - size
    - partition

array.js                            数组类方法
    - first
    - initial
    - last
    - rest
    - compact
    - flatten
    - without
    - union
    - intersection
    - difference
    - uniq
    - zip
    - object
    - indexOf
    - lastIndexOf
    - sortedIndex
    - range

functions.js                        函数类方法
    - bind
    - bindAll
    - partial
    - memoize
    - delay
    - defer
    - throttle
    - debounce
    - once
    - after
    - before
    - wrap
    - negate
    - compose

objects.js                          对象类方法
    - keys
    - values
    - pairs
    - invert
    - functions
    - extend
    - pick
    - omit
    - defaults
    - clone
    - tap
    - has
    - matches
    - property
    - isEqual
    - isEmpty
    - isElement
    - isArray
    - isObject
    - isArguments
    - isFunction
    - isString
    - isNumber
    - isFinite
    - isBoolean
    - isDate
    - isRegExp
    - isNaN
    - isNull
    - isUndefined

utility.js                          工具类方法
    - noConflict
    - identity
    - constant
    - noop
    - times
    - random
    - mixin
    - iteratee
    - uniqueId
    - escape
    - unescape
    - result
    - now
    - template

chainning.js                        链式调用方法
    -chain
    -value

shu.js                              总文件集合
```