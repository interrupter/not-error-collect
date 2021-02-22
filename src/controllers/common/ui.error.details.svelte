<script>
  export let item = {};
</script>

<h2 class="h2">Ошибка {item.errorID}</h2>
<div class="container">
  <div class="columns">
    <div class="column is-one-fifth">Локализованное время</div>
    <div class="column">{item.datetime}</div>
  </div>
  <h3 class="h3">Ошибка</h3>
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
  {#if item.parent }
  <h3 class="h3">Ошибка оригинал</h3>
  <div class="columns">
    <div class="column is-one-fifth">Название</div>
    <div class="column">{item.parent.name}</div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Сообщение</div>
    <div class="column">{item.parent.message}</div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">Стэк вызовов</div>
    <div class="column"><pre>{@html item.parent.stack}</pre></div>
  </div>
  {/if}
  <div class="columns">
    <div class="column is-one-fifth">Дата создания</div>
    <div class="column">{item.createdAt}</div>
  </div>

</div>
