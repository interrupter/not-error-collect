<script>
  import hljs from 'highlight.js/lib/core';
  import hljson from 'highlight.js/lib/languages/json';
  import 'highlight.js/styles/github.css';

  hljs.registerLanguage('json', hljson);

  import {onMount} from 'svelte';

  export let value        = {};
  export let textVersion  = '{}';
  export let readonly     = false;

  onMount(()=>{
    if(!readonly){
      textVersion = JSON.stringify(value, null, 4);
    }
  });
</script>


<div class="">
  {#if readonly}
  <pre><code>{JSON.stringify(value, null, 4)}</code></pre>
  {:else}
  <textarea name="name" rows="8" cols="80" bind:value={textVersion}></textarea>
  {/if}
</div>
