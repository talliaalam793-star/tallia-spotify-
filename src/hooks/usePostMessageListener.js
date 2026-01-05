<!-- inside your original page, when user clicks the liked icon: -->
<script>
  // when liked icon clicked:
  window.top.postMessage({ open: 'liked' }, '*');
</script>
