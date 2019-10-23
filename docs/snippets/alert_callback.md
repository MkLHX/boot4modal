```javascript
<script>
    boot4.alert(
        {
            title: 'boot4modal alert with callback',
            msg: 'This alert have a callback to listen button click',
            buttons_labels: {
                ok_btn: 'Understand',
            },
            centered: true,
            callback: function () {
                alert('you\'re in callback method');
            }
        }
    );
</script>
```