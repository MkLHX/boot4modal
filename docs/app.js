$(function () {
    console.debug('ready!');

    // function loadSnippets(path) {
    //     return $.ajax({
    //         url: path,
    //         dataType: 'text',
    //         success: function (data) {
    //             console.debug(data);
    //         }
    //     });
    // }
    // $('#snippet-alert').find('mark-down').load('snippets/alert_only.md');
    // $('#snippet-alert-callback').find('mark-down').load('snippets/alert_callback.md');
    // $('#snippet-confirm').find('mark-down').load('snippets/confirm.md');
    // $('#snippet-alert-code').load('file.txt');
    // loadSnippets('file.txt');

    $('#lnalert').on('click', function () {
        boot4.alert(
            {
                title: 'boot4modal alert popup',
                msg: 'This is a simple alert popup',
                centered: true
            }
        );
    });
    $('#lnalertcallback').on('click', function () {
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
    });
    $('#lnconfirm').on('click', function () {
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
    });
});