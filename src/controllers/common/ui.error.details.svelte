<script>
  export let item = {};
</script>

<h2 class="h2">Ошибка {item.errorID}</h2>
<div class="container">
  <div class="columns">
    <div class="column is-one-fifth">Название</div>
    <div class="column">{item.details.name}</div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Сообщение</div>
    <div class="column">{item.details.message}</div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Стэк вызовов</div>
    <div class="column"><pre>{@html item.details.stack}</pre></div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Дополнительная информация</div>
    <div class="column"><pre>{@html item.options}</pre></div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Окружение</div>
    <div class="column"><pre>{@html item.env}</pre></div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Дата создания</div>
    <div class="column">{item.createdAt}</div>
  </div>

</div>
