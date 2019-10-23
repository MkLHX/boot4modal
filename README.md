# boot4modal
boot4modal.js Easy &amp; Light weight Javascripts lib allow you to create alert or confirm popups based on Bootstrap 4.3.1 modals

# Getting Started 

Dependencies

- Bootrap version 4.3.1
- Jquery version 3.3.1
- Popper.js version 1.14.7

[official CDNs](https://www.bootstrapcdn.com/)


# Example
  - Alert message
  ```javascript
  <script>
    boot4.alert("Hello World!", "OK");
  </script>
  ```
  - Alert message with callback function
  ```javascript
  <script>
    boot4.alert(
        {
            title: 'boot4modal alert popup',
            msg: 'This is a simple alert popup',
            centered: true
        }
    );
  </script>
   ```
  - Confirm message
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

# enjoy
Enjoy and use it!

# credits
[MkLHX](https://github.com/MkLHX/boot4modal)

[based on @fixxyzeal project](https://github.com/fixxyzeal/boot4alert)
