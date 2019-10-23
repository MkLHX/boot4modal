```javascript
<script>
    boot4.confirm(
            {
                title: 'boot4modal confirm popup',
                msg: 'This is a confirm popup, callback is run on each buttons',
                buttons_labels: {
                    cancel_btn: 'Cancel',
                    ok_btn: 'Ok'
                },
                centered: true,
                callback: function (result) {
                    if (result) {
                        alert("ok clicked");
                    }
                    else {
                        alert("cancel clicked");
                    }
                }
            }
        );
</script>
```