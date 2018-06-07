```sass
// Данный отрывок кода не попадет в CSS, так как %equal-heights никогда не расширялся.
%equal-heights
  display: flex
  flex-wrap: wrap

// Данный отрывок кода попадет в CSS потому, что %message-shared расширен.
%message-shared
  border: 1px solid #ccc
  padding: 10px
  color: #333

.message
  @extend %message-shared

.success
  @extend %message-shared
  border-color: green


.error
  @extend %message-shared
  border-color: red


.warning
  @extend %message-shared
  border-color: yellow

```
