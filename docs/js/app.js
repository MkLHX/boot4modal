$(function () {
    console.debug('ready!');
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
    $('.copy').on('click', function (e) {
        let parent = e.target;
        let target = $('#install').find('pre').find('code');
        target.after('<textarea class="d-none"></textarea>');
        let txta = $('#install').find('textarea');
        txta.text(target.text());
        txta.select();
        target.addClass('bg-light text-dark');
        parent.
        document.execCommand('copy');
    });
});