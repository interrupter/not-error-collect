<script>
  import {onMount} from 'svelte';
  export let value        = {};

</script>


<div class="control">
  <p class="title is-6">Название</p>
  <pre>
    <code>{value.name}</code>
  </pre>
  <p class="title is-6">Сообщение</p>
  <pre>
    <code>{value.message}</code>
  </pre>
  <p class="title is-6">Стэк вызова</p>
  <pre>
    <code>{value.stack}</code>
  </pre>
</div>
