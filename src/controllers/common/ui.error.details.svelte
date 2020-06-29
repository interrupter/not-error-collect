<script>
  export let item = {};
</script>

<h2 class="h2">Ошибка {item.errorID}</h2>
<div class="container">
  <div class="columns">
    <div class="column">Название</div>
    <div class="column">{item.details.name}</div>
  </div>
  <div class="columns">
    <div class="column">Сообщение</div>
    <div class="column">{item.details.message}</div>
  </div>
  <div class="columns">
    <div class="column">Стэк вызовов</div>
    <div class="column">{item.details.stack}</div>
  </div>
  <div class="columns">
    <div class="column">Дополнительная информация</div>
    <div class="column">{item.options}</div>
  </div>
  <div class="columns">
    <div class="column">Окружение</div>
    <div class="column">{item.env}</div>
  </div>
  <div class="columns">
    <div class="column">Дата создания</div>
    <div class="column">{item.createdAt}</div>
  </div>

</div>
