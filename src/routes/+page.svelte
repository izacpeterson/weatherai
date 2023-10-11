<script>
  export let data;
  console.log(data);
</script>

<!-- audio player -->

<div>
  <h1>Todays Weather</h1>
  <audio controls>
    <source src={data.url} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</div>
