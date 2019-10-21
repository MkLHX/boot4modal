# boot4modal
boot4modal.js Easy &amp; Light weight Javascripts lib allow you to create alert or confirm modal based on Bootstrap 4.3.1 modals

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
        msg: "Call Back",
        title: "Test Callback",
        callback: function() {
          console.log("callback");
        }
      },"OK");
    </script>
   ```
  - Custom Background-color Header Alert message
  ```javascript
     <script>
     boot4.alert(
      {
        msg: "Custom Title",
        title: "Test",
        style: {
          "background-color": "#6200ea",
          color: "white",
          "font-weight": "bold"
        }
      },
      "OK"
    );
    </script>
   ```
  - Confirm message
  ```javascript
  <script>
   boot4.confirm({
      msg: "Confirm",
      title: "Test Confirm",
      callback: function(result) {
        if(result){
          console.log("ok");
        }
        else{
          console.log("cancel");
        }
      }
    });
  </script>
  ```

# enjoy
Enjoy and use it!

# credits
[based on @fixxyzeal project](https://github.com/fixxyzeal/boot4alert)
